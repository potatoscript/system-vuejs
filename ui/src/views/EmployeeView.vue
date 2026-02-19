<template>
  <div class="justify-content-center mx-5">

    <!-- Header -->
    <div class="input-group">
      <button
        type="button"
        class="btn btn-primary m-2"
        data-bs-toggle="modal"
        data-bs-target="#inputModal"
        @click="addClick"
      >
        +
      </button>

      <div class="mx-3 pt-2">
        <h4>{{ ja_Master }}</h4>
      </div>
    </div>

    <!-- Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>{{ ja_Name }}</th>
          <th>{{ ja_Department }}</th>
          <th>{{ ja_Position }}</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.id }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.position }}</td>
          <td>
            <button
              type="button"
              class="btn btn-light me-2"
              data-bs-toggle="modal"
              data-bs-target="#inputModal"
              @click="editClick(emp)"
            >
              ✏️
            </button>

            <button
              type="button"
              class="btn btn-light"
              @click="deleteClick(emp.id)"
            >
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Component -->
    <input-modal-view
      :Title="modalTitle"
      :Id="EmployeeId"
      @createData="createClick"
      @updateData="updateClick"
    >
      <template v-slot:modalBody>
        <div class="modal-body">

          <div class="input-group mb-3">
            <span class="input-group-text">{{ ja_Name }}</span>
            <input
              type="text"
              class="form-control"
              v-model="Name"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">{{ ja_Department }}</span>
            <input
              type="text"
              class="form-control"
              v-model="Department"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">{{ ja_Position }}</span>
            <input
              type="text"
              class="form-control"
              v-model="Position"
            />
          </div>

        </div>
      </template>
    </input-modal-view>

  </div>
</template>

<script>
import axios from "axios";
import ja from "../locales/ja.json";
import InputModalView from "./InputModalView.vue";

const API_BASE = "https://system-api.potatoscript-com.workers.dev/api/users";

export default {
  components: {
    InputModalView
  },

  data() {
    return {
      employees: [],
      EmployeeId: 0,
      Name: "",
      Department: "",
      Position: "",
      modalTitle: "",

      // i18n
      ja_Master: ja.Master,
      ja_Name: ja.Name,
      ja_Department: ja.Department,
      ja_Position: ja.Position,
      ja_New: ja.New,
      ja_Edit: ja.Edit
    };
  },

  methods: {

    // =============================
    // Load All Employees
    // =============================
    async refreshData() {
      try {
        const response = await axios.get(API_BASE);
        this.employees = response.data;
      } catch (error) {
        alert("Failed to fetch data: " + error);
      }
    },

    // =============================
    // Add Button Click
    // =============================
    addClick() {
      this.modalTitle = this.ja_New;
      this.EmployeeId = 0;
      this.Name = "";
      this.Department = "";
      this.Position = "";
    },

    // =============================
    // Create
    // =============================
    async createClick() {
      try {
        await axios.post(API_BASE, {
          name: this.Name,
          department: this.Department,
          position: this.Position
        });

        document.getElementById("modal-close-btn").click();
        this.refreshData();
      } catch (error) {
        alert("Create failed: " + error);
      }
    },

    // =============================
    // Edit Click
    // =============================
    editClick(emp) {
      this.modalTitle = this.ja_Edit;
      this.EmployeeId = emp.id;
      this.Name = emp.name;
      this.Department = emp.department;
      this.Position = emp.position;
    },

    // =============================
    // Update
    // =============================
    async updateClick() {
      try {
        await axios.put(`${API_BASE}/${this.EmployeeId}`, {
          name: this.Name,
          department: this.Department,
          position: this.Position
        });

        document.getElementById("modal-close-btn").click();
        this.refreshData();
      } catch (error) {
        alert("Update failed: " + error);
      }
    },

    // =============================
    // Delete
    // =============================
    async deleteClick(id) {
      if (!confirm("Are you sure you want to delete?")) return;

      try {
        await axios.delete(`${API_BASE}/${id}`);
        this.refreshData();
      } catch (error) {
        alert("Delete failed: " + error);
      }
    }
  },

  mounted() {
    this.refreshData();
  }
};
</script>