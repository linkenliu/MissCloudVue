<template>
  <div style="align-content: center">
    <back></back>
    <musicList :data="music.recommendSongList"></musicList>
  </div>
</template>


<script>
  import back from './components/back'
  import musicList from './components/musicList'
  import {mapState} from 'vuex'
  import Default from '@/config/default.js'
  import api from '@/api/index.js'
  import Loading from '@/components/Loading'
  export default {
    components: {
      back,musicList,Loading
    },
    data() {
      return {
        isLoading:true
      };
    },
    computed: {
      ...mapState([
        'music'
      ])
    },
    beforeMount () {

    },
    methods: {
      load(){
        api.recommendSongs({}).then(res => {
          if (res.data.recommend) {
            this.isLoading = false;
          this.$store.commit('setRecommendSongList', res.data.recommend);
        } else {
            this.isLoading = false;
            this.$store.commit('setRecommendSongList', Default.recommendSongs);
        }
      });
      }
    },
    created: function () {
        this.load()
    }
  }
</script>


<style>


</style>

