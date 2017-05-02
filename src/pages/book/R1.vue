<template>
  <div class="r1-container">
    <div  v-for="(item,index) in r1s">
      <md-list class="custom-list md-triple-line">
        <md-list-item>
          <md-avatar style="background-color: pink">
            <span v-if="index<=9" style="position: absolute;margin-top: 10px;margin-left: 14px">{{index+1}}</span>
            <span v-if="index>9" style="position: absolute;margin-top: 10px;margin-left: 11px">{{index+1}}</span>
          </md-avatar>

          <div class="md-list-text-container" @click="go(item._id)">
            <span>{{item.title}}</span>
            <p>{{item.summary}}</p>
          </div>

          <md-divider class="md-inset"></md-divider>
        </md-list-item>


      </md-list>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        r1s: []
      };
    },
    methods: {
      load (){
        api.topicList().then(res=>{
           this.r1s = res.data.content.t1;
        });
      },
      go (_id) {
          this.$router.push({path:'/r1d/'+_id})

      }
    },
    created: function () {
      this.load();
    }
  }
</script>


<style>
  .r1-container {
    text-align: center;
    height: 77vh;
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch !important; /*解决iphone下不流畅问题*/
  }
  .md-avatar{
    overflow: inherit !important;
  }
  li{
     border-bottom: 0px solid #eeeeee !important;
  }
  .md-list.md-triple-line .md-list-item .md-list-item-container {
    min-height: 60px !important;
  }

</style>

