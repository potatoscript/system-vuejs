import axios from "axios";
import url from "../assets/js/url.js";

const API_BASE = url.API_URL + "Job/";

export const getTotalJobs = async () => {
  const res = await axios.get(API_BASE + "read-total-jobs-employee");
  return res.data;
};

export const getEmployeeJobs = async (employeeName) => {
  const res = await axios.get(API_BASE + "read-all-employee-jobs/" + employeeName);
  return res.data;
};

export const createJob = async (job) => {
  const res = await axios.post(API_BASE + "create-job", job);
  return res.data;
};

export const updateJob = async (job) => {
  const res = await axios.put(API_BASE + "update-job-by-id/", job);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await axios.delete(API_BASE + "delete-job-by-id/" + id);
  return res.data;
};