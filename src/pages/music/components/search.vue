<template>
  <div class="search-container">

    <div style="position: absolute;">
      <div style="margin-top: -13px;padding: 10px;padding-top:23px;color: #ddd;border-bottom: 1px solid;">热门搜索</div>
      <div style="margin-left: 5px;margin-top: 10px">
        <div v-for="item in hotSearch" @click="search($event)" :data="item"
             style="display: inline-block;margin: 5px;border-radius: 20px;border: 1px solid #ffffff;padding:4px 10px">
          {{item}}
        </div>
      </div>
      <div style="margin-bottom: 100px">
        <ul class="search-ul" style="margin-left: -40px">
          <li v-for="(item,index) in watchKeyWords">
            <div>
              <img style="width: 28px" src="/static/images/history.png">
              <div  @click="search($event)" :data="item.key" style="width: 60%;display: inline-block"><span style="margin-left: 10px;">{{item.key}}</span></div>
              <img style="float: right;margin-right: 0px" src="/static/images/x.png" @click="removeKeyWord(index)">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import api from '@/api/index.js'
  export default {
    components: {},
    data() {
      return {
        isPlayListMeng: false,
        delSongObj: {},
        keyWords: [],
        iskeyWords: false,
        hotSearch: ['陈奕迅', '薛之谦', '勇敢爱', '张学友', 'Good Life', '我不是一个好的男人', 'Linken Park', '童话镇', '许嵩', '那英', 'Palette', '王菲']
      };
    },
    computed: {
      ...mapState([
        'playList', 'index', 'cacheKeyWords'
      ]),

      ...mapState({
        compCacheKeyWords: function () {
          let cacheKeyWords = localStorage.getItem('cacheKeyWords');
          if (cacheKeyWords) {
            cacheKeyWords = JSON.parse(cacheKeyWords);
          } else {
            cacheKeyWords = [];
          }
          return cacheKeyWords;
        }
      }),

      watchKeyWords: function () {
        let keyWordsFull = this.keyWordsFull;
        let iskeyWords = this.$store.state.iskeyWords;
        if (keyWordsFull && keyWordsFull.length > 0) {
          if (!iskeyWords) {
            return this.keyWords = keyWordsFull;
          } else {
            return this.keyWords;
          }
        } else {
          return this.keyWords;
        }

      }
    },
    props: {
      keyWordsFull: {
        type: Array,
        default: [] //这样可以指定默认的值
      }
    },
    methods: {
      ...mapMutations([
        'play', 'pause'
      ]),
      toback(){
        this.$parent.isSearch = false
      },
      showPlayListMeng(item, index){
        this.isPlayListMeng = true;
        item.index = index;
        this.delSongObj = item;
      },
      playMusic(index, item){
        let self = this;
        self.$parent.$parent.isShowPlay = true;
        self.play();
        let songName = item.songName;
        let singer = item.singer;
        let mp3Url = item.mp3Url;
        let id = item.id;
        let picUrl = item.picUrl;
        let object = {
          id: id,
          songName: songName,
          mp3Url: mp3Url,
          singer: singer,
          picUrl: picUrl
        };
        self.$store.commit('setSong', object);
        self.$store.commit('setPlayIndex', index);
        this.toback();
      },
      search(event){
        this.$store.state.iskeyWords = true;
        let keyword = event.target.getAttribute('data');
        let cacheKeyWord = keyword;
        if (localStorage.getItem('cacheKeyWords')) {
          let cacheKeyWords = JSON.parse(localStorage.getItem('cacheKeyWords'));
          let F = 1;
          cacheKeyWords.forEach(function (item) {
            if (item.key == keyword) {//相同的key  －－－ update time
              F = 0;
              item.date = new Date();
            }
          });
          if (F) {
            if (cacheKeyWords.length >= 10) {
              cacheKeyWords = cacheKeyWords.splice(0, 10);
            }
            cacheKeyWords.push({key: cacheKeyWord, date: new Date().getTime()});
          }
          cacheKeyWords.sort(function (v, b) {
            return b.date - v.date;
          });
          this.keyWords = cacheKeyWords;
          localStorage.setItem('cacheKeyWords', JSON.stringify(cacheKeyWords));
        } else {
          let cacheKeyWords = [];
          cacheKeyWords.push({key: cacheKeyWord, date: new Date().getTime()});
          cacheKeyWords.sort(function (v, b) {
            return b.date - v.date;
          });
          this.keyWords = cacheKeyWords;
          localStorage.setItem('cacheKeyWords', JSON.stringify(cacheKeyWords));
        }
        this.$parent.isSearchResult = true;
        api.search({keyword: keyword}).then(res => {
          this.$store.commit('setSearchList', res);
        })
      },
      cacheKeyWordsMe(){
        let cacheKeyWords = localStorage.getItem('cacheKeyWords');
        if (cacheKeyWords) {
          cacheKeyWords = JSON.parse(cacheKeyWords);
        } else {
          cacheKeyWords = [];
        }
        this.keyWords = cacheKeyWords;
      },
      removeKeyWord (index){
        this.$store.state.iskeyWords = true;
        let cacheKeyWords = localStorage.getItem('cacheKeyWords');
        cacheKeyWords = JSON.parse(cacheKeyWords);
        cacheKeyWords.sort(function (v, b) {
          return b.date - v.date;
        });
        delete cacheKeyWords[index];
        let cacheKeyWordsStr = JSON.stringify(cacheKeyWords);
        if (cacheKeyWordsStr.indexOf('null,') > -1) {
          cacheKeyWordsStr = cacheKeyWordsStr.replace('null,', '');
        }
        if (cacheKeyWordsStr.indexOf(',null') > -1) {
          cacheKeyWordsStr = cacheKeyWordsStr.replace(',null', '');
        }
        if (cacheKeyWordsStr.indexOf('null') > -1) {
          cacheKeyWordsStr = cacheKeyWordsStr.replace('null', '');
        }
        cacheKeyWords = JSON.parse(cacheKeyWordsStr);
        this.keyWords = cacheKeyWords;
        localStorage.setItem('cacheKeyWords', JSON.stringify(cacheKeyWords));
      }
    },
    created: function () {
      this.cacheKeyWordsMe();
    }
  }
</script>


<style>
  .search-container {
    z-index: 1399;
    width: 100%;
    position: fixed;
    top: 60px !important;
    height: 100%;
    background-color: teal;
    background: url("/static/images/body-bg.jpg");
    overflow-y: scroll;
    color: #fff
  }

  .search-ul li {
    list-style-type: none;
    border-bottom: 1px solid #eeeeee !important;
    padding: 10px !important;
  }

  .search-ul li:nth-child(1) {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }

  .playingClass {
    color: #EE113D;
  }
</style>

