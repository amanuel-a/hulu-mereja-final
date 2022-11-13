<template>
  <section id="hero">
    <v-parallax
      dark
      
      height="750"
      class="heroSection"
    >
      <v-row align="center" class="headerTextWrapper">
        <v-col lg="6">
          <v-row  align="center" justify="center">
            <v-col
              cols="12"
              md="10"
              xl="8"
              style="display: flex; flex-direction: column"
              color="black"
            >
              <h1 class="heroHeader" >Get-in</h1>
              <h1 class="heroDetail">
                Be a family with us to adjust your way of life!
              </h1>
              <p style="color:black; text-align: center;bottom:0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque soluta sequi ratione ea iusto corporis perspiciatis tempore incidunt quae esse voluptatum magni distinctio in illo nesciunt, amet quas possimus magnam?
              </p>

              <v-btn
                rounded
                outlined
                large
                dark
               
                @click="$vuetify.goTo('#features')"
                class="heroButton"
                style="backgroundColor:#6C63FF"
              >
                start your journey
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
        <v-col lg="6">
          <v-img
          
          src="@/assets/img/tender.svg"
          max-height="750"
          max-width="750"></v-img>
        </v-col>
      </v-row>
    </v-parallax>

    <v-container
      fluid
      id="features"
      style="margin-top: 8rem"
      data-aos="fade-up"
      data-aos-duration="300"
    >
      <v-row justify="center">
        <v-col cols="10">
          <v-row justify="space-around">
            <v-col cols="12" class="text-center">
              <h1
                class="headingWithBgtext"
                style="
                  text-transform: uppercase;
                  margin-bottom: 5rem;
                  font-weight: bold;
                  color: #1f9ccd;
                "
              >
                What we offer
              </h1>
            </v-col>
            <v-col cols="12" sm="4" v-for="(feature, i) in features" :key="i">
              <Card :feature="feature" :index="i" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <section id="about">
      <v-container fluid data-aos="fade-up" data-aos-delay="200">
        <v-row align="center" justify="center">
          <v-col cols="10">
            <v-row align="center" justify="center">
              <v-col cols="12">
                <h1
                  class="aboutWithBgtext"
                  style="
                    text-align: center;
                    text-transform: uppercase;
                    font-weight: bold;
                    margin-bottom: 5rem;
                    color: #1f9ccd;
                  "
                >
                  About Us
                </h1>
                <FlipCard :content="aboutusContent" :index="i" />

                <div
                  style="
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap:2rem;
                  "
                >
                  <!-- <div
                    v-for="(aboutusContent, i) in aboutus"
                    :key="aboutusContent.title"
                  > -->
                    
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section id="download">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <v-row align="center" justify="center">
              <v-col sm="4" class="hidden-xs-only">
                <v-img
                  src="@/assets/img/ill2.svg"
                  class="d-block ml-auto mr-auto"
                  max-width="350px"
                />
              </v-col>
              <v-col
                cols="12"
                sm="8"
                class="white--text text-left"
                style="
                  z-index: 1;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;
                "
              >
                <h1
                  style="
                    text-transform: uppercase;
                    font-weight: bold;
                    font-size: 4rem;
                  "
                >
                  Join us
                </h1>
                <p style="font-size: 1rem; color: rgba(255, 255, 255, 0.6)">
                  The only courage that matters is the kind that gets you from
                  one moment to the next.
                </p>
                <!-- <v-btn
                  rounded
                  outlined
                  href="https://t.me/onestepgetin"
                  target="_blank"
                  large
                  color="white"
                  class="mt-8"
                >
                  <v-icon class="mr-2"> arrow-up-right </v-icon>
                  Telegram
                </v-btn> -->
                <a
                  href="https://t.me/onestepgetin"
                  target="_blank"
                  style="text-decoration: none"
                >
                  <button class="telegramButton">
                    <span>Telegram</span>
                    <div class="liquid"></div>
                  </button>
                </a>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="pb-8" id="contact">
      <v-container fluid data-aos="fade-in" data-aos-delay="200">
        <div class="contactFormWrapper">
          <v-img
            src="../assets/images/location.png"
            style="
              margin-top: 8rem;
              margin-bottom: 8rem;
              border-radius: 15px;
              flex: 1;
            "
            class="map-image"
          ></v-img>
          <div style="flex: 2">
            <ContactForm />
          </div>
        </div>
      </v-container>
      <v-snackbar
        v-model="snackbar.enabled"
        timeout="3000"
        right
        top
        :color="snackbar.color"
      >
        {{ snackbar.text }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.enabled = false">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
    </section>
  </section>
</template>

<script>
import Card from "./Card.vue";
import UserCard from "./UserCard.vue";
import FlipCard from "./FlipCard.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "./ContactForm.vue";
export default {
  data() {
    return {
      dialog: false,
      videoId: "i8IvvHJssWE",
      icons: ["fa-facebook", "fa-twitter", "fa-linkedin", "fa-instagram"],
      aboutus: [
        {
          title: "who are we?",
          desc: "Get in is a brand owned by relief business network s.c is one of Ethiopian largest service platform provides tender (local and international) ,job and freelance networks. Founded in 2020/21 Addis Ababa, Ethiopia",
          img: "../assets/img/whoweare.png",
        },
        // {
        //   title: "Coverage",
        //   desc: "we have comprehensive and reliable database",
        //   img: "../assets/images/who.svg",
        // },
        {
          title: "Cost effective",
          desc: "get in membership fees including access to unlimited searching, downloading available documents or tender alerts at no hidden cost. Customer support you can contact our customer care team via email, phone call to get assistant on tender /projects ,jobs and freelancers ,existing membership or any other queries error feed by you.",
          img: "../assets/img/cost.png",
        },
        {
          title: "Customized service",
          desc: "we will customize email alerts for our customers based on preferred geographic and product/services using vocabulary codes to ensure that members only receive relevant information for their business and need.",
          img: "../assets/img/service.png",
        },
      ],
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Enter your name",
        (v) => (v && v.length >= 1) || "Minimum 1 character",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Enter your email",
        (v) => /.+@.+\..+/.test(v) || "must enter valid email",
      ],
      textArea: "",
      textAreaRules: [
        (v) => !!v || "Enter your message",
        (v) => (v && v.length >= 10) || "Mínimo de 10 caracteres",
      ],
      lazy: false,
      snackbar: {
        enabled: false,
        text: "",
        color: "",
      },
      features: [
        {
          img: require("@/assets/images/jobs.svg"),
          title: "Jobs",
          subTitle: "If opportunity doesn't knock, build a door",
          text: "Summarize essential responsibility activities, qualification and skills for a role the description typically includes the person main duties and working conditions.",
        },
        {
          img: require("@/assets/images/tenders.svg"),
          title: "Tenders",
          subTitle: "You all are invited",
          text: "Invitation to a bid for a project or accept a formal offer governments and finicial institutions invite bids for small to large projects that must be submitted within a finite deadline.",
        },
        {
          img: require("@/assets/images/freelancer.svg"),
          title: "Freelancers",
          subTitle: "Work on your self, for your self",
          text: "Find candidate fitted your requirements and get to work as soon as you can",
        },
      ],
    };
  },
  components: {
    Card, // <=> YourComponent: 'YourComponent'
    UserCard,
    ContactForm,
    FlipCard,
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.pause();
      }
    },
  },
  methods: {},
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
};
</script>

