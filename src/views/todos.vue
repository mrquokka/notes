<template>
  <div style="float: left;">
    <div v-for="(item, index) in note_data.todos" class="note_todo" >
      <input
        class="todo_item_checkbox"
        type="checkbox"
        :disabled="disabled"
        :checked="item.active"
      />
      <div class="todo_item_container">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  import store from './../store'

  export default {
    store,
    props: {
      note_data: {},
      disabled: {default: false},
      limit: {default: undefined}
    }
  }

</script>

<style lang="scss">
  .note_todo {
    clear: both;
    min-height: 20px;
    padding-bottom: 5px;
  }
  .todo_item_container, .todo_item_checkbox {
    float: left;
  }

  .todo_item_checkbox {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

</style>
