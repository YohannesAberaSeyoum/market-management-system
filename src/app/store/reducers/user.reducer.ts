// import the interface
import { UserAction, UserActionTypes } from '../actions/user.action';
import { UserItem } from '../models/userItem.model';
//create a dummy initial state
const initialState: UserItem = 
  {
    isSignedIn: false,
    username: "",
    firstname: "",
    lastname: "",
    password: ""
  };
export function UserReducer(
  state: UserItem = initialState,
  action: UserAction
) {
  switch (action.type) {
    case UserActionTypes.SIGN_IN:
      return {...state, ...action.payload};
    case UserActionTypes.SIGN_OUT:
        return {...state, ...initialState}
    default:
      return state;
  }
}