<template>
  <div style="margin-top: 8rem">
    <h1
      class=" text-center headingWithBgtext"
      style="
        text-transform: uppercase;
        margin-bottom: 5rem;
        font-weight: bold;
        color: #1f9ccd;
      "
    >
      Most popular jobs
    </h1>
    <v-container>
      <v-row style="justify-content: center">
        <v-col cols="12" sm="4">
          <div style="position: sticky; top: 60px">
            <v-sheet
              rounded="lg"
              min-height="268"
              v-if="windowWidth > 960 || filterIcon"
            >
              <v-card class="pa-5 mt-8">
                <v-card-title
                  style="width: max-content; margin: auto; padding-top: 10px"
                >
                  <h1 class="jt --debug text-center">
                    <span class="jt__row">
                      <span class="jt__text ">Search here</span>
                    </span>
                    <!-- <span class="jt__row jt__row--sibling" aria-hidden="true">
                      <span class="jt__text">Search here</span>
                    </span>
                    <span class="jt__row jt__row--sibling" aria-hidden="true">
                      <span class="jt__text">Search here</span>
                    </span>
                    <span class="jt__row jt__row--sibling" aria-hidden="true">
                      <span class="jt__text">Search here</span>
                    </span> -->
                  </h1>
                </v-card-title>
                <div class="text-center mt-4">
                  <span class="red--text" v-if="searchError"
                    >How do you want to search?</span
                  >
                </div>
                <v-card-txt>
                  <v-row align="center">
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                      md="12"
                      @click="resetPageNumber()"
                    >
                      <v-select
                        :items="jobCategory"
                        label="select category"
                        dense
                        outlined
                        v-model="byCatagory"
                      ></v-select>
                    </v-col>
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                      md="12"
                      @click="resetPageNumber()"
                      ><v-text-field
                        label="Enter deadline"
                        v-model="byDate"
                        outlined
                        placeholder="2021-08-19"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                      md="12"
                      @click="resetPageNumber()"
                    >
                      <v-select
                        :items="state"
                        label="select location"
                        dense
                        outlined
                        v-model="byLocation"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-txt>
                <div class="text-xs-center btncolor">
                  <v-btn text @click="searchByCatagory" block
                    ><span class="text-capitalize white--text"
                      >Search</span
                    ></v-btn
                  >
                </div>
              </v-card>
            </v-sheet>
          </div>
        </v-col>
        <v-col cols="12" sm="8">
          <JobCard v-for="post in posts" :key="post._id" :post="post" :UpdateInfo="UpdateInfo" :DeleteInfo="DeleteInfo" :more="more" />
          <div class="text-xs-center mx-3 my-5 btncolor">
            <v-btn text @click="feachData" block
              ><span class="text-capitalize white--text">Load More</span>
            </v-btn>
          </div>
        </v-col>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
