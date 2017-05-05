<template >
  <transition name="custom-classes-transition" enter-active-class="animated slideInLeft fast"  mode="out-in">
  <div>
    <Back style="margin-top: -60px"></Back>
    <div id="about" style="position: absolute;width: 100%;margin-top: 60px">

      <ul style="margin-left: -40px">
        <li>
          <strong>介绍：</strong>
          <div>
             <p>
            因平时会浏览一些网页，然而这些站点没有App；所以为了方便浏览，就把这些站点内容集中到Miss App中。
          </p>
          </div>
        </li>
        <li>
          <strong>
            服务：
          </strong>
          <div>
            <p><strong>*</strong> Service: missAdmin==>>负责Api服务. ### 技术栈:mongodb,mongoose,koa2</p>
            <p><strong>*</strong> missRept==>>负责各网站的数据采集. ### 技术栈:mongodb,mongoose,koa1</p>
            <p><strong>*</strong> missCloudMusic==>>负责提供音乐数组Api(网易云) ### 技术栈:express</p>
          </div>
        </li>
        <li>
          <strong>客户端：</strong>
          <div>
             <p>客户端采用现流行的Vue构建页面；### 技术栈:Vue,Vuex,webpack,vueRouter,axios</p>
          </div>
        </li>
        <li>
          <strong>Github：</strong>
          <div>
            <p><a href="http://139.196.32.78:8090/#/home/music">在线Demo MissCloud</a></p>
            <p><a href="https://github.com/linkenliu/MissCloudVue">https://github.com/linkenliu/MissCloudVue</a></p>
          </div>
        </li>
        <li>
          <strong>部署：</strong><p>Pm2 , Nginx</p>
        </li>
        <li>
          <strong>心得：</strong>
          <div>
            <p>通过Miss更加熟练了Vue,Vuex；这让我感到欣慰。当然，在次过程中也遇到了很多诸多问题,比如说数据采集时会有反盗链机制；还有Vue的一些坑，Vue当时全局注册了一个第三方的内库，但是由于后来没有用，所以就删除了导入代码，而忘了删除注册代码；下面的事情就很尴尬了，用浏览器访问的时候完全没问题，可用手机访问就出不来了(页面)；好像是页面没有加载到似的（关键问题在于没有任何的error），后来尝试了各种，包括了重新建项目再来试；这个坑爬了很久（浪费时间）。所以童鞋们写代码的时候一定要细心啊！！！啊啊啊</p>
          </div>
        </li>
        <li>
          <strong>致谢：</strong>
          <div>
            <p>感谢<a target="_blank" href="https://github.com/Binaryify">Binaryify</a>提供网易云Api;Github==>><a target="_blank" href="https://github.com/Binaryify/NeteaseCloudMusicApi">NeteaseCloudMusicApi</a></p>
          </div>
        </li>
        <li>
          <strong>Install：</strong>
          <div>
            <p><strong>*</strong> npm install</p>
            <p><strong>*</strong> npm run dev</p>
            <p><strong>*</strong> npm run build</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </transition>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  import Back from '@/components/Back'
  export default {
    components:{
      Back
    },
    data() {
      return {};
    },
    computed: {

    },

    methods: {},
    created: function () {

    }
  }
</script>


<style>
  #about p{
    padding: 0;
    font-size: 13px;
  }
  #about ul li{
    margin-left: 10px !important;
    padding: 5px 15px !important;
  }
</style>

