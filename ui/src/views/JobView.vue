<template>
  <div class="justify-content-center mx-5">
    <!-- Header -->
    <div class="input-group">
      <button
        type="button"
        class="btn btn-primary m-2 fload-end"
        data-bs-toggle="modal"
        data-bs-target="#inputModal"
        @click="addClick"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-plus-square" viewBox="0 0 16 16">
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </button>
      <div class="mx-3 pt-2">
        <h4>{{ ja_Job }}</h4>
      </div>
    </div>

    <!-- Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>{{ ja_Employee }}</th>
          <th>{{ ja_Department }}</th>
          <th>{{ ja_TotalJobs }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dat in jobs" :key="dat.jobId" @click="openEmployeeJobsModal(dat.employeeName)"
          data-bs-toggle="modal" data-bs-target="#employeeJobModal">
          <td>{{ dat.employeeName }}</td>
          <td>{{ dat.employeeDepartment }}</td>
          <td>{{ dat.jobContent }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Charts -->
    <canvas id="jobPieChart" width="200" height="200"></canvas>
    <canvas id="jobBarChart" height="200"></canvas>

    <!-- Job Modal -->
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
            <select class="form-control" v-model="EmployeeNameSelect" @change="setDepartment">
              <option value="-" selected>-</option>
              <option v-for="option in employeeList" :key="option.employeeId"
                :value="option.name + '_' + option.department">
                {{ option.name }}
              </option>
            </select>
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

    <!-- Employee Jobs Modal -->
    <div class="modal fade" id="employeeJobModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ EmployeeTargetName }} {{ ja_Job }}</h5>
            <button id="modal-closeDetail-btn" type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>{{ ja_Employee }}</th>
                  <th>{{ ja_Content }}</th>
                  <th>{{ ja_DueDate }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dat in employeeJobs" :key="dat.jobId">
                  <td>{{ dat.employeeName }}</td>
                  <td>{{ dat.jobContent }}</td>
                  <td>{{ dat.dueDate }}</td>
                  <td>
                    <button type="button" class="btn btn-light mr-1" data-bs-toggle="modal"
                      data-bs-target="#inputModal" @click="editClick(dat)">✏️</button>
                    <button type="button" class="btn btn-light mr-1" @click="deleteClick(dat.jobId)">🗑️</button>
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
import {
  getTotalJobs,
  getEmployeeJobs,
  createJob,
  updateJob,
  deleteJob
} from "../api/jobs";
import dummy from "../assets/dummy.json";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
      modalTitle: ja.New,
      employeeList: [],
      jobs: [],
      employeeJobs: [],
      JobId: 0,
      EmployeeName: "-",
      EmployeeTargetName: "-",
      EmployeeNameSelect: "-_-",
      EmployeeDepartment: "-",
      JobContent: "-",
      DueDate: this.currentDate(),
      Status: ja.DefaultStatus,
      chartLabels: [],
      chartData: []
    };
  },
  methods: {
    currentDate() {
      const c = new Date();
      return `${c.getFullYear()}-${c.getMonth()+1}-${c.getDate()}`;
    },
    async addClick() {
      this.modalTitle = ja.New;
      this.JobId = 0;
      this.EmployeeName = "-";
      this.EmployeeDepartment = "-";
      this.JobContent = "-";
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
      } catch (e) { alert("Create failed: " + e); }
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
      } catch (e) { alert("Update failed: " + e); }
    },
    async deleteClick(id) {
      if (!confirm(ja.ConfirmDelete)) return;
      try {
        await deleteJob(id);
        document.getElementById("modal-closeDetail-btn").click();
        this.refreshData();
      } catch (e) { alert("Delete failed: " + e); }
    },
    async refreshData() {
      try {
        this.jobs = await getTotalJobs();
      } catch (e) {
        console.log(e);
        this.jobs = dummy[0].jobscount;
      }
      this.createCharts();
    },
    async openEmployeeJobsModal(employeeName) {
      this.EmployeeTargetName = employeeName;
      try {
        this.employeeJobs = await getEmployeeJobs(employeeName);
      } catch (e) {
        console.log(e);
        this.employeeJobs = dummy[0].jobs.filter(e => e.employeeName === employeeName);
      }
    },
    setDepartment() {
      const val = this.EmployeeNameSelect.split("_");
      this.EmployeeName = val[0];
      this.EmployeeDepartment = val[1];
    },
    editClick(dat) {
      this.modalTitle = ja.Edit;
      this.JobId = dat.jobId;
      this.EmployeeName = dat.employeeName;
      this.EmployeeNameSelect = dat.employeeName + "_" + dat.employeeDepartment;
      this.EmployeeDepartment = dat.employeeDepartment;
      this.JobContent = dat.jobContent;
      this.DueDate = dat.dueDate;
      this.Status = dat.status;
    },
    createCharts() {
      this.chartLabels = this.jobs.map(j => j.employeeName);
      this.chartData = this.jobs.map(j => j.jobContent);

      const colors = ["pink", "lightyellow", "lightblue", "lightgreen"];
      const pieCtx = document.getElementById("jobPieChart");
      const barCtx = document.getElementById("jobBarChart");

      new Chart(pieCtx, {
        type: "doughnut",
        data: { labels: this.chartLabels, datasets: [{ label: "Jobs", data: this.chartData, backgroundColor: colors, borderColor: "black", borderWidth: 1 }] },
        options: { responsive: true, plugins: { datalabels: { color: "black", font: { weight: "bold", size: 16 } } } },
        plugins: [ChartDataLabels]
      });

      new Chart(barCtx, {
        type: "bar",
        data: { labels: this.chartLabels, datasets: [{ label: ja.Case, data: this.chartData, backgroundColor: colors, borderColor: "black", borderWidth: 1 }] },
        options: { responsive: true, plugins: { datalabels: { color: "black", font: { weight: "bold", size: 16 } } } },
        plugins: [ChartDataLabels]
      });
    }
  },
  mounted() {
    this.refreshData();
    let user = localStorage.getItem("user-info");
    if (!user) this.$router.push({ name: "login" });
  }
};
</script>

<style scoped>
.modal-header {
  background-color: #cae4ba;
}
</style>