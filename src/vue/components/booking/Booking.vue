<template>
  <form class="form" @submit.prevent="submit">
    <div class="form__wrapper">
      <div class="form__group" :class="form__group_main">
        <div class="form__item" :class="form__item_main">
          <date-picker
            :popupClass="popup_class"
            v-model="time"
            :range="range"
            valueType="format"
            placeholder="Заезд – Отъезд"
            :disabled-date="disabledDate"
            input-class="form__input"
            :class="form__input_radius_left"
          >
            <template v-slot:icon-calendar>
              <svg class="icon icon_size-24">
                <use xlink:href="#calendar"></use>
              </svg>
            </template>
          </date-picker>
        </div>

        <div class="form__item" :class="form__item_main">
          <div
            class="form__input"
            :class="form__input_sharp"
            @click.stop="toggleDropdownRoomType"
          >
            <span class="form__tag">
              {{ roomType ? roomType : roomTypePlaceholder }}
            </span>
          </div>

          <div
            class="form__dropdown"
            :class="{
              'is-active': isActiveDropdownRoomType,
              form__dropdown_popup,
            }"
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

        <div class="form__item" :class="form__item_main">
          <div
            class="form__input"
            :class="form__input_radius_right"
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
            :class="{
              'is-active': isActiveDropdownNumberPeople,
              form__dropdown_popup,
              form__dropdown_counter,
            }"
            @click="prevent($event)"
          >
            <Counter :adults.sync="adults" :children.sync="children" />
          </div>

          <input type="hidden" v-model="adults" />
          <input type="hidden" v-model="children" />
        </div>

        <div
          class="form__item form__item_centered"
          :class="form__item_main"
          v-show="step_1"
        >
          <button
            class="btn btn_primary"
            :disabled="!time[0] || !roomType"
            @click.prevent="makeNextStep"
          >
            Указать контакы
          </button>
        </div>
      </div>

      <div class="form__group" :class="form__group_main" v-show="step_2">
        <div
          class="form__item"
          :class="{
            form__item_main: 'form__item_main',
            form__item_error: $v.name.$error,
          }"
        >
          <input
            class="form__input"
            :class="form__input_radius_left"
            type="text"
            placeholder="Имя"
            v-model.trim="$v.name.$model"
          />

          <div class="form__error-text" v-if="$v.name.$error">не менее 2 символов</div>
        </div>

        <div
          class="form__item"
          :class="{
            form__item_main: 'form__item_main',
            form__item_error: $v.email.$error,
          }"
        >
          <input
            class="form__input"
            :class="form__input_sharp"
            type="text"
            placeholder="Почта"
            v-model.trim="$v.email.$model"
          />

          <div class="form__error-text" v-if="$v.email.$error">некорректный email</div>
        </div>

        <div
          class="form__item"
          :class="{
            form__item_main: 'form__item_main',
            form__item_error: $v.phone.$error,
          }"
        >
          <input
            class="form__input"
            :class="form__input_radius_right"
            type="tel"
            :placeholder="placeholder_tel"
            :ref="tel && 'tel'"
            v-model.trim="$v.phone.$model"
          />

          <div class="form__error-text" v-if="$v.phone.$error">некорректный телефон</div>
        </div>

        <div class="form__item form__item_main form__item_centered">
          <button type="submit" class="btn btn_primary js-submit">
            Забронировать
          </button>
        </div>
      </div>
    </div>

    <div class="form__checkbox-wrapper">
      <label class="form__label-checkbox">
        <input class="form__checkbox" checked type="checkbox" />

        <span class="form__checkbox-text" :class="form__checkbox_text_white"
          >Cогласен с условиями
        </span>

        <a href="agreement.html" class="form__link">персональны данных</a>
      </label>
    </div>
  </form>
</template>

<script>
import DatePicker from "vue2-datepicker";
import Counter from "../counter/Counter.vue";
import { required, email, minLength } from "vuelidate/lib/validators";
import Inputmask from "inputmask";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ru";
export default {
  props: [
    "popup_class",
    "form__group_main",
    "form__item_main",
    "form__input_radius_left",
    "form__input_sharp",
    "form__input_radius_right",
    "form__dropdown_popup",
    "form__checkbox_text_white",
    "form__dropdown_counter",
  ],
  components: { DatePicker, Counter },
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
        "Семейный люкс «Представительский» с двумя спальнями",
        "Семейный люкс «Гранд» с тремя спальнями",
        "Семейный люкс «Премьер» с четырьмя спальнями",
        "Пентхаус",
        "Президентский люкс",
      ],
      roomType: null,
      roomTypePlaceholder: "Укажите тип номера",
      isActiveDropdownRoomType: false,
      adults: 1,
      children: 0,
      isActiveDropdownNumberPeople: false,
      name: null,
      email: null,
      phone: null,
      tel: true,
      placeholder_tel: "телефон", 
      step_1: true,
      step_2: false,
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(2),
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
      minLength: minLength(18),
    },
  },
  computed: {
    modifierClasses() {
      return {
        popup_class: popup_class,
        form__group_main: this.form__group_main,
        form__item_main: this.form__item_main,
        "form__input_radius-left": this.form__input_radius_left,
        form__input_sharp: this.form__input_sharp,
        "form__input_radius-right": this.form__input_radius_right,
        form__dropdown_popup: this.form__dropdown_popup,
        "form__checkbox-text_white": this.form__checkbox_text_white,
        form__dropdown_counter: this.form__dropdown_counter,
      };
    },
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
    resetForm() {
      (this.roomType = null), (this.time = []), (this.adults = 1);
      this.children = 0;
      this.name = "";
      this.email = "";
      this.phone = "";
      this.step_1 = true;
      this.step_2 = false;
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      const popup = document.getElementById("popup-thanks");
      const header = document.querySelector(".js-header");
      const closeBtns = popup.querySelectorAll(".js-close-popup");
      const body = document.body;
      popup.classList.add("is-active");
      body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`;
      if (header)
        header.style.paddingRight = `${
          window.innerWidth - document.documentElement.clientWidth
        }px`;
      body.classList.add("no-scrolling");
      if (popup.classList.contains("is-active")) {
        closeBtns.forEach((el) => {
          el.addEventListener("click", () => {
            popup.classList.remove("is-active");
            body.classList.remove("no-scrolling");
            body.style.paddingRight = "";
            header.style.paddingRight = "";
            this.resetForm();
          });
        });
        body.addEventListener("keyup", (event) => {
          if (event.code !== "Escape") return;
          popup.classList.remove("is-active");
          body.classList.remove("no-scrolling");
          this.resetForm();
        });
        body.addEventListener("click", (event) => {
          if (event.target === popup) {
            popup.classList.remove("is-active");
            body.classList.remove("no-scrolling");
            body.style.paddingRight = "";
            header.style.paddingRight = "";
            this.resetForm();
          }
        });
      }
    },
  },
  watch: {
    time: {
      handler() {
        this.timeControl();
      },
      deep: true,
    },
  },
  created() {
    document.addEventListener("click", (event) => {
      if (event._isClickWithinDropPopupDropDown) return;
      this.doHiddenDropdown();
    });
  },
  mounted() {
    if (this.tel) {
      const im = new Inputmask("+7 (999) 999 99 99", {
        placeholder: " ",
      });
      im.mask(this.$refs.tel);
    }
  },
};
</script>
