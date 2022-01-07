import { createReducer, on } from "@ngrx/store";
import { productAddUpdateFetch, productDelete, productFetchAll } from "../actions/product.action";
import { ProductItem } from "../models/product.model";

export const initialState:ProductItem = {
  name: {name: "",
  quantity: 0,
  category: "",
  subcategory: "",
  description: ""}
}

const _productReducer = createReducer(
  initialState,
  on(productAddUpdateFetch, (state, {product}) => ({...state, ...product})),
  on(productDelete, (state, {product}) => ({...state, [product]: {name: "", description: ""}})),
  on(productFetchAll, (state, {product}) => ({...state, ...product})
))

export function productReducer(state:any, action:any){
  return _productReducer(state, action)
}