<template>
  <span>
    <b-badge class="" variant="light">
      {{ feeling.label }}
    </b-badge>

    <span v-for="f in feeling.children" :key="f.id">
      <FeelingBadge :feeling="f" />
    </span>
  </span>
</template>
<script>
import FeelingBadge from "@/components/cards/FeelingBadge.vue";
export default {
  name: "FeelingBadge",
  props: ["feeling"],
  components: {
    FeelingBadge,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>
