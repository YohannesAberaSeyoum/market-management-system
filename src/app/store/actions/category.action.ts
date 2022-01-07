import { createAction, props } from '@ngrx/store';
import { ProCatSubTypes } from '../actionTypes/procatsub.type';
import { CategoryItem } from '../models/category.model';


export const categoryAddUpdateFetch= createAction(
  ProCatSubTypes.ADD_UPDATE_FETCH,
  props<{category: CategoryItem}>()
)

export const categoryFetchAll = createAction(
  ProCatSubTypes.FETCHING_ALL,
  props<{category: CategoryItem[]}>()
)

export const categoryDelete = createAction(
  ProCatSubTypes.DELETE,
  props<{category: string}>()
)