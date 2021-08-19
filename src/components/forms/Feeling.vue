<template>
  <span class="">
    <!-- :style="{backgroundColor: color}"v-show="checkIfShow" -->
    <b-button
      :pressed="inForm"
      :variant="'btn btn-' + validateClass(feeling)"
      @click="
        selectFeeling({
          id: feeling.id,
          parent_id: feeling.parent_id,
          label: feeling.label,
          children: [],
        })
      "
    >
      {{ feeling.label }}
      <b-badge v-show="inForm" variant="light">✔️</b-badge>
    </b-button>
    <!--
    <transition name="fade" mode="out-in"></transition>
    -->
    <!--{{selected}} v-if="selected && feeling.children" -->
    <span class="" v-if="inForm && feeling.children">
      ⏭️
      <!-- <b-icon icon="arrow-right" scale="1"></b-icon>  ⏭️ -->
      <!-- :color="adjust(color, -20)"-->
      <span
        class="list-complete-item"
        v-for="child in feeling.children"
        :key="child.id"
      >
        <!-- v-show="checkIfShow(child.id)" -->
        <Feeling
          @selected_feeling="selectFeeling($event)"
          :feeling="child"
          :flatList="flatList"
        />
      </span>
      <br />
    </span>
  </span>
</template>

<script>
import Feeling from "@/components/forms/Feeling.vue";
export default {
  name: "Feeling",
  props: ["feeling", "color", "flatList"],
  components: {
    Feeling,
  },
  data() {
    return {};
  },
  computed: {
    inForm() {
      if (this.flatList) {
        return (
          this.flatList.filter((el) => el.id == this.feeling.id).length > 0
        );
      } else {
        return false;
      }
    },
  },
  methods: {
    validateClass(obj) {
      if (!obj.parent_id) return "light";
      if (obj.children) return "outline-success";
      else return "outline-warning";
    },
    selectFeeling(obj) {
      // anda solo en la primer vuelta, para los grandparents
      this.$emit("selected_feeling", obj); //o para evitar el bind ,,, JSON.parse(JSON.stringify(obj))
    },
  },
};
</script>
