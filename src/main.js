
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import axios from 'axios'
import fiters from './fiter'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'


import 'mint-ui/lib/style.css';

require('./../static/css/animate.css');


require('vue-swipe/dist/vue-swipe.css');

// in ES6 modules
import { Swipe, SwipeItem } from 'vue-swipe';


Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);


Vue.use(VueMaterial)


Vue.config.productionTip = false

Vue.directive('mdTheme',
  function (el,binding) {
    el.style.background = binding.value;
});


//axios.defaults.baseURL = 'http://localhost:3000/';





new Vue({
  el: '#app',
  fiters,
  router,
  store,
  template: '<App/>',
  components: { App }
})


