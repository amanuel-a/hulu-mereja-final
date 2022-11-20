<template>
  <container>
    <br/><br/>
    <v-form
        enctype="multipart/form-data"
        class="white pt-4"
        autocomplete="off"
        v-model="checkValidity"
    >
      <v-main>
        <h1 class="text-center secondary--text">Post New Tenders her!</h1>
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
                          :items="tenderCategory"
                          label="Category"
                          v-model="t_category"
                          outlined
                      ></v-select>
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
                              v-model="startDate_Et"
                              label="Start Date"
                              readonly
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="startDate" @change="setStartDates" >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="dateMenu = false"
                          >Cancel
                          </v-btn
                          >
                          <v-btn
                              text
                              color="primary"
                              @click="$refs.startDateMenu.save(startDate)"
                          >OK
                          </v-btn
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
                              v-model="endDate_Et"
                              label="End Date"
                              readonly
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="endDate" @change="setEndDates">
                          <v-spacer></v-spacer>
                          <v-btn
                              text
                              color="primary"
                              @click="enddateMenu = false"
                          >Cancel
                          </v-btn
                          >
                          <v-btn
                              text
                              color="primary"
                              @click="$refs.endDateMenu.save(endDate)"
                          >OK
                          </v-btn
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
        <v-btn rounded color="btncolor" @click="postTenders" dark>post
        </v-btn
        >
        <br/><br/>
      </div>
    </v-form>
    <br/>

    <br/><br/>
  </container>
</template>
<script>
import post from "../service/authonticationService";

export default {
  data() {
    return {
      title: "",
      t_category: "",
      location: "",
      startDate: "",
      startDate_Et: "",
      endDate: "",
      endDate_Et: "",
      startDateMenu: false,
      endDateMenu: false,
      startingBirr: "",
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
      nameValidation: [
        (input) =>
            /^[a-zA-Z0-9 . ]{2,500}$/.test(input) ||
            "Invalid name. it contains a-z or A-Z, with minimum 2 characters and maximum 32 characters",
      ],
      addressValidation: [
        (input) =>
            /^[a-zA-Z \W]{2,32}$/.test(input) ||
            "Invalid name. it contains a-z or A-Z, with minimum 2 characters and maximum 32 characters",
      ],
      salaryValidation: [
        (input) =>
            /^[a-zA-Z0-9 . ]{2,200}$/.test(input) ||
            "Invalid name. it contains a-z or A-Z, with minimum 2 characters and maximum 200 characters",
      ],
    };
  },
  methods: {
    setStartDates(){
      this.startDate_Et = this.parseDate(this.startDate);
    },
    setEndDates(){
      this.endDate_Et = this.parseDate(this.endDate);
    },
    parseDate(date) {
      const Zemen = require('zemen');
      let _date = Zemen.toEC(date);
      return _date.format('d ፣ MMM DD ቀን YYYY E')
    },
    async postTenders() {
      if (this.checkValidity) {
        try {
          const response = await post.postTenders({
            title: this.title,
            t_category: this.t_category,
            location: this.location,
            startDate: this.startDate,
            endDate: this.endDate,
            startingBirr: this.startingBirr,
            essential: this.essential,
            additionalInfo: this.additionalInfo,
            apply: this.apply,
          });
          response.data;
          this.$router.push({name: "tenders"});
          window.scrollTo(0, 0);
        } catch (err) {
          alert(err);
        }
      } else {
        alert("Please fill all the required fields");
      }
    },
  },
};
</script>
<style scoped>
#gr {
  background-color: #ffffff;
  width: 70%;
  margin: auto;
}

h2 {
  color: #000080;
}
</style>

