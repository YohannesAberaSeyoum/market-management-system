import { createAction, props } from '@ngrx/store';
import { ProCatSubTypes } from '../actionTypes/procatsub.type';
import { ProductItem } from '../models/product.model';


export const productAddUpdateFetch = createAction(
  ProCatSubTypes.ADD_UPDATE_FETCH,
  props<{product: ProductItem}>()
)

export const productFetchAll = createAction(
  ProCatSubTypes.FETCHING_ALL,
  props<{product: ProductItem[]}>()
)

export const productDelete = createAction(
  ProCatSubTypes.DELETE,
  props<{product: string}>()
)