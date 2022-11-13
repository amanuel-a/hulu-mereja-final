<template>
  <div style="margin-top: 12rem; margin-bottom: 8rem" class="grandWrapper">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <div
      :class="{
        container: true,
        'right-panel-active': rightPanel,
      }"
      id="container"
    >
      <div class="form-container sign-up-container">
        <form @submit.prevent="userRegistration">
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Phone number" />
          <input type="password" placeholder="Password" />
          <a
            href="/#/auth"
            @click="() => (rightPanel = false)"
            class="hidden-action"
            >Already have an account? sign-in</a
          >
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="userLogin">
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <a
            href="/#/auth"
            @click="() => (rightPanel = true)"
            class="hidden-action"
            >Don't have an account? register</a
          >
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              class="ghost"
              id="signIn"
              @click="() => (rightPanel = false)"
            >
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              class="ghost"
              id="signUp"
              @click="() => (rightPanel = true)"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authonticationService from "../service/authonticationService";
export default {
  name: "Auth",
  data() {
    return {
      rightPanel: false,
      password: "",
      loginError: false,
      loginErrorMessage: "",
      email: "",
      checkValidity: false,
      type: "password",
      toolTip: "Show password",
      loading: false,
      inputValidation: [
        (v) => v.length >= 5 || "Minimum length is 5 characters",
      ],
    };
  },

  methods: {
    showHidePassword() {
      if (this.type == "password") {
        this.type = "text";
        this.toolTip = "Hide password";
      } else {
        this.type = "password";
        this.toolTip = "Show password";
      }
    },

    async userLogin(e) {
      // this.loading = true;
      const response = await authonticationService.userLogin({
        email: e.target[0].value,
        password: e.target[1].value,
      });
      if (response.data.error) {
        // this.loading = false;
        // this.loginError = true;
        // this.loginErrorMessage = response.data.message;
        console.log(response.data.message);
      } else {
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setToken", response.data.token);
        this.$router.push({ name: "jobs" });
        window.scrollTo(0, 0);
        // this.loading = false;
      }
    },

    async userRegistration(e) {
      try {
        const response = await authonticationService.userRegisteration({
          fullName: e.target[0].value,
          email: e.target[1].value,
          phoneNumber: e.target[2].value,
          password: e.target[3].value,
          imageUrl: "backImage.jpg",
        });

        if (response.data) {
          // this.loading=!this.loading
          this.rightPanel = false;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async gotoSignup() {
      this.$router.push({ name: "userRegistrationPage" });
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#1f9ccd, #ff738b);
  left: -80px;
  top: -40px;
}
.shape:last-child {
  background: linear-gradient(to right, #ff493d, #ff7369);
  right: -30px;
  bottom: -80px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #1f9ccd;
  background-color: #1f9ccd;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #1f9ccd, #ff416c);
  background: linear-gradient(to right, #1f9ccd, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}

.hidden-action {
  display: none;
}

@media screen and (max-width: 720px) {
  .grandWrapper {
    width: 100%;
  }
  .background {
    width: 100%;
  }
  .hidden-action {
    display: block;
  }
  .overlay-container {
    display: none;
  }
  .sign-in-container,
  .sign-up-container {
    width: 100%;
  }
  .container.right-panel-active .sign-up-container {
    transform: translateX(0);
  }
  form {
    padding: 0 15px;
  }
  .shape:first-child {
    left: 50px;
  }
  .shape:last-child {
    right: 80px;
  }
}
</style>