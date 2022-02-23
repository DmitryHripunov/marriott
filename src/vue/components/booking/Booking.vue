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
          <div
            class="form__input form__input_sharp"
            @click.stop="toggleDropdownRoomType"
          >
            <span class="form__tag">
              {{ roomType ? roomType : roomTypePlaceholder }}
            </span>
          </div>

          <div
            class="form__dropdown"
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

        <div class="form__item form__item_main">
          <div
            class="form__input form__input_radius-right"
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
            class="form__dropdown"
            :class="{ 'is-active': isActiveDropdownNumberPeople }"
            @click="prevent($event)"
          >
            <div class="form__counter">
              <div class="counter">
                <div class="counter__desc">
                  <strong>Взрослые</strong>
                  <div class="counter__footnote">Старше 12 лет</div>
                </div>

                <div class="counter__wrapper">
                  <button
                    type="button"
                    class="counter__btn"
                    @click.prevent="decrementAdults"
                    :disabled="adults <= 1 || adults === 1"
                  >
                    <svg class="icon icon_size-40 icon_color-primary">
                      <use xlink:href="#minus"></use>
                    </svg>
                  </button>

                  <input
                    class="counter__input"
                    type="number"
                    name="count"
                    v-model.number="countAdults"
                  />

                  <button
                    type="button"
                    class="counter__btn"
                    @click.prevent="incrementAdults"
                    :disabled="adults >= 100"
                  >
                    <svg class="icon icon_size-40 icon_color-primary">
                      <use xlink:href="#plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="form__counter">
              <div class="counter">
                <div class="counter__desc">
                  <strong>Дети</strong>
                  <div class="counter__footnote">От 2 до 12 лет</div>
                </div>

                <div class="counter__wrapper">
                  <button
                    type="button"
                    class="counter__btn"
                    @click.prevent="decrementChildren"
                    :disabled="children <= 0 || children === 0"
                  >
                    <svg class="icon icon_size-40 icon_color-primary">
                      <use xlink:href="#minus"></use>
                    </svg>
                  </button>

                  <input
                    class="counter__input"
                    type="number"
                    name="count"
                    v-model.number="countChildren"
                  />

                  <button
                    type="button"
                    class="counter__btn"
                    @click.prevent="incrementChildren"
                    :disabled="children >= 100"
                  >
                    <svg class="icon icon_size-40 icon_color-primary">
                      <use xlink:href="#plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <input type="hidden" v-model="adults" />
          <input type="hidden" v-model="children" />
        </div>

        <div class="form__item form__item_main" v-show="step_1">
          <button
            class="btn btn_primary"
            :disabled="!time[0] || !roomType"
            @click.prevent="makeNextStep"
          >
            Указать контакы
          </button>
        </div>
      </div>

      <div class="form__group form__group_main" v-show="step_2">
        <div class="form__item form__item_main">
          <input
            class="form__input form__input_radius-left"
            type="text"
            placeholder="Имя"
          />
        </div>

        <div class="form__item form__item_main">
          <input
            class="form__input form__input_sharp"
            type="text"
            placeholder="Почта"
          />
        </div>

        <div class="form__item form__item_main">
          <input
            class="form__input form__input_radius-right"
            type="text"
            placeholder="Телефон"
          />
        </div>

        <div class="form__item form__item_main">
          <button type="button" class="btn btn_primary js-get-booking-popup" data-target="#booking">Забронировать</button>
        </div>
      </div>
    </div>

    <div class="form__checkbox-wrapper">
      <label class="form__label-checkbox">
        <input class="form__checkbox" checked type="checkbox" />

        <span class="form__checkbox-text">Cогласен с условиями </span>

        <a href="#" target="_blank" class="form__link">персональны данных</a>
      </label>
    </div>

    <!-- <div class="popup" :class="{'is-active': showPopup}" @click="prevent">
      <div class="popup__wrapper popup__wrapper_dark">
        <div class="popup__header">
          <h3 class="title title_h3 title_indent-xs title_white title_center">
            Заявка отпарвлена
          </h3>

          <button type="button" class="popup__close" @click.prevent="makePopupThanksHidden">
            <svg class="icon icon_color-white icon_ml-8 icon_size-24 icon_db">
              <use xlink:href="#close"></use>
            </svg>
          </button>
        </div>

        <p class="desc desc_light desc_center desc_indent-16">
          Ваша заявка принята, специалист свяжется с вами в рабочее время: пн-пт с 9:30 до 17:30
        </p>

        <div type="button" class="popup__btn-wrapper" @click.prevent="makePopupThanksHidden">
          <button class="btn btn_primary">Хорошо</button>
        </div>
      </div>
    </div> -->
  </form>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ru";

export default {
  components: { DatePicker },
  data() {
    return {
      range: true,
      time: [],

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
    countAdults: {
      get() {
        return this.adults;
      },
      set(value) {
        this.adults = value;
      },
    },
    countChildren: {
      get() {
        return this.children;
      },
      set(value) {
        this.children = value;
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
      event._isClickWithinDropDown = true;
      this.isActiveDropdownRoomType = false;
      this.isActiveDropdownNumberPeople = !this.isActiveDropdownNumberPeople;
    },
    prevent(event) {
      event._isClickWithinDropDown = true;
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
    incrementAdults() {
      this.countAdults += 1;
    },
    decrementAdults() {
      this.countAdults -= 1;
    },
    incrementChildren() {
      this.countChildren += 1;
    },
    decrementChildren() {
      this.countChildren -= 1;
    },
    // makePopupThanks(event) {
    //   event._isClickWithinDropDown = true;
    //   this.showPopup = true;
    //   document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    //   document.querySelector('.js-header').style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    //   document.body.classList.add('no-scrolling', 'no-scrolling_vue');
    // },
    // makePopupThanksHidden() {
    //   this.showPopup = false;
    //   document.body.style.paddingRight =  "";
    //   document.querySelector('.js-header').style.paddingRight = "";
    //   document.body.classList.remove('no-scrolling', 'no-scrolling_vue');
    // },
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
      if (event._isClickWithinDropDown) return;
      this.doHiddenDropdown();
      // this.makePopupThanksHidden()
    });
  },
};
</script>

<style>
.mx-datepicker-main {
  font: 14px/1.4 "inter Neue", "Microsoft", sans-serif;
  color: #23323f;
  border-radius: 8px;
  box-shadow: 0px 12px 16px -4px rgba(17, 24, 39, 0.1),
    0px 4px 6px -2px rgba(17, 24, 39, 0.05);
}

.mx-datepicker-range {
  width: 100%;
}

.mx-datepicker-popup {
  z-index: 9;
}

.mx-calendar-header-label .mx-btn {
  font-weight: 800;
  color: #23323f;
}

.mx-btn {
  color: #f55347;
}

.mx-calendar-content .cell:not(.disabled) {
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 4px;
  color: inherit;
  transition: border-color 0.2s ease-in-out;
}

.mx-calendar-content .cell:hover:not(.disabled):not(.active) {
  background-color: transparent;
  border-color: #f55347;
}

.mx-calendar-content .cell.active {
  background-color: #f55347;
  color: #fff;
}

.mx-calendar-content .cell.in-range,
.mx-calendar-content .cell.hover-in-range {
  background-color: #feeae8;
}
</style>
