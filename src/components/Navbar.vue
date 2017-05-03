<template>
  <div>
    <md-toolbar v-show="isBack" class="top-nav" v-md-theme="theme.bgColor">
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon><i class="iconfont icon-menu"></i></md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1;text-align: center" v-text="theme.topbarTitle"></h2>
      <md-button class="md-icon-button">
        <md-icon><i class="iconfont icon-logout"></i></md-icon>
      </md-button>
    </md-toolbar>

    <div style="align-content: center;" v-show="!isBack">
      <md-toolbar class="top-nav" v-md-theme="theme.bgColor">
        <md-button v-show="searchMode==false&&!isFlagBack" class="md-icon-button" @click.native="toggleLeftSidenav">
          <md-icon><i class="iconfont icon-menu"></i></md-icon>
        </md-button>
        <i class="music-seach-icon"></i>
        <input @click="keyUp()"  placeholder="搜索音乐,歌词,歌手;搜索回车" @keyup.enter="search()" v-model="keyword" id="searchText" class="md-title search"
               style="font-size: 14px;padding-left: 30px;outline:none;width: 70%;border-radius: 20px;background: rgba(255, 255, 255, 0.3);border: 1px solid;color: #fff"/>
        <md-button class="md-icon-button" style="position: absolute;right: 0">
          <md-icon v-show="searchMode==false&&!isFlagBack" @click.native="isShowPlay()">
            <img v-if="playing==true" src="../../static/images/icon-article1.gif" style="margin-top: -8px;height: 20px">
            <img v-if="!playing" src="../../static/images/noplay.png" style="margin-top: -8px;height: 20px">
          </md-icon>
          <md-icon v-show="searchMode==true||isFlagBack"
                   style="z-index: 19;font-size: 14px;margin-top: 28px;margin-right: 10px">
            <span @click="quxiao()">取消</span>
          </md-icon>
        </md-button>
      </md-toolbar>
    </div>
    <md-bottom-bar v-md-theme="theme.bgColor">
      <md-bottom-bar-item @click.native="go('book')" md-icon="books" md-active>阅读</md-bottom-bar-item>
      <md-bottom-bar-item @click.native="go('music')" md-icon="music_note">音乐</md-bottom-bar-item>
      <md-bottom-bar-item @click.native="go('movie')" md-icon="ondemand_video">视频</md-bottom-bar-item>
      <md-bottom-bar-item @click.native="go('photo')" md-icon="photo">美图</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
  import config from './../config/config'
  import back from '@/pages/music/components/back'
  import api from '@/api'
  import {mapState, mapMutations} from 'vuex'
  export default {
    components: {back},
    data() {
      return {
        isBack: true,
        searchMode: false,
        keyword: ''
      };
    },
    computed: {
      ...mapState([
        'theme', 'playing', 'music', 'isFlagBack'
      ])
    },
    beforeMount () {
      let self = this;
      let action = this.$route.path;
      action = action.substring(6, action.length);
      if (action == 'music') {
        this.isBack = false;
      } else {
        this.isBack = true;
      }
      this.$store.commit('setTheme', {bgColor: '', action: action});
      setTimeout(function () {
        if (self.isFlagBack) {
          self.$store.state.theme.bgColor = config.BgColor.C6;
          document.getElementById('searchText').style.width = '88%';
        }
      }, 100)
    },
    methods: {
      ...mapMutations([
        'play', 'pause'
      ]),
      go(action) {
        if (action == 'music') {
          this.isBack = false;
        } else {
          this.isBack = true;
        }
        this.$store.commit('setTheme', {bgColor: '', action: action});
        this.$router.push({path: "/home/" + action})
      },
      toggleLeftSidenav() {
        this.$emit("toggleLeftSidenav");
      },
      isShowPlay (){
        let self = this;
        let song = this.$store.state.song;
        if (song && !song.id) {
          let song = this.music.recommendSongList[0];
          let object = {
            id: song.id,
            songName: song.name,
            mp3Url: song.mp3Url,
            singer: song.artists[0].name
          };
          this.play();
          this.$store.commit('setSong', object);
          setTimeout(function () {
            self.$parent.$parent.playMusic1();
          }, 500)
        }
        this.$parent.$parent.isShowPlay = true;
      },
      keyUp(){
        this.$store.state.iskeyWords = false;
        this.$store.state.theme.bgColor = config.BgColor.C6;
        document.getElementById('searchText').style.width = '88%';
        this.searchMode = true;
        this.$parent.$parent.isSearch = true
      },
      quxiao(){
        if (this.$parent.$parent.isSearchResult) {
          let keyword = this.keyword;
          if(keyword){
            let cacheKeyWord = keyword;
            if(localStorage.getItem('cacheKeyWords')){
              let cacheKeyWords = JSON.parse(localStorage.getItem('cacheKeyWords'));
              let F = 1;
              cacheKeyWords.forEach(function (item) {
                if(item.key == keyword){//相同的key  －－－ update time
                  F = 0;
                  item = {key:item.key,date:new Date().getTime()}
                  return item;
                }
              });
              if(F){
                cacheKeyWords.sort(function (v, b) {
                  return b.date - v.date;
                });
                if(cacheKeyWords.length>=10){
                    cacheKeyWords = cacheKeyWords.splice(0,10);

                }
                cacheKeyWords.push({key:cacheKeyWord,date:new Date().getTime()});

                cacheKeyWords.sort(function (v, b) {
                  return b.date - v.date;
                });
              }
              this.$emit('childTellKeywords',cacheKeyWords);
              localStorage.setItem('cacheKeyWords',JSON.stringify(cacheKeyWords));
            }else{
              let cacheKeyWords = [];
              cacheKeyWords.push({key:cacheKeyWord,date:new Date().getTime()});
              cacheKeyWords.sort(function (v, b) {
                return v.date - b.date;
              });
              this.$emit('childTellKeywords',cacheKeyWords);
              localStorage.setItem('cacheKeyWords',JSON.stringify(cacheKeyWords));
            }
          }
          this.$parent.$parent.isSearchResult = false;
          this.keyword = '';
        } else {
          this.$store.state.theme.bgColor = config.BgColor.C2;
          this.$store.state.isFlagBack = false;
          document.getElementById('searchText').style.width = '70%';
          this.searchMode = false;
          this.$parent.$parent.isSearch = false;
        }
      },
      search(){
        if (!this.keyword) {
          this.$parent.$parent.isSearchResult = false;
        } else {
          this.$parent.$parent.isSearchResult = true;
          api.search({keyword: this.keyword}).then(res => {
            this.$store.commit('setSearchList', res);
          })
        }
      }
    },
    created: function () {

    }
  };
</script>

<style>
  .top-nav {
    position: fixed !important;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 3;
    color: #fff;
  }

  .md-bottom-bar {
    position: fixed !important;
    bottom: 0 !important;
    left: 0;
    z-index: 3
  }

  .md-bottom-bar-item * {
    color: #ffffff;
  }

  .md-active {
    color: #bbb !important;
  }

  .md-icon {
    left: 0px !important;
    top: -15px !important;
  }

/*  .music-seach-icon{
    background-image: url("/static/images/search.png");
    position: absolute;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    left: 65px;
    width: 30px;
    height: 30px;
  }*/

  @media screen and (min-width: 768px) {
    .search {
      width: 92% !important;
    }
  }


</style>
