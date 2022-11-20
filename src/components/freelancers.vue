<template>
  <div style="margin-top: 8rem; margin-bottom: 8rem">
    <br /><br />
    <h1
      class="text-center headingWithBgtext"
      style="
        text-transform: uppercase;
        margin-bottom: 5rem;
        font-weight: bold;
        color: #1f9ccd;
      "
    >
      Freelancers
    </h1>
    <v-container>
      <div style="display: flex; justify-content: center; gap: 2rem">
        <div style="width: 300px; margin-bottom: 4rem; flex-grow: 0">
          <v-autocomplete
            style="margin-bottom: 0"
            :items="categories"
            v-model="selectedCategory"
            auto-select-first
            outlined
            dense
          ></v-autocomplete>
        </div>

        <h1 class="jt --debug">
          <span class="jt__row">
            <span class="jt__text">Categories</span>
          </span>


        </h1>
      </div>
      <div v-if="loading">
        <div
          style="
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 3rem;
          "
        >
          <v-sheet
            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            class="pa-3"
          >
            <v-skeleton-loader width="300" type="card"></v-skeleton-loader>
          </v-sheet>
          <v-sheet
            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            class="pa-3"
          >
            <v-skeleton-loader width="300" type="card"></v-skeleton-loader>
          </v-sheet>
        </div>
      </div>
      <div
        v-else
        style="
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 3rem;
        "
      >
        <UserCard2
          v-for="free in freelancers"
          :key="free._id"
          :freelancer="free"
          :detail="detail"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import post from "../service/authonticationService";
import UserCard from "./UserCard.vue";
import UserCard2 from "./UserCard2.vue";
export default {
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  data() {
    return {
      freelancers: [],
      loading: true,
      tab: null,
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
      categories: [
        "Freelance job category",
        "Customer Service",
        "Software Development",
        "Sales and Marketing",
        "Network and Information systems",
        " Business Services",
        "Writing and Translation",
        "Administration Support",
        "Design and Multimedia",
      ],
      selectedCategory: "Freelance job category",
    };
  },
  components: {
    UserCard,
    UserCard2
  },
  async mounted() {
    const response = await post.getFreelancer();
    var allFreelancer = response.data;
    var counter = 0;
    for (counter = 0; counter < allFreelancer.length; counter++) {
      if (
        allFreelancer[counter].status == "freelancer" &&
        allFreelancer[counter]._id != "$store.state.user._id"
      )
        if (
          allFreelancer[counter].title === "Web development" ||
          allFreelancer[counter].title === "Web programming" ||
          allFreelancer[counter].title === "E-commerce" ||
          allFreelancer[counter].title === "UI design"
        )
          this.freelancers.push(allFreelancer[counter]);
    }
    this.loading = false;
  },
  watch: {
    selectedCategory() {
      this.category(this.selectedCategory);
    },
  },
  methods: {
    async category(item) {
      this.loading = true;
      this.freelancers = [];
      const response = await post.getFreelancer();
      var allFreelancer = response.data;
      var counter = 0;
      if (item === "Freelance job category") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Web development" ||
              allFreelancer[counter].title === "Web programming" ||
              allFreelancer[counter].title === "E-commerce" ||
              allFreelancer[counter].title === "UI design"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      } else if (item === "Customer Service") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Customer Service and Support" ||
              allFreelancer[counter].title === "Technical support" ||
              allFreelancer[counter].title === "Phone Support" ||
              allFreelancer[counter].title === "Other customer Service" ||
              allFreelancer[counter].title === "Order Processing"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      } else if (item === "Software Development") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Desktop application" ||
              allFreelancer[counter].title === "Game development" ||
              allFreelancer[counter].title === "Software Plugins" ||
              allFreelancer[counter].title === "Mobile applications" ||
              allFreelancer[counter].title === "Application interface design" ||
              allFreelancer[counter].title === "Software project Management"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      } else if (item === "Sales and Marketing") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Advertising" ||
              allFreelancer[counter].title === "Email Marketing" ||
              allFreelancer[counter].title === "Search engine Marketing" ||
              allFreelancer[counter].title === "Social media Marketing" ||
              allFreelancer[counter].title === "Public Relation" ||
              allFreelancer[counter].title === "Telemarketing and telesales" ||
              allFreelancer[counter].title === "Market research and surveys" ||
              allFreelancer[counter].title === "Sales" ||
              allFreelancer[counter].title === "Search engine Optimization"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      } else if (item === "Network and Information systems") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Network Administration" ||
              allFreelancer[counter].title === "Database Administration" ||
              allFreelancer[counter].title === "Server Administration"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      } else if (item === "Writing and Translation") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Technical Writing" ||
              allFreelancer[counter].title === "Website Content" ||
              allFreelancer[counter].title === "Blog and article Writing" ||
              allFreelancer[counter].title === "Copywriting" ||
              allFreelancer[counter].title === "Other-writing and Translation"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      } else if (item === "Business Services") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Accounting" ||
              allFreelancer[counter].title === "HR/P" ||
              allFreelancer[counter].title === "Finance service and planning" ||
              allFreelancer[counter].title === "Legal" ||
              allFreelancer[counter].title === "Project Manager" ||
              allFreelancer[counter].title === "Business Consulting" ||
              allFreelancer[counter].title === "Recruiting" ||
              allFreelancer[counter].title === "Statistical Analysis"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      } else if (item === "Administration Support") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Data entry" ||
              allFreelancer[counter].title === "Personal Assistant" ||
              allFreelancer[counter].title === "Web" ||
              allFreelancer[counter].title === "Email response handling"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      } else if (item === "Design and Multimedia") {
        for (counter = 0; counter < allFreelancer.length; counter++) {
          if (
            allFreelancer[counter].status == "freelancer" &&
            allFreelancer[counter]._id != "$store.state.user._id"
          )
            if (
              allFreelancer[counter].title === "Graphic Design" ||
              allFreelancer[counter].title === "Logo Design" ||
              allFreelancer[counter].title === "Paint Design" ||
              allFreelancer[counter].title === "3D Design" ||
              allFreelancer[counter].title === "Audio Production" ||
              allFreelancer[counter].title === "Video Production" ||
              allFreelancer[counter].title === "Animation" ||
              allFreelancer[counter].title ===
                "Engineering and Technical Design"
            )
              this.freelancers.push(allFreelancer[counter]);
        }
      }
      if (this.freelancers.length != 0) {
        this.loading = false;
      }
    },
    async more(gid) {
      this.$router.push({ name: "beFreelancer", params: { id: gid } });
      window.scrollTo(0, 0);
    },
    async detail(gid) {
      this.$router.push({ name: "freelancerDetail", params: { id: gid } });
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");

.jt {
  position: relative;
  font-size: 5vmin;
  font-family: "Staatliches", sans-serif;
  text-transform: uppercase;
  font-display: swap;
color: #0b3e6f;
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