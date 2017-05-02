<template>
  <div id="play" style="position: absolute">
    <div style="" class="audio-warp" style="background-image: url('./../../../../static/images/body-bg.jpg')">

      <div style="align-content: center">
        <md-toolbar class="top-nav clear-bg">
          <md-button class="md-icon-button" @click.native="toback()">
            <md-icon><i class="iconfont icon-back"></i></md-icon>
          </md-button>
          <h4 class="md-title" style="font-size: 18px;flex: 1;">{{song.songName}} ~
            {{song.singer}}</h4>
        </md-toolbar>
      </div>



      <audio id="audio-music" :src="song.mp3Url"  v-bind:loop="isLoop" v-on:ended="playContinueS" v-on:timeupdate="updateTime" v-bind:autoplay="dataAutoPlay"></audio>

      <div @click="tabInterlayer()" class="lyric" ref="abc" v-show="isInterlayer==true">
        <p class="lyric-item" v-for="data in lyric" v-bind:class="data[0][1]">{{data[1]}}</p>
      </div>

      <div @click="tabInterlayer()">
        <div class="opticalDisk" v-show="isInterlayer==false">
          <img :src="song.picUrl" id="degImg" class="playcover rotation">
        </div>
      </div>

      <div class="audio-progress-warp">
        <div class="audio-progress" v-on:click="touchSit($event)">
          <div class="audio-progress-box" v-bind:style="{width:indicatorPosition+'%'}">
            <div class="audio-progress-touch"></div>
          </div>
        </div>
        <div class="audio-progress-text">
          <p>{{currentTime}}</p>
          <p>{{duration}}</p>
        </div>
      </div>

      <div style="color:#fff;bottom: 40px;position: absolute;width: 100%">
        <div class="audio-nav-btn">
          <div style="margin-left: 34px;margin-bottom: -28px">
            <i v-if="playMode==1" @click="changePlayMode(2)"><img style="width: 20px"
                                                                  src="./../../../../static/images/icon-retweet.png"/></i>
            <i v-if="playMode==2" @click="changePlayMode(3)"><img style="width: 20px"
                                                                  src="./../../../../static/images/icon-exchange.png"/></i>
            <i v-if="playMode==3" @click="changePlayMode(1)"><img style="width: 20px"
                                                                  src="./../../../../static/images/icon-random.png"/></i>
          </div>
          <div style="text-align: center" class="play-ionic-c">
            <i><img style="width: 30px" @click="playPrev" src="./../../../../static/images/icon-step-backward.png"/></i>
            <i @click="playMusic()" v-if="playing==true"><img style="width: 30px;height: 30px"
                                                              src="./../../../../static/images/icon-playing.png"/></i>
            <i @click="playMusic()" v-if="playing==false"><img style="width: 30px"
                                                               src="./../../../../static/images/icon-pauseClass.png"/></i>
            <i><img @click="playNext" style="width: 30px" src="./../../../../static/images/icon-icon-step-forward.png"/></i>
          </div>
          <div style="float: right;margin-top: -28px;margin-right: 34px">
            <i><img style="width: 20px" src="./../../../../static/images/icon-meng.png" @click="showPlayList()"/></i>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        isInterlayer: true,
        music: {}
      };
    },
    computed: {
      ...mapState([
        'playing', 'song', 'lyric', 'playMode','isLoop'
      ]),
      ...mapState({
        indicatorPosition (state) {
          let dataTime
          for (let data in this.lyric) {
            dataTime = data.split(':')
            dataTime = parseInt(dataTime[0]) * 60 + parseInt(dataTime[1])
            if (state.currentTime === dataTime) {
              for (let inData in this.lyric) {
                if (this.lyric[inData][0][1] === 'cur') {
                  this.lyric[inData][0][1] = ''
                }
              }
              let ele = $('.lyric').find('.cur')
              if (ele.length > 0) {
                $('.lyric').animate({'scrollTop': $('.lyric').scrollTop() + ele.offset().top - $('.lyric').offset().top - 30}, 350)
              }
              this.lyric[data][0].push('cur')
            }
            dataTime = ''
          }
          return state.currentTime / state.duration * 100
        },
        dataAutoPlay (state) {
          return true;
        }
      }),
      ...mapGetters([
        'currentTime', 'duration'
      ]),
    },
    mounted () {
      //document.getElementById('audio-music').play();
    },
    methods: {
      ...mapMutations([
        'play', 'pause', 'playNext', 'playPrev', 'changePlayMode'
      ]),
      updateTime () {
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('audio-music').currentTime))
        this.$store.commit('updateDuration', parseInt(document.getElementById('audio-music').duration))
      },
      playMusic(){
        let docAudio = document.getElementById('audio-music');
        let docDegimg = document.getElementById('degImg');
        if (this.playing) {
          this.pause();
          docDegimg.className = docDegimg.className.replace('rotation', '');
          docAudio.pause();
        } else {
          this.play();
          docDegimg.className = 'playcover rotation';
          docAudio.play();
        }
      },
      showPlayList () {
        this.$parent.isPlayList = true
      },
      init (){
        let songName = this.$route.query.songName;
        let singer = this.$route.query.singer;
        let mp3Url = this.$route.query.mp3Url;
        this.music.songName = songName;
        this.music.singer = singer;
        this.music.mp3Url = mp3Url;
      },
      toback () {
        this.$parent.isShowPlay = false;
      },
      touchSit (event) {
        document.getElementById('audio-music').currentTime = parseInt(document.getElementById('audio-music').duration) * ((event.pageX - 10) / event.toElement.clientWidth)
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('audio-music').duration) * ((event.pageX - 10) / event.toElement.clientWidth))
        event.preventDefault()
      },
      tabInterlayer(){
        this.isInterlayer = !this.isInterlayer;
      },
      playContinueS () {
        this.$store.dispatch('playContinue')
      }
    },
    created: function () {
      //this.init()
    },
    watch: {
      song (song) {
        api.getLyric({id: song.id}).then(res => {
          if (res.data.lrc) {
            let lyricstr = res.data.lrc.lyric;
            let lyric = lyricstr.split('[').slice(0).map(str => {
              let t = str.split(']');
              return {[t[0]]: [[t[0]], t[1]]}
            }).reduce((a, b) => {
              return {...a, ...b}
            });
            this.$store.state['lyric'] = lyric;
          } else {
            this.$store.state['lyric'] = [];
          }
        });
      },
      isLoop (){
        if(this.$store.state['playMode'] == 1){
          this.$store.state['isLoop'] = true;
        }
      }
    }
  }
