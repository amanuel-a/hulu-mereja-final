<template>
    <div class="text-center mb-7">
       <div class="mt-7">
          <br><br>  
        </div>  
        <v-row align="center" justify="center" class="mx-1">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12 ">
               <v-window>
                  <v-window-item>
                    <v-row align="center" justify="center">
                      <v-col cols="12" md="6" class="hidden-sm-and-down">
                       <v-card flat> 
                         <v-img
                          src="../assets/images/icon.png"
                          height="350px" width="380px"
                        ></v-img> 
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="6" >
                      <v-card flat class="px-3">
                        <v-card-text >
                            <h1 class="text-center display-2  secondary--text">Welcome</h1>
                            <v-form enctype="multipart/form-data" class="white  pt-4 ">
                              <v-layout row wrap>
                              <div class="text-center mt-4">
                               <span class="red--text" v-if="loginError">{{loginErrorMessage}}</span>
                              </div>
                                <v-flex xs10 md11>
                                  <v-text-field label="Email"  v-model="email"></v-text-field>
                                </v-flex>
                                <v-flex xs10 md11>
                                  <v-text-field label="Password" :type="type" v-model="password"></v-text-field>
                                </v-flex>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <a class="mt-6" v-on="on" @click="showHidePassword">
                                      <v-icon id="showHidePassword">mdi-eye-outline</v-icon>
                                    </a>
                                  </template>
                                  <span>{{toolTip}}</span>
                                </v-tooltip>
                                <div class="mt-5">New user?<v-btn text @click="gotoSignup()"><span class="text-capitalize secondary--text">Create Account</span> </v-btn> </div> 
                                <v-spacer></v-spacer>  
                                <div class="mt-5"><v-btn text><span class="text-capitalize secondary--text" >Forgot password?</span></v-btn></div>    
                              </v-layout>
                              <br><br>
                              <div class="text-center mt-1">
                                <v-btn rounded outlined="" block @click="userLogin" :loading="loading" class="secondary white--text pl-15 pr-15">sign in</v-btn>
                              </div><br>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-window-item>
               </v-window>
            </v-card>
          </v-col>
        </v-row>
      <br><br>
    </div> 
</template>
<script>
import authonticationService from "../service/authonticationService";
export default {
  data() {
    return {
      password: "",
      loginError: false,
      loginErrorMessage:"",
      email: "",
      checkValidity: false,
      type: "password",
      toolTip: "Show password",
      loading:false,
      inputValidation: [v => v.length >= 5 || "Minimum length is 5 characters"],
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
    async userLogin() {
      if (this.email == "" || this.password == ""){
        this.loginError = true;
        this.loginErrorMessage="Please fill all the requirements";
      }
      else {
         this.loading=true;
          const response = await authonticationService.userLogin({email: this.email,password: this.password });
          if (response.data.error)
          {
            this.loading=false;
            this.loginError = true;
            this.loginErrorMessage=response.data.message;
          } 
          else {
            this.$store.dispatch("setUser", response.data.user);
            this.$store.dispatch("setToken", response.data.token);
            this.$router.push({ name: "jobs" });
            window.scrollTo(0, 0);
            this.loading=false;            
          }
      }
    },
 async gotoSignup(){
     this.$router.push({ name: "userRegistrationPage" });
     window.scrollTo(0, 0);
 }
      }
};
</script>
<style scoped>
#loginPageLayout {
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  max-width: 600px;
  margin: auto;
}
#adminLoginForm {
  font-family: sans-serif;
}
#helpBtn {
  float: right;
  clear: right;
}
#showHidePassword:hover {
  color: rgb(59, 59, 241);
}
</style>