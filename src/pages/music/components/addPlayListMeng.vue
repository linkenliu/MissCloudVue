<template>

  <div class="list-warp" style="z-index: 1001">
    <div class="list">
      <div class="list-box list-box-audio">
        <p class="audio-songName">{{addSongObj.songName}}</p>
        <p class="audio-singerName">{{addSongObj.singer}}</p>
      </div>
      <div class="list-box" @click="addPlayList()">加入播放列表</div>
    </div>
    <div class="list-bg" @click="cloneListMeng()"></div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  export default {
    props: {
      addSongObj: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {};
    },
    computed: {

    },

    methods: {
      cloneListMeng () {
        this.$parent.isAddPlayListMeng = false
      },
      addPlayList(index){
        this.$parent.isAddPlayListMeng = false;
        this.$store.commit('addToPlayList',this.addSongObj);
      }
    },
    created: function () {

    }
  }
</script>


<style>
  .list-warp {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    display: flex;
    display: -webkit-flex;
    align-items: flex-end;
  }
  .list-warp .list-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  .list-warp .list {
    min-height: 14rem;
    background: url("./../../../../static/images/body-bg.jpg") no-repeat top;
    background-size: 100% auto;
    position: relative;
    z-index: 2;
    width: 100%;
  }
  .list-warp .list .list-box {
    font-size: 14px;
    color: #fff;
    padding: 1.4rem;
    text-align: center;
    background-size: 100% auto;
    background: url("./../../../../static/images/count-box-border.png") no-repeat bottom;
  }
  .list-warp .list .list-box.list-box-audio {
    display: flex;
    display: -webkit-flex;
    font-size: 14px;
    -ms-justify-content: center;
    /* IE 9 */
    -webkit-justify-content: center;
    /* Safari and Chrome */
    -o-justify-content: center;
    /* Opera */
    -moz-justify-content: center;
    /* Firefox */
    justify-content: center;
    -ms-align-items: center;
    /* IE 9 */
    -webkit-align-items: center;
    /* Safari and Chrome */
    -o-align-items: center;
    /* Opera */
    -moz-align-items: center;
    /* Firefox */
    align-items: center;
    -ms-flex-direction: column;
    /* IE 9 */
    -webkit-flex-direction: column;
    /* Safari and Chrome */
    -o-flex-direction: column;
    /* Opera */
    -moz-flex-direction: column;
    /* Firefox */
    flex-direction: column;
  }
  .list-warp .list .list-box.list-box-audio p{
    margin: 0;
  }
  .list-warp .list .list-box.list-box-audio .audio-singerName {
    font-size: 14px;
    margin-top: 1rem;
    color: #c2c8d2;
  }
  .list-warp .list .list-box.list-box-audio .audio-songName {
    color: #fff;
  }
  .list-warp .list .list-box .audio-img {
    width: 40px;
    margin-right: 10px;
  }
  .list-warp .list .list-box .audio-img img {
    width: 100%;
  }
</style>

