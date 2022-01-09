import { UserItem } from './auth.model';
import { CategoryItem } from './category.model';
import { ErrorModel } from './error.model';
import { ProductItem } from './product.model';
import { SubcategoryItem } from './subcategory.model';

export interface State {
  readonly user: UserItem
  readonly error: ErrorModel
  readonly categories: {[name: string]: CategoryItem}
  readonly finished: Boolean
  readonly subcategories: {[name: string] : SubcategoryItem}
  readonly products: {[name: string] : ProductItem}
}