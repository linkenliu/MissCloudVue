<template>
  <div style="align-content: center">
    <back></back>
    <div class="r3-content">
      <md-card md-with-hover>
        <md-card-header>
          <md-avatar>
            <img :src="topic.img" alt="People">
          </md-avatar>

          <div class="md-title">{{topic.title}}</div>
        </md-card-header>
        <md-card-content>
          <div v-html="topic.content"></div>
        </md-card-content>

      </md-card>

    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '@/api/index.js'
  import back from './components/back'
  export default {
    components: {
      back
    },
    data() {
      return {
        topic: {}
      };
    },
    computed: {},

    methods: {
      load (){
        let _id = this.$route.params._id;
        api.topic({_id: _id}).then(res => {
          this.topic = res.data.content;
        })
      }
    },
    created: function () {
      this.load();
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

