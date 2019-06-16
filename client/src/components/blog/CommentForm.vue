<template>
  <div class="comment-form">
    <v-progress-linear v-if="isLoading" :indeterminate="true" color="secondary" height="3"></v-progress-linear>
    <v-form ref="form">
      <v-textarea
        outline
        name="comment"
        label="Comment"
        v-model="comment"
        :error="!!$store.state.errors.comment"
        :error-messages="$store.state.errors.comment? $store.state.errors.comment.msg  : ''"
        :disabled="isLoading"
        required
        clearable
      ></v-textarea>
      <v-text-field
        label="Name"
        outline
        clearable
        v-model="user"
        required
        :error="!!$store.state.errors.commentName"
        :error-messages="$store.state.errors.commentName? $store.state.errors.commentName.msg  : ''"
        :disabled="isLoading"
      ></v-text-field>
      <v-btn @click="commentSubmit" color="tertiary white--text">Submit</v-btn>
    </v-form>
  </div>
</template>
<script>
import BlogService from '../../services/Blog'

export default {
  data () {
    return {
      comment: '',
      user: '',
      isLoading: false
    }
  },
  methods: {
    async commentSubmit () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        await BlogService.createComment({
          id: this.$store.state.route.params.id,
          commentName: this.user,
          comment: this.comment
        })
        this.$refs.form.reset()
        this.$emit('updateBlog')
        this.isLoading = false
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    }
  },
}
</script>
<style scoped>
</style>
