<template>
  <div style="align-content: center">
    <back></back>
    <Loading v-show="isLoading"></Loading>
    <musicList :data="music.hotSongList.tracks"></musicList>
  </div>
</template>

<script>
  import back from './components/back'
  import Loading from '@/components/Loading'
  import {mapState,mapMutations} from 'vuex'
  import musicList from './components/musicList'
  import api from '@/api/index.js'
  export default {
    components: {
      back,musicList,Loading
    },
    data() {
      return {
        isAudioShow:false,
        isLoading:true,
        hotSongs: []
      };
    },
    computed: {
      ...mapState([
        'music','playing'
      ])
    },
    beforeMount () {
      if(this.music.hotSongList && this.music.hotSongList.tracks){
        this.isLoading = false;
      }
      api.topList({idx:1}).then(res => {
        this.isLoading = false;
        this.$store.commit('setHotSongList', res.data.result);
      });
    },
    methods: {
    },
    created: function () {

    }
  }
</script>


<style>
  li {
    list-style-type: none;
    border-bottom: 1px solid #eeeeee;
    padding: 10px;
  }

</style>

