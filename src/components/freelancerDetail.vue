<template>
  <v-container>
    <br /><br /><br />
    <v-row no-gutters>
      <v-col cols="12" sm="7" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <v-img
            :src="`https://backend.hulumereja.com/upload/images/${detail.imageUrl}`"
            height="400"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="5" class="pa-5 mx-auto">
        <v-card class="pa-2" min-height="415">
          <v-card-title>{{ detail.fullName }}</v-card-title>
          <v-card-text>
            <p>Email:{{ detail.email }}</p>
            <p>Phone number:{{ detail.phoneNumber }}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle>
            <p class="primary--text pl-3">{{ detail.title }}</p>
          </v-card-subtitle>
          <v-card-text class="grey--text">
            <p>{{ detail.detail }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
  </v-container>
</template>
<script>
import getdetail from "../service/authonticationService";
export default {
  data() {
    return {
      detail: {},
    };
  },
  async created() {
    try {
      const response = await getdetail.getDetailById(this.$route.params.id);
      this.detail = response.data;
    } catch (err) {
      alert(err);
    }
  },
  methods: {},
};
</script>