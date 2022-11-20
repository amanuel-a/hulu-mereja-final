<template>
<section id="hero">
    <v-parallax dark src="../assets/images/seven.jpg" height="250"> 
      <div class="text-center ">
        <a>
          <v-avatar color="grey lighten-3 mt-12 mb-3" size="100">
              <v-img :src="`https://backend.hulumereja.com/upload/images/${$store.state.user.imageUrl}`"></v-img>
          </v-avatar>
        </a>
      </div>
      <h2 class="text-center secondary--text">{{$store.state.user.fullName}}</h2>
    </v-parallax>
    <div class="white">
          <v-main >
            <v-container>
              <v-row>
                <v-col cols="12" sm="7" >
                  <v-sheet rounded="lg">
                    <h2 class="mt-7 ">Your profile</h2><br>
                    <p><strong>Name:</strong>{{$store.state.user.fullName}}</p>
                    <p><strong>Email:</strong> {{$store.state.user.email}}</p>
                    <p><strong>Status:</strong> {{$store.state.user.status}}</p>
                    <p><strong>Phone number:</strong> {{$store.state.user.phoneNumber}}</p>
                    <div v-if="$store.state.user.status==='freelancer'">
                    <p><strong>Job title:</strong>{{$store.state.user.title}}</p>
                    <p><strong>Job detail:</strong>{{$store.state.user.detail}}</p>
                    </div>
                    <div v-if="$store.state.user.isPaid==='paid'">
                    <p><strong>Remaining day to bid: </strong>{{tendRemaingDate}}</p>
                    <p class="mx-5 my-2 blue-grey--text">You can compete by looking at all the bids posted here for {{tendRemaingDate}} days</p>
                    </div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-sheet min-height="70vh" rounded="lg" >
                    <h3 class="mt-7 ">Your profile information is your identity.</h3>
                    <h4 >Please be sure to fill in your correct information.</h4>
                    <div class=" mt-4">
                      <span class="red--text" v-if="loginError">Make sure you fill the required filleds.</span>
                    </div>
                      <v-form enctype="multipart/form-data" class="white  pt-4 " autocomplete="off" v-model="checkValidity" >
                          <v-text-field outlined label="Full Name" v-model="fullName"  :rules="inputValidation"></v-text-field>
                          <v-text-field outlined label="Phone Number" v-model="phoneNumber" :rules="phoneValidation"></v-text-field>
                          <div v-if="$store.state.user.status==='freelancer'">
                          <v-select :items="titles" label="Title of your Job" v-model="title" :rules="inputValidation"></v-select>
                          <v-textarea label="Brief Description" v-model="detail" :rules="inputValidation"></v-textarea>
                          </div>
                          <div>Profile picture: <input class="ml-3" type="file" accept="image/*" ref="image" @change="selectFile" />
                          </div>
                          <div class="text-center mx-5 mt-4 mb-1">
                            <v-btn rounded block @click="updateInformation" class="btncolor white--text pl-15 pr-15">Update</v-btn>
                          </div>
                      </v-form>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-main>
        </div>
      <div  class="text-center blue darken-4 py-3" v-if="$store.state.user.status==='customer'">
        <h3>Do you want your profile information to be public?Please click the link below.</h3>
        <v-btn outlined rounded @click="more($store.state.user._id)" class="my-2">Be Freelancer</v-btn>
      </div>
      <div  class="text-center blue darken-4 py-3" v-if="$store.state.user.status==='freelancer' && active==='notActive'">
        <h3>Your profile information is not visible to others.Please make active your account.</h3>
        <v-btn outlined rounded @click="more($store.state.user._id)" class="my-2">make active</v-btn>
      </div>
      <br><br>
</section>
</template>
<script>
import freelancerProfile from "../service/authonticationService";
export default {
  data() {
    return {
        file: null,
        fullName: this.$store.state.user.fullName,
        phoneNumber:this.$store.state.user.phoneNumber,
        imageUrl:this.$store.state.user.imageUrl,
        title:this.$store.state.user.title,
        detail:this.$store.state.user.detail,
        tendRemaingDate:0,
        freeRemaingDate:0,
        checkValidity: false,
        previewImage: null,
        loading: false,
        active:"",
        titles:['Web development','Web programming','E-commerce','UI design',
          'Customer Service and Support','Technical support ','Phone Support','Other customer Service','Order Processing',
          'Desktop application','Game development','Software Plugins','Mobile applications','Application interface design','Software project Management',
          'Advertising','Email Marketing','Search engine Marketing','Social media Marketing','Public Relation','Telemarketing and telesales','Market research and surveys','Sales','Search engine Optimization',
          'Network Administration','Database Administration','Server Administration',
          'Technical Writing','Website Content','Blog and article Writing','Copywriting','Other-writing and Translation',
          'Accounting','HR/P','Finance service and planning','Legal','Project Manager','Business Consulting','Recruiting','Statistical Analysis',
          'Data entry','Personal Assistant','Web','Email response handling',
          'Graphic Design','Logo Design','Paint Design','3D Design','Audio Production','Video Production','Animation','Engineering and Technical Design' 
      ],
      inputValidation: [v => v.length >= 5 || "Minimum length is 5 characters"],
      phoneValidation: [
        input =>
          /^[+]{1}[0-9]{12,13}$/.test(input) ||
          "Invalid phone number. it contains country code and followed by phone number"
      ],
    };
  },
  mounted(){
      var currentTime=new Date();
      var expDate=new Date(this.$store.state.user.freeExpDate);
      var tendExpDate=new Date(this.$store.state.user.tendExpDate);

      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      this.tendRemaingDate=Math.floor((tendExpDate - currentTime) / _MS_PER_DAY)
      if(expDate>currentTime){
         this.active="active"
        }
      else{
         this.active="notActive"
        }
    },
  methods:{
    async more(gid){
           this.$router.push({ name: "beFreelancer",params:{id:gid} });
           window.scrollTo(0, 0);
    },
    selectFile() {
      this.file = this.$refs.image.files[0];
      const image = this.file;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
      };
    },
    async updateInformation() {
     this.loading=!this.loading
      window.scrollTo(0, 0);
      if (this.checkValidity) {
        if(this.previewImage != null){
          const formdata = new FormData();
          formdata.append("img", this.file);
          const imageResponse = await freelancerProfile.upload(formdata);
          this.imageUrl=imageResponse.data.imageUrl;
        }
        try {
          const response = await freelancerProfile.getProfileById(this.$store.state.user._id,{
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            imageUrl:this.imageUrl,
            title:this.title,
            detail:this.detail});
            if(response.data){
              this.$store.dispatch("setUser", null);
              this.$store.dispatch("setToken", null);
              this.$store.dispatch("setUser", response.data.user);
              this.$store.dispatch("setToken", response.data.token);
              location.reload();
            }
        } catch (err) {
          this.loginError = true;
        }
      }
      else{
       this.loginError = true;
       this.loading=false;
       window.scrollTo(0, 0);
      } 
    }
  
  }
};
</script>
<style scoped>
h2{
  color:#000080;
}
</style>