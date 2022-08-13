export interface Tool {
    id?: string;
    name?: string;
    shortName?: string;
    type?: string;
    purchaseDate?: string;
    price?: number;
    imageB64?: string;
    recommendations?: string;
    brand?: Brand;
    productDetail?: ProductDetail;
    userUID?: string;
}

export interface Brand {
    name?: string;
    logoB64?: string;
}

export interface ProductDetail {
    descriptions?: Description[];
    shortDescription?: string;
}

export interface Description {
    code?: string;
    title?: string;
    descriptionKeyValue?: DescriptionKeyValue[];
}

export interface DescriptionKeyValue {
    label?: string;
    value?: string;
}
