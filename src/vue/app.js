import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Booking from './components/booking/Booking.vue';

window.Vue = Vue;
Vue.use(Vuelidate);

/* eslint-disable no-new */
new Vue({
  components: {
    Booking,
  },
}).$mount('#app');
