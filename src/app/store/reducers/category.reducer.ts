import { createReducer, on } from "@ngrx/store";
import { categoryAddUpdateFetch, categoryDelete, categoryFetchAll } from "../actions/category.action";
import { CategoryItem } from "../models/category.model";

export const initialState:CategoryItem = {
  name: {name: "",
  description: ""}
}

const _categoryReducer = createReducer(
  initialState,
  on(categoryAddUpdateFetch, (state, {category}) => ({...state, ...category})),
  on(categoryDelete, (state, {category}) => ({...state, [category]: {name: "", description: ""}})),
  on(categoryFetchAll, (state, {category}) => ({...state, ...category})
))

export function categoryReducer(state:any, action:any){
  return _categoryReducer(state, action)
}