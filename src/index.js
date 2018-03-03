import 'babel-polyfill';
import Vue from 'vue';
import App from './app.vue';

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
  const value = this.getItem(key);
  return value && JSON.parse(value);
};

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App),
});
