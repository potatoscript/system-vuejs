<template>
  <div class="justify-content-center mx-5">
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
        <h4>{{ ja_Job }}</h4>
      </div>
    </div>

    <!-- Job Summary Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>{{ ja_Employee }}</th>
          <th>{{ ja_Department }}</th>
          <th>{{ ja_TotalJobs }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dat in jobs" :key="dat.jobId">
          <td data-bs-toggle="modal" data-bs-target="#employeeJobModal"
              @click="getTargetEmployeeName(dat.employeeName)">
            {{ dat.employeeName }}
          </td>
          <td data-bs-toggle="modal" data-bs-target="#employeeJobModal"
              @click="getTargetEmployeeName(dat.employeeName)">
            {{ dat.employeeDepartment }}
          </td>
          <td data-bs-toggle="modal" data-bs-target="#employeeJobModal"
              @click="getTargetEmployeeName(dat.employeeName)">
            {{ dat.jobContent }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Charts -->
    <div style="max-width:400px;margin:auto">
      <canvas id="jobPieChart"></canvas>
    </div>

    <div style="max-width:600px;margin:auto">
      <canvas id="jobBarChart"></canvas>
    </div>

    <!-- Input Modal -->
    <input-modal-view
      :Title="modalTitle"
      :Id="JobId"
      @createData="createClick"
      @updateData="updateClick"
    >
      <template v-slot:modalBody>
        <div class="modal-body">

          <div class="input-group mb-3">
            <span class="input-group-text">{{ ja_Employee }}</span>
            <input type="text" class="form-control" v-model="EmployeeName" />
            <span class="input-group-text">{{ ja_Department }}</span>
            <input type="text" class="form-control" v-model="EmployeeDepartment" />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">{{ ja_DueDate }}</span>
            <input type="text" class="form-control" v-model="DueDate" />
            <span class="input-group-text">{{ ja_Status }}</span>
            <input type="text" class="form-control" v-model="Status" />
          </div>

          <div class="input-group">
            <span class="input-group-text">{{ ja_Content }}</span>
            <input type="text" class="form-control" v-model="JobContent" />
          </div>

        </div>
      </template>
    </input-modal-view>

    <!-- Employee Detail Modal -->
    <div class="modal fade" id="employeeJobModal">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ EmployeeTargetName }} {{ ja_Job }}
            </h5>
            <button id="modal-closeDetail-btn"
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
            </button>
          </div>

          <div class="modal-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>{{ ja_Employee }}</th>
                  <th>{{ ja_Content }}</th>
                  <th>{{ ja_DueDate }}</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dat in employeeJobs" :key="dat.jobId">
                  <td>{{ dat.employeeName }}</td>
                  <td>{{ dat.jobContent }}</td>
                  <td>{{ dat.dueDate }}</td>
                  <td>
                    <button class="btn btn-light me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#inputModal"
                            @click="editClick(dat)">
                      ✏️
                    </button>

                    <button class="btn btn-light"
                            @click="deleteJobClick(dat.jobId)">
                      🗑️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ja from "../locales/ja.json";
import InputModalView from "./InputModalView.vue";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  getTotalJobs,
  getEmployeeJobs,
  createJob,
  updateJob,
  deleteJob
} from "../api/jobs";

