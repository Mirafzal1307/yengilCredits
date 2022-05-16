export type Product = {
    id: any;
    short_name: string;
    photo: string;
    price: number;
    category: any;
    after_discount:number;
    discount:number;
    quantity: number;
    with_discount_products: any;
    recommended_products: any;

}

export type SearchProp = {
    value: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type themeChange = {
    theme: any

}