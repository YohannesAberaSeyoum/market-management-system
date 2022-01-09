import { createAction, props } from '@ngrx/store';
import { ProductTypes } from '../actionTypes/product.type';
import { ProductItem } from '../models/product.model';


export const productAdd = createAction(
  ProductTypes.ADD,
  props<{product: ProductItem}>()
)

export const productUpdate = createAction(
  ProductTypes.UPDATE,
  props<{product: ProductItem, pproduct: string}>()
)
export const productFetch = createAction(
  ProductTypes.FETCH,
  props<{product: ProductItem}>()
)

export const productFetchAll = createAction(
  ProductTypes.FETCHING_ALL,
  props<{product: ProductItem[]}>()
)

export const productDelete = createAction(
  ProductTypes.DELETE,
  props<{product: string, category: string, subcategory: string}>()
)