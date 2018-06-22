import Vue from 'vue';
import axios from 'axios';

import Buefy from 'buefy';

Vue.use(Buefy, {
    defaultIconPack: "fas"
});

Vue.config.productionTip = false;

let application = new Vue({
    el: '#app',

    data() {
        return {
            signable: '',
            signature: '',
        }
    },

    methods: {
        sign() {
            axios.post('/api/sign', {
                data: this.signable,
            })
                .then(r => {
                    this.signature = r.data;
                    console.log(r.data);
                })
                .catch(e => console.log(e))
        },
    }
});
