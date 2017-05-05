<template>
  <transition name="custom-classes-transition" enter-active-class="animated slideInLeft fast" mode="out-in">
    <div id="music" v-if="!musicForSearchMode">
      <swipe class="my-swipe">
        <swipe-item class="slide1"><img width="100%" style="height: 150px"
                                        src="http://p3.music.126.net/koESYfghIkL6EkJhbB5CXw==/19042441881532404.jpg">
        </swipe-item>
        <swipe-item class="slide1"><img width="100%" style="height: 150px"
                                        src="http://p4.music.126.net/vBkaoZbUvlLCTszbSR552A==/18498183627573962.jpg">
        </swipe-item>
        <swipe-item class="slide2"><img width="100%" style="height: 150px"
                                        src="http://p4.music.126.net/7PxgxRjd7hicCpLVA32YYA==/19187577416400499.jpg">
        </swipe-item>
        <swipe-item class="slide3"><img width="100%" style="height: 150px"
                                        src="http://p3.music.126.net/3_iSYvbjOiKeYFmbpYChPA==/18959978509453169.jpg">
        </swipe-item>
        <swipe-item class="slide3"><img width="100%" style="height: 150px"
                                        src="http://p4.music.126.net/L1eJb3xO16G2U5SxSz9MCA==/19113910137342812.jpg">
        </swipe-item>
      </swipe>

      <div class="v1">
        <div @click="go(1)">
          <img width="50px" style="position: absolute;margin-left: 8px;margin-top: 10px"
               src="../../../static/images/2.png">
          <p style="position: absolute;font-size: 13px;margin-top: 75px;margin-left: 12px">私人FM</p>
        </div>
        <div @click="go(2)">
          <img width="50px" style="position: absolute;margin-left: 12px;margin-top: 10px"
               src="../../../static/images/1-1.png">
          <p style="position: absolute;font-size: 13px;margin-top: 75px;margin-left: 10px;color: #2c3e50">每日推荐</p>
          <span style="position: absolute;margin-left: 27px;margin-top: 30px;font-size: 16px;color: #2c3e50">{{recommendSongLength}}</span>
        </div>
        <div @click="go(3)">
          <img width="50px" style="position: absolute;margin-left: 11px;margin-top: 9px"
               src="../../../static/images/4.png">
          <p style="position: absolute;font-size: 13px;margin-top: 75px;margin-left: 16px;color: #2c3e50">热歌榜</p>
        </div>
        <div @click="go(4)">
          <img width="50px" style="position: absolute;margin-left: 11px;margin-top: 9px"
               src="../../../static/images/3.png">
          <p style="position: absolute;font-size: 13px;margin-top: 75px;margin-left: 16px">排行榜</p>
        </div>
      </div>
      <div class="recommend-container" style="margin-top: 10px">
        <div style="border-left: teal solid 4px">
          <strong style="padding-left: 5px;font-size: 16px">推荐歌曲</strong><!--&nbsp;&nbsp;<span>》更多</span>-->
        </div>

        <div class="recommend-songs">
          <template v-for="item in music.resourceSongList">
            <div @click="goResource(item.id)">
              <img :src="item.picUrl">
              <span style="font-size: 12px">{{item.name}}</span>
            </div>
          </template>
        </div>


      </div>
      <div style="width: 100%;height: 400px"></div>


    </div>
  </transition>
</template>

<script>
  import api from '@/api/index.js'
  import Default from '@/config/default.js'
  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        recommendSongLength: 0,
        personalFmList: []
      };
    },
    computed: {
      ...mapState([
        'music'
      ]),
      musicForSearchMode: function () {
        return this.$parent.$parent.isSearch;
      }
    },
    methods: {
      ...mapMutations([
        'play', 'pause'
      ]),
      recommendSongs(){
        api.recommendSongs().then(res => {
          if (res.data.recommend) {
            this.recommendSongLength = res.data.recommend.length;
            this.$store.commit('setRecommendSongList', res.data.recommend);
          } else {
            this.recommendSongLength = Default.recommendSongs.length;
            this.$store.commit('setRecommendSongList', Default.recommendSongs);
          }
        });
      },
      recommendResource(){
        api.recommendResource().then(res => {
          let list = res.data.recommend;
          if(list){
            if (list.length < 6) {
              list.push(list[0]);
              list.push(list[1])
            }
            this.$store.commit('setRecommendResourceList', list);
          }else{
            let list = Default.recommendResource;
            if (list.length < 6) {
              list.push(list[0]);
              list.push(list[1])
            }
            this.$store.commit('setRecommendResourceList', list);
          }
        })
      },
      personalFm (){
        api.personalFm().then(res => {
          let personalFmList = res.data.data;
          let self = this;
          personalFmList.forEach(function (item) {
            let id = item.id;
            let songName = item.name;
            let mp3Url = item.mp3Url;
            let singer = item.artists ? item.artists[0].name : item.ar[0].name;
            let picUrl = item.album ? item.album.picUrl : item.al.picUrl;
            let object = {
              id: id,
              songName: songName,
              mp3Url: mp3Url,
              singer: singer,
              picUrl: picUrl
            };
            self.personalFmList.push(object);
          })
        });
      },
      goFm(){
        let self = this;
        let playing = this.$store.state.playing;
        if (playing == true) {
          self.$parent.$parent.isShowPlay = true;
        } else {
          let personalFmList = this.personalFmList;
          self.$parent.$parent.isShowPlay = true;
          self.play();
          self.$store.commit('setSong', personalFmList[0]);
          self.setPlayListMethod(0);
          setTimeout(function () {
            self.$parent.$parent.playMusic1();
          }, 500);
        }
      },
      setPlayListMethod (index){
        let personalFmList = this.personalFmList;
        this.$store.state.playList = [];//清空数组
        personalFmList.forEach((item) => {
          this.$store.commit('setPlayList', {object: item, index: index});
        })
      },
      go (c) {
        switch (c) {
          case 1:
            this.goFm();
            break;
          case 2:
            this.$router.push({path: '/recommendSongs'});
            break;
          case 3:
            this.$router.push({path: '/hotSongs'});
            break;
          case 4:
            this.$router.push({path: '/rank'});
            break;
        }
      },
      goResource (id) {
        this.$router.push({path: '/songsResource', query: {id: id}});
      }
    },
    created: function () {
      this.recommendSongs();
      this.recommendResource();
      this.personalFm();
    },
    beforeMount () {

    }
  }
</script>


<style>

  .my-swipe {
    height: 150px !important;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }

  .slide1 {
    background-color: #0089dc;
    color: #fff;
  }

  .slide2 {
    background-color: #ffd705;
    color: #000;
  }

  .slide3 {
    background-color: #ff2d4b;
    color: #fff;
  }

  #music .v1 {
    margin-top: 15px;
    padding-bottom: 20px;
    border-bottom: #EEEEEE solid 1px
  }

  #music .v1 div {

    margin-left: 12px !important;
    width: 75px;
    height: 75px;
    border: teal solid 1px;
    display: inline-block;
    border-radius: 50%
  }

  #music .recommend-songs div {
    width: 33%;
    margin-top: 8px;
    float: left;
  }

  #music .recommend-songs div img {
    width: 100%;
  }

  #music .recommend-songs div:nth-child(2) {
    margin-left: 1px;
    margin-right: 1px;
  }

  #music .recommend-songs div:nth-child(5) {
    margin-left: 1px;
    margin-right: 1px;
  }
</style>

