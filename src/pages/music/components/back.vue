<template>
  <div style="align-content: center">
    <md-toolbar class="top-nav" v-md-theme="theme.bgColor">
      <md-button class="md-icon-button" @click.native="toback()">
        <md-icon><i class="iconfont icon-back"></i></md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1;text-align: center" v-text="theme.topbarTitle"></h2>
      <md-button class="md-icon-button" @click.native="isShowPlay()">
        <md-icon>
          <img v-if="playing==true" src="../../../../static/images/icon-article1.gif"
               style="margin-top: -8px;height: 20px">
          <img v-if="playing==false" src="../../../../static/images/noplay.png" style="margin-top: -8px;height: 20px">
        </md-icon>
      </md-button>
    </md-toolbar>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'theme', 'playing'
      ])
    },
    beforeMount () {
      let action = this.$route.path;
      action = action.substring(1, action.length);
      this.$store.commit('setTheme', {bgColor: '', action: action});
    },
    methods: {
      ...mapMutations([
        'play', 'pause'
      ]),
      toback () {
        this.$router.go(-1);
      },
      isShowPlay (){
        let self = this;
        let song = this.$store.state.song;
        if (song && !song.id) {
          let song = this.$store.state.music.recommendSongList[0];
          let object = {
            id:song.id,
            songName: song.name,
            mp3Url: song.mp3Url,
            singer: song.artists[0].name
          };
          this.play();
          this.$store.commit('setSong', object);
          setTimeout(function () {
            self.$parent.$parent.playMusic1();
          }, 500)
        }
        this.$parent.$parent.isShowPlay = true;
      }
    },
    created: function () {

    }
  }
</script>


<style>

</style>

