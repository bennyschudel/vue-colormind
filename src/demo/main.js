import Vue from 'vue';
import MonoUi from '@hotpink/vue-mono-ui';

import Demo from './Demo.vue';

Vue.config.productionTip = false;

Vue.use(MonoUi);

new Vue({
  render: h => h(Demo),
}).$mount('#app');
