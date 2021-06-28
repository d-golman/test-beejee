import { Dispatch } from "react";
import { getCookie } from "../../service/cookie";
import { userActionType, userEnum } from "../../types/types";

export const checkLogin = () => {
  return async (dispatch: Dispatch<userActionType>) => {
    if (getCookie('token')) {
      dispatch({
        type: userEnum.CHANGE_LOGIN,
        payload: true
      });
    }
    else {
      dispatch({
        type: userEnum.CHANGE_LOGIN,
        payload: false
      });
    }
  };
};