<template>
  <div
    class="modal_container"
    :style="{'top': top + 'px', 'left': left + 'px'}"
    v-on:click="$event.stopPropagation()"
  >
    <div class="confirm_label"> {{label}} </div>
    <div class="confirm_ok" v-on:click="$emit('confirm', true)"> Да </div>
    <div class="confirm_cancel" v-on:click="$emit('confirm', false)"> Нет </div>
  </div>
</template>
<script>
  const func_names = {
    cancel: 'Выйти без измений?',
    remove: 'Удалить запись?',

  };

  export default {
    props: {
      func_name: {},
      top: {},
      left: {}
    },
    computed: {
      label: function () {
        return func_names[this.func_name];
      }
    }
  }
</script>
<style lang="scss">
  .modal_container {
    position: absolute;
    min-width: 150px;
    height: 40px;
    background: white;
    border: 1px solid black;
    padding: 10px;
    text-align: center;
  }

  .confirm_ok, .confirm_cancel {
    float: left;
    width: 40%;
    margin: 0px 5%;
    cursor: pointer;
  }
</style>
