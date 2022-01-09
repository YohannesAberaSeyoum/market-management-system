import { createAction, props } from '@ngrx/store';
import { SubcategoryTypes } from '../actionTypes/subcategory.type';
import { SubcategoryItem } from '../models/subcategory.model';


export const subcategoryAdd = createAction(
  SubcategoryTypes.ADD,
  props<{subcategory: SubcategoryItem}>()
)
export const subcategoryUpdate = createAction(
  SubcategoryTypes.UPDATE,
  props<{subcategory: SubcategoryItem, psubcategory: string}>()
)
export const subcategoryFetch = createAction(
  SubcategoryTypes.FETCH,
  props<{subcategory: SubcategoryItem}>()
)

export const subcategoryFetchAll = createAction(
  SubcategoryTypes.FETCH_ALL,
  props<{subcategory: SubcategoryItem[]}>()
)

export const subcategoryDelete = createAction(
  SubcategoryTypes.DELETE,
  props<{subcategory: string, category: string}>()
)