<template lang="pug">
  section
    b-field(label="Input Data")
      b-input(maxlength="400" type="textarea" v-model="signable" @input="sign")
    b-field(label="Signature")
      b-input(maxlength="400" type="textarea" v-model="signature" readonly)
</template>

<script>
  import axios from "axios/index"

  export default {
    name: 'Main',
    components: {},
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
        })
        .catch(e => console.log(e))
      },
    },
  }
</script>
