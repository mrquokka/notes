<template>
  <div style="float: left;">
    <div v-for="(item, index) in todos" class="note_todo" >
      <input
        class="todo_item_checkbox"
        type="checkbox"
        :disabled="disabled"
        v-model:checked="item.active"
      />
      <div class="todo_item_container">
        <template v-if="!disabled">
          <input type="text" v-model:value="item.name" />
          <span class="remove_icon" v-on:click="remove_row_by_id(index)">
            &#128465;
          </span>
          <span class="up_icon" v-on:click="move_row_above(index)">
            &uarr;
          </span>
          <span class="down_icon" v-on:click="move_row_below(index)">
            &darr;
          </span>
        </template>
        <template v-else>
          {{item.name}}
        </template>
      </div>
    </div>
    <div
      v-if="!disabled"
      class="note_toolbar_item"
      v-on:click="handler_add_new_todo"
    >
      &#43; Добавить новый элемент
    </div>
  </div>
</template>

<script>
  import store from './../store'

  export default {
    store,
    props: {
      todos: {},
      disabled: {default: false},
      limit: {default: undefined}
    },
    methods: {
      handler_add_new_todo: function () {
        this.todos.push({
          active: false,
          name: ''
        })
      },

      remove_row_by_id: function(id) {
        this.todos.splice(id, 1);
      },

      move_row_above: function(id) {
        if (id > 0) {
          const old_value = this.todos.splice(id, 1)[0];
          this.todos.splice(id - 1, 0, old_value);
        }
      },

      move_row_below: function(id) {
        if ((id + 1) < this.todos.length) {
          const old_value = this.todos.splice(id, 1)[0];
          this.todos.splice(id + 1, 0, old_value);
        }
      }
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

  .remove_icon, .up_icon, .down_icon, .add_new_item_icon {
    cursor: pointer;
  }

  .todo_item_container > input {
    font-size: 14px;
    padding: 0px 2px; 
  }

  .add_new_item_icon {
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .todo_item_checkbox {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }


</style>
