<template>
  <div class="text-center mt-12">
    <br /><br /><br />
    <v-container class="fill-height" fluid>
      <v-row no-gutters>
        <v-col sm="8" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>Update your profile to be freelancer</v-card-title>
            <v-divider></v-divider>
            <div class="text-center mt-4">
              <span class="red--text" v-if="loginError"
                >Make sure you fill the required filleds.</span
              >
            </div>
            <v-form
              enctype="multipart/form-data"
              class="white pt-4"
              autocomplete="off"
              v-model="checkValidity"
            >
              <v-text-field
                label="Full Name"
                v-model="fullName"
                :rules="inputValidation"
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="email"
                disabled
              ></v-text-field>
              <v-text-field
                label="Phone Number"
                v-model="phoneNumber"
                :rules="phoneValidation"
              ></v-text-field>
              <v-select
                :items="titles"
                label="Title of your Job"
                v-model="title"
                :rules="inputValidation"
              ></v-select>
              <v-textarea
                label="Brief Description"
                v-model="detail"
                :rules="inputValidation"
              ></v-textarea>
              <div>
                Upload your receipt of payment:<input
                  type="file"
                  accept="image/*"
                  ref="image"
                  @change="selectFile"
                />
              </div>
              <div class="text-center mx-5 my-5">
                <v-btn
                  rounded
                  outlined=""
                  @click="be_freelancer"
                  :loading="loading"
                  class="secondary white--text pl-15 pr-15"
                  >Request</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>

      <br /><br /><br />
    </v-container>
  </div>
</template>
<script>
import freelancerProfile from "../service/authonticationService";
export default {
  data() {
    return {
      file: null,
      fullName: this.$store.state.user.fullName,
      email: this.$store.state.user.email,
      phoneNumber: this.$store.state.user.phoneNumber,
      userName: "",
      status: this.$store.state.user.status,
      isActive: "",
      title: this.$store.state.user.title,
      billingImage: "",
      detail: this.$store.state.user.detail,
      password: "",
      checkValidity: false,
      previewImage: null,
      loading: false,
      titles: [
        "Web development",
        "Web programming",
        "E-commerce",
        "UI design",
        "Customer Service and Support",
        "Technical support ",
        "Phone Support",
        "Other customer Service",
        "Order Processing",
        "Desktop application",
        "Game development",
        "Software Plugins",
        "Mobile applications",
        "Application interface design",
        "Software project Management",
        "Advertising",
        "Email Marketing",
        "Search engine Marketing",
        "Social media Marketing",
        "Public Relation",
        "Telemarketing and telesales",
        "Market research and surveys",
        "Sales",
        "Search engine Optimization",
        "Network Administration",
        "Database Administration",
        "Server Administration",
        "Technical Writing",
        "Website Content",
        "Blog and article Writing",
        "Copywriting",
        "Other-writing and Translation",
        "Accounting",
        "HR/P",
        "Finance service and planning",
        "Legal",
        "Project Manager",
        "Business Consulting",
        "Recruiting",
        "Statistical Analysis",
        "Data entry",
        "Personal Assistant",
        "Web",
        "Email response handling",
        "Graphic Design",
        "Logo Design",
        "Paint Design",
        "3D Design",
        "Audio Production",
        "Video Production",
        "Animation",
        "Engineering and Technical Design",
      ],
      inputValidation: [
        (v) => v.length >= 5 || "Minimum length is 5 characters",
      ],
      phoneValidation: [
        (input) =>
          /^[+]{1}[0-9]{12,13}$/.test(input) ||
          "Invalid phone number. it contains country code and followed by phone number",
      ],
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.image.files[0];
      const image = this.file;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
    async be_freelancer() {
      this.loading = !this.loading;
      if (this.checkValidity && this.previewImage != null) {
        const formdata = new FormData();
        formdata.append("img", this.file);
        try {
          var someDate = new Date();
          var dd = someDate.getDate();
          var mm = someDate.getMonth();
          var yy = someDate.getFullYear();
          const imageResponse = await freelancerProfile.upload(formdata);
          const response = await freelancerProfile.getProfileById(
            this.$route.params.id,
            {
              fullName: this.fullName,
              email: this.email,
              phoneNumber: this.phoneNumber,
              title: this.title,
              detail: this.detail,
            }
          );
          if (response.data) {
            const response = await freelancerProfile.addPayment({
              fullName: this.fullName,
              email: this.email,
              phoneNumber: this.phoneNumber,
              userId: this.$store.state.user._id,
              profilePicture: this.$store.state.user.imageUrl,
              expDate: dd + "/" + mm + "/" + yy,
              paymentType: "freelancer",
              paymentImage: imageResponse.data.imageUrl,
            });
            response.data;
          }
          this.loading = !this.loading;
          this.loginError = false;
          this.$store.dispatch("setUser", null);
          this.$store.dispatch("setToken", null);
          this.$router.push({ name: "auth" });
          window.scrollTo(0, 0);
        } catch (err) {
          this.loginError = true;
        }
      } else {
        this.loginError = true;
        this.loading = false;
        window.scrollTo(0, 0);
      }
    },
  },
};
</script>