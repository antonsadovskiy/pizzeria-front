export type CategoryType = {
  id: number;
  name: string;
};

export type GetCategoryByIdResponseType = CategoryType;
export type UpdateCategoryResponseType = CategoryType;
export type GetAllCategoriesResponseType = CategoryType[];
export type CreateCategoryResponseType = CategoryType;
