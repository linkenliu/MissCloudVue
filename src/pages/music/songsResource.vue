<template>
  <div style="align-content: center">
      <back></back>
      <Loading v-show="isLoading"></Loading>
      <musicList :data="list"></musicList>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import back from './components/back'
  import Loading from '@/components/Loading'
  import api from '@/api/index.js'
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
    computed: {},

    methods: {
      load (){
        let id = this.$route.query.id;
        api.recommendResourceDetail({id: id}).then(res => {
          this.list = res;
          this.isLoading = false
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

