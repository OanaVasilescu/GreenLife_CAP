namespace greenlife.recycling.app;

using {
    cuid,
    managed
} from '@sap/cds/common';


entity Product : cuid {
    name       : localized String not null;
    components : Composition of many {
                     key component : Association to Components;
                 }
// barcode should be the id?
}

entity Components : cuid {
    name                  : localized String not null;
    recyclingInstructions : localized String not null;
    productMaterialCode   : Association to one ProductMaterialCodes; // 41 ALU
    productType           : Association to one ProductTypes;
}

entity BinTypes : cuid {
    name          : localized String not null; // de hartie, de sticla, de compost, normal
    materialCodes : Association to many ProductMaterialCodes
                        on materialCodes.bin = $self;
// maybe add map and add locations of the bin
}

entity ProductTypes : cuid {
    name           : localized String not null; // e capac, e actibilt, e sticla....
    orderOfRemoval : Integer not null; // mai intai dai jos capacul, dupa dai jos ambalajul.. etc
}


// code list for material code
entity ProductMaterialCodes {
    key intCode    : Integer;
    key stringCode : String;
        bin        : Association to BinTypes;
}

entity RecyclingTips : cuid {
    tip : localized String not null;
}

entity Reminders : cuid, managed {
    time      : Timestamp;
    repeating : Boolean;
}
