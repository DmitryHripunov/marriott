<template>
  <form class="form">
    <div class="form__wrapper">
      <div class="form__group">
        <div class="form__item">
          <date-picker
            :popupClass="popupClass"
            v-model="time"
            :range="range"
            valueType="format"
            placeholder="Заезд – Отъезд"
            :disabled-date="disabledDate"
            input-class="form__input"
          >
            <template v-slot:icon-calendar>
              <svg class="icon icon_size-24">
                <use xlink:href="#calendar"></use>
              </svg>
            </template>
          </date-picker>
        </div>

        <div class="form__item">
          <div
            class="form__input"
            @click.stop="toggleDropdownRoomType"
          >
            <span class="form__tag">
              {{ roomType ? roomType : roomTypePlaceholder }}
            </span>
          </div>

          <div
            class="form__dropdown form__dropdown_popup"
            :class="{ 'is-active': isActiveDropdownRoomType }"
          >
            <span
              class="form__dropdown-item"
              v-for="(item, index) in roomOptions"
              :key="index"
              @click.stop="setRoomType(item), toggleDropdownRoomType()"
            >
              {{ item }}
            </span>
          </div>
          <input type="hidden" v-model="roomType" />
        </div>

        <div class="form__item">
          <div
            class="form__input"
            @click="toggleDropdownNumberPeople($event)"
          >
            <span class="form__tag-inner"> взрослые {{ adults }} • </span>

            <span class="form__tag-inner" v-if="children === 0">
              без детей
            </span>

            <span class="form__tag-inner" v-if="children > 0">
              дети {{ children }}
            </span>
          </div>

          <div
            class="form__dropdown form__dropdown_counter form__dropdown_popup"
            :class="{ 'is-active': isActiveDropdownNumberPeople }"
            @click="prevent($event)"
          >
            <Counter
              :adults.sync="adults"
              :children.sync="children"
            />
          </div>

          <input type="hidden" v-model="adults" />
          <input type="hidden" v-model="children" />
        </div>

        <div class="form__item form__item_centered" v-show="step_1">
          <button
            class="btn btn_primary"
            :disabled="!time[0] || !roomType"
            @click.prevent="makeNextStep"
          >
            Указать контакы
          </button>
        </div>
      </div>

      <div class="form__group" v-show="step_2">
        <div class="form__item">
          <input
            class="form__input"
            type="text"
            placeholder="Имя"
          />
        </div>

        <div class="form__item">
          <input
            class="form__input"
            type="text"
            placeholder="Почта"
          />
        </div>

        <div class="form__item">
          <input
            class="form__input"
            type="text"
            placeholder="Телефон"
          />
        </div>

        <div class="form__item form__item_centered">
          <button type="button" class="btn btn_primary js-get-booking-popup" data-target="#popup-thanks">Забронировать</button>
        </div>
      </div>
    </div>

    <div class="form__checkbox-wrapper">
      <label class="form__label-checkbox">
        <input class="form__checkbox" checked type="checkbox" />

        <span class="form__checkbox-text form__checkbox-text_white">Cогласен с условиями </span>

        <a href="#" target="_blank" class="form__link">персональны данных</a>
      </label>
    </div>
  </form>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ru";
import Counter from "../counter/Counter.vue";

export default {
  components: { DatePicker, Counter },
  data() {
    return {
      range: true,
      time: [],
      popupClass: 'mx-datepicker-popup_popup',

      roomOptions: [
        "Номер Делюкс",
        "Номер Люкс",
        "Семейный однокомнатный полулюкс",
        "Семейный однокомнатный улучшенный люкс",
        "Семейный двухкомнатный люкс",
        "Семейный люкс «Представительский» с двумя спальнями",
        "Семейный люкс «Гранд» с тремя спальнями",
        "Семейный люкс «Премьер» с четырьмя спальнями",
        "Пентхаус",
        "Президентский люкс",
      ],
      roomType: null,
      roomTypePlaceholder: "Укажите тип номера",
      isActiveDropdownRoomType: false,

      adults: 1,
      children: 0,
      isActiveDropdownNumberPeople: false,

      step_1: true,
      step_2: false,

      showPopup: false,
    };
  },
  computed: {
    getDate: {
      get() {
        return this.time;
      },
      set(value) {
        this.time = value;
      },
    },
    getRoomType: {
      get() {
        return this.roomType;
      },
      set(value) {
        this.roomType = value;
      },
    },
  },
  methods: {
    timeControl() {
      if (this.time.length && !this.time[0]) {
        this.time = [];
        this.step_1 = true;
        this.step_2 = false;
      }
    },
    makeNextStep() {
      this.step_2 = true;
      this.step_1 = false;
    },
    toggleDropdownRoomType() {
      this.isActiveDropdownNumberPeople = false;
      this.isActiveDropdownRoomType = !this.isActiveDropdownRoomType;
    },
    toggleDropdownNumberPeople(event) {
      event._isClickWithinDropPopupDropDown = true;
      this.isActiveDropdownRoomType = false;
      this.isActiveDropdownNumberPeople = !this.isActiveDropdownNumberPeople;
    },
    prevent(event) {
      event._isClickWithinDropPopupDropDown = true;
    },
    doHiddenDropdown() {
      this.isActiveDropdownRoomType = false;
      this.isActiveDropdownNumberPeople = false;
    },

    setRoomType(value) {
      this.roomType = value;
    },
    disabledDate(date) {
      const currentDate = date;
      return currentDate < new Date().getTime() - 1 * 24 * 60 * 60 * 1000;
    },
  },
  watch: {
    time: {
      handler() {
        this.timeControl();
      },
      deep: true,
    }
  },
  created() {
    document.addEventListener("click", (event) => {
      if (event._isClickWithinDropPopupDropDown) return;
      this.doHiddenDropdown();
    });
  },
};
</script>
