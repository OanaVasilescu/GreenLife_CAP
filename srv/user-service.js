const cds = require("@sap/cds");
const userRoles = ["Admin", "User"];
const nodemailer = require("nodemailer")
const {v4: uuidv4} = require('uuid');


module.exports = cds.service.impl(srv => {
    srv.after(["READ"], 'MapPoints', async (each) => { // await next();
        await addProductsToMapPoint(each);
    })
    srv.on(["CREATE"], 'Products', async (req, next) => {
        await next();
        await changeToId(req);
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

async function _getInstructionsBySubcategory(req) {
    const tx = cds.transaction(req);

    let subcat = req.data.subcategory;
    const product = await tx.read('GeneralProducts').where({subcategory: subcat})
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

async function changeToId(req) {
    const generalProduct = await SELECT.from('GeneralProducts').where({subcategory: req.data.parentkey})
    req.data.parent = generalProduct[0].ID;

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

async function _sendMail(req) { // let data = req.data;
    console.log(req._queryOptions.data);
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     auth: {
    //         user: "greenlife.recycling.app@gmail.com",
    //         pass: "qexwad-vihtir-1Zikwo"
    //     }
    // })

    // transporter.sendMail({
    //     from: '"GreenLife" <greenlife.recycling.app@gmail.com>',
    //     to: "vasilescu.oana28@gmail.com",
    //     subject: "incident report",
    //     text: "This is an automated email. Do not reply.",
    //     html: req._queryOptions.data
    // }).then(info => console.log(info)).catch(err => console.log(err))
}

async function _getHistory(req) {
    const user = req.user.id;

    let history = [];
    let products = await SELECT.from('Products').where({createdBy: user});
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

    let products = await SELECT.from('Products').where({approved: "Pending"});
    let productsNull = await SELECT.from('Products').where({approved: null});

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
