<template>
  <div class="notes_wrapper">
    <div class="notes_header">
      <img src="./../assets/img/logo.png" class="logo_image"/>
      <span class="page_name">Просмотр заметок</span>
    </div>
    <div class="notes_container">
      <div class="notes_toolbar">
        <div class="note_toolbar_item" v-on:click="add_new"> + </div>
      </div>
      <note_preview v-for="(item, index) in notes" :key="index" :id="index" />
    </div>
  </div>
</template>

<script>
  import store from './../store'
  import note_preview from './note_preview'

  export default {
    store,
    computed: {
      notes: function () {
        return store.state.notes;
      }
    },
    components: {
      note_preview
    },
    methods: {
      open_note: function(id) {
        this.$router.push({name: 'note', params: { id }});
      },

      add_new: function () {
        store.commit('add_new');
        this.open_note(store.state.notes.length - 1 );
      }
    }
  }
</script>

<style lang="scss">
  @import './../css/variables.scss';

  .notes_wrapper {}

  .notes_header {
    margin: 5px 0px;
    line-height: $header_size;
    border-bottom: 1px solid #cc;
    font-size: 16px;
  }

  .logo_image {
    float: left;
    height: $header_size;
    padding-right: 10px;
  }

  .notes_container {}

  .notes_toolbar {
    padding: 10px;
    height: $icon_size;
    font-size: $icon_size;
    border-bottom: 1px solid #ccc;
  }

  .select_all_checkbox, .note_toolbar_item {
    float: left;
    width: $icon_size;
    height: $icon_size;
    line-height: $icon_size;
    font-size: 26px;
    text-align: center;
    margin-right: $items_gap;
    color: $color_of_icons;
  }
  .select_all_checkbox:hover, .note_toolbar_item:hover {
    color: inherit;
    cursor: pointer;
  }


</style>