</script>


<style>
  .audio-warp {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100% !important;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    -ms-flex-direction: column;
    /* IE 9 */
    -webkit-flex-direction: column;
    /* Safari and Chrome */
    -o-flex-direction: column;
    /* Opera */
    -moz-flex-direction: column;
    /* Firefox */
    flex-direction: column;
    justify-content: space-between;
    z-index: 99999;

    background-attachment: fixed;
    background-size: 100% 100%;
  }

  .clear-bg {
    background-color: inherit !important;
  }

  .play-ionic-c i {
    margin: 20px;
  }

  .lyric {
    position: absolute;
    height: 400px;
    width: 100%;
    top: 100px;
    /* IE 9 */
    /* Safari and Chrome */
    -o-flex: 1;
    /* Opera */
    -moz-flex: 1;
    /* Firefox */
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: flex;
    display: -webkit-flex;
    -ms-flex-direction: column;
    /* IE 9 */
    -webkit-flex-direction: column;
    /* Safari and Chrome */
    -o-flex-direction: column;
    /* Opera */
    -moz-flex-direction: column;
    /* Firefox */
    flex-direction: column;
    -ms-align-content: center;
    /* IE 9 */
    -webkit-align-content: center;
    /* Safari and Chrome */
    -o-align-content: center;
    /* Opera */
    -moz-align-content: center;
    /* Firefox */
    align-content: center;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
  }

  .lyric .lyric-item {
    min-height: 28px;
    height: 28px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    opacity: .6;
    line-height: 28px;
    -webkit-transition: all 0.1s;
    -moz-transition: all 0.1s;
    -ms-transition: all 0.1s;
    -o-transition: all 0.1s;
    transition: all 0.1s;
  }

  .audio-warp .audio-progress-warp {
    position: absolute;
    bottom: 6rem;
    left: 1.5rem;
    right: 1.5rem;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }

  .audio-warp .audio-progress {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
  }

  .audio-warp .audio-progress .audio-progress-box {
    width: 0;
    height: 4px;
    background: #fff;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -ms-transition: all 0.2s;
    -o-transition: all 0.2s;
    transition: all 0.2s;
    border-radius: 2px;
    display: flex;
    display: -webkit-flex;
    -ms-justify-content: flex-end;
    /* IE 9 */
    -webkit-justify-content: flex-end;
    /* Safari and Chrome */
    -o-justify-content: flex-end;
    /* Opera */
    -moz-justify-content: flex-end;
    /* Firefox */
    justify-content: flex-end;
    overflow: visible;
  }

  .audio-warp .audio-progress .audio-progress-box .audio-progress-touch {
    width: 10px;
    min-width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    position: relative;
    top: -3px;
    box-shadow: 0 0 5px 0 #7d7d7d;
  }

  .audio-warp .audio-progress-warp .audio-progress-text {
    margin-top: 5px;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }

  .audio-warp .audio-progress-warp .audio-progress-text p {
    color: #fff;
    font-size: 0.8rem;
    margin: 3px;
  }

  .lyric .lyric-item.cur {
    color: #F70938;
    font-size: 16px;
    opacity: 1;
  }

  .opticalDisk {
    top: -15rem;
    margin: 1rem auto;
    width: 15rem;
    margin-top: 360px;
    height: 15rem;
    background: url(./../../../../static/images/timg.png) 0 0 no-repeat;
    background-size: 15rem 15rem;
    animation: circle_top 12s linear 0s forwards;
    -webkit-animation: circle_top 12s linear 0s forwards;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    animation-play-state: running;
    -webkit-animation-play-state: running;
    border-radius: 50%;
    position: relative;
    z-index: 201;
  }

  .playcover {
    width: 56%;
    height: 56%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .rotation {
    -webkit-transform: rotate(360deg);
    animation: rotation 6s linear infinite;
    -moz-animation: rotation 6s linear infinite;
    -webkit-animation: rotation 6s linear infinite;
    -o-animation: rotation 6s linear infinite;
  }

  @media screen and (max-width: 768px) {
    .lyric {
      top:50px
    }
  }


</style>

