namespace greenlife.recycling.app;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity GeneralProducts : cuid {
    name                  : localized String;
    howToCollect          : localized String;
    recyclingRestrictions : localized String;
    recyclingInstructions : localized String;
    subcategory           : String;
    products              : Association to many Products;
}

entity Products : cuid {
    parent  : Association to one GeneralProducts;
    barcode : String; //not sure
    name    : String;
}
