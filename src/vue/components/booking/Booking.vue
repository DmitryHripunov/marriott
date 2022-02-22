<template>
  <form class="form">
    <div class="form__wrapper">
      <div class="form__group form__group_main">
        <div class="form__item form__item_main">
          <DatePicker
            v-model="time"
            :range="range"
            valueType="format"
            placeholder="Заезд – Отъезд"
            :disabled-date="disabledDate"
            input-class="form__input form__input_radius-left"
          />
        </div>  

        <div class="form__item form__item_main">
          <Multiselect
            v-model="selectValue"
            :options="options"
            placeholder="Укажите тип номера"
          />
        </div> 

        <div class="form__item form__item_main form__input_radius-right">
        </div>

        <div class="form__item form__item_main">
          <button class="btn btn_primary" disabled>Указать контакы</button>
        </div>  
      </div>
    </div>
  </form>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import Multiselect from 'vue-multiselect';
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  
  export default {
    components: { DatePicker, Multiselect },
    data () {
      return {
        range: true,
        time: null,
        selectValue: null,
        options: [
          'Номер Делюкс',
          'Номер Люкс',
          'Семейный однокомнатный полулюкс',
          'Семейный однокомнатный улучшенный люкс',
          'Семейный двухкомнатный люкс',
          'Семейный люкс «Представительский» с двумя спальнями',
          'Семейный люкс «Гранд» с тремя спальнями',
          'Семейный люкс «Премьер» с четырьмя спальнями',
          'Пентхаус',
          'Президентский люкс'
          ]
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

  .mx-datepicker-range {
    width: auto;
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

  /* select */
  .multiselect {
    height: 100%;
    width: 100%;
    position: static;
    min-height: 0;
    line-height: 1;
  }

  .multiselect__tags {
    padding: 10px 12px;
    border-radius: 0;
    border: none;
    height: 100%;
    color: #A1A7AD;
    font-size: inherit;
    font-family: "inter", sans-serif;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 0;
  }

  .multiselect__placeholder {
    min-height: 0;
    margin-bottom: 0;
    padding-top: 0;
  }

  .multiselect__select {
    display: none;
  }

  .multiselect__option {
    color: #23323F;
    font-size: inherit;
    font-family: "inter", sans-serif;
    line-height: 1;
  }

  .multiselect__input,
  .multiselect__input::placeholder,
  .multiselect__input:focus {
    min-height: 0;
    font-family: "inter", sans-serif;
    line-height: 1;
    margin-bottom: 0;
    padding: 0;
    /* font-size: 16px;  */
    font: 16px/1 "inter Neue", "Microsoft", sans-serif;
  }

  .multiselect__input {
    
    }

  .multiselect__single {
    font: 16px/1 "inter Neue", "Microsoft", sans-serif;
    min-height: 0;
    font-size: inherit;
    font-family: "inter", sans-serif;
    line-height: 1;
    padding: 0;
    margin: 0;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 1024px) {
    .multiselect__tags {
      padding: 16px;
    }
 }

</style>
