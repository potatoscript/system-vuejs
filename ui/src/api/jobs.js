const API_BASE =
  "https://system-vuejs.potatoscript-com.workers.dev/api";

// ==========================
// GET TOTAL JOBS PER EMPLOYEE
// ==========================
export const getTotalJobs = async () => {
  const res = await fetch(`${API_BASE}/Job/read-total-jobs-employee`);
  return res.json();
};

// ==========================
// GET ALL JOBS FOR ONE EMPLOYEE
// ==========================
export const getEmployeeJobs = async (employeeName) => {
  const res = await fetch(
    `${API_BASE}/Job/read-all-employee-jobs/${employeeName}`
  );
  return res.json();
};

// ==========================
// CREATE JOB
// ==========================
export const createJob = async (job) => {
  const res = await fetch(`${API_BASE}/Job/create-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });
  return res.json();
};

// ==========================
// UPDATE JOB
// ==========================
export const updateJob = async (id, job) => {
  const res = await fetch(
    `${API_BASE}/Job/update-job-by-id/${id}`,   // ✅ FIXED HERE
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job)
    }
  );
  return res.json();
};

// ==========================
// DELETE JOB
// ==========================
export const deleteJob = async (id) => {
  const res = await fetch(
    `${API_BASE}/Job/delete-job-by-id/${id}`,
    { method: "DELETE" }
  );
  return res.json();
};