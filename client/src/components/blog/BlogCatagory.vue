<template>
  <div class="blog-catagory">
    <h1 class="white--text font-weight-regular ma-2">
      Catagory
      <v-btn dark flat small @click="addClick" v-if="!adding && !editing">
        <i class="fas fa-plus"></i>
      </v-btn>
      <v-btn dark flat small @click="closeClick" v-if="adding || editing">
        <i class="fas fa-times"></i>
      </v-btn>
    </h1>
    <v-list dense class="tertiary textGrey--text">
      <template v-for="(item, index) in catagoryData">
        <v-list-tile
          :class="item === selectedCatagory? 'active-list': ''"
          @click="selectClick(item)"
          :key="index"
        >
          <v-list-tile-content>
            <v-list-tile-title class="content">
              <span class="list-icon secondary--text font-weight-bold pr-2">|</span>
              {{item}}
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action @click="editClick(item)">
            <i class="fas fa-edit"></i>
          </v-list-tile-action>
        </v-list-tile>
      </template>
      <v-list-tile :class="!selectedCatagory? 'active-list': ''" @click="selectClick(null)">
        <v-list-tile-content>
          <v-list-tile-title class="content">
            <span class="list-icon secondary--text font-weight-bold pr-2">|</span>
            ALL
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-form class="pa-2" ref="form" v-model="valid" lazy-validation v-if="adding">
      <v-text-field
        color="white"
        label="Catagory"
        :rules="[rules.required]"
        v-model="addForm"
        flat
        dark
        required
      ></v-text-field>
      <v-btn color="primary" dark small @click="addCatagory">Create</v-btn>
    </v-form>
    <v-form class="pa-2" ref="form" v-model="valid" lazy-validation v-if="editing">
      <v-text-field
        color="white"
        label="Catagory"
        :rules="[rules.required]"
        v-model="editForm"
        flat
        dark
        required
      ></v-text-field>
      <v-btn color="primary" dark small @click="editCatagory">Edit</v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  props: ['catagoryData', 'selectedCatagory'],
  data () {
    return {
      adding: false,
      editing: false,
      addForm: '',
      editForm: '',
      valid: false,
      rules: {
        required: v => !!v || 'This field is required'
      }
    }
  },
  methods: {
    addClick () {
      this.adding = true
    },
    closeClick () {
      this.adding = false
      this.editing = false
    },
    selectClick (catagory) {
      this.$emit('selectClick', catagory)
    },
    addCatagory (e) {
      e.preventDefault()
      if (this.$refs.form.validate()) {
        this.snackbar = true
        // Add catagory
      }
    },
    editClick (item) {
      console.log('edited!!!')
      this.editing = !this.editing
      this.editForm = item
    },
    editCatagory (e) {
      e.preventDefault()
      if (this.$refs.form.validate()) {
        this.snackbar = true
        // Add catagory
      }
    }
  }
}
</script>
<style scoped>
.active-list {
  background: var(--v-primary-base);
  color: white;
}
</style>

