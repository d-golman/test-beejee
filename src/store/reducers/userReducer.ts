import { userActionType, userEnum, userStateType } from "../../types/types";

const initialState: userStateType = {
  logged: false
};

export const userReducer = (state = initialState, action: userActionType): userStateType => {
  switch (action.type) {
    case userEnum.CHANGE_LOGIN:
      return {
        ...state,
        logged: action.payload
      };

    default:
      return {
        ...state
      };
  }
};