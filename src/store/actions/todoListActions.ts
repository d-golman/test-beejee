import { Dispatch } from "redux";
import { sort_directionType, sort_fieldType, todoListActionType, todoListEnum } from "../../types/types";

export const incrementPage = () => {
  return async (dispatch: Dispatch<todoListActionType>) => {
    dispatch({
      type: todoListEnum.CHANGE_PAGE_INC
    });
  };
};
export const decrementPage = () => {
  return async (dispatch: Dispatch<todoListActionType>) => {
    dispatch({
      type: todoListEnum.CHANGE_PAGE_DEC
    });
  };
};
export const changeSortField = (sort: sort_fieldType) => {
  return async (dispatch: Dispatch<todoListActionType>) => {
    dispatch({
      type: todoListEnum.CHANGE_SORT,
      payload: sort
    });
  };
};
export const changeSortDirection = (direction: sort_directionType) => {
  return async (dispatch: Dispatch<todoListActionType>) => {
    dispatch({
      type: todoListEnum.CHANGE_DIRECTION,
      payload: direction
    });
  };
};