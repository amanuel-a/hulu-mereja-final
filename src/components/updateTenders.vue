<template>
  <container>
    <br /><br />
    <v-form
      enctype="multipart/form-data"
      class="white pt-4"
      autocomplete="off"
      v-model="checkValidity"
    >
      <v-main>
        <h1 class="text-center secondary--text">Edit the Tenders here!</h1>
        <v-snackbar v-model="snackbar" :timeout="timeout"
          >{{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
        <v-row class="mx-7 my-1">
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg">
              <v-card flat>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs10 md11>
                      <v-text-field
                        label="Title"
                        v-model="title"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs10 md11>
                      <v-select
                        :rules="addressValidation"
                        :items="state"
                        label="Location"
                        v-model="location"
                        outlined
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg">
              <v-card flat>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs10 md11>
                      <v-menu
                        ref="startDateMenu"
                        v-model="startDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startDate"
                            label="Start Date"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="startDate">
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="dateMenu = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.startDateMenu.save(startDate)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex xs10 md11>
                      <v-menu
                        ref="endDateMenu"
                        v-model="endDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="endDate"
                            label="End Date"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="endDate">
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="enddateMenu = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.endDateMenu.save(endDate)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg">
              <v-card flat>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs10 md11>
                      <v-text-field
                        :rules="salaryValidation"
                        label="Starting Birr"
                        v-model="startingBirr"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-main>
      <v-main>
        <v-row class="mx-7 my-1">
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg"
              >Essentials for bidding:
              <v-textarea
                label="Essential things..."
                auto-grow
                outlined
                rows="10"
                row-height="15"
                v-model="essential"
              >
              </v-textarea>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg"
              >Additonal basic information:
              <v-textarea
                label="additional information"
                auto-grow
                outlined
                rows="10"
                row-height="15"
                v-model="additionalInfo"
              >
              </v-textarea>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg"
              >How to apply:
              <v-textarea
                label="How to apply"
                auto-grow
                outlined
                rows="10"
                row-height="15"
                v-model="apply"
              >
              </v-textarea>
            </v-sheet>
          </v-col>
        </v-row>
      </v-main>
      <div class="text-center">
        <v-btn
          rounded
          color="secondary"
          :loading="loading"
          @click="updateTender"
          dark
          >Update Tender </v-btn
        ><br /><br />
      </div>
    </v-form>
    <br />

    <br /><br />
  </container>
</template>
<script>
import apiService from "../service/authonticationService";
export default {
  data() {
    return {
      snackbar: false,
      text: "error try again.",
      timeout: 3000,
      title: "",
      location: "",
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startDateMenu: false,
      endDateMenu: false,
      startingBirr: 0.0,
      essential: "",
      additionalInfo: "",
      apply: "",
      checkValidity: false,
      state: [
        "Addis Ababa",
        "Afar",
        "Amhara",
        "Benishangul-Gumuz",
        "Dire Dawa",
        "Gambella",
        "Harari",
        "Oromia",
        "Sidama",
        "SNNPR",
        "Somali",
        "Tigray",
      ],
      nameValidation: [
        (input) =>
          /^[a-zA-Z0-9 . ]{2,500}$/.test(input) ||
          "Invalid name. it contains a-z or A-Z, with minimum 2 characters and maximum 32 characters",
      ],
      addressValidation: [
        (input) =>
          /^[a-zA-Z ]{2,32}$/.test(input) ||
          "Invalid name. it contains a-z or A-Z, with minimum 2 characters and maximum 32 characters",
      ],
      salaryValidation: [
        (input) =>
          /^[0-9 .]{1,32}$/.test(input) ||
          "Invalid salary. it contains " + " 0-9 and . ",
      ],
    };
  },
  async mounted() {
    this.post = (
      await apiService.getTenderPostById(this.$route.params.id)
    ).data;
    this.title = this.post.title;
    this.location = this.post.location;
    this.startDate = this.post.startDate.substring(0, 10);
    this.endDate = this.post.endDate.substring(0, 10);
    this.startingBirr = this.post.startingBirr;
    this.essential = this.post.essential;
    this.additionalInfo = this.post.additionalInfo;
    this.apply = this.post.apply;
  },
  methods: {
    async updateTender() {
      const updateResponse = await apiService.updatePostedTender(
        this.post._id,
        {
          title: this.title,
          location: this.location,
          startDate: this.startDate,
          endDate: this.endDate,
          startingBirr: this.startingBirr,
          essential: this.essential,
          additionalInfo: this.additionalInfo,
          apply: this.apply,
        }
      );
      if (updateResponse.data) {
        //    location.reload();
        this.text = "Updated succesfully";
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
.borderLeft {
  border-radius: 50px 0px 50px 0px !important;
}
.borderRight {
  border-radius: 0px 50px 0px 50px !important;
}
.border {
  border: 2px solid white !important;
}
</style>
