import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    add_new: function (state, args) {
      if (args != null) {
        name = args.name;
      }
      else {
        name = '';
      }
      this.state.notes.push({
        name: name,
        todos: [{
          name: 'example',
          active: false
        }, {
          name: 'example',
          active: false
        }],
        collapsed: true
      })
    },

    collapse_clicked: function (state, args) {
      const id = args.id;
      state.notes[id].collapsed = !state.notes[id].collapsed;
      return
    }
  },
  actions: {},
  modules: {}
})
store.commit('add_new', {name: 'default'})

export default store
