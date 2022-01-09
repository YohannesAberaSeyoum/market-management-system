import { createReducer, on } from "@ngrx/store";
import { categoryAdd, categoryDelete, categoryFetch, categoryFetchAll, categoryUpdate } from "../actions/category.action";
import { CategoryItem } from "../models/category.model";

export const initialState:{[name : string]: CategoryItem} = {
  "":{
    name: "",
    description: "",
    username: ""
  }
}

const _categoryReducer = createReducer(
  initialState,
  on(categoryAdd, (state, {category}) => ({...state, [category.name] : category})),
  on(categoryFetch, (state, {category}) => ({...state, [category.name] : category})),
  on(categoryUpdate, (state, {category, pcategory}) => ({...state, [pcategory] : {name: "", description: "", username: ""} ,[category.name] : category})),
  on(categoryDelete, (state, {category}) => ({...state, [category]: {name: "", description: "", username: ""}})),
  on(categoryFetchAll, (state, {category}) => {
    let makeState : {[name: string]: CategoryItem} = initialState
    for (const c in category) {
      makeState = {...makeState, [category[c].name] : category[c]};
    }
    return {...state, ...makeState};
  }
))

export function categoryReducer(state:any, action:any){
  return _categoryReducer(state, action)
}