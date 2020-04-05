<template>
  <div class="node_container" v-on:click="clear_child_window">
    <div class="note_edit_buttons" >
      <div class="close_button" v-on:click="handler_cancel_button">
        &#10799;
      </div>
      <div class="save_button" v-on:click="handler_save_button">&#10003;</div>
      <div class="remove_button" v-on:click="handler_remove_button">
        &#128465;
      </div>
      <div class="undo_button" v-on:click="handler_undo_button"> &#9100; </div>
      <div class="redo_button" v-on:click="handler_redo_button"> &#9100; </div>
    </div>
    <div class="edit_note_header"> Название </div>
    <input type="text" v-model:value="note_name" class='input_note_name'/>
    <div class="edit_todos_container">
      <div class="edit_todos_header">
        Подзадачи
      </div>
      <div class="edit_todos_items">
        <todos_view v-if="todos" :id="id" :todos="todos"/>
      </div>
    </div>
    <confirm
      v-if="confirm_func_name"
      :func_name="confirm_func_name"
      :top="modal_top"
      :left="modal_left"
      v-on:confirm="handler_confirm_closed"
    />
  </div>
</template>

<script>
  import _ from 'lodash'
  
  import store from './../store'
  import todos from './../components/todos'
  import confirm from './../components/confirm'

  export default {
    components: {
      todos_view: todos,
      confirm
    },
    computed: {
      is_not_founded: function () {
        return this.id == null;
      },

      id: function () {
        return this.$route.params.id;
      },

      calc_note: function () {
        return this.$store.state.notes[this.id];
      }
    },
    data: function () {
      return {
        note_name: undefined,
        todos: undefined,
        backup_name: undefined,
        backup_todos: undefined,
        is_on_make_backup: false,
        confirm_func_name: undefined,
        modal_left: undefined,
        modal_top: undefined
      }
    },
    methods: {
      handler_save_button: function () {
        if (this.id != null) {
          this.$store.commit('change_todos', {
            id: this.id,
            name: this.note_name,
            todos: this.todos
          })
        } else {
          this.$store.commit('add_new_note', {
            name: this.note_name,
            todos: this.todos
          })
        }
        return this.$router.push({name: 'main'});
      },

      handler_cancel_button: function (event) {
        this.confirm_func_name = 'cancel';
        this.modal_left = event.offsetX;
        this.modal_top = event.offsetY;
        return event.stopPropagation();
      },

      handler_remove_button: function (event) {
        this.confirm_func_name = 'remove';
        this.modal_left = event.offsetX;
        this.modal_top = event.offsetY;
        return event.stopPropagation();
      },

      handler_undo_button: function () {
        this.is_on_make_backup = true;
        this.backup_name = this.note_name;
        this.backup_todos = this.todos;
        this._read_todo();
        function func () {
          this.is_on_make_backup = false;
        };
        return setTimeout(func.bind(this));
      },

      handler_redo_button: function () {
        if (this.backup_name !== undefined) {
          this.note_name = this.backup_name;
          this.todos = this.backup_todos;
        }
        return
      },

      _read_todo: function () {
        if (this.id != null) {
          this.$set(
            this, 'todos', _.cloneDeep(this.$store.state.notes[this.id].todos)
          );
          this.note_name = this.calc_note.name;
        } else {
          this.$set(this, 'todos', [])
        }
        return
      },

      _clear_backup: function () {
        if (!this.is_on_make_backup) {
          this.backup_name = undefined;
          this.backup_todos = undefined;
        }
        return
      },

      clear_child_window: function () {
        this.confirm_func_name = undefined;
        this.modal_left = undefined;
        return this.modal_top = undefined;
      },

      handler_confirm_closed: function(result) {
        if (result) {
          if (this.confirm_func_name == 'cancel') {
            return this.$router.push({name: 'main'});
          } else if (this.confirm_func_name == 'remove') {
            if (this.id != null) {
              this.$store.commit('remove_note', {id: this.id})
            }
            return this.$router.push({name: 'main'});
          }
        }
        return this.clear_child_window()
      }
    },
    mounted: function () {
      return this._read_todo();
    },
    watch: {
      todos: {
        deep: true,
        handler: function () {
          this._clear_backup();
        }
      }, note_name: {
        handler: function () {
          this._clear_backup();
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './../css/variables.scss';

  $label_size: 100px;

  .node_container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .edit_note_header, .input_note_name {
    margin: $items_gap;
    float: left;
  }

  .edit_note_header {
    max-width: $label_size;
  }

  .input_note_name {
    width: calc(100% - #{$label_size + $items_gap * 4});
    float: left;
    font-size: 14px;
    padding: 0px 2px;
  }

  .edit_todos_container {
    clear: both;
  }

  .edit_todos_items {
    margin-left: $label_size;
  }

  .edit_todos_header {
    float: left;
    padding: 0px $items_gap;
    width: $label_size - 2 * $items_gap;
  }

  .note_edit_buttons {
    clear: both;
    padding: $items_gap;
    border-bottom: 1px solid #ccc;
    height: 30px;
  }

  .save_button, .remove_button, .undo_button, .redo_button, .close_button {
    float: left;
    font-size: 40px;
    line-height: 26px;
    cursor: pointer;
  }

  .remove_button {
    font-size: 24px;
  }

  .redo_button {
    transform: scaleX(-1);
  }

  .undo_button{
    padding: 0px 5px;
  }

  .close_button {
    font-size: 45px;
  }

</style>
