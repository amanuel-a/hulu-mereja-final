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
                          src="../assets/images/promotion.png"
                          height="350px" width="380px"
                        ></v-img> 
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="6" >
                      <v-card flat class="px-3">
                        <v-card-text >
                            <h1 class="text-center display-1  secondary--text">Add a promotion</h1>
                            <v-form enctype="multipart/form-data" class="white  pt-4 ">
                              <v-layout row wrap>
                              <div class="text-center mt-4">
                               <span class="red--text" v-if="loginError">{{loginErrorMessage}}</span>
                              </div>
                                <v-flex xs10 md11>
                                  <v-text-field placeholder="Month"  v-model="month"></v-text-field>
                                </v-flex>
                                <v-flex>
                                 <strong>Upload the photo:</strong> <input type="file" accept="image/*" ref="image" @change="selectFile" />
                                </v-flex>
                              </v-layout>
                              <br><br>
                              <div class="text-center mt-1">
                                <v-btn rounded outlined="" block @click="addPromotion" :loading="loading" class="secondary white--text pl-15 pr-15">Promote</v-btn>
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
import promote from "../service/authonticationService";
export default {
  data() {
    return {
      file: null,
      expDate: "",
      month:0,
      loading:false,
      previewImage:null,
      loginError:false,
      imageUrl:""
    };
  },
  methods: { 
    selectFile() {
      this.file = this.$refs.image.files[0];
      const image = this.file;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
      };
    },
    async addPromotion() {
      if (this.month == 0 || this.previewImage==null){
        this.loginError = true;
        this.loginErrorMessage="Please fill all the requirements";
      }
      else {
          const formdata = new FormData();
          formdata.append("img", this.file);
          const imageResponse = await promote.upload(formdata);
          this.imageUrl=imageResponse.data.imageUrl;

          var someDate=new Date().toISOString().substr(0, 10);
          var dateObject = new Date(someDate),
          day = dateObject.getDate(); // returns day of the month number
          dateObject.setHours(20);
          dateObject.setMonth(dateObject.getMonth() + this.month + 1, 0);
          dateObject.setDate(Math.min(day, dateObject.getDate()));
          const response = await promote.promotion({expDate: dateObject.toISOString().split('T')[0],imageUrl: this.imageUrl });
          if (response.error)
          {
            this.loading=false;
            this.loginError = true;
            this.loginErrorMessage=response.data.message;
          } 
          else {
            this.$router.push({ name: "jobs" });
            window.scrollTo(0, 0);
            this.loading=false;            
          }
      }
    },

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