<!-- 

<template>
  <div class="letter" style="margin-top: 8rem">
    <h1>{{ post.cname }}</h1>
    <p>{{ post.behaviour }}</p>
    <div>
      <h3 style="display: inline-block">{{ post.title }}</h3>
      <span style="margin-left: 1rem; color: #0000ff"
        >( {{ post.j_type }} )</span
      >
      <p style="white-space: pre-wrap; margin-top: 1rem">
        {{ post.skills }}
      </p>
      <br />
      <div class="text-capitalize mb-4">
        <strong>Location:</strong> {{ post?.location }}
      </div>
      <div class="text-capitalize mb-4">
        <strong>Experiences:</strong> {{ post?.experience }}
      </div>
      <div class="text-capitalize mb-4">
        <strong>Working Type:</strong> {{ post?.w_type }}
      </div>
      <div class="text-capitalize mb-4">
        <strong>Starting Date:</strong> {{ post?.startDate?.substring(0, 10) }}
      </div>
      <div class="text-capitalize mb-4">
        <strong>DeadLine:</strong> {{ post?.endDate?.substring(0, 10) }}
      </div>
      <p><strong>Salary:</strong> {{ post.salary }}</p>
      <br />
      <p v-if="post?.apply">How to apply: {{ post.apply }}</p>
      <br />
    </div>
  </div>
</template>

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

  <script>
import getpost from "../service/authonticationService";
export default {
  data() {
    return {
      post: {},
      promotions: [],
    };
  },
  async created() {
    try {
      const response = await getpost.getPostById(this.$route.params.id);
      this.post = response.data;

      const res = await getpost.getPromotion();
      var allPromotion = res.data;
      var c = 0;
      for (c = 0; c < allPromotion.length; c++) {
        this.promotions.push(allPromotion[c]);
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {},
};
</script> -->