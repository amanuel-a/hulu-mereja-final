// import '@fontawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);
export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#2D5976",
                secondary: "#FFFFFF",
                btncolor:"#6C63FF",
                paycolor:"#00FF7F",
                foot:"blue",
                accent: "3D87E4",
                detailButton:"#7B58FE",
                black:"#000000"
            }
        }
    },
    icons: {
        iconfont: 'md' || 'fa',
      },
});
