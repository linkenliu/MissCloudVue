<template>
  <div id="app">
    <router-view v-on:childTellKeywords='listenKeyWords'></router-view>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast" leave-active-class="animated slideOutDown" mode="out-in">
    <Play v-show="isShowPlay"></Play>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast" leave-active-class="animated slideOutDown" mode="out-in">
    <PlayList v-show="isPlayList"></PlayList>
    </transition>

    <Search :keyWordsFull="keyWords" v-show="isSearch"></Search>
    <SearchResult v-show="isSearchResult"></SearchResult>

  </div>
</template>

<script>
  import Play from '@/pages/music/components/play'
  import Search from '@/pages/music/components/search'
  import SearchResult from '@/pages/music/components/searchResult'
  import PlayList from '@/pages/music/playList'
  import {mapState,mapMutations} from 'vuex'
  export default {
    name: 'app',
    components: {Play,PlayList,Search,SearchResult},
    data () {
      return {
        isShowPlay:false,
        isPlayList:false,
        isSearch:false,
        isSearchResult:false,
        playParams:{},
        keyWords:[]
      }
    },
    computed: {
      ...mapState([
        'playing'
      ])
    },
    methods: {
      ...mapMutations([
        'play', 'pause'
      ]),
      playMusic1 (){
        /*if (this.playing) {
          this.pause();
          document.getElementById('audio-music').pause();
        } else {
          this.play();
          document.getElementById('audio-music').play();
        }*/
        document.getElementById('audio-music').play();
      },
      listenKeyWords(cacheKeyWords){
        this.keyWords=cacheKeyWords;
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
