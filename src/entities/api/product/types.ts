export type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
};

export type GetProductByIdResponseType = ProductType;

export type UpdateProductRequestType = Omit<ProductType, 'id'>;
export type UpdateProductResponseType = ProductType;

export type GetAllProductsResponseType = ProductType[];

export type CreateProductRequestType = Omit<ProductType, 'id'>;
export type CreateProductResponseType = ProductType;
