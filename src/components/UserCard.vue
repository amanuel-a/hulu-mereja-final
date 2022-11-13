<template>
  <div class="box">
    <div class="content">
      <!-- <h2>01</h2> -->
      <div class="text-center">
        <v-avatar size="100">
          <img
            class="userImage"
            style="object-fit: cover"
            :src="`https://backend.hulumereja.com/upload/images/${freelancer.imageUrl}`"
          />
        </v-avatar>
      </div>
      <h3>{{ freelancer.title }}</h3>
      <p>
        {{ freelancer.detail }}
      </p>
      <button @click="detail(freelancer._id)" href="#">View More</button>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;800&display=swap");

.box {
  position: relative;
  width: 300px;
  background: #2a2b2f;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s;
}

.box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.03);
}

.box .content {
  padding: 20px;
  text-align: center;
}

.box .content h2 {
  position: absolute;
  top: -10px;
  right: 30px;
  font-size: 8rem;
  color: rgba(255, 255, 255, 0.1);
}

.box .content h3 {
  font-size: 1.8rem;
  color: #fff;
  z-index: 1;
  transition: 0.5s;
  margin-bottom: 15px;
}

.box .content p {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  transition: 0.5s;
}

.box .content button {
  position: relative;
  display: inline-block;
  padding: 8px 20px;
  background: black;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  margin-top: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}
.box .content a:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
  background: #fff;
  color: #000;
}
</style>

<script>
export default {
  name: "UserCard",
  props: ["freelancer", "detail"],
};
</script>