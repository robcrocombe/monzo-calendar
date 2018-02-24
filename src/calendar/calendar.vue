<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import * as calService from './calendar.service';

export default {
  name: 'calendar',
  data() {
    return {
      msg: calService.getCalendar()
    }
  }
}
</script>

<style lang="css">
</style>
