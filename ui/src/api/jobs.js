const API_BASE =
  "https://system-vuejs.potatoscript-com.workers.dev/api";

export const getTotalJobs = async () => {
  const res = await fetch(`${API_BASE}/Job/read-total-jobs-employee`);
  return res.json();
};

export const getEmployeeJobs = async (employeeName) => {
  const res = await fetch(
    `${API_BASE}/Job/read-all-employee-jobs/${employeeName}`
  );
  return res.json();
};

export const createJob = async (job) => {
  const res = await fetch(`${API_BASE}/Job/create-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });
  return res.json();
};


export const updateJob = (id, job) =>
  fetch(`${API}/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });

export const deleteJob = async (id) => {
  const res = await fetch(
    `${API_BASE}/Job/delete-job-by-id/${id}`,
    { method: "DELETE" }
  );
  return res.json();
};