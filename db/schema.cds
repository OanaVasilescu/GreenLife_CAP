namespace greenlife.recycling.app;

using {
    cuid,
    managed
} from '@sap/cds/common';


entity Products : cuid {
    name       : String not null;
    components : Composition of many {
                     key component : Association to Components;
                 }
    image      : LargeBinary @Core.MediaType : 'image/png';
// barcode should be the id?
}

entity Components : cuid {
    // name                : localized String not null;
    // recyclingInstructions : localized String not null;
    productMaterialCode : Association to one ProductMaterialCodes; // 41 ALU
    productType         : Association to one ProductTypes;
}

entity BinTypes : cuid {
    name          : String not null; // de hartie, de sticla, de compost, normal
    materialCodes : Association to many ProductMaterialCodes
                        on materialCodes.bin = $self;
// maybe add map and add locations of the bin
}

entity ProductTypes : cuid {
    name                  : String not null; // e capac, e actibilt, e sticla....
    recyclingInstructions : String;
    orderOfRemoval        : Integer; // mai intai dai jos capacul, dupa dai jos ambalajul.. etc
    image                 : LargeBinary @Core.MediaType : 'image/png';
}

// code list for material code
entity ProductMaterialCodes {
    key intCode     : Integer;
        stringCode  : String;
        description : String;
        bin         : Association to BinTypes;
}

entity RecyclingTips : cuid {
    tip : String not null;
}

entity Reminders : cuid, managed {
    time      : Timestamp;
    repeating : Boolean;
}
