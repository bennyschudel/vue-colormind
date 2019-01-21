<template>
  <input
    class="ui-color-input"
    :value="value"
    @change="onChange($event.target.value)"
  />
</template>

<script>
export default {
  name: 'ui-color-input',
  props: {
    value: String,
  },
  methods: {
    onChange(value) {
      this.$emit('update:value', value);
    },
  },
};
</script>

<style lang="scss">
.ui-color-input {
  font-size: 12px;
  font-family: Monaco;
  appearance: none;
  border: 0;
  font-weight: 600;
  padding: 4px 0;
  outline: none;
  border-bottom: 1px solid black;
}
</style>
