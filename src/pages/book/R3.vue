<template>
  <div class="r3-container">
    <div v-for="item in list">
      <md-card md-with-hover >
        <md-card-header>
          <md-avatar>
            <img :src="item.img" alt="People">
          </md-avatar>

          <div class="md-title">{{item.title}}</div>
        </md-card-header>

        <md-card-content>
          <div v-html="item.content"></div>
        </md-card-content>

      </md-card>
    </div>
  </div>
</template>

<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        list:[]
      };
    },
    methods: {
      load (){
        api.topicList().then(res => {
          this.list = res.data.content.t3;
        });
      }
    },
    created:function () {
      this.load();
    }
  }
</script>


<style>
  .md-card{
    width: 100% !important;
  }
  .md-card .md-title{
    font-size: 16px !important;
    font-weight: bold !important;
    text-align: left !important;
    margin-top: 11px !important;
    /*overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
*/
  }
  .md-card-content{
    text-align: left !important;
  }
  .md-card .md-card-media img{
    width: 90% !important;
  }
  .md-tabs .md-tab{
    padding: 0px !important;
  }
  .r3-container{
    text-align: center;
    height: 77vh;
    overflow-y: scroll !important;
    -webkit-overflow-scrolling : touch !important;/*解决iphone下不流畅问题*/
  }
</style>

