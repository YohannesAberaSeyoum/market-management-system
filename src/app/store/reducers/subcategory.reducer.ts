import { createReducer, on } from "@ngrx/store";
import { subcategoryAddUpdateFetch, subcategoryDelete, subcategoryFetchAll } from "../actions/subcategory.action";
import { SubcategoryItem } from "../models/subcategory.model";

export const initialState:SubcategoryItem = {
  name: {name: "",
  category: "",
  description: ""}
}

const _categoryReducer = createReducer(
  initialState,
  on(subcategoryAddUpdateFetch, (state, {subcategory}) => ({...state, ...subcategory})),
  on(subcategoryDelete, (state, {subcategory}) => ({...state, [subcategory]: {name: "", description: ""}})),
  on(subcategoryFetchAll, (state, {subcategory}) => ({...state, ...subcategory})
))

export function categoryReducer(state:any, action:any){
  return _categoryReducer(state, action)
}