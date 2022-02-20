import Vue from 'vue';
import Booking from './components/booking/Booking.vue';

window.Vue = Vue;

/* eslint-disable no-new */
new Vue({
  components: {
    Booking,
  },
}).$mount('#app');
