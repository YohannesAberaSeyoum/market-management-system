import { createAction, props } from '@ngrx/store';
import { ProCatSubTypes } from '../actionTypes/procatsub.type';
import { SubcategoryItem } from '../models/subcategory.model';


export const subcategoryAddUpdateFetch = createAction(
  ProCatSubTypes.ADD_UPDATE_FETCH,
  props<{subcategory: SubcategoryItem}>()
)

export const subcategoryFetchAll = createAction(
  ProCatSubTypes.FETCHING_ALL,
  props<{subcategory: SubcategoryItem[]}>()
)

export const subcategoryDelete = createAction(
  ProCatSubTypes.DELETE,
  props<{subcategory: string}>()
)