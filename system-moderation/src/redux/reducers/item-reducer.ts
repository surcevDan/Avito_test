import type { ThunkAction } from "redux-thunk";
import type { AppStateType } from "@/redux";
import type { adsT } from "@/types/reducers.ts";
import { getItemAdsApi, postApproveStatusApi, postRejectStatusApi, postRequestStatusApi } from "@/API.ts";
import type { AnyAction } from "redux";


const SET_ITEM = "SET_ITEM" as const;
const SET_IS_LOADING = "SET_IS_LOADING" as const;


let initialState = {
  item: null as adsT | null,
  isLoading: false

};
type initialStateT = typeof initialState

type ActionT = setAdsT | setIsLoadingT

const itemReducer = (state: initialStateT = initialState, action: ActionT): initialStateT => {
  switch (action.type) {
    case SET_ITEM: {
      return {
        ...state,
        item: action.item
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading
      };
    }
    default:
      return state;

  }
};


type setAdsT = {
  type: typeof SET_ITEM
  item: adsT
}
export const setItemAds = (item: adsT): setAdsT => {
  return { type: SET_ITEM, item };
};


type setIsLoadingT = {
  type: typeof SET_IS_LOADING
}
export const setIsLoading = (): setIsLoadingT => {
  return { type: SET_IS_LOADING };
};


export const getItemAdsThunkCreator = (id: string): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {
  return async (dispatch) => {
    let data = await getItemAdsApi(id);

    dispatch(setItemAds(data));


  };
};


export const postApproveStatusItemAdsThunkCreator = (id: string): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    let data = await postApproveStatusApi(id);
    dispatch(setIsLoading());
    console.log(data);
  };
};


export const postRejectStatusItemAdsThunkCreator = (id: string, body: {
  reason: string,
  comment?: string
}): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    let data = await postRejectStatusApi(id, body);
    dispatch(setIsLoading());
    console.log(data);
  };
};

export const postRequestStatusItemAdsThunkCreator = (id: string, body: {
  reason: string,
  comment?: string
}): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    let data = await postRequestStatusApi(id, body);
    dispatch(setIsLoading());
    console.log(data);
  };
};


export default itemReducer;