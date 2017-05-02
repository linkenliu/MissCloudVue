<template>
  <transition name="custom-classes-transition" enter-active-class="animated slideInLeft fast"  mode="out-in">
  <div class="container">
    <div class="waterfall">
      <div class="item">
        <img src="http://a4.topitme.com/l/201004/28/12724351559758.jpg">
      </div>

      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=03948ea9b4315c60579863bdecd8a076/8326cffc1e178a825a6b5d1cfe03738da977e833.jpg">

      </div>


      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=03948ea9b4315c60579863bdecd8a076/8326cffc1e178a825a6b5d1cfe03738da977e833.jpg">

      </div>




      <div class="item">
        <img src="http://a3.topitme.com/c/49/08/11362720012e40849cl.jpg">

      </div>



      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=fbc3501b0a087bf469e15fbb93ba3c49/bf096b63f6246b60ea65dd24e3f81a4c510fa273.jpg">

      </div>

      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=9fe1d71697ef76c6c4dff379fc7f969f/b03533fa828ba61ed2efcd184634970a304e5987.jpg">
      </div>

      <div class="item">
        <img src="http://a3.topitme.com/c/49/08/11362720012e40849cl.jpg">

      </div>

      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=03948ea9b4315c60579863bdecd8a076/8326cffc1e178a825a6b5d1cfe03738da977e833.jpg">

      </div>




      <div class="item">
        <img src="http://a3.topitme.com/c/49/08/11362720012e40849cl.jpg">

      </div>



      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=fbc3501b0a087bf469e15fbb93ba3c49/bf096b63f6246b60ea65dd24e3f81a4c510fa273.jpg">

      </div>

      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=9fe1d71697ef76c6c4dff379fc7f969f/b03533fa828ba61ed2efcd184634970a304e5987.jpg">
      </div>

      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=fbc3501b0a087bf469e15fbb93ba3c49/bf096b63f6246b60ea65dd24e3f81a4c510fa273.jpg">

      </div>

      <div class="item">
        <img src="https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=9fe1d71697ef76c6c4dff379fc7f969f/b03533fa828ba61ed2efcd184634970a304e5987.jpg">
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {

  },
  created:function () {

  }
}
</script>


<style>

  /*大层*/
  .container{width:90%;margin: 0 auto;}
  /*瀑布流层*/
  .waterfall{
    -moz-column-count:4; /* Firefox */
    -webkit-column-count:4; /* Safari 和 Chrome */
    column-count:2;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em;
  }
  /*一个内容层*/
  .item{
    padding: 1em;
    margin: 0 0 1em 0;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    border: 1px solid #000;
  }
  .item img{
    width: 100%;
    margin-bottom:10px;
  }
</style>

