using {greenlife.recycling.app as my} from '../db/schema';

@requires : 'authenticated-user'
service UserService @(path : '/greenlife') {
    entity GeneralProducts           as projection on my.GeneralProducts;
    entity MapPoints                 as projection on my.MapPoints;
    entity GeneralProducts_MapPoints as projection on my.GeneralProducts_MapPoints;
    entity Products                  as projection on my.Products;

    function getUserData()                                                       returns {
        user : String;
        roles : String;
    };

    function getInstructionsBySubcategory(subcategory : String, locale : String) returns array of String;
    function sendMail()                                                          returns String;
    function getHistory()                                                        returns array of String;
    function getSubmissions()                                                    returns array of String;
}
