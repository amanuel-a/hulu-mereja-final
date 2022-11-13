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
        <h1 class="text-center secondary--text">Edit the Jobs here!</h1>
        <div class="text-center mt-4">
          <span class="red--text" v-if="loginError"
            >please enter valid input!!!</span
          >
          <v-snackbar v-model="snackbar" :timeout="timeout"
            >{{ text }}
            <template v-slot:action="{ attrs }">
              <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
          </v-snackbar>
        </div>
        <v-row class="mx-7 my-7">
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg"
              >Required information about the jobs
              <v-card flat>
                <h2>Jobs</h2>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs10 md11>
                      <v-select
                        :items="titles"
                        label="Title"
                        v-model="title"
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex xs10 md11>
                      <v-select
                        :items="jobType"
                        label="Job type"
                        v-model="j_type"
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex xs10 md11>
                      <v-select
                        :items="workingType"
                        label="Working type"
                        v-model="w_type"
                        outlined
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg"
              >Required information about the Company
              <v-card flat>
                <h2>Company</h2>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs10 md11>
                      <v-text-field
                        :rules="nameValidation"
                        label="Company Name"
                        v-model="cname"
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
            <v-sheet rounded="lg"
              >Other basic information
              <v-card flat>
                <h2>...</h2>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12 md6 class="mr-4">
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
                    <v-flex xs12 md5>
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
                    <v-flex xs10 md11>
                      <v-select
                        :items="experiences"
                        label="Experiences"
                        v-model="experience"
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex xs10 md11>
                      <v-text-field
                        :rules="salaryValidation"
                        label="Salary"
                        v-model="salary"
                      ></v-text-field>
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
              >Required Qualifications and Skills:
              <v-textarea
                label="Required Skills"
                auto-grow
                outlined
                rows="10"
                row-height="15"
                v-model="skills"
              >
              </v-textarea>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg"
              >Behavioural Competencies:
              <v-textarea
                label="Behavior"
                auto-grow
                outlined
                rows="10"
                row-height="15"
                v-model="behaviour"
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
      <br />
      <div class="text-center">
        <v-btn
          rounded
          color="secondary"
          :loading="loading"
          @click="updateJob"
          dark
          >UpdateJobs </v-btn
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
      j_type: "",
      cname: "",
      apply: "",
      behaviour: "",
      skills: "",
      salary: 0.0,
      experience: "",
      location: "",
      w_type: "",
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startDateMenu: false,
      endDateMenu: false,
      loginError: false,
      checkValidity: false,
      jobType: ["Full time", "Part time", "Remote"],
      experiences: [
        "0",
        ">1 years",
        ">2 years",
        ">3 years",
        ">4 years",
        ">5 years",
        ">6 years",
      ],
      workingType: ["Permanent", "Contract"],
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
      titles: [
        "Architect",
        "Civil engineer",
        "Landscape architect",
        "Sustainable designer",
        "Biomedical engineer",
        "Mechanical engineer",
        "Electrical engineer",
        "Singer/songwriter",
        "Music producer",
        "Art curator",
        "Animator/video game designer",
        "Filmmaker",
        "Graphic designer",
        "Fashion designer",
        "Photographer",
        "Human resources manager",
        "Marketing assistant",
        "Accountants",
        "Secretary",
        "Entrepreneur/small business owner",
        "Real estate agent",
        "Business development manager",
        "Journalist",
        "Copywriter",
        "Communications manager",
        "Public relations specialist",
        "Meeting/event planner",
        "Social media manager",
        "Graphics designer",
        "Brand manager",
        "School counselor",
        "Speech pathologist",
        "Rehabilitation counselor",
        "Licensed clinical social worker",
        "Child welfare social worker",
        "Palliative and hospice care worker",
        "Special education teacher",
        "School principal",
        "Superintendent",
        "College professor",
        "School librarian",
        "Substitute teacher",
        "Archeologist",
        "Software engineer",
        "Laboratory technician",
        "Microbiologist",
        "Physicist",
        "Auto mechanic",
        "Landscaper and groundskeeper",
        "Bicycle repairer",
        "Wind turbine technician",
        "Plumber",
        "Agricultural worker",
        "Animal breeder",
        "Nursery worker",
        "Forest and conservation worker",
        "Fisher",
        "School cafeteria worker",
        "Congressional staff",
        "National park ranger",
        "Mail carrier",
        "Elementary school teacher",
        "Anesthesiologist",
        "Dental assistant",
        "Nurse",
        "Veterinarian",
        "Physical therapist",
        "Lobbyist",
        "Public administrator",
        "Paralegal",
        "Lawyer",
        "Labor relations specialist",
        "Sales associate",
        "sales development rep",
        "Account executive",
        "Regional sales manager",
        "VP of sales",
        "Marketing ",
      ],
      nameValidation: [
        (input) =>
          /^[a-zA-Z ]{2,32}$/.test(input) ||
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
    this.post = (await apiService.getPostById(this.$route.params.id)).data;
    this.title = this.post.title;
    this.j_type = this.post.j_type;
    this.j_category = this.post.j_category;
    this.cname = this.post.cname;
    this.location = this.post.location;
    this.w_type = this.post.w_type;
    this.startDate = this.post.startDate.substring(0, 10);
    this.endDate = this.post.endDate.substring(0, 10);
    this.experience = this.post.experience;
    this.salary = this.post.salary;
    this.skills = this.post.skills;
    this.behaviour = this.post.behaviour;
    this.apply = this.post.apply;
  },
  methods: {
    async updateJob() {
      let j_category = "";
      if (
        this.title === "Architect" ||
        this.title === "Civil engineer" ||
        this.title === "Landscape architect" ||
        this.title === "Sustainable designer" ||
        this.title === "Biomedical engineer" ||
        this.title === "Mechanical engineer" ||
        this.title === "Electrical engineer"
      )
        j_category = "Architecture and engineering";
      else if (
        this.title === "Singer/songwriter" ||
        this.title === "Music producer" ||
        this.title === "Art curator" ||
        this.title === "Animator/video game designer" ||
        this.title === "Filmmaker" ||
        this.title === "Graphic designer" ||
        this.title === "Fashion designer" ||
        this.title === "Photographer"
      )
        j_category = "Arts, culture and entertainment";
      else if (
        this.title === "Human resources manager" ||
        this.title === "Marketing assistant" ||
        this.title === "Accountants" ||
        this.title === "Secretary" ||
        this.title === "Entrepreneur/small business owner" ||
        this.title === "Real estate agent" ||
        this.title === "Business development manager"
      )
        j_category = "Business, management and administration";
      else if (
        this.title === "Journalist" ||
        this.title === "Copywriter" ||
        this.title === "Communications manager" ||
        this.title === "Public relations specialist" ||
        this.title === "Meeting/event planner" ||
        this.title === "Social media manager" ||
        this.title === "Graphics designer" ||
        this.title === "Brand manager"
      )
        j_category = "Communications";
      else if (
        this.title === "School counselor" ||
        this.title === "Speech pathologist" ||
        this.title === "Rehabilitation counselor" ||
        this.title === "Licensed clinical social worker" ||
        this.title === "Child welfare social worker" ||
        this.title === "Palliative and hospice care worker"
      )
        j_category = "Community and social services";
      else if (
        this.title === "Special education teacher" ||
        this.title === "School principal" ||
        this.title === "Superintendent" ||
        this.title === "College professor" ||
        this.title === "School librarian" ||
        this.title === "Substitute teacher"
      )
        j_category = "Education";
      else if (
        this.title === "Archeologist" ||
        this.title === "Software engineer" ||
        this.title === "Laboratory technician" ||
        this.title === "Microbiologist" ||
        this.title === "Physicist"
      )
        j_category = "Science and technology";
      else if (
        this.title === "Auto mechanic" ||
        this.title === "Landscaper and groundskeeper" ||
        this.title === "Bicycle repairer" ||
        this.title === "Wind turbine technician" ||
        this.title === "Plumber"
      )
        j_category = "Installation, repair and maintenance";
      else if (
        this.title === "Agricultural worker" ||
        this.title === "Animal breeder" ||
        this.title === "Nursery worker" ||
        this.title === "Forest and conservation worker" ||
        this.title === "Fisher"
      )
        j_category = "Farming, fishing and forestry";
      else if (
        this.title === "School cafeteria worker" ||
        this.title === "Congressional staff" ||
        this.title === "National park ranger" ||
        this.title === "Mail carrier" ||
        this.title === "Elementary school teacher"
      )
        j_category = "Government";
      else if (
        this.title === "Anesthesiologist" ||
        this.title === "Dental assistant" ||
        this.title === "Nurse" ||
        this.title === "Veterinarian" ||
        this.title === "Physical therapist"
      )
        j_category = "Health and medicine";
      else if (
        this.title === "Lobbyist" ||
        this.title === "Public administrator" ||
        this.title === "Paralegal" ||
        this.title === "Lawyer" ||
        this.title === "Labor relations specialist"
      )
        j_category = "Law and public policy";
      else if (
        this.title === "Sales associate" ||
        this.title === "sales development rep" ||
        this.title === "Account executive" ||
        this.title === "Regional sales manager" ||
        this.title === "VP of sales" ||
        this.title === "Marketing"
      )
        j_category = "Sales";
      const updateResponse = await apiService.updatePostedJob(this.post._id, {
        title: this.title,
        j_type: this.j_type,
        j_category: j_category,
        cname: this.cname,
        location: this.location,
        w_type: this.w_type,
        startDate: this.startDate,
        endDate: this.endDate,
        experience: this.experience,
        salary: this.salary,
        skills: this.skills,
        behaviour: this.behaviour,
        apply: this.apply,
      });
      if (updateResponse.data) {
        //  location.reload();
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
