<template>
  <v-main class="mt-7">
    <br /><br />
    <v-row class="mx-3">
      <v-col cols="12" sm="10">
        <v-sheet min-height="70vh" rounded="lg">
          <h2 class="secondary--text text-center display-1">
            Details of the tender
          </h2>
          <v-card class="my-3" outlined>
             
            <v-row class="my-2 mx-2">
              <v-list-item-avatar
              tile
              size="80"
              color="grey"
              class="hidden-sm-only hidden-xs-only"
            >
              <img src="../assets/images/logologo.jpg" />
            </v-list-item-avatar>
              <v-card class="px-1 py-10" id="vc" outlined>
              <h4> <strong>{{ posts.title }}</strong></h4> 
              </v-card>
              <v-card class="px-9 py-1"  elevation="0"><h5>   
                <div class="text-capitalize mb-4">
                  <strong class="teal--text">Location:</strong
                  >{{ posts.location }}
                </div>
                <div class="text-capitalize mb-4">
                  <strong class="green--text">Start Date:</strong
                  >{{ posts.startDate.substring(0, 10) }}
                </div>
                <div class="text-capitalize mb-4">
                  <strong class="deep-orange--text">DeadLine:</strong
                  >{{ posts.endDate.substring(0, 10) }}
                </div>
                <div class="text-capitalize mb-4">
                  <strong class="teal--text">startingBirr:</strong
                  >{{ posts.startingBirr }}
                </div>

              </h5></v-card>
            </v-row>
            <v-row>
              <v-card class="my-2 mx-5" outlined>
                <v-list-item three-line>
                
                  <v-list-item-content>
                   
                    <div class="text-capitalize mb-4">
                      <strong class="teal--text">Essential Information:</strong>
                      <p style="white-space: pre-wrap">{{ posts.essential }}</p>
                    </div>
                    <div class="text-capitalize mb-4">
                      <strong class="teal--text"
                        >Additional Information:</strong
                      >
                      <p style="white-space: pre-wrap">
                        {{ posts.additionalInfo }}
                      </p>
                    </div>
                    <div class="text-capitalize mb-4">
                      <strong class="teal--text">How to apply:</strong>
                      <p style="white-space: pre-wrap">{{ posts.apply }}</p>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-row>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="2" class="hidden-sm-only hidden-xs-only">
        <v-sheet
          min-height="150"
          v-for="promot in promotions"
          :key="promot._id"
        >
          <br /><br />
          <v-card class="pa-1" outlined>
            <v-img
              :src="`https://backend.hulumereja.com/upload/images/${promot.imageUrl}`"
            ></v-img
            ><br />
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
    <br /><br />

    <br /><br />
  </v-main>
</template>
<script>
import getpost from "../service/authonticationService";
export default {
  data() {
    return {
      posts: {},
      promotions: [],
    };
  },
  async created() {
    try {
      const response = await getpost.getTenderPostById(this.$route.params.id);
      this.posts = response.data;
      const res = await getpost.getPromotion();
      var allPromotion = res.data;
      var c = 0;
      for (c = 0; c < allPromotion.length; c++) {
        this.promotions.push(allPromotion[c]);
      }
    } catch (err) {
      alert(err);
    }
  },
  methods: {},
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
#vc{
  max-width: 75%;
}
</style>
