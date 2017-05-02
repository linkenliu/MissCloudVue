<template>
  <div style="background-image: url('./../../../static/images/body-bg.jpg');align-content: center;z-index: 5000;height: 100%;width: 100%;position: absolute;">

    <div class="album-container" style="margin-top: -59px;" :style="{backgroundImage: 'url(\''+albumObj.picUrl+'\')'}">
      <back></back>
      <div style="width: 100%;height: 70px;position:absolute;background-color: rgba(0, 0, 0, 0.5);margin-top: 230px">
        <span style="color: #ffffff;font-size: 18px;line-height: 20px;line-height: 4;margin-left: 20px">{{albumObj.albumName}}</span>

        <div style="margin-top: -57px;margin-left: 210px">
          <p style="color: #ffffff;font-size: 13px;line-height: 2;margin: 0;padding: 0">歌手：{{albumObj.name}}</p>
          <p style="color: #ffffff;font-size: 13px;line-height: 2;margin: 0;padding: 0">发行时间：{{albumObj.publishTime | formatDate}}</p>
        </div>

      </div>

    </div>

    <div class="" style="background: #ffffff;margin-top: -15px">
      <musicList :data="data"></musicList>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  import back from './components/back'
  import musicList from './components/musicList'
  export default {
    components: {
      back,musicList
    },
    data() {
      return {
        albumObj:{},
        data: []
      };
    },
    computed: {},

    methods: {
      load (){
        this.$store.state.isFlagBack = true;
        let id = this.$route.query.id;
        api.albumInfo({id: id}).then(res => {
          this.data = res.data.album.songs;
          let picUrl =res.data.album.picUrl;
          let name =  res.data.album.artist.name;
          let albumName = res.data.album.name;
          let publishTime =res.data.album.publishTime;
          this.albumObj = {
            picUrl:picUrl,
            name:name,
            albumName:albumName,
            publishTime:publishTime
          }
        });
      }
    },
    created: function () {
      this.load();
    }
  }
</script>


<style>
  .album-container {
    width: 100%;
    height: 300px;
    background-size: cover;
  }
</style>

