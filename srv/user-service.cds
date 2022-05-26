using {greenlife.recycling.app as my} from '../db/schema';

@requires : 'authenticated-user'
service UserService @(path : '/greenLife') {
    function getUserData()                                      returns {
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
    ])              as projection on my.GeneralProducts;

    entity MapPoints @(restrict : [
        {
            grant : ['READ'],
            to    : ['User']
        },
        {
            grant : ['*'],
            to    : ['Admin']
        }
    ])              as projection on my.MapPoints;

    entity GeneralProducts_MapPoints @(restrict : [
        {
            grant : ['READ'],
            to    : ['User']
        },
        {
            grant : ['*'],
            to    : ['Admin']
        }
    ])              as projection on my.GeneralProducts_MapPoints;

    entity Products as projection on my.Products;
    function getInstructionsBySubcategory(subcategory : String) returns array of String;
}