export default {
  components: { InputModalView },

  data() {
    return {
      ja_Job: ja.Job,
      ja_Employee: ja.Employee,
      ja_Department: ja.Department,
      ja_Content: ja.Content,
      ja_DueDate: ja.DueDate,
      ja_Status: ja.Status,
      ja_TotalJobs: ja.TotalJobs,

      jobs: [],
      employeeJobs: [],

      JobId: 0,
      EmployeeName: "",
      EmployeeTargetName: "",
      EmployeeDepartment: "",
      JobContent: "",
      DueDate: "",
      Status: "",

      modalTitle: ja.New,

      chartInstancePie: null,
      chartInstanceBar: null
    };
  },

  methods: {

    currentDate() {
      const d = new Date();
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    },

    addClick() {
      this.modalTitle = ja.New;
      this.JobId = 0;
      this.EmployeeName = "";
      this.EmployeeDepartment = "";
      this.JobContent = "";
      this.DueDate = this.currentDate();
      this.Status = ja.DefaultStatus;
    },

    async createClick() {
      try {
        await createJob({
          EmployeeName: this.EmployeeName,
          EmployeeDepartment: this.EmployeeDepartment,
          JobContent: this.JobContent,
          DueDate: this.DueDate,
          Status: this.Status
        });

        document.getElementById("modal-close-btn").click();
        this.refreshData();
      } catch (e) {
        alert("Create failed " + e);
      }
    },

    editClick(dat) {
      this.modalTitle = ja.Edit;
      this.JobId = dat.jobId;
      this.EmployeeName = dat.employeeName;
      this.EmployeeDepartment = dat.employeeDepartment;
      this.JobContent = dat.jobContent;
      this.DueDate = dat.dueDate;
      this.Status = dat.status;
    },

    async updateClick() {
      try {
        await updateJob({
          JobId: this.JobId,
          EmployeeName: this.EmployeeName,
          EmployeeDepartment: this.EmployeeDepartment,
          JobContent: this.JobContent,
          DueDate: this.DueDate,
          Status: this.Status
        });

        document.getElementById("modal-close-btn").click();
        this.refreshData();
      } catch (e) {
        alert("Update failed " + e);
      }
    },

    async deleteJobClick(id) {
      if (!confirm(ja.ConfirmDelete)) return;

      try {
        await deleteJob(id);
        document.getElementById("modal-closeDetail-btn").click();
        this.refreshData();
      } catch (e) {
        alert("Delete failed " + e);
      }
    },

    async getTargetEmployeeName(employeeName) {
      this.EmployeeTargetName = employeeName;
      this.employeeJobs = await getEmployeeJobs(employeeName);
    },

    async refreshData() {
      this.jobs = await getTotalJobs();
      this.renderCharts();
    },

    renderCharts() {
      const labels = this.jobs.map(j => j.employeeName);
      const data = this.jobs.map(j => j.jobContent);

      Chart.register(ChartDataLabels);

      // Destroy old charts before re-render
      if (this.chartInstancePie) this.chartInstancePie.destroy();
      if (this.chartInstanceBar) this.chartInstanceBar.destroy();

      // 🔥 Auto Generate Colors
      const generateColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
          const hue = Math.floor((360 / count) * i);
          colors.push(`hsl(${hue}, 70%, 55%)`);
        }
        return colors;
      };

      const dynamicColors = generateColors(data.length);

      // ======================
      // Doughnut Chart
      // ======================
      this.chartInstancePie = new Chart(
        document.getElementById("jobPieChart"),
        {
          type: "doughnut",
          data: {
            labels,
            datasets: [{
              data,
              backgroundColor: dynamicColors,
              borderWidth: 2,
              borderColor: "#fff"
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,

            animation: {
              duration: 1200,
              easing: "easeOutBounce"
            },

            plugins: {
              legend: {
                position: "bottom"
              },
              datalabels: {
                color: "#000",
                font: {
                  weight: "bold",
                  size: 14
                }
              }
            }
          }
        }
      );

      // ======================
      // Bar Chart
      // ======================
      this.chartInstanceBar = new Chart(
        document.getElementById("jobBarChart"),
        {
          type: "bar",
          data: {
            labels,
            datasets: [{
              label: "Total Jobs",
              data,
              backgroundColor: dynamicColors,
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,

            animation: {
              duration: 1400,
              easing: "easeOutElastic"
            },

            scales: {
              y: {
                beginAtZero: true
              }
            },

            plugins: {
              legend: {
                display: false
              }
            }
          }
        }
      );
    },

  mounted() {
    this.refreshData();

    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.modal-header {
  background-color: #cae4ba;
}
</style>