<template>
  <img class="logo" src="../assets/signup.png" />
  <h1>{{ ja_Login }}</h1>
  <div class="login">
    <input type="text" v-model="email" :placeholder="ja_Email" />
    <input type="password" v-model="password" :placeholder="ja_Password" />
    <button v-on:click="Login">{{ ja_Login }}</button>
    <br /><br />
    <span>
      <router-link to="/signup">{{ ja_Signup }}</router-link>
    </span>
  </div>

  <div id="container">
    <div id="success-box">
      <div class="face">
        <div class="eye"></div>
        <div class="eye right"></div>
        <div class="mouth happy"></div>
      </div>
      <div class="shadow scale"></div>
    </div>
    <div id="error-box">
      <div class="face2">
        <div class="eye"></div>
        <div class="eye right"></div>
        <div class="mouth sad"></div>
      </div>
      <div class="shadow move"></div>
    </div>
    <div class="message">
      <h2 class="alert">
        ロックイン用の<b>メール</b>と<b>パスワード</b>として" test
        "を使用してください
      </h2>
      <br />
      <a target="_blank" href="https://github.com/potatoscript/system-vuejs"
        >source code</a
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ja from "../locales/ja.json";
import dummy from "../assets/dummy.json";
export default {
  name: "Log-in",
  data() {
    return {
      email: "",
      password: "",
      ja_Email: ja.Email,
      ja_Password: ja.Password,
      ja_Name: ja.Name,
      ja_Login: ja.Login,
      ja_Signup: ja.Signup,
    };
  },
  methods: {
    async Login() {
      await axios
        .get(
          `http://localhost:3000/user?email=${this.email}&password=${this.password}`
        )
        .then((response) => {
          console.warn(response);
          if (response.status == 200 && response.data.length > 0) {
            localStorage.setItem("user-info", JSON.stringify(response.data));
            this.$router.push({ name: "job" });
          }
        })
        .catch((error) => {
          console.log(error);
          // 接続がない場合、ダミーデータが使用されます
          dummy[0].user.forEach((e) => {
            if (e.email == this.email && e.password == this.password) {
              localStorage.setItem("user-info", JSON.stringify(dummy[0].user));
              this.$router.push({ name: "job" });
            }
          });
        });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "job" });
    }
  },
};
</script>
<style scoped>
body {
  display: grid;
  overflow: hidden;
  font-family: $font;
  text-transform: uppercase;
  text-align: center;
}

#container {
  position: relative;
  margin: auto;
  overflow: hidden;
  width: 700px;
  height: 250px;
}

h2 {
  font-size: 0.9em;
  font-weight: normal;
  letter-spacing: 3px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.green {
  color: darken(green, 20%);
}

.red {
  color: darken(red, 10%);
}

.alert {
  font-weight: 700;
  letter-spacing: 5px;
}

p {
  margin-top: -5px;
  font-size: 0.5em;
  font-weight: 100;
  color: darken(#777777, 10%);
  letter-spacing: 1px;
}

button,
.dot {
  cursor: pointer;
}

#success-box {
  position: absolute;
  width: 35%;
  height: 100%;
  left: 12%;
  background: linear-gradient(to bottom right, #ffffff 40%, #ffffff 100%);
  border-radius: 20px;
  box-shadow: 5px 5px 20px rgba($gray, 10%);
  perspective: 40px;
}

#error-box {
  position: absolute;
  width: 35%;
  height: 100%;
  right: 12%;
  background: linear-gradient(to bottom left, #ffffff 40%, #ffffff 100%);
  border-radius: 20px;
  box-shadow: 5px 5px 20px rgba(#cbcdd3, 10%);
}

.two {
  right: 12%;
  opacity: 0.5;
}

.face {
  position: absolute;
  width: 22%;
  height: 22%;
  background: #ffffff;
  border-radius: 50%;
  border: 1px solid #777777;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: bounce 1s ease-in infinite;
}

.face2 {
  position: absolute;
  width: 22%;
  height: 22%;
  background: #ffffff;
  border-radius: 50%;
  border: 1px solid #777777;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: roll 5s ease-in-out infinite;
}

.eye {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #777777;
  border-radius: 50%;
  top: 40%;
  left: 20%;
}

.right {
  left: 68%;
}

.mouth {
  position: absolute;
  top: 43%;
  left: 41%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.happy {
  border: 2px solid;
  border-color: transparent #777777 #777777 transparent;
  transform: rotate(45deg);
}

.sad {
  top: 49%;
  border: 2px solid;
  border-color: #777777 transparent transparent #777777;
  transform: rotate(45deg);
}

.shadow {
  position: absolute;
  width: 23%;
  height: 3%;
  opacity: 0.5;
  background: #777777;
  left: 40%;
  top: 43%;
  border-radius: 50%;
  z-index: 1;
}

.scale {
  animation: scale 1s ease-in infinite;
}
.move {
  animation: move 5s ease-in-out infinite;
}

.message {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 40%;
  top: 47%;
}

.button-box {
  position: absolute;
  background: #ffffff;
  width: 50%;
  height: 15%;
  border-radius: 20px;
  top: 73%;
  left: 25%;
  outline: 0;
  border: none;
  box-shadow: 2px 2px 10px rgba(#777777, 0.5);
  transition: all 0.5s ease-in-out;
  &:hover {
    background: darken(#ffffff, 5%);
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
}

@keyframes bounce {
  50% {
    transform: translateY(-10px);
  }
}

@keyframes scale {
  50% {
    transform: scale(0.9);
  }
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
    left: 25%;
  }
  50% {
    left: 60%;
    transform: rotate(168deg);
  }
  100% {
    transform: rotate(0deg);
    left: 25%;
  }
}

@keyframes move {
  0% {
    left: 25%;
  }
  50% {
    left: 60%;
  }
  100% {
    left: 25%;
  }
}
</style>
