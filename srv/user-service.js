const cds = require("@sap/cds");
const userRoles = ["Admin", "User"];
const nodemailer = require("nodemailer")


module.exports = cds.service.impl(srv => {
    srv.on(["GET"], 'MapPoints', async (req, next) => {
        await next();
        await addProductsToMapPoint(req);
    })
    srv.on("getUserData", _getUserData);
    srv.on("getInstructionsBySubcategory", _getInstructionsBySubcategory);
    srv.on("sendMail", _sendMail);
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

async function addProductsToMapPoint(req) {
    const tx = cds.transaction(req);
    const MapPoints = req.results;
    console.log(">>>>>>>>>>>>>>>>>", req.results);

    for (let point of MapPoints) {
        const mapPoints_Products = await tx.read('GeneralProducts_MapPoints', el => {
            el('*'),
            el.generalProduct(pr => {
                pr.ID,
                pr.name
            })
        }).where({mapPoint_ID: point.ID})
        console.log(">>>>>>>>>>>>>>>>>", mapPoints_Products);

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
