

<template>
  <div class="letter">
    <h1>{{ post.cname }}</h1>
    <p>{{ post.behaviour }}</p>
    <div>
      <h3 style="display: inline-block">{{ post.title }}</h3>
      <span style="margin-left: 1rem; color: #0000ff">( {{ post.j_type }} )</span>
      <p style="white-space: pre-wrap; margin-top: 1rem">
        {{ post.skills }}
      </p>
      <br />
      <p><span style="color: #0000ff">Salary:</span> {{ post.salary }}</p>
      <v-card-actions>
        <v-btn
          text
          @click="UpdateInfo(`${post._id}`)"
          v-if="
            $store.state.isUserLoggedIn && $store.state.user.status == 'admin'
          "
        >
          <span class="text-capitalize primary--text">Update</span>
        </v-btn>
        <v-btn
          text
          @click="DeleteInfo(`${post._id}`)"
          v-if="
            $store.state.isUserLoggedIn && $store.state.user.status == 'admin'
          "
        >
          <span class="text-capitalize primary--text">Delete</span>
        </v-btn>
        <v-spacer></v-spacer>
        <div class="primary--text">
          <v-btn text @click="more(`${post._id}`)">
            <span class="text-capitalize">Read More</span>
            <v-icon size="24px">mdi-arrow-right-bold</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobCard",
  props: ["post", "UpdateInfo", "DeleteInfo", "more"],
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