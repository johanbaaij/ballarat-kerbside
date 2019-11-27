<template>
  <v-list>
    <v-list-item-group v-model="wasteTypes" :multiple="true">
      <v-list-item value="landfill">
        <v-list-item-content>
          <v-list-item-title>Landfill</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item value="green">
        <v-list-item-content>
          <v-list-item-title>Green Waste</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item value="recycling">
        <v-list-item-content>
          <v-list-item-title>Recycling</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  computed: {
    wasteTypes: {
      get() {
        return this.$store.state.wasteTypes
      },
      set(wasteTypes) {
        this.$store.commit('wasteTypes', wasteTypes)
      }
    }
  }
}
</script>

<style></style>
