const cds = require("@sap/cds");
const userRoles = ["Admin", "User"];

module.exports = cds.service.impl(srv => {
    srv.on("getUserData", _getUserData);
    srv.on("getInstructionsBySubcategory", _getInstructionsBySubcategory);
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
