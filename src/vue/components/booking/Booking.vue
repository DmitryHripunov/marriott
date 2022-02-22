<template>
  <form class="form">
    <div class="form__wrapper">
      <div class="form__group">
        <div class="form__item">
          <date-picker
            v-model="time"
            :range="range"
            valueType="format"
            placeholder="Заезд – Отъезд"
            :disabled-date="disabledDate"
            input-class="form__input form__input_booking"
          >
          </date-picker>
        </div>  

        <div class="form__item">
        </div> 

        <div class="form__item">
        </div>

        <div class="form__item">
          <button class="btn btn_primary" disabled>Указать контакы</button>
        </div>  
      </div>
    </div>
  </form>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  
  export default {
    components: { DatePicker },
    data () {
      return {
        range: true,
        time: null,
      }
    },

    computed: {

    },
    methods: {
      disabledDate(date) {
        const currentDate = date;
       return currentDate < new Date().getTime() - 1 * 24 * 60 * 60 * 1000;
      },
    }
  }
</script>

<style>
  .mx-datepicker-main {
    font: 14px/1.4 "inter Neue", "Microsoft", sans-serif;
    color: #23323F;
  }

  .mx-datepicker-popup {
    z-index: 9;
  }

  .mx-calendar-header-label .mx-btn {
    font-weight: 800;
    color: #23323F;
  }

  .mx-btn {
    color: #F55347;
  }

  .mx-calendar-content .cell:not(.disabled) {
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: 4px;
    color: inherit;
    transition: border-color .2s ease-in-out;
  }

  .mx-calendar-content .cell:hover:not(.disabled):not(.active) {
    background-color: transparent;
    border-color: #F55347;
  }

  .mx-calendar-content .cell.active {
    background-color: #F55347;
    color: #fff;
  }

  .mx-calendar-content .cell.in-range, .mx-calendar-content .cell.hover-in-range {
    background-color: #FEEAE8;
  }
</style>
