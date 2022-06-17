const cds = require("@sap/cds");
const userRoles = ["Admin", "User"];
const nodemailer = require("nodemailer")
const {v4: uuidv4} = require('uuid');
const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const clientId = "410556020534-kkp6shmqb7vjbi7678oo9r03vt6v6re3.apps.googleusercontent.com"
const clientSecret = "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"
const refresh_token = "1//04kduw6I9Kq3FCgYIARAAGAQSNwF-L9IrszcsCRYBrvX52ZjnJJWMlo8BkINaKy_hTf0EQ1uuC3d4aGBbiygIglNaPIvUgODg6_w"

module.exports = cds.service.impl(srv => {
    srv.after(["READ"], 'MapPoints', async (each) => { // await next();
        await addProductsToMapPoint(each);
    })
    srv.on(["CREATE"], 'Products', async (req, next) => {
        await next();
        await putOnPending(req);
    })
    srv.on(["READ"], 'GeneralProducts', async (req, next) => {
        await next();

        await doNothing(req);
    })
    srv.on(["CREATE"], 'MapPoints', async (req, next) => {
        await next();
        await completeRequest(req);
    })
    srv.after(["CREATE"], 'MapPoints', async (req) => {
        await changeProductNamesToId(req);
    })

    srv.on("getUserData", _getUserData);
    srv.on("getInstructionsBySubcategory", _getInstructionsBySubcategory);
    srv.on("sendMail", _sendMail);
    srv.on("getHistory", _getHistory);
    srv.on("getSubmissions", _getSubmissions);
    srv.on("getIDfromCat", getIDfromCat);
})

async function _getUserData(req) {
    const userEmail = req.user.id;

    var roles = [];

    userRoles.forEach(role => {
        if (req.user.is(role)) {
            roles.push(role)
        }
    })
    return({user: userEmail, roles: roles})
}

async function getIDfromCat(req) {
    const generalProduct = await SELECT.from('GeneralProducts').where({subcategory: req.data.subcategory})
    return generalProduct[0].ID
}


async function _getInstructionsBySubcategory(req) {
    const tx = cds.transaction(req);

    let subcat = req.data.subcategory;
    let locale = req.data.locale;

    let product;
    if (locale == 'ro' || locale == 'ro-RO') {
        product = await SELECT.from('GeneralProducts', el => {
            el('*'),
            el.ID,
            el.texts(t => {
                t.recyclingRestrictions,
                t.recyclingInstructions,
                t.name,
                t.howToCollect
            }),
            el.subcategory
        }).where({subcategory: subcat});
        // product = await tx.read('GeneralProducts',).where({subcategory: subcat})
        product[0].name = product[0].texts[0].name;
        product[0].recyclingRestrictions = product[0].texts[0].recyclingRestrictions;
        product[0].recyclingInstructions = product[0].texts[0].recyclingInstructions;
        product[0].howToCollect = product[0].texts[0].howToCollect;
    } else {
        product = await tx.read('GeneralProducts').where({subcategory: subcat})
    }
    return product;
}

async function addProductsToMapPoint(each) {
    for (let point of each) {
        const mapPoints_Products = await SELECT.from('GeneralProducts_MapPoints', el => {
            el('*'),
            el.generalProduct(pr => {
                pr.ID,
                pr.name,
                pr.subcategory
            })
        }).where({mapPoint_ID: point.ID})
        point.productTypes = mapPoints_Products;
    }

    return each;
}

async function putOnPending(req) {
    console.log(req.data)

    if (req.data.rewardType !== 'none') {
        req.data.reward = true;
    } else {
        req.data.reward = false;
    };
    req.data.approved = "Pending"
    return req;
}

async function completeRequest(req) {
    req.data.approved = "Pending"
    return req;
}

async function changeProductNamesToId(req) {

    for (let name of req.productNames) {
        try {
            const generalProduct = await SELECT.from('GeneralProducts').where({subcategory: name})
            let query = {
                INSERT: {
                    into: {
                        ref: ['GeneralProducts_MapPoints']
                    },
                    columns: [
                        'mapPoint_ID', 'generalProduct_ID'
                    ],
                    values: [
                        req.ID, generalProduct[0].ID
                    ]
                }
            }

            cds.run(query)
            // let smt = await tx.create('GeneralProducts_MapPoints').entries({mapPoint_ID: req.ID, generalProduct_ID: generalProduct[0].ID})
        } catch (err) {
            console.log("Adding map point - general product failedfailed. Error: ", err)
        }
    }
    return req;
}

async function _sendMail(req) {
    let data = req.data;
    // console.log(req.data)
    const oauth2Client = new OAuth2(clientId, clientSecret, "https://developers.google.com/oauthplayground");
    oauth2Client.setCredentials({refresh_token: refresh_token});


    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "greenlife.recycling.app@gmail.com",
            accessToken,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refresh_token
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    transporter.sendMail({
        from: '"GreenLife" <greenlife.recycling.app@gmail.com>',
        to: "greenlife.recycling.app@gmail.com",
        subject: "Raportare incident",
        text: "This is an automated email. Do not reply.",
        html: req.data.text
    }).then(info => console.log(info)).catch(err => console.log(err))
}

async function _getHistory(req) {
    const user = req.user.id;

    let history = [];
    let products = await SELECT.from('Products', el => {
        el('*'),
        el.parent(gp => {
            gp.name
            gp.ID
        })
    }).where({createdBy: user});
    let mapPoints = await SELECT.from('MapPoints', el => {
        el('*'),
        el.productTypes(pr => {
            pr('*'),
            pr.generalProduct(gp => {
                gp('*'),
                gp.name,
                gp.subcategory
            })
        })
    }).where({createdBy: user});
    history.push(... products);
    history.push(... mapPoints)

    return history;
}

async function _getSubmissions(req) {
    let submissions = []

    let products = await SELECT.from('Products', el => {
        el('*'),
        el.parent(gp => {
            gp.name
            gp.ID
        })
    }).where({approved: "Pending"});
    let productsNull = await SELECT.from('Products', el => {
        el('*'),
        el.parent(gp => {
            gp.name
            gp.ID
        })
    }).where({approved: null});

    let mapPoints = await SELECT.from('MapPoints', el => {
        el('*'),
        el.productTypes(pr => {
            pr('*'),
            pr.generalProduct(gp => {
                gp('*'),
                gp.name,
                gp.subcategory
            })
        })
    }).where({approved: "Pending"});

    let mapPointsNull = await SELECT.from('MapPoints', el => {
        el('*'),
        el.productTypes(pr => {
            pr('*'),
            pr.generalProduct(gp => {
                gp('*'),
                gp.name,
                gp.subcategory
            })
        })
    }).where({approved: null});


    submissions.push(... products);
    submissions.push(... productsNull);

    submissions.push(... mapPoints);
    submissions.push(... mapPointsNull);

    return submissions;
}


function doNothing(req) {
    // console.log(req.user.locale)
    // console.log(req)
    return req
}
