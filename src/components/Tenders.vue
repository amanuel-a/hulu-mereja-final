<template>
  <div style="margin-top: 8rem">
    <h1
      class="text-center headingWithBgtext"
      style="
        text-transform: uppercase;
        margin-bottom: 5rem;
        font-weight: bold;
        color: #1f9ccd;
      "
    >
      Most popular tenders
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
                      <span class="jt__text">Search here</span>
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
                        :items="tenderCategory"
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
          <TenderCard
            v-for="post in posts"
            :key="post._id"
            :tender="post"
            :more="more"
            :UpdateInfo="UpdateInfo"
            :DeleteInfo="DeleteInfo"
          />
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
import TenderCard from "./TenderCard.vue";
import post from "../service/authonticationService";
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  components: {
    TenderCard,
  },
  data() {
    return {
      filterIcon: false,
      windowWidth: window.innerWidth,
      posts: [],
      promotions: [],
      pageNumber: 0,
      catagoryPageNumber: 0,
      locationPageNumber: 0,
      datePageNumber: 0,
      byCatagory: "",
      byLocation: "",
      byDate: "",
      loading: true,
      searchError: false,
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
      tenderCategory: [
        "Accounting and auditing",
        "Advertising and promotion",
        "Billboard and digital advertising",
        "Event organizing and planning",
        "Graphics design",
        "Printed advertising materials",
        "Promotion items",
        "Public address systems",
        "Public relations",
        "Agriculture and farming",
        "Animal feed",
        "Live animals",
        "Machinery and equipment",
        "Product  and services",
        "Seeds",
        "Raw materials and refrigeration",
        "Aluminum products",
        "Aluminum works and installation",
        "Amendment and cancellation",
        "Antiques",
        "Architectural",
        "Art",
        "Music and entertainment",
        "Musical instruments",
        "Audio visual",
        "Banking equipment and services",
        "Bee and animal husbandry",
        "Bid modification",
        "Building and warehouse",
        "Business",
        "Carpets and curtains",
        "Chemicals and reagents",
        "Cleaning and janitorial equipment and service",
        "Construction",
        "Architectural and construction design",
        "Building construction",
        "Contract administration and supervision",
        "Fishing works",
        "Road and bridge construction",
        "Sewerage",
        "Construction and water works",
        "Construction input",
        "Building and finishing materials",
        "Construction machinery and equipment’s",
        "Water engineering machinery and equipment",
        "Water pipes and fittings",
        "Consultancy",
        "Academic",
        "Agricultural",
        "Baseline",
        "Engineering",
        "Environmental",
        "Financial",
        "Health related",
        "ICT",
        "Legal",
        "Organizational",
        "Social and public policy",
        "Consumable goods",
        "Courier services",
        "Crafts",
        "Customs cleaning",
        "Development and web design",
        "Disposal of hazardous waste",
        "Distribution of different products",
        "Editing and writing",
        "Education and training",
        "Materials",
        "Services",
        "Electrical",
        "Electro",
        "Equipment and accessories",
        "Installation maintenance and other engineering",
        "Electro mechanical and electronics",
        "Energy",
        "Coal",
        "Firewood",
        "Fuel and lubricants",
        "Foam materials",
        "Food and drink",
        "Furniture and furnishing",
        "Home appliance and supplies",
        "House furniture",
        "Gardening and landscaping",
        "Garment and leather",
        "Uniforms",
        "General service provision",
        "Geotechnical investigation and laboratory testing",
        "Governmental treasure bill",
        "Gumruk sales",
        "Hand tools and workshop equipment’s",
        "Health and medical",
        "Medical equipment pharmaceutical products",
        "Veterinary equipment’s and supplies",
        "Health care",
        "Hospitality  and supplies",
        "House",
        "Humanitarian aid supply",
        "Industrial machinery provision and installation",
        "Industry and factory foreclosure",
        "Insecticides and herbicides",
        "Installation insurance cars",
        "Insurance service",
        "Interior design service and materials",
        "International competitive bidding",
        "It and telecom",
        "Computer and accessories",
        "Networking equipment and installation",
        "Software provision",
        "Telecommunication service",
        "Laboratory equipment",
        "Chemicals",
        "Cleaning services",
        "Security service",
        "Service",
        "Land lease and real estate",
        "Maintenance and other engineering service",
        "Maintenance and repair",
        "Furniture maintenance",
        "House and building",
        "Machinery",
        "Office machines and computers",
        "Vehicle",
        "Garage service",
        "Metal and metal working",
        "Mineral and natural resources",
        "Motorcycles and bicycles purchase",
        "Motors and compressors",
        "Offices supplies",
        "Office machine and accessories",
        "Secretarial service",
        "Stationary",
        "Toners",
        "Office supplies and services",
        "Other metals",
        "Packaging and labeling",
        "Packing and forwarding",
        "Personal care products and service",
        "Post control and fumigates",
        "Photography and filming service",
        "Plastic products",
        "Plastic raw materials",
        "Printing and publishing",
        "Privatization",
        "Pumps",
        "Quality assurance services",
        "Raw materials",
        "Rent",
        "Construction machinery",
        "Safety and security sales",
        "Share and other foreclosure",
        "Vehicle and machinery sale",
        "Sanitary and ceramics",
        "Spare parts and car decoration  materials",
        "Car décor",
        "Tire and battery",
        "Sport materials and equipment’s",
        "Steel",
        "Steel raw materials and products",
        "Tender award notice",
        "Tents and measurements tools",
        "Textile",
        "Transit",
        "Transportation service",
        "Vehicle purchase warehousing",
        "Water works construction",
        "Irrigation works",
        "Water construction",
        "Water proofing works",
        "Water system installation",
        "Wood and wood working",
      ],
    };
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
    const response = await post.getPostedTenders(this.pageNumber);
    this.posts = response.data;
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
      this.catagoryPageNumber = 0;
      this.locationPageNumber = 0;
      this.datePageNumber = 0;
    },
    async UpdateInfo(pid) {
      this.$router.push({ name: "updateTenders", params: { id: pid } });
      window.scrollTo(0, 0);
    },
    async DeleteInfo(pid) {
      var r = confirm("Will be deleted permanetly!");
      if (r === true) {
        const responseDelete = await post.deleteTender(pid);
        if (!responseDelete.data.error) {
          location.reload();
        }
      }
    },
    async more(gid) {
      if (this.$store.state.isUserLoggedIn) {
        const response = await post.getDetailById(this.$store.state.user._id);
        const isPaid = response.data.isPaid;
        if (this.$store.state.user.status === "admin") {
          this.$router.push({ name: "tenderDetail", params: { id: gid } });
          window.scrollTo(0, 0);
        } else if (isPaid === "paid") {
          var expDate = new Date(response.data.tendExpDate);
          var currentTime = new Date();
          if (expDate > currentTime) {
            this.$router.push({ name: "tenderDetail", params: { id: gid } });
            window.scrollTo(0, 0);
          } else {
            const response = await post.getProfileById(
              this.$store.state.user._id,
              {
                isPaid: "notPaid",
              }
            );
            response.data;
            this.$router.push({ name: "payment" });
          }
        } else {
          this.$router.push({ name: "payment" });
          window.scrollTo(0, 0);
        }
      } else {
        this.$router.push({ name: "auth" });
        window.scrollTo(0, 0);
      }
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
        const response = await post.getPostedTenders(this.pageNumber);
        allPostedJobs = response.data;
        for (counter = 0; counter < 20; counter++) {
          this.posts.push(allPostedJobs[counter]);
        }
        this.loading = false;
        window.scrollTo(0, 0);
      } else if (this.byLocation !== "") {
        this.locationPageNumber++;
        this.posts = [];
        const responseLocation = await post.tenderLocation(
          this.byLocation,
          this.locationPageNumber
        );
        allPostedJobs = responseLocation.data;
        for (counter = 0; counter < 3; counter++) {
          this.posts.push(allPostedJobs[counter]);
        }
        this.loading = false;
        window.scrollTo(0, 0);
      } else if (this.byCatagory != "") {
        this.catagoryPageNumber++;
        this.posts = [];

        const responseCatagory = await post.tenderCatagory(
          this.byCatagory,
          this.catagoryPageNumber
        );
        allPostedJobs = responseCatagory.data;
        for (counter = 0; counter < 3; counter++) {
          this.posts.push(allPostedJobs[counter]);
        }
        this.loading = false;
        window.scrollTo(0, 0);
      } else if (this.byDate != "") {
        this.datePageNumber++;
        this.posts = [];
        const responseDate = await post.tenderDates(
          this.byDate,
          this.datePageNumber
        );
        allPostedJobs = responseDate.data;
        for (counter = 0; counter < 3; counter++) {
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
          const responseLocation = await post.tenderLocation(
            this.byLocation,
            this.locationPageNumber
          );
          allPostedJobs = responseLocation.data;
          for (counter = 0; counter < 3; counter++) {
            this.posts.push(allPostedJobs[counter]);
          }
          this.loading = false;
        } else if (this.byCatagory != "") {
          this.catagoryPageNumber++;
          const responseCategory = await post.tenderCatagory(
            this.byCatagory,
            this.catagoryPageNumber
          );
          allPostedJobs = responseCategory.data;
          for (counter = 0; counter < 3; counter++) {
            this.posts.push(allPostedJobs[counter]);
          }
          this.loading = false;
        } else if (this.byDate != "") {
          this.datePageNumber++;
          const responseDate = await post.tenderDates(
            this.byDate,
            this.datePageNumber
          );
          allPostedJobs = responseDate.data;
          for (counter = 0; counter < 3; counter++) {
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
  color: #4973ff;
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