<template>
  <v-container align="center" justify="center" class="description">
    <br /><br /><br /><br />
    <p class="secondary--text text-center display-1">Payment required</p>
    <h2 class="text-center">
      Get what you want by choosing from the available payment options.
    </h2>
    <br />
    <v-row>
      <v-col cols="12" sm="10">
        <v-sheet rounded="lg">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1"
                >Choose your payment option</v-stepper-step
              >
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2"
                >Upload payment receipt!</v-stepper-step
              >
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-layout wrap>
                  <v-flex class="mx-3 my-3">
                    <v-card class="grey py-6">
                      <h2 class="text-center secondary--text">
                        1 year subscription
                      </h2>
                    </v-card>
                    <v-card class="white py-4">
                      <h2 class="text-center mb-5">
                        <strong>ETB 1850</strong>
                      </h2>
                      <p class="text-center">un limited tender access</p>
                      <p class="text-center">Access from pc and mobile</p>
                      <p class="text-center">Daily alert via email</p>
                      <p class="text-center">SMS alert</p>
                      <p class="text-center">Telegram alert</p>
                      <p class="text-center">Phone and email support</p>
                      <div class="text-xs-center secondary">
                        <v-btn text @click="e1 = 2" block
                          ><span class="text-capitalize white--text"
                            >Get Started</span
                          ></v-btn
                        >
                      </div>
                    </v-card>
                  </v-flex>
                  <v-flex class="mx-3 my-3">
                    <v-card class="grey py-6">
                      <h2 class="text-center secondary--text">
                        6 month subscription
                      </h2>
                    </v-card>
                    <v-card class="white py-4">
                      <h2 class="text-center mb-5">
                        <strong>1200 ETB </strong>
                      </h2>
                      <p class="text-center">un limited tender access</p>
                      <p class="text-center">Access from pc and mobile</p>
                      <p class="text-center">Daily alert via email</p>
                      <p class="text-center">SMS alert</p>
                      <p class="text-center">Telegram alert</p>
                      <p class="text-center">Phone and email support</p>
                      <div class="text-xs-center secondary">
                        <v-btn text @click="e1 = 2" block
                          ><span class="text-capitalize white--text"
                            >Get Started</span
                          ></v-btn
                        >
                      </div>
                    </v-card>
                  </v-flex>
                  <v-flex class="mx-3">
                    <v-card class="grey py-6">
                      <h2 class="text-center secondary--text">
                        3 month subscription
                      </h2>
                    </v-card>
                    <v-card class="white py-4">
                      <h2 class="text-center mb-5">
                        <strong>600 ETB </strong>
                      </h2>
                      <p class="text-center">un limited tender access</p>
                      <p class="text-center">Access from pc and mobile</p>
                      <p class="text-center">Daily alert via email</p>
                      <p class="text-center">SMS alert</p>
                      <p class="text-center">Telegram alert</p>
                      <p class="text-center">Phone and email support</p>
                      <div class="text-xs-center secondary">
                        <v-btn text @click="e1 = 2" block
                          ><span class="text-capitalize white--text"
                            >Get Started</span
                          ></v-btn
                        >
                      </div>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card class="mx-3 my-3">
                  <br />
                  <h2 class="secondary--text text-center">
                    Send us your payment receipt!
                  </h2>
                  <br /><v-flex xs10 md11
                    ><strong>Upload:</strong>
                    <input
                      type="file"
                      accept="image/*"
                      ref="image"
                      @change="selectFile"
                    /> </v-flex
                  ><br />
                  <div class="text-center mx-12 my-3">
                    <v-btn
                      rounded
                      @click="paymentMethod"
                      class="secondary white--text px-12"
                      >Send</v-btn
                    >
                  </div>
                  <br />
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" class="px-1 py-1"> </v-sheet>
      </v-col>
    </v-row>
    <br /><br />

    <br /><br />
  </v-container>
</template>
<script>
import service from "../service/authonticationService";
export default {
  data: () => ({
    file: null,
    message: "",
    e1: 1,
    messageRules: [
      (v) => !!v || "Message is required",
      (v) => (v && v.length >= 10) || "Message must be more than 10 characters",
    ],
  }),

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
    async paymentMethod() {
      const formdata = new FormData();
      formdata.append("img", this.file);
      try {
        var someDate = new Date();
        var dd = someDate.getDate();
        var mm = someDate.getMonth();
        var yy = someDate.getFullYear();
        const imageResponse = await service.upload(formdata);
        const response = await service.addPayment({
          fullName: this.$store.state.user.fullName,
          email: this.$store.state.user.email,
          phoneNumber: this.$store.state.user.phoneNumber,
          userId: this.$store.state.user._id,
          profilePicture: this.$store.state.user.imageUrl,
          expDate: dd + "/" + mm + "/" + yy,
          paymentType: "tender",
          paymentImage: imageResponse.data.imageUrl,
        });
        response.data;
        this.$router.push({ name: "auth" });
        window.scrollTo(0, 0);
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>
<style scoped>
.contact-icon {
  height: 60px;
}
.subTitle {
  height: 30;
  font-size: 20pt;
  font-family: Arial Black;
  color: rgb(232, 232, 241);
}
</style>