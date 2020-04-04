<template>
  <div>
    <template v-if="is_not_founded">
      Запись не найдена
    </template>
    <template v-else>
      <div class="edit_note_header"> Название </div>
      <input type="text" :value="value" class='input_note_name'/>
      <div class="edit_todos_container">
        <div class="edit_todos_header">
          Подзадачи
        </div>
        <div class="edit_todos_items">
          <todos :id="id" :note_data="$store.state.notes[id]"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import store from './../store/'
  import todos from './todos'

  export default {
    components: {
      todos
    },
    computed: {
      is_not_founded: function () {
        return this.id == null;
      },

      id: function () {
        return this.$route.params.id;
      },

      calc_node: function () {
        return store.state.notes[this.id];
      }
    },
    data: function () {
      return {
        value: undefined
      }
    },
    mounted: function () {
      this.value = this.calc_node.name;
    }
  }
</script>

<style lang="scss">
  @import './../css/variables.scss';

  $label_size: 100px;

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

</style>
