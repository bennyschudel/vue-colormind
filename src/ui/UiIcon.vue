<template>
  <svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" :width="size" :height="size">
    <template v-if="is('lock-closed')">
      <path class="fill no-stroke" d="M17.7,10.5H6.3c-0.4,0-0.8,0.5-0.8,1v9c0,0.5,0.3,1,0.8,1h11.5c0.4,0,0.8-0.5,0.8-1v-9C18.5,11,18.2,10.5,17.7,10.5z M12.8,16.2v1.7c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-1.7c-0.4-0.3-0.8-0.7-0.8-1.3c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5C13.5,15.4,13.2,15.9,12.8,16.2z"/>
      <path class="stroke no-fill" d="M18.5,20.5c0,0.5-0.3,1-0.8,1H6.3c-0.4,0-0.8-0.5-0.8-1v-9c0-0.6,0.3-1,0.8-1h11.5c0.4,0,0.8,0.4,0.8,1V20.5z"/>
      <path class="stroke no-fill" d="M15.5,10c0,0,0-3,0-4c0-1.9-1.6-3.5-3.5-3.5S8.5,4.1,8.5,6c0,1,0,4,0,4"/>
    </template>
    <template v-else-if="is('lock-open')">
      <path class="fill no-stroke" d="M13.5,14.9c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5c0,0.6,0.3,1,0.8,1.3v1.7c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-1.7C13.2,15.9,13.5,15.4,13.5,14.9z"/>
      <path class="stroke no-fill" d="M18.5,20.5c0,0.5-0.3,1-0.8,1H6.3c-0.4,0-0.8-0.5-0.8-1v-9c0-0.6,0.3-1,0.8-1h11.5c0.4,0,0.8,0.4,0.8,1V20.5z"/>
      <path class="stroke no-fill" d="M15.5,10c0,0,0-3,0-4c0-1.9-1.6-3.5-3.5-3.5S8.5,4.1,8.5,6c0,1,0,1.5,0,1.5"/>
    </template>
    <template v-else-if="is('arrow-up')">
      <polyline class="no-fill stroke" points="7,14 12,9 17,14 "/>
    </template>
    <template v-else-if="is('arrow-down')">
      <polyline class="no-fill stroke" points="17,9 12,14 7,9 "/>
    </template>
    <template v-else-if="is('sync')">
      <path class="stroke no-fill" d="M17.3,6.7c-1.4-1.4-3.2-2.2-5.3-2.2c-4.1,0-7.5,3.4-7.5,7.5"/>
      <path class="stroke no-fill" d="M6.7,17.3c1.4,1.4,3.2,2.2,5.3,2.2c4.1,0,7.5-3.4,7.5-7.5"/>
      <polyline class="stroke no-fill" points="2,8 4.5,12 8.5,9.5"/>
      <polyline class="stroke no-fill" points="22,16 19.5,12 15.5,14.5"/>
    </template>
  </svg>
</template>

<script>
export default {
  name: 'ui-icon',
  props: {
    icon: {
      type: String,
    },
    size: {
      type: Number,
      default: 24,
    },
  },
  methods: {
    is(name) {
      return this.icon === name;
    },
  },
};
</script>

<style lang="scss" scoped>
.fill {
  fill: currentColor;
}

.stroke {
  stroke: currentColor;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke-linecap: round;
}

.no-fill {
  fill: none;
}

.no-stroke {
  stroke: none;
  stroke-width: 0;
}
</style>
