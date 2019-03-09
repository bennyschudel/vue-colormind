<template>
  <div class="color-swatch" :data-locked="locked" :data-active="active">
    <UiColorSwatch
      class="color-swatch__body"
      :color="color"
      @update:color="onColorUpdate"
      @click.stop="onSwatchClick"
    />
    <div class="color-swatch__info">
      <UiColorInput :color="color" no-swatch @update:color="onColorUpdate" />
    </div>
    <div class="color-swatch__actions">
      <UiIconButton
        data-name="move-up"
        icon="arrow-up"
        :icon-size="24"
        :padding="0"
        @click="emitAction('move-up')"
      />
      <UiIconButton
        data-name="move-down"
        icon="arrow-down"
        :icon-size="24"
        :padding="0"
        @click="emitAction('move-down')"
      />
      <UiIconButton
        data-name="locked"
        :icon="locked ? 'lock-closed' : 'lock-open'"
        :icon-size="24"
        @click="toggleLocked"
      />
    </div>
  </div>
</template>

<script>
import { Color, UiIconButton, UiColorInput } from '@hotpink/vue-mono-ui';

export default {
  name: 'color-swatch',
  props: {
    value: {
      type: Array,
      default: () => [0, 0, 0],
    },
    locked: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
  },
  computed: {
    color() {
      const [r, g, b] = this.value;

      return new Color({ r, g, b });
    },
  },
  methods: {
    toggleLocked() {
      this.$emit('update:locked', !this.locked);
    },
    onColorUpdate(color) {
      const { r, g, b } = color.toRgb();

      this.$emit('update:value', [r, g, b]);
    },
    onSwatchClick() {
      this.$emit('select');
    },
    emitAction(action) {
      this.$emit(`action:${action}`);
    },
  },
  components: {
    UiIconButton,
    UiColorInput,
  },
};
</script>

<style lang="scss">
.color-swatch {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 'Swatch Input' 'Swatch Controls';
  grid-gap: 8px;
}

.color-swatch__body {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: '.';
  grid-area: Swatch;

  &.ui-color-swatch {
    width: 100%;
    height: 100%;
  }
}

.color-swatch__input {
  grid-area: Input;
}

.color-swatch__action {
  grid-area: Controls;
}

.color-swatch__actions {
  display: flex;
  justify-content: stretch;
  align-items: center;

  .ui-icon-button {
    &[data-name='locked'] {
      margin-left: auto;
    }
  }
}

.color-swatch {
  &[data-active] {
    .color-swatch__body {
      box-shadow: inset 0 0 0 4px hsla(0, 0%, 0%, 0.5);
    }
  }
}
</style>
