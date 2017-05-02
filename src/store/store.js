import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config/config'
import utils from '../utils'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playing: false,
    currentTime: 0,
    duration: 0,
    index: 0,
    playMode: 2,
    isLoop: false,
    music: {
      recommendSongList: [],
      hotSongList: [],
      resourceSongList: []
    },
    rank: {
      officialRank: [],
      globalList: []
    },
    theme: {
      bgColor: '',
      topbarTitle: ''
    },
    song: {
      id: '',
      songName: '',
      mp3Url: '',
      singer: '',
      picUrl: ''
    },
    lyric: "",
    playList: [],
    searchList: [],
    singerInfo: {},
    isFlagBack: false,
    singerNavFlag: 'hot',
    cacheKeyWords: [],
    iskeyWords: true
  },
  mutations: {
    setRecommendSongList (state, recommendSongList){
      state.music.recommendSongList = recommendSongList;
    },
    setHotSongList (state, data){
      state.music.hotSongList = data;
    },
    setRecommendResourceList (state, data){
      state.music.resourceSongList = data;
    },
    setTheme (state, theme){
      let action = theme.action;
      state.theme.topbarTitle = utils.computedTheme(action).topbarTitle;
      if (utils.computedTheme(action).bgColor) {
        state.theme.bgColor = utils.computedTheme(action).bgColor;
      }
    },
    setSong (state, data){
      state.song = data;
    },
    play (state){
      state.playing = true
    },
    pause (state){
      state.playing = false
    },
    updateDuration (state, time) {
      state.duration = time
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    setPlayList (state, data){
      state.index = data.index;
      state.playList.push(data.object);
    },
    setPlayIndex (state, index){
      state.index = index;
    },
    removePlayList (state, index){
      state.playList.splice(index, 1)
    },
    addToPlayList (state, object){
      state.playList.push(object);
    },
    playNext (state) {
      /* state.index = (state.index + 1) % state.playList.length;
       state.song = state.playList[state.index]*/
      if (state.playMode === 1) {
        state.index = (state.index + 1) % state.playList.length
        state.song = state.playList[state.index]
      } else if (state.playMode === 2) {
        state.index = (state.index + 1) % state.playList.length
        state.song = state.playList[state.index]
      } else {
        state.index = Math.floor(Math.random() * state.playList.length)
        state.song = state.playList[state.index];
      }
    },
    playPrev (state){
      state.index = (state.index - 1 + state.playList.length) % state.playList.length;
      state.song = state.playList[state.index]
    },
    changePlayMode (state, item){
      item == 1 ? state.isLoop = true : state.isLoop = false;
      state.playMode = item;
    },
    setSearchList (state, data){
      state.searchList = data;
    },
    setSingerInfo (state, data){
      state.singerInfo.singerInfo = data.singerInfo;
      state.singerInfo.data = data.data;
    },
    setBankOffic (state, data){
      state.rank.officialRank = data;
    },
    setBankGlobal (state, data){
      state.rank.globalList = data;
    }
  },
  getters: {
    currentTime: state => {
      return parseInt(state.currentTime / 60) + ':' + (Array(2).join(0) + (state.currentTime % 60)).slice(-2)
    },
    duration: state => {
      if (isNaN(state.duration)) {
        return '0:00'
      } else {
        return parseInt(state.duration / 60) + ':' + (Array(2).join(0) + (state.duration % 60)).slice(-2)
      }
    }
  },
  actions: {
    playContinue({commit, state}) {
      if (state.playList.length <= 1) {
        document.getElementById('audio-music').currentTime = 0;
        commit('updateCurrentTime', 0)
        state.song = state.playList[0]
        return;
      }
      if (state.playMode === 1) {
        //document.getElementById('audio-music').pause();
        //document.getElementById('audio-music').play();
      } else if (state.playMode === 2) {
        state.index = (state.index + 1) % state.playList.length
        state.song = state.playList[state.index]
      } else {
        state.index = Math.floor(Math.random() * state.playList.length)
        state.song = state.playList[state.index]
      }
    }
  }
});


export default store
