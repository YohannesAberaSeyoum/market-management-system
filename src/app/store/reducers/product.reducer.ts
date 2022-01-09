import { createReducer, on } from "@ngrx/store";
import { productAdd, productDelete, productFetch, productFetchAll, productUpdate } from "../actions/product.action";
import { ProductItem } from "../models/product.model";

export const initialState:{[name: string]: ProductItem} = {
  name: {name: "",
  quantity: 0,
  category_name: "",
  subcategory_name: "",
  description: ""}
}

const _productReducer = createReducer(
  initialState,
  on(productAdd, (state, {product}) => ({...state, [product.category_name + "#" + product.subcategory_name + "#" + product.name]: product})),
  on(productFetch, (state, {product}) => ({...state, [product.category_name + "#" + product.subcategory_name + "#" + product.name]: product})),
  on(productUpdate, (state, {product, pproduct}) => {
    console.log("What the hell")
    console.log("Product before",product)
    return ({...state,  [pproduct]: {name: "", category_name: "", subcategory_name: "", description: "", quantity: 0} , [product.category_name + "#" + product.subcategory_name + "#" + product.name]: product})}),
  on(productDelete, (state, {product, category, subcategory}) => ({...state, [category + "#" + subcategory + "#" + product]: {name: "", description: "", category_name : "", subcategory_name : "", quantity: 0}})),
  on(productFetchAll, (state, {product}) => {
    let makeState : {[name: string]: ProductItem} = initialState
    for (const c in product) {
      makeState = {...makeState, [product[c].category_name + "#" + product[c].subcategory_name + "#" + product[c].name] : product[c]};
    }
    return {...state, ...makeState};
  }
))

export function productReducer(state:any, action:any){
  return _productReducer(state, action)
}