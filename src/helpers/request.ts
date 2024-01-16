import axios from "axios";

const BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:4000/api"
  : "https://bus-reservation-api.onrender.com/api";

const v1Endpoints = ["/reservations", "/buses/all", "/seats", "/reservations/"];

export default function Request() {}

const getVersion = (path: string) => {
  return "/v1";
  return v1Endpoints.includes(path.split("?")[0]) ? "/v1" : "/v2";
};
Request.get = async (path: string, params?: any) => {
  const version = getVersion(path);
  const response = await axios.get(`${BASE_URL}${version}${path}`, params);
  return { data: response.data.data, status: response.status };
};

Request.post = async (path: string, params?: any) => {
  const version = getVersion(path);
  const response = await axios.post(`${BASE_URL}${version}${path}`, params);
  return { data: response.data.data, status: response.status };
};

Request.put = async (path: string, params?: any) => {
  const version = getVersion(path);
  const response = await axios.put(`${BASE_URL}${version}${path}`, params);
  return { data: response.data.data, status: response.status };
};

Request.delete = async (path: string, params?: any) => {
  const version = getVersion(path);
  const response = await axios.delete(`${BASE_URL}${version}${path}`, params);
  return { data: response.data.data, status: response.status };
};
