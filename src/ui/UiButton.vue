<template>
  <div class="ui-button">
    <button
      class="ui-button__element"
      :disabled="disabled"
      v-bind="attrs"
      v-on="listeners"
    >
      <div class="ui-button__body">
        <div class="ui-button__icon">
          <slot name="icon"></slot>
        </div>
        <div class="ui-button__label">
          <slot></slot>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ui-button',
  props: {
    value: {
      type: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    attrs() {
      return { ...this.$attrs };
    },
    listeners() {
      const { emitClick: click } = this;

      return {
        ...this.$listeners,
        click,
      };
    },
  },
  methods: {
    emitClick() {
      this.$emit('click', this.value);
    },
  },
};
</script>

<style lang="scss">
@import 'core';

.ui-button {
  height: 40px;
  overflow: hidden;
  display: inline-flex;
  border-radius: 4px;
}

.ui-button__element {
  @include ui-button-clear;

  outline: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.ui-button__body {
  display: flex;
  align-items: center;
}

.ui-button__label {
  flex: 1 1 auto;
  padding-left: 16px;
  padding-right: 16px;
  text-align: left;
}

.ui-button__icon {
  flex: 0 0 auto;
  padding-left: 8px;
  padding-right: 8px;

  + .ui-button__label {
    padding-left: 0;
  }
}

.ui-button {
  background-color: black;

  .ui-button__label {
    color: white;
    font-size: 1em;
  }

  .ui-icon {
    color: white;
  }
}
</style>
