const userRoles = ["Admin", "User"];

module.exports = cds.service.impl(srv => {
    srv.before([
        'CREATE', 'UPDATE'
    ], 'Product', _checkProduct);
    srv.before([
        'CREATE', 'UPDATE'
    ], 'Component', _checkComponent);
    // srv.before([
    //     'CREATE', 'UPDATE'
    // ], 'BinTypes', _checkBin);
    srv.on("getUserData", _getUserData);
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

async function _checkProduct(req) {
    if (req.data.components.length == 0) {
        req.error(409, "A products needs components!");
    }
    return req.reply({ID: req.data.ID});
}

async function _checkComponent(req) {
    if (req.data.productMaterialCode == null) {
        req.error(409, "A component needs a material code!");
    }
    // if(req.data.orderOfRemoval == null){
    //     req.error(409, "Please specify the order of removal!");
    // }
    if (req.data.productType == null) {
        req.error(409, "A component needs a product type!");
    }
    return req.reply({ID: req.data.ID});
}

// async function _checkBin(req) {
//     if (req.data.materialCodes == null) {
//         req.error(409, "A component needs a product type!");
//     }
//     return req.reply({ID: req.data.ID});
// }
