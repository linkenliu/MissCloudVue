<template>
  <div>
    <Navbar @toggleLeftSidenav="toggleLeftSidenav" v-on:child-tell-keywords='listenKeyWords'></Navbar>
    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar class="md-large" v-md-theme="theme.bgColor">
        <div class="md-toolbar-container">
          <img style="border-radius: 50%;width: 90px;height: 90px;margin-top: 60px;margin-left: 6px"
               src="http://p1.music.126.net/GWg-ueH7vIQBQKG8nkZWIw==/18636722092685021.jpg?param=140y140">
          <span style="margin-left: 20px;font-size: 18px;margin-top: 70px">linkenliu</span>
        </div>
      </md-toolbar>
      <div>
        <div style="border-bottom: #eeeeee solid 1px;padding: 5px">
          <p style="margin-left: 10px"><i class="fa fa-music" style="font-size: 18px"></i>&nbsp;&nbsp;我喜欢的音乐</p>
        </div>

        <div style="border-bottom: #eeeeee solid 1px;padding: 5px">
          <p style="margin-left: 10px"><i class="fa fa-map-o"></i>&nbsp;&nbsp;我喜欢的帖子</p>
        </div>
        <div style="border-bottom: #eeeeee solid 1px;padding: 5px">
          <p style="margin-left: 10px"><i class="fa fa-desktop"></i>&nbsp;&nbsp;我喜欢的视频</p>
        </div>
        <div style="border-bottom: #eeeeee solid 1px;padding: 5px">
          <p style="margin-left: 10px"><i class="fa fa-image"></i>&nbsp;&nbsp;我喜欢的图片</p>
        </div>
        <div @click="go(5)" style="border-bottom: #eeeeee solid 1px;padding: 5px">
          <p style="margin-left: 10px"><i class="fa fa-circle-o-notch"></i>&nbsp;&nbsp;关于 Miss</p>
        </div>
      </div>
    </md-sidenav>


    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  export default {
    components: {
      Navbar
    },
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'theme'
      ])
    },
    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      },
      open(ref) {
        //console.log('Opened: ' + ref);
      },
      close(ref) {
        //console.log('Closed: ' + ref);
      },
      listenKeyWords(cacheKeyWords){
        this.$emit('child-tell-keywords', cacheKeyWords);
      },
      go(type) {
        switch (type) {
          case 5: {
            this.$router.push({path: '/about'});
          }
        }
      },
      initLogin(){
        let userInfo = localStorage.getItem('userInfo');
        let date = new Date();
        date.setHours(date.getHours() + 2);
        if (userInfo) {
          if (userInfo.date && userInfo.date <= new Date()) {
            api.login({}).then({}).then((res) => {
              let accountId = res.data.account.id;
              let userName = res.data.account.userName;
              let userId = res.data.account.profile.userId;
              let avatarUrl = res.data.account.profile.avatarUrl;
              let nickName = res.data.profile.nickname;
              let object = {accountId: accountId, userName: userName, userId: userId, avatarUrl: avatarUrl,nickName:nickName,date: date};
              localStorage.setItem('userInfo', JSON.stringify(object));
            })
          }
        } else {
          api.login({}).then({}).then((res) => {
            console.log(res)
            let accountId = res.data.account.id;
            let userName = res.data.account.userName;
            let userId = res.data.profile.userId;
            let avatarUrl = res.data.profile.avatarUrl;
            let nickName = res.data.profile.nickname;
            let object = {accountId: accountId, userName: userName, userId: userId, avatarUrl: avatarUrl,nickName:nickName, date: date};
            localStorage.setItem('userInfo', JSON.stringify(object));
          })
        }
      }
    },
    created (){
      this.initLogin();
    }
  };
</script>

<style>


</style>
