<template>
  <div class="r2-container">
    <div class="r2-content">
      <div v-for="item in r2s">
        <md-card md-with-hover>
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
  </div>
</template>

<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        r2s: []
      };
    },
    methods: {
      load (){
        let self = this;
        api.topicList({}).then(function (res) {
          self.r2s = res.data.content.t2;
        })
      }
    },
    created: function () {
      this.load();
    }
  }
</script>


<style>
   .md-card {
     width: 100% !important;
   }

   .md-card .md-title {
     font-size: 16px !important;
     font-weight: bold !important;
     text-align: left !important;
     margin-top: 11px !important;
   }

   .md-card-content {
     text-align: left !important;
   }

   .md-card .md-card-media img {
     width: 90% !important;
   }

   .md-tabs .md-tab {
     padding: 0px !important;
   }

   .r2-container {
     text-align: center;
     height: 77vh;
     overflow-y: scroll !important;
     -webkit-overflow-scrolling: touch !important;
   }
</style>

