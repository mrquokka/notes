<template>
  <div class="note_item">
    <div
      :class="collapse_icon"
      v-on:click="handler_clicked_on_collapse"
    >
      >
    </div>
    <div class="note_clickable_zone" v-on:click="open_note">
      <div class="note_label"> {{note_data.name}} </div>
    </div>
    <div class="note_todos_container" :style="style_for_todos">
      <todos
        :note_data="$store.state.notes[id]"
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
        this.$router.push({name: 'note', params: { id: this.id }});
      },

      handler_clicked_on_collapse: function () {
        this.$store.commit('collapse_clicked', {id: this.id})
      }

    },
    computed: {
      note_data: function () {
        return this.$store.state.notes[this.id]
      },

      collapse_icon: function () {
        const result = ['note_collapse_icon']
        if (!this.note_data.collapsed) {
          result.push('is_open');
        }
        return result.join(' ')
      },

      style_for_todos: function() {
        var opacity, height;
        if (this.note_data.collapsed) {
          opacity = 0
          height = '0px'
        } else {
          opacity = 1
          height = 'unset'
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
  $transition_for_note_clickable_zone: opacity .3s ease-in-out width .3s ease-in-out;
  $gap_with_icon: $icon_size + $items_gap;

  .note_item {
    padding: 5px 10px;
    clear: both;
  }

  .note_label {
    float: left;
  }

  .note_collapse_icon {
    float: left;
    width: $icon_size;
    height: $icon_size;
    line-height: $icon_size;
    font-size: 40px;
    margin-right: $items_gap;
    color: $color_of_icons;
    cursor: pointer;
    transform: unset;
    -webkit-transition: $transition_for_collapse_icon;
    -moz-transition:    $transition_for_collapse_icon;
    -o-transition:      $transition_for_collapse_icon;
    -ms-transition:     $transition_for_collapse_icon;
    transition:         $transition_for_collapse_icon;
  }

  .note_collapse_icon.is_open {
    transform: rotate(90deg);
  }

  .note_clickable_zone {
    width: calc(100% - #{$gap_with_icon});
    float: left;
    min-height: $icon_size;
  }

  .note_todos_container {
    clear: both;
    padding-left: $gap_with_icon;
    -webkit-transition: $transition_for_note_clickable_zone;
    -moz-transition:    $transition_for_note_clickable_zone;
    -o-transition:      $transition_for_note_clickable_zone;
    -ms-transition:     $transition_for_note_clickable_zone;
    transition:         $transition_for_note_clickable_zone;
  }
</style>
