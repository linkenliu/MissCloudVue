import Vue from 'vue'
import moment from 'moment'


const DISPLAY_DATE_FORMAT = 'YYYY-MM-DD';
const D_DATE = 'HH:mm';

Vue.filter('formatDate', function (date) {
  return moment(date).format(DISPLAY_DATE_FORMAT)
});
