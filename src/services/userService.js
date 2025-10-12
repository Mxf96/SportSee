import { api } from "./api";
import {
  adaptUser,
  adaptActivity,
  adaptAverageSessions,
  adaptPerformance,
} from "./adapters";

export async function getUserMain(id) {
  const { data } = await api.get(`/user/${id}`);
  return adaptUser(data?.data);
}

export async function getUserActivity(id) {
  const { data } = await api.get(`/user/${id}/activity`);
  return adaptActivity(data?.data);
}

export async function getUserAverageSessions(id) {
  const { data } = await api.get(`/user/${id}/average-sessions`);
  return adaptAverageSessions(data?.data);
}

export async function getUserPerformance(id) {
  const { data } = await api.get(`/user/${id}/performance`);
  return adaptPerformance(data?.data);
}