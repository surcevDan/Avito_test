import axios from "axios";
import type { TFilters } from "@/types/reducers.ts";


const instance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});


export const getAdsApi = async (params: TFilters) => {
  const { data } = await instance.get("/ads", { params });
  return data;
};


export const getItemAdsApi = async (id: string) => {
  const { data } = await instance.get(`/ads/${id}`);
  return data;
};


export const postApproveStatusApi = async (id: string) => {
  const { data } = await instance.post(`/ads/${id}/approve`);
  return data;
};

export const postRejectStatusApi = async (id: string, body: { reason: string, comment?: string }) => {
  const { data } = await instance.post(`/ads/${id}/reject`, body);
  return data;
};

export const postRequestStatusApi = async (id: string, body: { reason: string, comment?: string }) => {
  const { data } = await instance.post(`/ads/${id}/request-changes`, body);
  return data;
};


export const getStatsApi = async (params: {}) => {
  const { data } = await instance.get("/stats/summary", { params });
  return data;
};

export const getPieChartApi = async (params: {}) => {
  const { data } = await instance.get("/stats/chart/decisions", { params });
  return data;
};


export const getActivChartApi = async (params: {}) => {
  const { data } = await instance.get("/stats/chart/activity", { params });
  return data;
};


export const getCategoriChartApi = async (params: {}) => {
  const { data } = await instance.get("/stats/chart/categories", { params });
  return data;
};

