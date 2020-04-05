<template>
  <div class="note_item">
    <div
      class="note_collapse_icon"
      v-on:click="handler_clicked_on_collapse"
    >
      <template v-if="note_data.collapsed"> &#128193; </template>
      <template v-else>	&#128194;</template>
    </div>
    <div class="note_clickable_zone">
      <div class="note_label">
        {{note_data.name}}
      </div>
      <div class="edit_note" v-on:click="open_note"> &#10000; </div>
      <div
        v-on:click="handler_remove_note"
        class="remove_icon"
      >
        &#128465;
      </div>
    </div>
    <div class="note_todos_container" :style="style_for_todos">
      <todos
        :todos="$store.state.notes[id].todos"
        :disabled="true"
        :limit="limit"
      />
    </div>
  </div>
</template>

<script>
  import store from './../store'
  import todos from './todos'

  const LIMIT_OF_TODOS = 3

  export default {
    store,
    props: {
      id: {}
    },
    components: {todos},
    data: function () {
      return {
        limit: LIMIT_OF_TODOS
      }
    },
    methods: {
      open_note: function() {
        this.$router.push({name: 'open_note', params: { id: this.id }});
      },

      handler_clicked_on_collapse: function () {
        this.$store.commit('collapse_clicked', {id: this.id})
      },

      handler_remove_note: function (event) {
        this.$emit('need_remove_note', event);
        return event.stopPropagation();
      }

    },
    computed: {
      note_data: function () {
        return this.$store.state.notes[this.id]
      },

      style_for_todos: function() {
        var opacity, height;
        if (this.note_data.collapsed) {
          opacity = 0;
          height = '0px';
        } else {
          opacity = 1;
          height = 'unset';
        }
        return {
          opacity,
          height
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './../css/variables.scss';

  $transition_for_collapse_icon: transform .3s ease-in-out;
  $transition_for_note_clickable_zone: opacity .3s ease-in-out,
    width .3s ease-in-out;
  $gap_with_icon: 26px;

  .note_item {
    padding: 0px 10px;
    clear: both;
  }

  .note_collapse_icon {
    font-size: 17px;
    float: left;
    padding-right: 6px;
  }

  .note_clickable_zone, .note_collapse_icon {
    cursor: pointer;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .note_clickable_zone {
    width: calc(100% - 28px);
    float: left;
    min-height: $icon_size;
    // padding-bottom: 5px;
  }

  .note_label, .edit_note, .remove_icon {
    float: left;
  }

  .note_label {
    min-width: $icon_size;
    min-height: $icon_size;
    padding-right: 5px;
    line-height: 28px;
  }
  .edit_note {
    font-size: 26px;
    line-height: 26px;
  }

  .remove_icon {
    font-size: 17px;
    line-height: 23px;
  }

  .note_todos_container {
    clear: both;
    overflow: hidden;
    padding-left: $gap_with_icon;
    -webkit-transition: $transition_for_note_clickable_zone;
    -moz-transition:    $transition_for_note_clickable_zone;
    -o-transition:      $transition_for_note_clickable_zone;
    -ms-transition:     $transition_for_note_clickable_zone;
    transition:         $transition_for_note_clickable_zone;
  }
</style>
