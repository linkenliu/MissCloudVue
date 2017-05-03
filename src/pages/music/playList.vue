<template>
  <div class="playList" :style="backgroundDiv">
    <div style="align-content: center">
      <md-toolbar class="top-nav clear-bg">
        <md-button class="md-icon-button" @click.native="toback()">
          <md-icon><i class="iconfont icon-back"></i></md-icon>
        </md-button>
        <h4 class="md-title" style="text-align: center">播放列表</h4>
      </md-toolbar>
    </div>

    <div style="position: absolute;margin-top: 50px;width: 100%;">
      <ul style="margin-left: -40px;overflow-y: scroll;-webkit-overflow-scrolling: touch !important;height: 600px">
        <li v-for="(item,Index) in playList">
          <div  @click="playMusic(Index,item)" :class="index==Index?'playingClass':''">
            <strong>
              <span>{{Index+1}}</span>
              {{item.songName}}
            </strong> ～
            <span>{{item.singer}}</span>
          </div>
          <div style="float: right;margin-top: -25px;margin-right: 12px !important;">
            <img src="../../../static/images/menu.png" @click="showPlayListMeng(item,Index)" width="30px">
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade">
    <PlayListMeng v-show="isPlayListMeng" :delSongObj="delSongObj"></PlayListMeng>
    </transition>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import api from '@/api/index.js'
  import PlayListMeng from './components/playListMeng'
  export default {
    components:{
      PlayListMeng
    },
    data() {
      return {
        isPlayListMeng:false,
        delSongObj:{},
        backgroundDiv: {
          backgroundImage: 'url(' + require('./../../../static/images/body-bg.jpg') + ')',
        }
      };
    },
    computed: {
      ...mapState([
        'playList','index'
      ])
    },

    methods: {
      ...mapMutations([
        'play', 'pause'
      ]),
      toback(){
        this.$parent.isPlayList = false
      },
      showPlayListMeng(item,index){
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
      }
    },
    created: function () {

    }
  }
</script>


<style>
  .playList {
    z-index: 100000;
    width: 100%;
    position: fixed;
    top: 0;
    height: 100%;
    /*background-image: url('/static/images/body-bg.jpg');*/
    color: #fff
  }
  li {
    list-style-type: none;
    border-bottom: 1px solid #eeeeee !important;
    padding: 15px !important;
  }
  li:nth-child(1){
    padding-top: 23px !important;
    padding-bottom: 23px !important;
  }
  .playingClass{
    color: #EE113D;
  }
</style>

