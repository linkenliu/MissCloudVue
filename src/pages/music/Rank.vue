<template>
  <div id="movie" style="align-content: center;">
    <back></back>
    <Loading v-show="isLoading"></Loading>
    <div style="border-left: teal solid 4px;margin-top: 75px">
      <strong style="padding-left: 5px;font-size: 16px">云音乐官方榜</strong>
    </div>
    <div style="margin-top: 10px">
      <div v-for="item in rank.officialRank" style="width: 100%" @click="go(item.rankId)">
        <div>
          <img :src="item.av_image" style="width: 120px;padding-top: 3px">
        </div>
        <div style="margin-top: -120px;margin-left: 150px;position: absolute">
          <p v-for="(item,index) in item.tracks" v-if="index<3">{{index+1}}.{{item.name}}</p>
        </div>
      </div>
    </div>

    <div style="border-left: teal solid 4px;margin-top: 35px">
      <strong style="padding-left: 5px;font-size: 16px">全球榜</strong>
    </div>
    <div style="margin-top: 10px">
      <div v-for="item in rank.globalList" style="width: 33%;float: right;margin-right: 1px" @click="go(item.rankId)">
        <div style="display: inline-block;width: 100%">
          <img :src="item.creator.avatarUrl" width="100%" style="border:1px solid #eeeeee">
          <p>{{item.creator.nickname}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  import back from './components/back'
  import Loading from '@/components/Loading'
  export default {
    components: {
      back, Loading
    },
    data() {
      return {
        isLoading: true,
        globalList: [],
        officialRank: []
      };
    },
    computed: {
      ...mapState([
        'rank'
      ])
    },
    mounted () {

    },
    methods: {
      loadOfficial () {
        if (this.rank && this.rank.officialRank && this.rank.officialRank.length > 0) {
          this.isLoading = false;
          return;
        }
        let list = [];
        let L = [0, 1, 2, 3];
        let P = (item) => {
          return new Promise((resolve, reject) => {
            api.topList({idx: item}).then(res => {
              resolve(res);
            });
          })
        };
        new Promise((resolve, reject) => {
          Promise.all(L.map(item => {
            P(item).then(res => {
              if (item == 0) {
                res.data.result.av_image = 'http://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150';
                res.data.result.rankId = 0;
              }
              if (item == 1) {
                res.data.result.av_image = 'http://p3.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=150y150'
                res.data.result.rankId = 1;
              }
              if (item == 2) {
                res.data.result.av_image = 'http://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=150y150'
                res.data.result.rankId = 2;
              }
              if (item == 3) {
                res.data.result.av_image = 'http://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150'
                res.data.result.rankId = 3;
              }

              list.push(res.data.result);
              resolve(res.data.result)
            });
          }));
        }).then(result => {
          this.isLoading = false;
          this.$store.commit('setBankOffic', list);
          this.officialRank = list;
        });
      },
      loadGlobal () {
        if (this.rank && this.rank.globalList && this.rank.globalList.length > 0) {
          return;
        }
        let list = [];
        let L = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
        let P = (item) => {
          return new Promise((resolve, reject) => {
            api.topList({idx: item}).then(res => {
              resolve(res);
            });
          })
        };
        new Promise((resolve, reject) => {
          Promise.all(L.map(item => {
            P(item).then(res => {
              switch (item) {
                case 4:
                  res.data.result.rankId = 4;
                  break;
                case 5:
                  res.data.result.rankId = 5;
                  break;
                case 6:
                  res.data.result.rankId = 6;
                  break;
                case 7:
                  res.data.result.rankId = 7;
                  break;
                case 8:
                  res.data.result.rankId = 8;
                  break;
                case 9:
                  res.data.result.rankId = 9;
                  break;
                case 10:
                  res.data.result.rankId = 10;
                  break;
                case 11:
                  res.data.result.rankId = 11;
                  break;
                case 12:
                  res.data.result.rankId = 12;
                  break;
                case 13:
                  res.data.result.rankId = 13;
                  break;
                case 14:
                  res.data.result.rankId = 14;
                  break;
                case 15:
                  res.data.result.rankId = 15;
                  break;
                case 16:
                  res.data.result.rankId = 16;
                  break;
                case 17:
                  res.data.result.rankId = 17;
                  break;
                case 18:
                  res.data.result.rankId = 18;
                  break;
                case 19:
                  res.data.result.rankId = 19;
                  break;
                case 20:
                  res.data.result.rankId = 20;
                  break;
                case 21:
                  res.data.result.rankId = 21;
                  break;

              }
              list.push(res.data.result);
              resolve(res.data.result)
            });
          }));
        }).then(result => {
          this.globalList = list;
          this.$store.commit('setBankGlobal', list);
        });
      },
      go(rankId){
        this.$router.push({path: '/musicList/' + rankId});
      },
    },
    created: function () {
      this.loadOfficial();
      this.loadGlobal();
    }
  }
</script>


<style>


</style>

