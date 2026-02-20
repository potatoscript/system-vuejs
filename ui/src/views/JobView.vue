<template>
  <div class="justify-content-center mx-5">

    <!-- Header -->
    <div class="input-group mb-3">
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

    <!-- Jobs Summary Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>{{ ja_Employee }}</th>
          <th>{{ ja_TotalJobs }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobs" :key="job.employeeName">
          <td>{{ job.employeeName }}</td>
          <td>{{ job.total }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Charts -->
    <div style="max-width:400px;height:300px;margin:auto">
      <canvas id="jobPieChart"></canvas>
    </div>

    <div style="max-width:600px;height:350px;margin:auto">
      <canvas id="jobBarChart"></canvas>
    </div>

    <!-- Modal -->
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
            <input type="text" class="form-control" v-model="EmployeeName"/>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">{{ ja_Content }}</span>
            <input type="text" class="form-control" v-model="JobContent"/>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">{{ ja_DueDate }}</span>
            <input type="date" class="form-control" v-model="DueDate"/>
          </div>

        </div>
      </template>
    </input-modal-view>

  </div>
</template>

<script>
import ja from "../locales/ja.json"
import InputModalView from "./InputModalView.vue"
import Chart from "chart.js/auto"

import {
  getJobsSummary,
  createJob,
  updateJob,
  deleteJob
} from "../api/jobs"

let pieChart = null
let barChart = null

export default {
  components: { InputModalView },

  data() {
    return {
      jobs: [],
      JobId: 0,
      EmployeeName: "",
      JobContent: "",
      DueDate: "",
      modalTitle: "",

      ja_Job: ja.Job,
      ja_Employee: ja.Employee,
      ja_Content: ja.Content,
      ja_DueDate: ja.DueDate,
      ja_TotalJobs: ja.TotalJobs,
      ja_New: ja.New,
      ja_Edit: ja.Edit
    }
  },

  methods: {

    // =====================
    // Load Jobs Summary
    // =====================
    async refreshData() {
      try {
        this.jobs = await getJobsSummary()
        this.renderCharts()
      } catch (err) {
        alert("Failed to load jobs: " + err)
      }
    },

    // =====================
    // Add Button
    // =====================
    addClick() {
      this.modalTitle = this.ja_New
      this.JobId = 0
      this.EmployeeName = ""
      this.JobContent = ""
      this.DueDate = new Date().toISOString().split("T")[0]
    },

    // =====================
    // Create
    // =====================
    async createClick() {
      try {
        await createJob({
          employeeName: this.EmployeeName,
          jobContent: this.JobContent,
          dueDate: this.DueDate
        })

        document.getElementById("modal-close-btn").click()
        this.refreshData()
      } catch (err) {
        alert("Create failed: " + err)
      }
    },

    // =====================
    // Update
    // =====================
    async updateClick() {
      try {
        await updateJob(this.JobId, {
          employeeName: this.EmployeeName,
          jobContent: this.JobContent,
          dueDate: this.DueDate
        })

        document.getElementById("modal-close-btn").click()
        this.refreshData()
      } catch (err) {
        alert("Update failed: " + err)
      }
    },

    // =====================
    // Delete
    // =====================
    async deleteClick(id) {
      if (!confirm("Delete this job?")) return

      try {
        await deleteJob(id)
        this.refreshData()
      } catch (err) {
        alert("Delete failed: " + err)
      }
    },

    // =====================
    // Charts
    // =====================
    renderCharts() {
      const labels = this.jobs.map(j => j.employeeName)
      const values = this.jobs.map(j => j.total)

      if (pieChart) pieChart.destroy()
      if (barChart) barChart.destroy()

      // Pie Chart
      const ctxPie = document.getElementById("jobPieChart")
      pieChart = new Chart(ctxPie, {
        type: "doughnut",
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: [
              "#4CAF50",
              "#2196F3",
              "#FF9800",
              "#9C27B0",
              "#F44336",
              "#00BCD4"
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })

      // Bar Chart
      const ctxBar = document.getElementById("jobBarChart")
      barChart = new Chart(ctxBar, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Total Jobs",
            data: values,
            backgroundColor: "#42A5F5"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }

  },

  mounted() {
    this.refreshData()
  }
}
</script>

<style scoped>
.modal-header {
  background-color: #cae4ba;
}
</style>