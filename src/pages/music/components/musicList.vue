<template>
  <div style="background-image: url('./../../../../static/images/body-bg.jpg');color: #fff;height: 100%">
    <div class="audio-box">
      <ul style="margin-left: -40px">
        <li v-for="(item,Index) in data" style="border-bottom:1px solid #ddd !important">
          <div @click="playMusic(Index,item)" style="width: 85%" :class="index==Index?'playingClass':''">
            <div style="margin-top: 9px;position: absolute">
              <strong style="font-size: 12px">
                <span v-if="(Index+1)<10">0{{Index+1}}</span>
                <span v-else-if="(Index+1)>=100" style="margin-left: -8px">{{Index+1}}</span>
                <span v-else>{{Index+1}}</span>
              </strong>
            </div>
            <div style="margin-left: 20px;margin-top: 0px">
              <div>
                <strong style="font-size: 14px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
                  {{item.name}}
                </strong>
                <p style="font-size: 12px;padding: 0;margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">{{item.artists?item.artists[0].name:item.ar[0].name}} -
                  {{item.album?item.album.name:item.name}}</p>
              </div>
            </div>
          </div>
          <div style="float: right;margin-top: -33px;margin-right: 12px !important;">
            <img src="./../../../../static/images/menu.png" @click="showAddPlayMeng(item)" width="30px">
          </div>
        </li>
      </ul>
    </div>
    <AddPlayListMeng v-show="isAddPlayListMeng" :addSongObj="addSongObj"></AddPlayListMeng>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import AddPlayListMeng from './addPlayListMeng'
  import api from '@/api/index.js'
  export default {
    components: {
      AddPlayListMeng
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        isAddPlayListMeng: false,
        addSongObj: {}
      };
    },
    computed: {
      ...mapState([
        'music', 'playing', 'index'
      ])
    },
    methods: {
      ...mapMutations([
        'play', 'pause'
      ]),
      playMusic(index, item){
        /* api.checkMusic(item.mp3Url).then(res => {
         if (res.data.success) {*/
        let self = this;
        self.$parent.$parent.isShowPlay = true;
        self.play();
        let songName = item.name;
        let singer = item.artists ? item.artists[0].name : item.ar[0].name;
        let mp3Url = item.mp3Url;
        let id = item.id;
        let picUrl = item.album ? item.album.picUrl : item.al.picUrl;
        let object = {
          id: id,
          songName: songName,
          mp3Url: mp3Url,
          singer: singer,
          picUrl: picUrl
        };
        self.$store.commit('setSong', object);
        //self.$store.commit('setPlayList', {object:object,index:index});
        self.setPlayListMethod(index);
        setTimeout(function () {
          self.$parent.$parent.playMusic1();
        }, 500);
        /*} else {
         alert(res.data.message);
         }*/
        //});
      },
      setPlayListMethod (index){
        let data = this.data;
        this.$store.state.playList = [];//清空数组
        data.forEach((item) => {
          let songName = item.name;
          let singer = item.artists ? item.artists[0].name : item.ar[0].name;
          let mp3Url = item.mp3Url;
          let id = item.id;
          let picUrl = item.album ? item.album.picUrl : item.al.picUrl;
          let object = {
            id: id,
            songName: songName,
            mp3Url: mp3Url,
            singer: singer,
            picUrl: picUrl
          };
          //newData.push(object);
          this.$store.commit('setPlayList', {object: object, index: index});
        })
      },
      showAddPlayMeng (item){
        let object = {
          songName: item.name,
          singer: item.artists ? item.artists[0].name : item.ar[0].name,
          mp3Url: item.mp3Url,
          id: item.id,
          picUrl: item.album ? item.album.picUrl : item.al.picUrl
        };
        this.addSongObj = object;
        this.isAddPlayListMeng = true;
      }
    },
    created: function () {

    }
  }
</script>


<style>
  li {
    list-style-type: none;
    border-bottom: 1px solid #eeeeee !important;
    padding: 15px !important;
  }

  li:nth-child(1) {
    padding-top: 23px !important;
    padding-bottom: 23px !important;
  }

  .playingClass {
    color: #fff !important;
  }
</style>

