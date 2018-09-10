import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Main from "@/Main";

Vue.use(Buefy, {
    defaultIconPack: "fas"
});

new Vue({
  render: h => h(Main)
}).$mount('#app');
