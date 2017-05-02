<template>
  <div>
    <md-toolbar class="top-nav">
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon><i class="iconfont icon-menu"></i></md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">电影</h2>
      <md-button class="md-icon-button">
        <md-icon><i class="iconfont icon-logout"></i></md-icon>
      </md-button>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Vuejs2.0-demo</h3>
        </div>
      </md-toolbar>
      <p class="soucecode">SouceCode:</p>
      <p><a href="https://github.com/alex1504/vue2.0-demo">https://github.com/alex1504/vue2.0-demo</a></p>
    </md-sidenav>

  </div>
</template>

<script>
  export default {
    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      },
      toggleRightSidenav() {
        this.$refs.rightSidenav.toggle();
      },
      closeRightSidenav() {
        this.$refs.rightSidenav.close();
      },
      open(ref) {
        console.log('Opened: ' + ref);
      },
      close(ref) {
        console.log('关闭d: ' + ref);
      }
    }
  };

</script>

<style>


</style>
