import { createReducer, on } from "@ngrx/store";
import { finishEnd, finishStart } from "../actions/finish.action";

export const initialState:Boolean = false;

const _finishReducer = createReducer(
  initialState,
  on(finishEnd, () => (true)),
  on(finishStart, () => (false))
)

export function finishReducer(state:any, action:any){
    console.log(state)
  return _finishReducer(state, action)
}