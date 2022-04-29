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
    ]) as projection on my.GeneralProducts;

    function getInstructionsBySubcategory(subcategory : String) returns array of String;
}
