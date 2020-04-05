import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var notes = localStorage.getItem('notes');
if (notes != null) {
  notes = JSON.parse(notes);
} else {
  notes = [];
}


const store = new Vuex.Store({
  state: {
    notes
  },
  mutations: {
    collapse_clicked: function (state, args) {
      const id = args.id;
      state.notes[id].collapsed = !state.notes[id].collapsed;
      localStorage.setItem('notes', JSON.stringify(state.notes));
      return
    },

    change_todos: function(state, args) {
      const id = args.id;
      state.notes[id].todos = args.todos;
      state.notes[id].name = args.name;
      localStorage.setItem('notes', JSON.stringify(state.notes));
      return
    },

    add_new_note: function (state, args) {
      this.state.notes.push({
        name: args.name,
        todos: args.todos,
        collapsed: true
      })
      localStorage.setItem('notes', JSON.stringify(state.notes));
      return
    },

    remove_note: function(state, args) {
      this.state.notes.splice(args.id, 1);
      localStorage.setItem('notes', JSON.stringify(state.notes));
      return
    }
  },
  actions: {},
  modules: {}
})

export default store
