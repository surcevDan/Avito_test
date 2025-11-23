import type { ThunkAction } from "redux-thunk";
import type { AppStateType } from "@/redux";

import type { AnyAction } from "redux";
import { getActivChartApi, getCategoriChartApi, getPieChartApi, getStatsApi } from "@/API.ts";
import type { ActivityChartData, CategoriesChartData, DecisionsChartData, SummaryStatsT } from "@/types/reducers.ts";


const SET_STATS = "SET_STATS" as const;
const SET_PIE_CHART = "SET_PIE_CHART" as const;
const SET_ACTIV_CHART = "SET_ACTIV_CHART" as const;
const SET_CATEGOR_CHART = "SET_CATEGOR_CHART" as const;


interface StatsStateT {
  stats: SummaryStatsT | null;
  pieChart: DecisionsChartData | null;
  activityChart: ActivityChartData[] | null;
  categoriesStats: CategoriesChartData | null;
}

let initialState: StatsStateT = {
  stats: null,
  pieChart: null,
  activityChart: null,
  categoriesStats: null
};


type initialStateT = typeof initialState

type ActionT = setStatsT | setPieChartT | setActivChartT | setCategoriChartT

const StatsReducer = (state: initialStateT = initialState, action: ActionT): initialStateT => {
  switch (action.type) {
    case SET_STATS: {
      return {
        ...state,
        stats: action.stats
      };
    }
    case SET_PIE_CHART: {
      return {
        ...state,
        pieChart: action.pieChart
      };
    }

    case SET_ACTIV_CHART: {
      return {
        ...state,
        activityChart: action.activChart
      };
    }

    case SET_CATEGOR_CHART: {
      return {
        ...state,
        categoriesStats: action.categoriesStats

      };
    }

    default:
      return state;

  }
};


type setStatsT = {
  type: typeof SET_STATS
  stats: SummaryStatsT
}
export const setStats = (stats: SummaryStatsT): setStatsT => {
  return { type: SET_STATS, stats };
};


type setPieChartT = {
  type: typeof SET_PIE_CHART
  pieChart: DecisionsChartData
}
export const setPieChart = (pieChart: DecisionsChartData): setPieChartT => {
  return { type: SET_PIE_CHART, pieChart };
};


type setActivChartT = {
  type: typeof SET_ACTIV_CHART
  activChart: ActivityChartData[]
}
export const setActivChart = (activChart: ActivityChartData[]): setActivChartT => {
  return { type: SET_ACTIV_CHART, activChart };
};


type setCategoriChartT = {
  type: typeof SET_CATEGOR_CHART
  categoriesStats: CategoriesChartData
}
export const setCategoriChart = (categoriesStats: CategoriesChartData): setCategoriChartT => {
  return { type: SET_CATEGOR_CHART, categoriesStats };
};


// type setNewCurrentPageT = {
//   type: typeof SET_NEW_CURRENT_PAGE
//   pageNumber: number
// }
// export const setNewCurrentPage = (pageNumber: number): setNewCurrentPageT => {
//   return { type: SET_NEW_CURRENT_PAGE, pageNumber };
// };


export const getStatsThunkCreator = (params: {}): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {

  return async (dispatch) => {
    let data = await getStatsApi(params);
    dispatch(setStats(data));
    console.log("Статистика", data);

  };
};

export const getPieChartThunkCreator = (params: {}): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {

  return async (dispatch) => {
    let data = await getPieChartApi(params);
    dispatch(setPieChart(data));
    console.log("Статистика круг", data);

  };
};


export const getActivChartThunkCreator = (params: {}): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {

  return async (dispatch) => {
    let data = await getActivChartApi(params);
    dispatch(setActivChart(data));
    console.log("Статистика Столб", data);

  };
};


export const getCategoriChartThunkCreator = (params: {}): ThunkAction<Promise<void>, AppStateType, unknown, AnyAction> => {

  return async (dispatch) => {
    let data = await getCategoriChartApi(params);
    dispatch(setCategoriChart(data));
    console.log("Статистика Категории", data);

  };
};


export default StatsReducer;