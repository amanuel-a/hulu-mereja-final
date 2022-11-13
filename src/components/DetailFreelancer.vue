<template>
  <v-container>
    <div class="card-container">
      <div class="top">
        <img
          :src="`https://backend.hulumereja.com/upload/images/${detail.imageUrl}`"
          alt="user"
        />
        <div>
          <h3>{{ detail.fullName }}</h3>
          <h6>{{ detail.email }}</h6>
          <h6>{{ detail.phoneNumber }}</h6>
          <p>
            {{ detail.title }}
          </p>
        </div>
        <div class="skills">
          <h6>Skills</h6>
          <ul>
            <li>UI / UX</li>
            <li>Front End Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node</li>
          </ul>
        </div>
      </div>
    </div>
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
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

h3 {
  text-transform: uppercase;
  margin: 10px 0;
  font-size: 2rem;
}

h6 {
  margin: 5px 0;
  text-transform: uppercase;
}

p {
  font-size: 14px;
  margin-top: 1rem;
  line-height: 21px;
}

.card-container {
  width: 80%;
  margin-inline: auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  background-color: #231e39;
  border-radius: 5px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
  color: #b3b8cd;
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
  /* width: 350px; */
  max-width: 100%;
  /* text-align: center; */
}

img {
  width: 300px;
  height: 300px;
}

.top {
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  gap: 2rem;
}

.card-container .round {
  border: 1px solid #03bfcb;
  border-radius: 50%;
  padding: 7px;
}

button.primary {
  background-color: #03bfcb;
  border: 1px solid #03bfcb;
  border-radius: 3px;
  color: #231e39;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  padding: 10px 25px;
}

button.primary.ghost {
  background-color: transparent;
  color: #02899c;
}

.skills {
  margin-left: auto;
  text-align: left;
  padding: 15px;
  width: 400px;
}

.skills ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.skills ul li {
  border: 1px solid #2d2747;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  margin: 0 7px 7px 0;
  padding: 7px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>