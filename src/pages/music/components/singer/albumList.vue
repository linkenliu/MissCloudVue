<template>
  <transition name="custom-classes-transition" enter-active-class="animated slideInLeft fast"  mode="out-in">
  <div class="singer-album-container" style="background-image: url('./../../../../../static/images/body-bg.jpg')">
      <div v-for="item in data" @click="album(item.id)">
        <div class="singer-album-item-img">
          <img :src="item.picUrl">
        </div>
        <div class="singer-album-item-text">
          <p style="margin-bottom: 5px;font-weight: bold;">{{item.name}}</p>
          <p style="font-size: 13px">{{item.publishTime | formatDate}} ~ {{item.size}}首</p>
        </div>
      </div>
  </div>
  </transition>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {};
    },
    computed: {

    },

    methods: {
      album (id){
        this.$router.push({path:'/albumInfo',query:{id:id}})
      }
    },
    created: function () {

    }
  }
</script>


<style>
  .singer-album-container{
    position: absolute;
    align-content: center;
    margin-top: 15px;
    height: auto;
    width: 100%;
  }
  .singer-album-item-img >img{
    width: 70px;
    height:70px
  }
  .singer-album-item-text{
    margin-top: -47px;
    margin-left: 80px;
    border-bottom: 1px solid rgb(221, 221, 221);
  }
  .singer-album-item-text p{
    margin: 0;
    color: #fff
  }
  .singer-album-container>div{
    margin-top:5px;
  }
</style>

