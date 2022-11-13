<template>
  <div class="letter">
    <p>
      {{ tender.title }}
    </p>
    <div>
      <span style="font-weight: bold; color: #1f9ccd; margin-right: 10px"
        >Location:</span
      >
      <p style="display: inline-block">{{ tender.location }}</p>
      <br />
      <span style="font-weight: bold; color: #1f9ccd; margin-right: 10px"
        >Bides Opening:</span
      >
      <p style="display: inline-block">
        {{ tender.startDate.substring(0, 10) }}
      </p>
      <br />
      <span style="font-weight: bold; color: #1f9ccd; margin-right: 10px"
        >Bides Closing:</span
      >
      <p style="display: inline-block">{{ tender.endDate.substring(0, 10) }}</p>
      <br />
    </div>
    <div style="margin-top: 2rem; display: flex; justify-content: flex-end">
      <v-btn
        text
        @click="UpdateInfo(`${tender._id}`)"
        v-if="
          $store.state.isUserLoggedIn && $store.state.user.status == 'admin'
        "
      >
        <span class="text-capitalize primary--text">Update</span>
      </v-btn>
      <v-btn
        text
        @click="DeleteInfo(`${tender._id}`)"
        v-if="
          $store.state.isUserLoggedIn && $store.state.user.status == 'admin'
        "
      >
        <span class="text-capitalize primary--text">Delete</span>
      </v-btn>
      <v-btn depressed color="primary" @click="more(`${tender._id}`)">
        Read more
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "TenderCard",
  props: ["tender", "UpdateInfo", "DeleteInfo", "more"],
  mounted() {
    console.log(this.tender);
  },
};
</script>

<style scoped>
.letter {
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 26px auto 0;
  max-width: 100%;
  min-height: 300px;
  padding: 24px;
  position: relative;
  width: 80%;
  z-index: 0;
  margin-bottom: 6rem;
}
.letter:before,
.letter:after {
  content: "";
  height: 98%;
  position: absolute;
  width: 100%;
  z-index: -1;
}
.letter:before {
  background: #fafafa;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  left: -5px;
  top: 4px;
  transform: rotate(-2.5deg);
}
.letter:after {
  background: #f6f6f6;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  right: -3px;
  top: 1px;
  transform: rotate(1.4deg);
}
</style>