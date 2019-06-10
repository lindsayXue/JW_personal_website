<template>
  <v-layout id="timeline-content" mb-4 row wrap justify-center fill-height>
    <v-flex sm4 xs11>
      <p class="detail">{{item.start}} - {{item.end}}</p>
    </v-flex>
    <v-flex sm8 xs11>
      <p class="font-weight-bold">{{item.degreeOrJob}}</p>
      <p class="detail">{{item.department}}</p>
      <p class="detail">
        <span class="tertiary--text">
          <i class="fas fa-map-marker-alt"></i>
        </span>
        {{item.location.city}}, {{item.location.country}}
      </p>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
<style scoped>
</style>
