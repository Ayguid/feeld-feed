<template>
  <div>
    <treeselect
      :multiple="true"
      :options="options"
      placeholder="Select your feeling(s)..."
      v-model="form.feelings"
      :flat="true"
      :autoDeselectDescendants="true"
    />
    {{ form.feelings }}
  </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
//import Feeling from '@/components/forms/Feeling.vue'
export default {
  name: "AddForm",
  components: {
    //Feeling,
    Treeselect,
  },
  data() {
    return {
      mainFeelingsLimit: 2,
      childFeelingsLimit: 1,
      options: [],
      form: {
        text: "",
        feelings: null,
      },
      show: true,
    };
  },
  computed: {
    feelings() {
      return this.$store.state.baseFeelings;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const newObj = JSON.parse(JSON.stringify(this.form));
      this.$store.dispatch("addUserFeeling", newObj);
      this.onReset(event);
      //alert(JSON.stringify(this.form));
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.text = "";
      this.form.feelings = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    this.options = this.$store.state.baseFeelings;
  },
};
</script>
