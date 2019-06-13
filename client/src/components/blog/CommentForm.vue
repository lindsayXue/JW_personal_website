<template>
  <div class="comment-form">
    <v-form ref="form" v-model="valid">
      <v-textarea
        outline
        name="comment"
        label="Comment"
        v-model="comment"
        :rules="[rules.required]"
        required
        clearable
      ></v-textarea>
      <v-text-field
        label="Name"
        outline
        clearable
        v-model="user"
        required
        :rules="[rules.required]"
      ></v-text-field>
      <v-btn @click="commentSubmit" color="tertiary white--text">Submit</v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valid: true,
      comment: '',
      user: '',
      rules: {
        required: v => !!v || 'This field is required'
      }
    }
  },
  methods: {
    commentSubmit (e) {
      e.preventDefault()
      if (this.$refs.form.validate()) {
        this.snackbar = true
        // const newComment = {
        //   user: this.user,
        //   comment: this.comment
        // }
      }
    }
  },
}
</script>
<style scoped>
</style>
