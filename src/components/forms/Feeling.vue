<template>
  <span class="">
    <!-- :style="{backgroundColor: color}" -->
    <b-button
      v-show="checkIfShow"
      :pressed="selected"
      :variant="'btn btn-' + validateClass(feeling)"
      @click="
        selectFeeling({
          id: feeling.id,
          parent_id: feeling.parent_id,
          label: feeling.label,
        })
      "
    >
      {{ feeling.label }}
      <b-badge v-show="selected" variant="light">✔️</b-badge>
    </b-button>
    <!--
    <transition name="fade" mode="out-in"></transition>
    -->
    <!--{{selected}} v-if="selected && feeling.children" -->
    <span class="" v-if="selected && feeling.children">
      ⏭️
      <!-- <b-icon icon="arrow-right" scale="1"></b-icon>  ⏭️ -->
      <!-- :color="adjust(color, -20)"-->
      <span
        class="list-complete-item"
        v-for="child in feeling.children"
        :key="child.id"
      >
        <!--v-show="checkIfShow(child.id)" -->
        <Feeling
          @selected_feeling="selectFeeling($event)"
          :feeling="child"
          :list="list"
          :childLimit="childLimit"
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
  props: ["feeling", "list", "childLimit"],
  components: {
    Feeling,
  },
  data() {
    return {};
  },
  computed: {
    selected: {
      get() {
        return this.list.find((el) => el.id == this.feeling.id) ? true : false;
      },
      set(value) {
        return value;
      },
    },
    checkIfShow() {
      if (!this.feeling.parent_id) return true;
      const found = this.list.find(
        (obj) => obj.id === this.feeling.id && obj.parent_id != null
      );
      const thisFeelBrothers = this.list.filter(
        (obj) =>
          obj.parent_id === this.feeling.parent_id && obj.parent_id != null
      );
      if (thisFeelBrothers.length < this.childLimit) {
        //console.log('all');
        return true;
      } else if (found) {
        //console.log('show me');
        return true;
      } else {
        //console.log('Hide');
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
      this.selected = !this.selected;
      //this.currentObj = obj;
      this.$emit("selected_feeling", obj); //o para evitar el bind ,,, JSON.parse(JSON.stringify(obj))
    },
  },
  mounted() {
    //const feelInForm = this.list.find((el) => el.id == this.feeling.id);
    //console.log(feelInForm);
  },
};
</script>
<style scoped>
/*
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
*/
</style>
