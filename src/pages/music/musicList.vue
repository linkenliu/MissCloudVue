<template>
  <div style="align-content: center">
    <back></back>
    <Loading v-show="isLoading"></Loading>
    <musicList :data="list"></musicList>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  import back from './components/back'
  import Loading from '@/components/Loading'
  import musicList from './components/musicList'
  export default {
    components: {
      back,musicList,Loading
    },
    data() {
      return {
          list:[],
        isLoading:true
      };
    },
    computed: {

    },

    methods: {
      load (){
        let idx = this.$route.params.rankId;
        api.topList({idx:idx}).then(res =>{
          this.list = res.data.result.tracks;
          this.isLoading = false;
        });
      }
    },
    created: function () {
      this.load();
    }
  }
</script>


<style>

</style>

