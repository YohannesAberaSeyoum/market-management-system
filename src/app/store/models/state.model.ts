import { UserItem } from './auth.model';
import { CategoryItem } from './category.model';
import { ErrorModel } from './error.model';

export interface State {
  readonly user: UserItem
  readonly category: CategoryItem
  readonly error: ErrorModel
}