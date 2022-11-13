<template>
  <v-app>
    <navigation :color="color" :flat="flat" />
    <v-main class="pt-0">
      <router-view></router-view>
      
    </v-main>
    
    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="#6C63FF"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <About />
    <foote />
    <freelancer />
  </v-app>
</template>

  


<style lang="sass">
@media screen and (max-width: 720px)
  .headingWithBgtext,
  .aboutWithBgtext
    font-size: 28px !important
    &::before
      display: none
</style>


<script>
import navigation from "./components/Navigation";
import foote from "./components/Footer";
import freelancer from "./components/beFreelancer.vue";

export default {
  name: "App",
  components: {
    navigation,
    foote,
  },
  data: () => ({
    fab: null,
    color: "",
    flat: null,
  }),
  created() {
    const top = window.pageYOffset || 0;
    if (this.$router.currentRoute.path === "/" && top <= 60) {
      this.color = "transparent";
      this.flat = true;
    }
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "secondary";
        this.flat = false;
      } else if (this.$router.currentRoute.path === "/") {
        this.color = "transparent";
        this.flat = true;
      }
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>