using {greenlife.recycling.app as my} from '../db/schema';

service AdminService @(requires : 'Admin') {
    entity Products             as projection on my.Products;
    entity Component            as projection on my.Components;
    entity BinTypes             as projection on my.BinTypes;
    entity ProductTypes         as projection on my.ProductTypes;
    entity ProductMaterialCodes as projection on my.ProductMaterialCodes;
    entity ReciclingTips        as projection on my.RecyclingTips;
}
