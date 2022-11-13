<template>
  <div style="z-index: 999" >
    <v-navigation-drawer v-model="drawer" app temporary dark class="secondary">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="@/assets/img/newlogo.png" alt="Logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">Get-in</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list dense v-if="!$store.state.isUserLoggedIn">
        <v-list-item 
          v-for="([icon, text, link], i) in itemsOne"
          :key="i"
          link
          
          @click="navigator({ name: link })"
        >
          <v-list-item-icon class="justify-center">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        v-if="
          $store.state.isUserLoggedIn && $store.state.user.status != 'admin'
        "
      >
        <v-list-item
          v-for="([icon, text, link], i) in itemsTwo"
          :key="i"
          link
          
          @click="navigator({ name: link })"
        >
          <v-list-item-icon class="justify-center">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        v-if="
          $store.state.isUserLoggedIn && $store.state.user.status == 'admin'
        "
      >
        <v-list-item
          v-for="([icon, text, link], i) in itemsThree"
          :key="i"
          link
          @click="navigator({ name: link })"
        >
          <v-list-item-icon class="justify-center " id="navlist">
            <v-icon >{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      :color="color"
      :flat="flat"
     light
      class="px-15"
      :class="{ expand: flat }"
    >
      <v-toolbar-title>
        <v-img src="@/assets/img/newlogo.png" max-width="50px" />
        <!-- <h2>Get-in</h2> -->
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon 
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
      <div v-else>
        <div
          v-if="!$store.state.isUserLoggedIn"
          class="hidden-sm-only hidden-xs-only"
       

        >
          <v-btn color="black" text @click="navigator({ name: 'home' })">
            <span class="text-capitalize mr-1">Home</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'jobs' })">
            <span class="text-capitalize mr-1">Jobs</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'tenders' })">
            <span class="text-capitalize mr-1">Tenders</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'freelancers' })">
            <span class="text-capitalize mr-1">Freelancers</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'auth' })"v-if="!$store.state.isUserLoggedIn">
            <span class="text-capitalize mr-1">Sign in</span>
          </v-btn>
          <v-btn color="white"
            rounded
            outlined
            text
                    
            @click="navigator({ name: 'auth' })"
            v-if="!$store.state.isUserLoggedIn"
            style="backgroundColor:#6C63FF"
          >
            <span class="text-capitalize">SignUp</span>
          </v-btn>
        </div>
        <div
          class="hidden-sm-and-down"
          v-if="
            $store.state.isUserLoggedIn && $store.state.user.status != 'admin'
          "
        >
          <v-btn color="black" text @click="navigator({ name: 'home' })">
            <span class="text-capitalize mr-1">Home</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'jobs' })">
            <span class="text-capitalize mr-1">Jobs</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'tenders' })">
            <span class="text-capitalize mr-1">Tenders</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'freelancers' })">
            <span class="text-capitalize mr-1">Freelancers</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'profile' })">
            <span class="text-capitalize">Your Profile</span>
          </v-btn>
          <v-btn
            rounded
            outlined
            text
            v-if="$store.state.isUserLoggedIn"
            @click="logout()"
          >
            <span class="text-capitalize">Logout</span>
          </v-btn>
        </div>
        <div
          class="hidden-sm-and-down"
          v-if="
            $store.state.isUserLoggedIn && $store.state.user.status == 'admin'
          "
        >
          <v-btn color="black" text @click="navigator({ name: 'addJobs' })">
            <span class="text-capitalize">+Jobs</span>
          </v-btn>
          <v-btn color="black" text @click="navigator({ name: 'addTenders' })">
            <span class="text-capitalize">+Tenders</span>
          </v-btn>
          <v-btn text @click="navigator({ name: 'jobs' })">
            <span class="text-capitalize">Jobs</span>
          </v-btn>
          <v-btn text @click="navigator({ name: 'tenders' })">
            <span class="text-capitalize">Tenders</span>
          </v-btn>
          <v-btn text @click="navigator({ name: 'price' })">
            <span class="text-capitalize">Price</span>
          </v-btn>
          <v-btn text @click="navigator({ name: 'viewOrder' })">
            <span class="text-capitalize">View order</span>
          </v-btn>
          <v-btn text @click="navigator({ name: 'promotion' })">
            <span class="text-capitalize">Promotion</span>
          </v-btn>
          <v-btn
            rounded
            outlined
            text
            v-if="$store.state.isUserLoggedIn"
            @click="logout()"
          >
            <span class="text-capitalize">Logout</span>
          </v-btn>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>
<style scoped>
#navlist{
  color: black;
}
.v-toolbar {
  transition: 0.6s;
 
}
.expand {
  height: 80px !important;
  padding-top: 10px;
}

</style>
<script>
export default {
  data: () => ({
    drawer: null,
    isXs: false,
    itemsOne: [
      ["mdi-home-outline", "Home", "home"],
      ["mdi-briefcase-outline ", "Jobs", "jobs"],
      ["mdi-nintendo-wiiu ", "Tenders", "tenders"],
      ["mdi-clipboard-account", "Freelancers", "freelancers"],
      ["mdi-login-variant ", "Signin/Signup", "auth"],
    ],
    itemsTwo: [
      ["mdi-home-outline", "Home", "home"],
      ["mdi-briefcase-outline ", "Jobs", "jobs"],
      ["mdi-nintendo-wiiu", "Tenders", "tenders"],
      ["mdi-clipboard-account ", "Freelancers", "freelancers"],
      ["mdi-account-circle ", "Your Profile", "profile"],
    ],
    itemsThree: [
      ["mdi-briefcase-plus-outline ", "+Jobs", "addJobs"],
      ["mdi-nintendo-wiiu", "+Tenders", "addTenders"],
      ["mdi-briefcase-outline", "Jobs", "jobs"],
      ["mdi-nintendo-wiiu", "Tenders", "tenders"],
      ["mdi-bulletin-board  ", "Price", "price"],
      ["mdi-bell-outline ", "View Order", "viewOrder"],
      ["mdi-professional-hexagon  ", "Promotion", "promotion"],
    ],
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    navigator(route) {
      this.$router.push(route);
      window.scrollTo(0, 0);
      
    },
    logout() {
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setToken", null);
      this.$router.push({ name: "home" });
      window.scrollTo(0, 0);
    },
  },
  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>
