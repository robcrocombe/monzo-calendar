import Vue from 'vue';
export const events = new Vue();

export const Event = {
  LOGGED_OUT: 'LOGGED_OUT',
  TRANS_LOADED: 'TRANS_LOADED',
  BALANCE_LOADED: 'BALANCE_LOADED',
  START_NEW_ACTION: 'START_NEW_ACTION',
  SAVED_NEW_ACTION: 'SAVED_NEW_ACTION',
};
