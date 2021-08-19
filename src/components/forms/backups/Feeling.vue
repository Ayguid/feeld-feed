<template>
  <span class="">
    <!--{{selected}}-->

    <!-- :style="{backgroundColor: color}" -->
    <b-button
      :pressed="selected"
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
        <Feeling
          v-show="checkIfShow(child.id)"
          @selected_feeling="addChild($event)"
          :feeling="child"
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
  props: ["feeling", "color"],
  components: {
    Feeling,
  },
  data() {
    return {
      childFeelingsLimit: 1, //test
      selected: false,
      currentObj: "",
    };
  },
  computed: {},
  methods: {
    validateClass(obj) {
      if (!obj.parent_id) return "light";
      if (obj.children) return "outline-success";
      else return "outline-warning";
    },
    selectFeeling(obj) {
      // anda solo en la primer vuelta, para los grandparents
      this.selected = !this.selected;
      this.currentObj = obj;
      this.$emit("selected_feeling", obj); //o para evitar el bind ,,, JSON.parse(JSON.stringify(obj))
    },
    addChild(obj) {
      // el child se bindea solo, porque esta todo bindeado! podriamos hacer  JSON.parse(JSON.stringify(obj))
      const found = this.currentObj.children.find(
        (child) => child.id == obj.id
      );
      if (found) {
        //remove
        this.currentObj.children = this.currentObj.children.filter(
          (child) => child.id != obj.id
        );
      } else {
        // new parent
        this.currentObj.children.push(obj);
      }
      this.$emit("selected_child", obj);
    },

    checkIfShow(id) {
      const found = this.currentObj.children.find((child) => child.id == id);
      if (this.currentObj.children.length < this.childFeelingsLimit) {
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
    adjust(color, amount) {
      return (
        "#" +
        color
          .replace(/^#/, "")
          .replace(/../g, (color) =>
            (
              "0" +
              Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
                16
              )
            ).substr(-2)
          )
      );
    },
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
