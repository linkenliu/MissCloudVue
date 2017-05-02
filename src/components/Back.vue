<template>
  <div  style="align-content: center">
    <md-toolbar class="top-nav" v-md-theme="theme.bgColor">
      <md-button class="md-icon-button" @click.native="toback()">
        <md-icon><i class="iconfont icon-back"></i></md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1;text-align: center" v-text="theme.topbarTitle"></h2>
      <md-button class="md-icon-button">
        <md-icon><i class="iconfont icon-logout"></i></md-icon>
      </md-button>
    </md-toolbar>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapState([
        'theme'
      ])
    },
    beforeMount () {
      let action = this.$route.path;
      action = action.substring(1,action.length);
      this.$store.commit('setTheme',{bgColor:'',action:action});
    },
    methods: {
      toback () {
        this.$router.go(-1);
      }
    },
    created: function () {

    }
  }
</script>


<style>

</style>

