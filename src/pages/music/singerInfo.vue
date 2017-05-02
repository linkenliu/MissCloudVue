<template>
  <div
    style="background-image: url('./../../../static/images/body-bg.jpg');align-content: center;z-index: 5000;height: 100%;width: 100%;position: absolute;">

    <nav class="music-nav"
         style="margin-top: 4px;background-color:  rgba(0, 0, 0, 0.5) !important;padding: 10px;width:100%;overflow-x: scroll;position: fixed;z-index: 9999">
      <div @click="go(1)">
        <span :class="{activeClass:singerNavFlag=='hot'}">热门{{data.length}}</span>
      </div>
      <div @click="go(2)">
        <span :class="{activeClass:singerNavFlag=='album'}">专辑{{ablumData.length}}</span>
      </div>
      <div disabled="disabled"  @click="go(3)">
        <span :class="{activeClass:singerNavFlag=='songd'}">歌单</span>
      </div>
      <div disabled="disabled"  @click="go(4)">
        <span :class="{activeClass:singerNavFlag=='mv'}">MV</span>
      </div>
    </nav>

    <div class="singer-container" style="margin-top: -59px;"
         :style="{backgroundImage: 'url(\''+singerObj.img1v1Url+'\')'}">
      <back></back>
      <div style="width: 100%;height: 70px;position:absolute;background-color: rgba(0, 0, 0, 0.5);margin-top: 230px">
        <span style="color: #ffffff;font-size: 18px;line-height: 20px;line-height: 4;margin-left: 20px">{{singerObj.name}}</span>
      </div>
    </div>


    <div class="" style="margin-top: -15px">
      <transition name="custom-classes-transition" enter-active-class="animated slideInLeft fast" mode="out-in">
        <musicList v-show="singerNavFlag=='hot'" :data="data"></musicList>
      </transition>
      <albumList v-show="singerNavFlag=='album'" :data="ablumData"></albumList>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  import back from './components/back'
  import musicList from './components/musicList'
  import albumList from './components/singer/albumList'
  import {Toast} from 'mint-ui';
  export default {
    components: {
      back, musicList, albumList
    },
    data() {
      return {
        singerObj: {},
        data: [],
        ablumData: [],
        activeClass: 'hot'
      };
    },
    computed: {
      ...mapState(['singerNavFlag'])
    },
    methods: {
      load (){
        this.$store.state.isFlagBack = true;
        let id = this.$route.query.id;
        api.singerInfo({id: id}).then(res => {
          this.singerObj = res.data.artist;
          this.data = res.data.hotSongs;
        });
      },
      load2(){
        let id = this.$route.query.id;
        api.artistAlbum({id: id}).then(res => {
          this.ablumData = res.data.hotAlbums;
        })
      },
      go(type){
        switch (type) {
          case 1: {
            this.activeClass = 'hot';
            this.$store.state.singerNavFlag = this.activeClass;
            break;
          }
          case 2: {
            this.activeClass = 'album';
            this.$store.state.singerNavFlag = this.activeClass;
            break;
          }
          case 3: {
            //this.activeClass = 'songd';
            //this.$store.state.singerNavFlag = this.activeClass;
            return Toast({message: '努力开发中'});
            break;
          }
          case 4: {
            //this.activeClass = 'mv';
            //this.$store.state.singerNavFlag = this.activeClass;
            Toast({message: '努力开发中'});
            break;
          }
        }
      }
    },
    created: function () {
      this.load();
      this.load2();
    }
  }
</script>


<style>
  .singer-container {
    width: 100%;
    height: 300px;
    background-size: cover;
  }

  .music-nav {
    color: #fff;
  }

  .music-nav div {
    display: inline-block;
    width: 24%;
    text-align: center;
  }

  .activeClass {
    color: chartreuse;
  }
</style>

