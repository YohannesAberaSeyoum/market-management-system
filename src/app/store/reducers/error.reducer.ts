import { createReducer, on } from "@ngrx/store";
import { errorGet, errorRemove } from "../actions/error.action";
import { ErrorModel } from "../models/error.model";

export const initialState:ErrorModel = {msg: ""}

const _errorReducer = createReducer(
  initialState,
  on(errorGet, (state, {error}) => ({...state, ...error})),
  on(errorRemove, (state) => ({...state, ...initialState}))
)

export function errorReducer(state:any, action:any){
  return _errorReducer(state, action)
}