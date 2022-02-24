<template>
<div class="form__overflow-hidden">
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
          <svg class="icon icon_size-18 icon_color-primary">
            <use xlink:href="#minus"></use>
          </svg>
        </button>

        <input
          class="counter__input"
          type="number"
          min="1"
          oninput="if(Number(this.value) < Number(this.min)) this.value = this.min;"
          v-model.number="countAdults"
        />

        <button
          type="button"
          class="counter__btn"
          @click.prevent="incrementAdults"
        >
          <svg class="icon icon_size-18 icon_color-primary">
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
          <svg class="icon icon_size-18 icon_color-primary">
            <use xlink:href="#minus"></use>
          </svg>
        </button>

        <input
          class="counter__input"
          type="number"
          name="count"
          v-model.number="countChildren"
          min="0"
          oninput="if(Number(this.value) < Number(this.min)) this.value = this.min;"
        />

        <button
          type="button"
          class="counter__btn"
          @click.prevent="incrementChildren"
        >
          <svg class="icon icon_size-18 icon_color-primary">
            <use xlink:href="#plus"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['adults', 'children'],
  computed: {
    countAdults: {
      get() {
        return this.adults;
      },
      set(value) {
        this.$emit('update:adults', value);
        // this.adults = value;
      },
    },
    countChildren: {
      get() {
        return this.children;
      },
      set(value) {
        this.$emit('update:children', value);
        // this.children = value;
      },
    },
  },
  methods: {
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
  }
};
</script>