<style scoped>
h1{
  color:black;
}
.telegramButton {
  margin-top: 3rem;
  position: relative;
  padding: 20px 20px;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  width: 200px;
  overflow: hidden;
  border-radius: 40px;
}

.telegramButton span {
  position: relative;
  color: #fff;
  font-size: 20px;
  font-family: Arial;
  letter-spacing: 8px;
  z-index: 1;
}

.telegramButton .liquid {
  position: absolute;
  top: -80px;
  left: 0;
  width: 200px;
  height: 200px;
  background: #4973ff;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.telegramButton .liquid::after,
.telegramButton .liquid::before {
  content: "";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -75%);
  background: #000;
}

.telegramButton .liquid::before {
  border-radius: 45%;
  background: rgba(20, 20, 20, 1);
  animation: animate 5s linear infinite;
}

.telegramButton .liquid::after {
  border-radius: 40%;
  background: rgba(20, 20, 20, 0.5);
  animation: animate 10s linear infinite;
}

.telegramButton:hover .liquid {
  top: -120px;
}

@keyframes animate {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
</style>

<style lang="sass">
.heroSection
  position: relative
  clip-path: polygon(0 0, 100% 0, 100% 70vh, 0 100%)

.heroHeader
  text-align: center
  text-transform: uppercase
  font-size: 5rem !important

.heroDetail
  text-align: center
  font-size: 1rem

.heroButton
  margin: auto
  margin-top: 4rem

.circle
  stroke: white
  stroke-dasharray: 650
  stroke-dashoffset: 650
  -webkit-transition: all 0.5s ease-in-out
  opacity: 0.3

#about
  margin-top: 8rem

.headingWithBgtext
  position: relative
  &::before
    position: absolute
    content: "WHAT WE OFFER"
    opacity: .2
    left: 50%
    transform: translateX(-50%) scale(2.2)

.aboutWithBgtext
  position: relative
  &::before
    position: absolute
    content: "ABOUT US"
    opacity: .2
    left: 50%
    transform: translateX(-50%) scale(2.2)

#download
  margin-top: 8rem
  padding-top: 2rem
  background-image: url("~@/assets/images/tele.jpg")
  background-attachment: fixed
  background-repeat: no-repeat
  background-size: cover
  background-position: center
  height: 500px
  position: relative

  &:before
    content: ""
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.8)

.contactFormWrapper
  display: flex
  gap: 3rem
  max-width: 1200px
  margin: auto

#contact
  background-color: #f4f7f5

.svg-border-waves .v-image
  position: absolute
  bottom: 0
  left: 0
  height: 3rem
  width: 100%
  overflow: hidden

.playBut
  /*  border: 1px solid red;*/
  display: inline-block
  -webkit-transition: all 0.5s ease

  .triangle
    -webkit-transition: all 0.7s ease-in-out
    stroke-dasharray: 240
    stroke-dashoffset: 480
    stroke: white
    transform: translateY(0)

  &:hover

    &
      stroke-dashoffset: 0
      opacity: 1
      stroke: white
      animation: nudge 0.7s ease-in-out

    @keyframes nudge
      0%
        transform: translateX(0)

      30%
        transform: translateX(-5px)

      50%
        transform: translateX(5px)

      70%
        transform: translateX(-2px)

      100%
        transform: translateX(0)

    .circle
      stroke-dashoffset: 0
      opacity: 1
@media screen and (max-width: 720px)
  .heroSection
    clip-path: polygon(0 0, 100% 0, 100% 98vh, 0 100%)
  .heroHeader
    font-size: 42px !important
  .headerTextWrapper
    justify-content: center !important
    transform: translateY(-8rem) !important
  .contactFormWrapper
    flex-direction: column !important
  .map-image
    margin-bottom: 1rem !important
</style>

<style>
.btn-play {
  transition: 0.2s;
}
.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
#hero {
  z-index: 0;
 
}

.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}
.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style>
section {
  position: relative;
}
</style>
