using {greenlife.recycling.app as my} from '../db/schema';

@requires : 'authenticated-user'
service UserService @(path : '/greenLife') {
    function getUserData() returns {
        user : String;
        roles : String;
    };

    entity GeneralProducts @(restrict : [
        {
            grant : ['READ'],
            to    : ['User']
        },
        {
            grant : ['*'],
            to    : ['Admin']
        }
    ]) as projection on my.GeneralProducts;

// entity Products @(restrict : [
//     {
//         grant : ['READ'],
//         to    : ['User']
//     },
//     {
//         grant : ['*'],
//         to    : ['Admin']
//     }
// ])               as projection on my.Products;


// entity Component @(restrict : [
//     {
//         grant : ['READ'],
//         to    : ['User']
//     },
//     {
//         grant : ['*'],
//         to    : ['Admin']
//     }
// ])               as projection on my.Components;

// entity BinTypes @(restrict : [
//     {
//         grant : ['READ'],
//         to    : ['User']
//     },
//     {
//         grant : ['*'],
//         to    : ['Admin']
//     }
// ])               as projection on my.BinTypes;

// entity ProductTypes @(restrict : [
//     {
//         grant : ['READ'],
//         to    : ['User']
//     },
//     {
//         grant : ['*'],
//         to    : ['Admin']
//     }
// ])               as projection on my.ProductTypes;

// entity ProductMaterialCodes @(restrict : [
//     {
//         grant : ['READ'],
//         to    : ['User']
//     },
//     {
//         grant : ['*'],
//         to    : ['Admin']
//     }
// ])               as projection on my.ProductMaterialCodes;

// entity ReciclingTips @(restrict : [
//     {
//         grant : ['READ'],
//         to    : ['User']
//     },
//     {
//         grant : ['*'],
//         to    : ['Admin']
//     }
// ])               as projection on my.RecyclingTips;

// entity Reminders as projection on my.Reminders;
}
