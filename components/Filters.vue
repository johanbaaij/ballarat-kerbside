<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Waste Type(s)
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item-group v-model="wasteTypes" :mandatory="true" :multiple="true">
      <v-list-item value="landfill">
        <template v-slot:default="{ active, toggle }">
          <v-list-item-content>
            <v-list-item-title>Landfill</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox
              :input-value="active"
              @click="toggle"
              true-value="landfill"
            ></v-checkbox>
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-list-item value="green">
        <template v-slot:default="{ active, toggle }">
          <v-list-item-content>
            <v-list-item-title>Green Waste</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox
              :input-value="active"
              @click="toggle"
              true-value="green"
            ></v-checkbox>
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-list-item value="recycling">
        <template v-slot:default="{ active, toggle }">
          <v-list-item-content>
            <v-list-item-title>Recycling</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox
              :input-value="active"
              @click="toggle"
              true-value="recycling"
            ></v-checkbox>
          </v-list-item-action>
        </template>
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
