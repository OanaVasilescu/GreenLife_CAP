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
    mapLocation           : Association to many GeneralProducts_MapPoints
                                on mapLocation.generalProduct = $self;
}

entity Products : cuid {
    parent  : Association to one GeneralProducts;
    barcode : String; //not sure
    name    : String;
}

entity MapPoints : cuid {
    coordinates  : String;
    productTypes : Association to many GeneralProducts_MapPoints
                       on productTypes.mapPoint = $self;
}

entity GeneralProducts_MapPoints : cuid {
    mapPoint       : Association to MapPoints;
    generalProduct : Association to GeneralProducts;
}
