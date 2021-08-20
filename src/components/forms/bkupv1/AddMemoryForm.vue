<template>
  <div>
    <!-- {{ feelings }} -->

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-2"
        label="What happened today ?"
        label-for="input-2"
      >
        <b-form-input
          autocomplete="off"
          id="input-2"
          v-model="form.text"
          :placeholder="`Describe your day, ${wordMin} words min`"
        ></b-form-input>
      </b-form-group>

      <!--<transition name="fade" mode="out-in"> </transition>-->
      <b-form-group v-show="validateWordCount">
        <h6 class="card-subtitle text-muted mb-2">
          Please choose 1 feeling min.
        </h6>
        <!--  :color="feeling.color"  -->
        <span v-for="feeling in feelings" :key="feeling.id">
          <Feeling
            @selected_feeling="addToForm($event)"
            :feeling="feeling"
            :flatList="flatFormFeelings"
          />
        </span>
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="outline-primary"
          ><b-icon icon="plus" scale="2"></b-icon
        ></b-button>
        &nbsp;
        <b-button type="reset" variant="outline-danger"
          ><b-icon icon="arrow-counterclockwise" scale="1"></b-icon
        ></b-button>
      </b-form-group>
    </b-form>
    <!--
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
    -->
  </div>
</template>
<script>
import Feeling from "@/components/forms/Feeling.vue";
export default {
  name: "AddForm",
  components: {
    Feeling,
  },
  data() {
    return {
      mainFeelingsLimit: 2, // 7 to test
      childFeelingLimit: 2,
      wordMin: 2,
      form: JSON.parse(JSON.stringify(this.$store.state.selectedMemory)) || {
        isLocked: false,
        text: "",
        feelings: [],
        tags: [],
      },
      show: true,
    };
  },
  computed: {
    flatFormFeelings() {
      return this.flat(this.form.feelings);
    },
    feelings() {
      let feelings;
      if (this.form.feelings.length == this.mainFeelingsLimit) {
        // main permited feelings
        var activeIds = this.form.feelings.map((a) => a.id); //array con los ids de los feelings seleccionados en el form
        feelings = this.$store.state.baseFeelings.filter(({ id }) =>
          activeIds.includes(id)
        ); // feelings con esos ids,,
      } else {
        //all main feelings
        feelings = this.$store.state.baseFeelings;
      }
      return feelings;
    },
    validateWordCount() {
      return this.form.text.match(/(\w+)/g)?.length >= this.wordMin;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form))
      if (!this.form.text || this.form.feelings.length < 1) {
        //validate
        this.$bvToast.toast(`${this.wordMin} Words and 1 feeling required `, {
          title: "Errors",
          variant: "warning",
          toaster: "b-toaster-top-center",
          appendToast: false,
          autoHideDelay: 5000,
        });
        return;
      }
      const newObj = JSON.parse(JSON.stringify(this.form));
      this.$store.dispatch("addUpdateUserMemory", newObj);
      this.$emit("close_modal");
      this.onReset(event);
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
    addToForm(obj) {
      const found =
        this.flat(this.form.feelings).filter((el) => el.id == obj.id).length >
        0;
      //parent add
      if (!obj.parent_id && !found) return this.form.feelings.push(obj);
      //parent remove
      if (!obj.parent_id && found) {
        return (this.form.feelings = this.form.feelings.filter(
          (feeling) => feeling.id != obj.id
        ));
      }
      const parent = this.flat(this.form.feelings).find(
        (feeling) => feeling.id == obj.parent_id
      );
      //child add
      if (obj.parent_id && !found) {
        //console.log("add child");
        return parent.children.push(obj);
        //console.log(parent);
      }
      //remove child
      if (obj.parent_id && found) {
        return (parent.children = parent.children.filter(
          (feeling) => feeling.id != obj.id
        ));
      }
    },
    flat(array) {
      // aplanamos el array de feelings en el form
      var result = [];
      const obj = this;
      array.forEach(function(a) {
        result.push(a);
        if (Array.isArray(a.children)) {
          result = result.concat(obj.flat(a.children));
        }
      });
      return result;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
