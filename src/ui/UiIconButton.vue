<template>
  <button
    class="ui-icon-button"
    @click="onClick"
    :style="styles"
    :data-active="active"
  ><UiIcon
    :icon="icon"
    :size="iconSize"
  ></UiIcon
  ></button>
</template>

<script>
import UiIcon from '@/ui/UiIcon';

export default {
  name: 'ui-button',
  props: {
    icon: {
      type: String,
    },
    active: {
      type: Boolean,
    },
    iconSize: {
      type: Number,
      default: 24,
    },
    padding: {
      type: Number,
      default: 6,
    },
    margin: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    styles() {
      const { iconSize, padding, margin } = this;

      return {
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        padding: `${padding}px`,
        borderWidth: `${margin}px`,
      };
    },
    size() {
      return this.iconSize + this.padding + this.margin;
    },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  },
  components: {
    UiIcon,
  },
};
</script>

<style lang="scss">
.ui-icon-button {
  background-color: none;
  border-radius: 50%;
  border-style: solid;
  border-color: transparent;
  padding: 0;
  box-sizing: content-box;
  background-clip: padding-box;

  &[data-active] {
    background-color: black;
    color: white;
  }
}
</style>
