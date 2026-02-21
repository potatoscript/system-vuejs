<template>
  <div class="p-3">
    <Header v-if="showHeader" :name="name" />
    <router-view />
  </div>
</template>
<script>
import ja from "./locales/ja.json";
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      showHeader: false,
      ja_Title: ja.Title,
      ja_Master: ja.Master,
      ja_Job: ja.Job,
      ja_Signup: ja.Signup,
      ja_Login: ja.Login,
      name: "",
    };
  },
  watch: {
    $route() {
      const user = localStorage.getItem("user-info");
      this.showHeader = false;

      if (user) {
        const parsedUser = JSON.parse(user);

        // if backend returns array
        if (Array.isArray(parsedUser)) {
          this.name = parsedUser[0]?.name || "";
        } 
        // if backend returns object (Cloudflare Worker case)
        else {
          this.name = parsedUser?.name || "";
        }

        this.showHeader = true;
      }
    },
  },
};
</script>

<style>
.collapeMenu {
  position: relative;
}
#app {
  text-align: center;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}
#nav a.router-link-exact-active {
  color: white;
  background: crimson;
}
.logo {
  width: 100px;
}
.register input,
.login input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
.register button,
.login button {
  width: 320px;
  height: 40px;
  border: 1px solid skyblue;
  background-color: skyblue;
  color: #ffffff;
  cursor: pointer;
}
</style>
