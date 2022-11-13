// import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify';
// import VueYouTubeEmbed from 'vue-youtube-embed'
// // import firebase from 'firebase/app'
// // import 'firebase/firestore'

// Vue.use(VueYouTubeEmbed)
// Vue.config.productionTip = false

// // firebase.initializeApp({
// //  Configurações do seu app
// // })

// // export const db = firebase.firestore()

// new Vue({
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
//New main from get in
import Vue from "vue";
import App from "./App.vue";
import ZoomOnHover from "vue-zoom-on-hover"
Vue.use(ZoomOnHover);
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store/store";
import { sync } from "vuex-router-sync"
sync(store, router);
Vue.config.productionTip = false;
import 'animate.css'
new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  render: h => h(App)
});

