import { createAction, props } from '@ngrx/store';
import { CategoryTypes } from '../actionTypes/category.type';
import { CategoryItem } from '../models/category.model';


export const categoryAdd= createAction(
  CategoryTypes.ADD,
  props<{category: CategoryItem}>()
)
export const categoryUpdate= createAction(
  CategoryTypes.UPDATE,
  props<{category: CategoryItem, pcategory: string}>()
)
export const categoryFetch= createAction(
  CategoryTypes.FETCH,
  props<{category: CategoryItem}>()
)

export const categoryFetchAll = createAction(
  CategoryTypes.FETCH_ALL,
  props<{category: CategoryItem[]}>()
)

export const categoryDelete = createAction(
  CategoryTypes.DELETE,
  props<{category: string}>()
)