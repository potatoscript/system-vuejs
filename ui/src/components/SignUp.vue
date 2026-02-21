<template>
  <div class="signup-container">
    <img class="logo" src="../assets/signup.png" />
    <h1>サインアップ</h1>

    <div class="register">
      <input
        type="text"
        v-model="name"
        :placeholder="ja_Name"
      />

      <input
        type="email"
        v-model="email"
        :placeholder="ja_Email"
      />

      <input
        type="password"
        v-model="password"
        :placeholder="ja_Password"
      />

      <button @click="SignUp">
        {{ ja_Signup }}
      </button>

      <p>
        <router-link to="/login">
          {{ ja_Login }}
        </router-link>
      </p>

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import ja from "../locales/ja.json";

const API_BASE =
  "https://system-vuejs.potatoscript-com.workers.dev/api";

export default {
  name: "SignUp",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: "",

      ja_Email: ja.Email,
      ja_Password: ja.Password,
      ja_Name: ja.Name,
      ja_Login: ja.Login,
      ja_Signup: ja.Signup
    };
  },

  methods: {
    async SignUp() {
      this.errorMessage = "";

      if (!this.name || !this.email || !this.password) {
        this.errorMessage = "All fields are required.";
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          this.errorMessage = data.error || "Signup failed";
          return;
        }

        // Save login session
        localStorage.setItem(
          "user-info",
          JSON.stringify(data)
        );

        this.$router.push({ name: "job" });

      } catch (err) {
        this.errorMessage = "Server error. Please try again.";
      }
    }
  },

  mounted() {
    const user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "job" });
    }
  }
};
</script>

<style scoped>
.signup-container {
  text-align: center;
  margin-top: 50px;
}

.logo {
  width: 120px;
  margin-bottom: 20px;
}

.register {
  width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.register input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.register button {
  padding: 10px;
  border-radius: 6px;
  border: none;
  background-color: #a8d8b9;
  cursor: pointer;
  transition: 0.3s;
}

.register button:hover {
  background-color: #7cc7a1;
}

.error {
  color: red;
  font-size: 14px;
}
</style>