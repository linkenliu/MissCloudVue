<template>
  <transition name="custom-classes-transition" enter-active-class="animated slideInLeft fast"  mode="out-in">
  <div id="movie" style="align-content: center;text-align: center;line-height: 30">



    暂无视频


  </div>
  </transition>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  export default {
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
  .md-tabs {
    position: fixed !important;
    width: 100%;
    top: 60px;
    left: 0;
  }

</style>

