using {greenlife.recycling.app as my} from '../db/schema';

@requires : 'authenticated-user'
service UserService @(path : '/greenLife') {
    @readonly
    entity Product              as projection on my.Product;

    @readonly
    entity Component            as projection on my.Components;

    @readonly
    entity BinTypes             as projection on my.BinTypes;

    @readonly
    entity ProductTypes         as projection on my.ProductTypes;

    @readonly
    entity ProductMaterialCodes as projection on my.ProductMaterialCodes;

    @readonly
    entity ReciclingTips        as projection on my.RecyclingTips;

    entity Reminders            as projection on my.Reminders;
}
