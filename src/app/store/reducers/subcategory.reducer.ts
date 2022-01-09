import { createReducer, on } from "@ngrx/store";
import { subcategoryAdd, subcategoryDelete, subcategoryFetch, subcategoryFetchAll, subcategoryUpdate } from "../actions/subcategory.action";
import { SubcategoryItem } from "../models/subcategory.model";

export const initialState:{[name: string] : SubcategoryItem} = {
  "": {name: "",
  category_name: "",
  description: "",
  username: "",
}
}

const _subcategoryReducer = createReducer(
  initialState,
  on(subcategoryAdd, (state, {subcategory}) => ({...state, [subcategory.category_name + "#" + subcategory.name] : subcategory})),
  on(subcategoryFetch, (state, {subcategory}) => ({...state, [subcategory.category_name + "#" + subcategory.name] : subcategory})),
  on(subcategoryUpdate, (state, {subcategory, psubcategory}) => ({...state, [psubcategory] : {name: "", category_name: "", description: "", username: ""} , [subcategory.category_name + "#" + subcategory.name] : subcategory})),
  on(subcategoryDelete, (state, {subcategory, category}) => ({...state, [category + "#" + subcategory]: {name: "", description: "", username: "", category_name: ""}})),
  on(subcategoryFetchAll, (state, {subcategory}) => {
    let makeState : {[name: string]: SubcategoryItem} = initialState
    for (const c in subcategory) {
      makeState = {...makeState, [subcategory[c].category_name + "#" + subcategory[c].name] : subcategory[c]};
    }
    return {...state, ...makeState};
  }
))

export function subcategoryReducer(state:any, action:any){
  console.log("Action",action)
  return _subcategoryReducer(state, action)
}