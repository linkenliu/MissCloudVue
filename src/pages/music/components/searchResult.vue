<template>
  <div class="search-result-container">

   <!-- <nav class="music-nav" style="background-color: teal !important;padding: 10px;width:100%;overflow-x: scroll;position: fixed;z-index: 9999">
      <div>
        <span>单曲</span>
      </div>
      <div>
        <span>专辑</span>
      </div>
      <div>
        <span>歌单</span>
      </div>
      <div>
        <span>MV</span>
      </div>
    </nav>-->

    <div style="position: absolute;width: 100%;">
      <div style="margin-top: -13px;padding: 10px;padding-top:24px;color: #ddd;">最佳匹配</div>
      <div style="margin-left: 5px;">
        <div @click="singer(singerInfo.id)" v-if="singerInfo!=0">
          <div style="margin-left: 5px">
            <img :src="singerInfo.img1v1Url"
                 style="width: 90px;height: 90px">
          </div>
          <div style="margin-left: 100px;margin-top: -50px">
            <span>歌手: {{singerInfo.name}}
              <span v-if="singerInfo.alias&&singerInfo.alias[0]">({{singerInfo.alias[0]}})</span>
            </span>
          </div>
        </div>
        <div style="margin-top: 40px" @click="album(albumInfo.id)" v-if="albumInfo!=0">
          <div style="margin-left: 5px">
            <img :src="albumInfo.picUrl"
                 style="width: 90px;height: 90px">
          </div>
          <div style="margin-left: 100px;margin-top: -50px">
            <span>专辑: {{albumInfo.name}}
              <span v-if="albumInfo.alias&&albumInfo.alias[0]">{{albumInfo.alias[0]}}</span>
            </span>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 65px;margin-top: 40px">
        <MusicList :data="songsInfo"></MusicList>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import api from '@/api/index.js'
  import MusicList from '@/pages/music/components/musicList'
  export default {
    components: {
      MusicList
    },
    data() {
      return {

      };
    },
    computed: {
      ...mapState([
        'playList', 'index', 'searchList'
      ]),

      ...mapState({
        songsInfo: function (state) {
          return state.searchList ? state.searchList[0] : [];
        },
        singerInfo: function (state) {
          return state.searchList?state.searchList[2]?state.searchList[2][0]:[]:[];
        },
        albumInfo:function (state) {
          return state.searchList?state.searchList[1]?state.searchList[1][0]:[]:[];
        }
      })

    },

    methods: {
      singer(id){
        this.$router.push({path:'/singerInfo',query:{id:id}})
      },
      album (id){
        this.$router.push({path:'/albumInfo',query:{id:id}})
      }
    },
    created: function () {

    }
  }
</script>


<style>
  .search-result-container {
    z-index: 1400;
    width: 100%;
    position: fixed;
    top: 60px !important;
    height: 100%;
    background-color: #ffffff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch !important;
    background: url("/static/images/body-bg.jpg");
    color: #fff
  }

</style>

