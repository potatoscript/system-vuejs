const API = "https://system-vuejs.potatoscript-com.workers.dev";

export const getUsers = () =>
  fetch(`${API}/api/users`).then(r => r.json());

export const addUser = (user) =>
  fetch(`${API}/api/users`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(user)
  });

export const updateUser = (id,user) =>
  fetch(`${API}/api/users/${id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(user)
  });

export const deleteUser = (id) =>
  fetch(`${API}/api/users/${id}`, { method:"DELETE" });
