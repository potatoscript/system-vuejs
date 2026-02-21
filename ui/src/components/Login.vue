<script>
import ja from "../locales/ja.json";

const API_BASE =
  "https://system-vuejs.potatoscript-com.workers.dev/api";

export default {
  name: "Log-in",

  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",

      ja_Email: ja.Email,
      ja_Password: ja.Password,
      ja_Login: ja.Login,
      ja_Signup: ja.Signup,
    };
  },

  methods: {
    async Login() {
      this.errorMessage = "";

      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!res.ok) {
          this.errorMessage = "ログイン失敗しました";
          return;
        }

        const user = await res.json();

        // Save user object (NOT array)
        localStorage.setItem("user-info", JSON.stringify(user));

        this.$router.push({ name: "job" });

      } catch (err) {
        this.errorMessage = "サーバー接続エラー";
        console.error(err);
      }
    },
  },

  mounted() {
    const user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "job" });
    }
  },
};
</script>