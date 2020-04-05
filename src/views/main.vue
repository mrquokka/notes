<template>
  <div class="notes_wrapper" v-on:click="clear_child_window">
    <div class="notes_header">
      <img src="./../assets/img/logo.png" class="logo_image"/>
      <span class="page_name">Просмотр заметок</span>
    </div>
    <div class="notes_container">
      <div class="notes_toolbar">
        <div class="note_toolbar_item" v-on:click="add_new">
           <div class="add_new_item_icon">
             &#43;
           </div>
           Добавить задачу
         </div>
      </div>
      <note_preview
        v-for="(item, index) in notes"
        :key="index"
        :id="index"
        v-on:need_remove_note="handler_need_remove_note($event, index)"
      />
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
  import store from './../store'
  import note_preview from './../components/note_preview'
  import confirm from './../components/confirm'

  export default {
    store,
    computed: {
      notes: function () {
        return store.state.notes;
      }
    },
    components: {
      note_preview,
      confirm
    },
    data: function () {
      return {
        confirm_func_name: undefined,
        modal_top: undefined,
        modal_left: undefined,
        removed_note_index: undefined
      }
    },
    methods: {
      add_new: function () {
        this.$router.push({name: 'create_note'});
      },

      handler_need_remove_note: function (event, index) {
        this.confirm_func_name = 'remove';
        this.modal_left = event.offsetX;
        this.modal_top = event.offsetY;
        this.removed_note_index = index;
        return
      },

      clear_child_window: function () {
        this.confirm_func_name = undefined;
        this.modal_left = undefined;
        this.modal_top = undefined;
        this.removed_note_index = undefined;
        return
      },

      handler_confirm_closed: function(result) {
        if (result) {
          if (this.confirm_func_name == 'remove') {
            if (this.removed_note_index != null) {
              this.$store.commit('remove_note', {id: this.removed_note_index});
            }
          }
        }
        return this.clear_child_window()
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
    border-bottom: 1px solid #ccc;
    margin-botton: 5px;
  }

  .add_new_item_icon {
    float: left;
    line-height: $icon_size;
    text-align: center;
    margin-right: $items_gap;
  }

  .note_toolbar_item {
    color: $color_of_icons;
  }

  .note_toolbar_item:hover {
    color: inherit;
    cursor: pointer;
  }


</style>
