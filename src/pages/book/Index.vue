<template>
  <transition name="custom-classes-transition" enter-active-class="animated slideInLeft fast" mode="out-in">

   <div id="book" style="margin-top: -60px">
     <Loading style="margin-top: 45px"></Loading>
    <md-tabs md-fixed>
      <md-tab md-label="读1区">
        <R1></R1>
      </md-tab>
      <md-tab md-label="读2区">
        <R2></R2>
      </md-tab>

      <md-tab md-label="读3区">
       <R3></R3>
      </md-tab>
    </md-tabs>
  </div>
  </transition>
</template>

<script>
  import R1 from '@/pages/book/R1'
  import R2 from '@/pages/book/R2'
  import R3 from '@/pages/book/R3'
  import Loading from '@/components/Loading'
export default {
  components:{R1,R2,R3,Loading},
  data() {
    return {
      isLoading:true
    };
  },
  methods: {
    init(){

    }
  },
  created:function () {

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
    overflow-y:auto !important;
  }
  .md-card .md-card-media img{
    width: 90% !important;
  }
  .md-tabs{
    position: fixed;
    width:100%;
    top: 64px;
    left:0;
  }
  .md-tabs.wrap-fixed>.md-tabs-navigation{
    position: fixed;
    left:0;
    top: 0;
    width: 100%;
  }
  .md-theme-default.md-tabs>.md-tabs-navigation{
    background-color: #F70938 !important;
  }



</style>

