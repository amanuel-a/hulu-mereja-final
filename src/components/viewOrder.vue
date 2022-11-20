<template>
  <v-main class="mt-7">
    <v-row class="mx-7">
      <v-col cols="12" sm="4">
        <v-sheet rounded="lg">
          <v-card class="mb-2 pa-5 borderRight" color="secondary">
            <v-toolbar color="btncolor" dark flat>
              <v-toolbar-title class="white--text hidden-sm-only hidden-xs-only"
                >Get</v-toolbar-title
              >
            </v-toolbar>
          </v-card>
          <v-card class="pa-5 hidden-sm-only hidden-xs-only">
            <v-layout wrap>
              <v-flex>
                <v-img src="../assets/images/jobs.jpg" height="120"></v-img
                ><br />
              </v-flex>
              <v-flex>
                <v-img src="../assets/images/tenders.jpg" height="120"></v-img
                ><br />
              </v-flex>
              <v-flex outlined>
                <v-img
                  src="../assets/images/freelancerThree.jpg"
                  height="120"
                ></v-img
                ><br />
              </v-flex>
            </v-layout>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="6">
        <v-sheet class="pa-3" v-if="loading">
          <v-skeleton-loader
            v-bind="attrs"
            type="list-item-three-line, card-heading, list-item-three-line, card-heading"
          ></v-skeleton-loader>
          <v-skeleton-loader
            v-bind="attrs"
            type="divider, list-item-three-line, card-heading, list-item-three-line, card-heading"
          ></v-skeleton-loader>
        </v-sheet>
        <v-sheet min-height="70vh" rounded="lg" class="py-1">
          <v-card
            class="mx-3 my-3"
            v-for="order in orders"
            :key="order._id"
            @click="detail(`${order._id}`)"
          >
            <v-list-item three-line>
              <v-avatar size="60">
                <img
                  :src="`https://backend.hulumereja.com/upload/images/${order.profilePicture}`"
                  :alt="order.fullName"
              /></v-avatar>
              <v-list-item-content v-if="order.paymentType === 'tender'">
                <span class="px-3"
                  ><strong> {{ order.fullName }}</strong> paid to get tender and
                  participate in tender</span
                >
              </v-list-item-content>
              <v-list-item-content v-if="order.paymentType === 'freelancer'">
                <span class="px-3"
                  ><strong>{{ order.fullName }}</strong> paid to be
                  freelancer</span
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <div class="text-xs-center btncolor mx-3 my-5">
            <v-btn text @click="feachData" block
              ><span class="text-capitalize secondary--text"
                >Load More</span
              ></v-btn
            >
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <v-card class="pa-3" color="#f5f5f5" outlined>
            <v-layout wrap>
              <v-flex>
                <v-img src="../assets/images/part1.png" height="80"></v-img
                ><br />
              </v-flex>
              <v-flex>
                <v-img
                  src="../assets/images/cientTekelebirhan.jpg"
                  height="80"
                ></v-img
                ><br />
              </v-flex>
              <v-flex>
                <v-img src="../assets/images/part2.png" height="80"></v-img>
              </v-flex>
            </v-layout>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
    <br /><br />

    <br /><br />
  </v-main>
</template>
<script>
import getOrd from "../service/authonticationService";
export default {
  data() {
    return {
      orders: [],
      pageNumber: 0,
      loading: false,
    };
  },
  async mounted() {
    window.scrollTo(0, 0);
    this.loading = true;
    try {
      this.pageNumber++;
      const response = await getOrd.getOrder(this.pageNumber);
      var allOrder = response.data;
      var counter = 0;
      for (counter = 0; counter < 1; counter++) {
        this.orders.push(allOrder[counter]);
      }
      this.loading = false;
    } catch (err) {
      this.loading = true;
    }
  },
  methods: {
    async detail(gid) {
      this.$router.push({ name: "orderDetail", params: { id: gid } });
      window.scrollTo(0, 0);
    },
    async feachData() {
      try {
        this.pageNumber++;
        this.orders = [];
        const response = await getOrd.getOrder(this.pageNumber);
        var allOrder = response.data;
        var counter = 0;
        for (counter = 0; counter < 5; counter++) {
          this.orders.push(allOrder[counter]);
        }
        window.scrollTo(0, 0);
      } catch (err) {
        alert(err);
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