import post from "../service/authonticationService";
import JobCard from "./JobCard.vue";
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  data() {
    return {
      posts: [],
      promotions: [],
      filterIcon: false,
      windowWidth: window.innerWidth,
      pageNumber: 0,
      catagoryPageNumber: 0,
      locationPageNumber: 0,
      datePageNumber: 0,
      byCatagory: "",
      byLocation: "",
      byDate: "",
      searchError: false,
      loading: true,
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
      jobCategory: [
        "Architecture and engineering",
        "Arts, culture and entertainment",
        "Business, management and administration",
        "Communications",
        "Community and social services",
        "Education",
        "Science and technology",
        "Installation, repair and maintenance",
        "Farming, fishing and forestry",
        "Government",
        "Health and medicine",
        "Sales",
      ],
    };
  },
  components: {
    JobCard,
  },
  created() {
    AOS.init();
    // You can also pass an optional settings object
    // below listed default settings
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
  },
  async mounted() {
    this.searchError = false;
    this.pageNumber++;
    const response = await post.getPostedJobs(this.pageNumber);
    var allPostedJobs = response.data;
    var counter = 0;
    for (counter = 0; counter < 2; counter++) {
      this.posts.push(allPostedJobs[counter]);
    }
    this.loading = false;

    const res = await post.getPromotion();
    var allPromotion = res.data;
    var c = 0;
    for (c = 0; c < allPromotion.length; c++) {
      this.promotions.push(allPromotion[c]);
    }

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    resetPageNumber() {
      this.byCatagory = "";
      this.byLocation = "";
      this.byDate = "";
      this.catagoryPageNumber = 0;
      this.locationPageNumber = 0;
      this.datePageNumber = 0;
    },
    async UpdateInfo(pid) {
      this.$router.push({ name: "updateJobs", params: { id: pid } });
      window.scrollTo(0, 0);
    },
    async DeleteInfo(pid) {
      var r = confirm("Will be deleted permanetly!");
      if (r == true) {
        const responseDelete = await post.deleteJob(pid);
        if (!responseDelete.data.error) {
          location.reload();
        }
      }
    },
    async more(gid) {
      this.$router.push({ name: "jobDetail", params: { id: gid } });
      window.scrollTo(0, 0);
    },
    async feachData() {
      this.searchError = false;
      var counter = 0;
      var allPostedJobs;
      if (
        this.byCatagory === "" &&
        this.byLocation === "" &&
        this.byDate === ""
      ) {
        this.pageNumber++;
        this.posts = [];
        const response = await post.getPostedJobs(this.pageNumber);
        allPostedJobs = response.data;
        for (counter = 0; counter < 2; counter++) {
          this.posts.push(allPostedJobs[counter]);
        }
        this.loading = false;
        window.scrollTo(0, 0);
      } else if (this.byLocation != "") {
        this.locationPageNumber++;
        this.posts = [];
        const responseLocation = await post.location(
          this.byLocation,
          this.locationPageNumber
        );
        allPostedJobs = responseLocation.data;
        for (counter = 0; counter < 2; counter++) {
          this.posts.push(allPostedJobs[counter]);
        }
        this.loading = false;
        window.scrollTo(0, 0);
      } else if (this.byCatagory != "") {
        this.catagoryPageNumber++;
        this.posts = [];
        const responseCatagory = await post.catagory(
          this.byCatagory,
          this.catagoryPageNumber
        );
        allPostedJobs = responseCatagory.data;
        for (counter = 0; counter < 2; counter++) {
          this.posts.push(allPostedJobs[counter]);
        }
        this.loading = false;
        window.scrollTo(0, 0);
      } else if (this.byDate != "") {
        this.datePageNumber++;
        this.posts = [];
        const responseDate = await post.dates(this.byDate, this.datePageNumber);
        allPostedJobs = responseDate.data;
        for (counter = 0; counter < 2; counter++) {
          this.posts.push(allPostedJobs[counter]);
        }
        this.loading = false;
        window.scrollTo(0, 0);
      }
    },
    async searchByCatagory() {
      if (
        this.byCatagory === "" &&
        this.byLocation === "" &&
        this.byDate === ""
      ) {
        this.searchError = true;
      } else {
        this.loading = true;
        this.posts = [];
        this.searchError = false;
        var counter = 0;
        var allPostedJobs = "";
        if (this.byLocation != "") {
          this.locationPageNumber++;
          const responseLocation = await post.location(
            this.byLocation,
            this.locationPageNumber
          );
          allPostedJobs = responseLocation.data;
          for (counter = 0; counter < 2; counter++) {
            this.posts.push(allPostedJobs[counter]);
          }
          this.loading = false;
        } else if (this.byCatagory != "") {
          this.catagoryPageNumber++;
          const responseCatagory = await post.catagory(
            this.byCatagory,
            this.catagoryPageNumber
          );
          allPostedJobs = responseCatagory.data;
          for (counter = 0; counter < 2; counter++) {
            this.posts.push(allPostedJobs[counter]);
          }
          this.loading = false;
        } else if (this.byDate != "") {
          this.datePageNumber++;
          const responseDate = await post.dates(
            this.byDate,
            this.datePageNumber
          );
          allPostedJobs = responseDate.data;
          for (counter = 0; counter < 2; counter++) {
            this.posts.push(allPostedJobs[counter]);
          }
          this.loading = false;
        }
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");

.jt {
  position: relative;
  font-size: 5vmin;
  font-family: "Staatliches", sans-serif;
  text-transform: uppercase;
  font-display: swap;
  color: #6C63FF;
}

.jt__row {
  display: block;
}


.jt__row.jt__row--sibling {
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  witdh: 800px;
}






.debug .jt__row:nth-child(even) {
  color: black;
  background: white;
}
.debug .jt__row:nth-child(odd) {
  color: white;
  background: black;
}
</style>

<style scoped lang="sass">
.headingWithBgtext
  position: relative
  &::before
    position: absolute
    content: "Freelancers"
    opacity: .2
    left: 50%
    transform: translateX(-50%) scale(2.2)
</style>
