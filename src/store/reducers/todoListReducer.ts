import { todoListActionType, todoListEnum, todoListType } from "../../types/types";

const initialState: todoListType = {
  page: 1,
  sort_field: 'id',
  sort_direction: 'asc'
};

export const todoListReducer = (state = initialState, action: todoListActionType): todoListType => {
  switch (action.type) {
    case todoListEnum.CHANGE_PAGE_INC:
      return {
        ...state,
        page: ++state.page
      };

    case todoListEnum.CHANGE_PAGE_DEC:
      return {
        ...state,
        page: --state.page
      };
    case todoListEnum.CHANGE_SORT:
      return {
        ...state,
        sort_field: action.payload
      };
    case todoListEnum.CHANGE_DIRECTION:
      return {
        ...state,
        sort_direction: action.payload
      };

    default:
      return {
        ...state
      };
  }
};