const cds = require("@sap/cds");
const userRoles = ["Admin", "User"];
const nodemailer = require("nodemailer")


module.exports = cds.service.impl(srv => {
    srv.after(["READ"], 'MapPoints', async (each) => { // await next();
        await addProductsToMapPoint(each);
    })
    srv.on(["CREATE"], 'Products', async (req, next) => {
        await next();
        await changeToId(req);
    })
    srv.on("getUserData", _getUserData);
    srv.on("getInstructionsBySubcategory", _getInstructionsBySubcategory);
    srv.on("sendMail", _sendMail);
    srv.on("getHistory", _getHistory);
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
                pr.name
            })
        }).where({mapPoint_ID: point.ID})
        point.productTypes = mapPoints_Products;
    }

    return each;
}

async function changeToId(req) {
    const generalProduct = await SELECT.from('GeneralProducts').where({subcategory: req.data.parentkey})
    req.data.parent = generalProduct[0].ID;

    req.data.approved = "pending"
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
                gp.name
            })
        })
    }).where({createdBy: user});
    history.push(... products);
    history.push(... mapPoints)

    return history;
}
