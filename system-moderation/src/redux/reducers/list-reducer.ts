import type { ThunkAction } from "redux-thunk";
import type { AppStateType } from "@/redux";
import type { adsT, PaginationT, TFilters } from "@/types/reducers.ts";
import { getAdsApi } from "@/API.ts";
import type { AnyAction } from "redux";


const SET_ADS = "SET_ADS" as const;
const SET_PAGINATION = "SET_PAGINATION" as const;
const SET_NEW_CURRENT_PAGE = "SET_NEW_CURRENT_PAGE" as const;


let initialState = {
  ads: [] as Array<adsT>,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 0
  } as PaginationT
};
type initialStateT = typeof initialState

type ActionT = setAdsT | setAdsPaginationT | setNewCurrentPageT

const listReducer = (state: initialStateT = initialState, action: ActionT): initialStateT => {
  switch (action.type) {
    case SET_ADS: {
      return {
        ...state,
        ads: action.ads
      };
    }
    case SET_PAGINATION: {
      return {
        ...state,
        pagination: action.pagination
      };
    }
    case SET_NEW_CURRENT_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.pageNumber
        }

      };
    }
    default:
      return state;

  }
};


type setAdsT = {
  type: typeof SET_ADS
  ads: Array<adsT>
}
export const setAds = (ads: Array<adsT>): setAdsT => {
  return { type: SET_ADS, ads };
};


type setAdsPaginationT = {
  type: typeof SET_PAGINATION
  pagination: PaginationT
}
export const setAdsPagination = (pagination: PaginationT): setAdsPaginationT => {
  return { type: SET_PAGINATION, pagination };
};


type setNewCurrentPageT = {
  type: typeof SET_NEW_CURRENT_PAGE
  pageNumber: number
}
export const setNewCurrentPage = (pageNumber: number): setNewCurrentPageT => {
  return { type: SET_NEW_CURRENT_PAGE, pageNumber };
};


export const getAdsThunkCreator = (params: TFilters): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {

  return async (dispatch) => {


    let data = await getAdsApi(params);


    dispatch(setAds(data.ads));
    dispatch(setAdsPagination(data.pagination));
  };
};


export const getNewPageThunkCreator = (params: TFilters, page: number): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {

  return async (dispatch) => {
    dispatch(setNewCurrentPage(page));


    let data = await getAdsApi(params);

    dispatch(setAds(data.ads));
    dispatch(setAdsPagination(data.pagination));
  };
};


export default listReducer;