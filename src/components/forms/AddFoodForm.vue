<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-2"
        label="What did you eat ?"
        label-for="input-2"
      >
        <label for="example-datepicker">Choose a date</label>
        <b-form-datepicker
          id="example-datepicker"
          v-model="form.date"
          class="mb-2"
        ></b-form-datepicker>
        <p>Value: '{{ form.date }}'</p>

        <label for="timepicker-placeholder">Time picker with placeholder</label>
        <b-form-timepicker
          id="timepicker-placeholder"
          v-model="form.time"
          placeholder="Choose a time"
          locale="en"
        ></b-form-timepicker>
        <p>Value: '{{ form.time }}'</p>

        <b-form-group>
          <b-form-select v-model="form.type" :options="types"></b-form-select>
          <div class="mt-3">
            Selected: <strong>{{ form.type }}</strong>
          </div>
        </b-form-group>

        <b-form-input
          autocomplete="off"
          id="input-2"
          v-model="form.desc"
          :placeholder="`Describe your food, ${wordMin} words min`"
        ></b-form-input>
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
export default {
  name: "AddForm",
  props: ["toEditID"],
  components: {},
  data() {
    return {
      wordMin: 2,
      types: [
        { value: null, text: "Please select an option" },
        { value: { id: 1, desc: "snack" }, text: "snack" },
        { value: { id: 2, desc: "breakfast" }, text: "breakfast" },
        { value: { id: 3, desc: "lunch" }, text: "lunch" },
        { value: { id: 4, desc: "dinner" }, text: "dinner" },
      ],
      form: {
        date: "",
        time: "",
        desc: "",
        type: null,
      },
      show: true,
    };
  },
  computed: {
    flatFormFeelings() {
      return this.flat(this.form.feelings);
    },
    validateWordCount() {
      return this.form.text.match(/(\w+)/g)?.length >= this.wordMin;
    },
    userFood() {
      return this.$store.state.userFoods.find(
        (food) => food.id == this.toEditID
      );
    },
  },
  methods: {
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
    onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form))
      /*
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
      */
      let newObj = JSON.parse(JSON.stringify(this.form));

      if (this.userFood) {
        newObj.id = this.toEditID;
        this.$store.dispatch("editUserFood", newObj);
      } else {
        this.$store.dispatch("addUserFood", newObj);
      }

      this.$emit("close_modal");
      this.onReset(event);
      //alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.desc = "";
      this.form.date = "";
      this.form.time = "";
      this.form.type = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    if (this.userFood) {
      this.form.desc = this.userFood.desc;
      this.form.date = this.userFood.date;
      this.form.time = this.userFood.time;
      this.form.type = this.userFood.type;
    }
  },
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
