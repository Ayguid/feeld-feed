<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <!-- Start Input text      -->
      <b-form-group
        id="input-group-2"
        label="Your Feeling:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.text"
          placeholder="Enter thought/idea"
          required
        ></b-form-input>
      </b-form-group>
      <!-- End Input text  -->

      <b-form-group id="input-group-4">
        <div class="main-feeling" v-for="(mainFeeling, i) in feelings" :key="i">
          <b-form-checkbox
            @input="
              checkFeeling({
                parent_id: mainFeeling.parent_id,
                id: mainFeeling.id,
                name: mainFeeling.name,
                feelings: [],
                value: 10,
              })
            "
            >{{ mainFeeling.name }}</b-form-checkbox
          >
     
          <div
            class="sec-feeling form-check form-check-inline p-2"
            v-if="validateIfShow(mainFeeling.id)"
          >
            **
            <span v-for="(feeling, i) in mainFeeling.feelings" :key="i">
              <b-form-checkbox
                class="form-check-input"
                @input="
                  checkFeeling({
                    parent_id: feeling.parent_id,
                    id: feeling.id,
                    name: feeling.name,
                  })
                "
                >{{ feeling.name + " " }}</b-form-checkbox
              >
            </span>
          </div>
          
          <b-form-input
            v-if="validateIfShow(mainFeeling.id)"
            type="range"
            class="form-control-range"
            min="0"
            max="100"
            step="10"
            value="10"
            @change="changeValue($event, mainFeeling.id)"
          ></b-form-input>
          <hr>
        </div>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>

  </div>
</template>
<script>
export default {
  name: "AddForm",
  data() {
    return {
      form: {
        text: "",
        feelings: [],
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
      const newObj = JSON.parse(JSON.stringify(this.form))
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
    validateIfShow(id) {
      return this.form.feelings.find((feeling) => feeling.id == id);
    },
    changeValue(event, id) {
      console.log(event);
      const x = this.form.feelings.find((feeling) => feeling.id == id);
      x.value = event;
    },
    checkFeeling(obj) {
      //console.log(obj.parent_id);
      if (obj.parent_id != null) {
        //subFeeling 1erhijo ADD
        const x = this.form.feelings.find(
          (feeling) => feeling.id == obj.parent_id
        );
        if (x.feelings.find((feeling) => feeling.id == obj.id)) {
          // sacar 1erHijo subfeel
          x.feelings = x.feelings.filter((feeling) => feeling.id != obj.id);
          return;
        }
        //console.log(x.fillings=0);
        x.feelings.push(obj);
        return;
      }
      const x = this.form.feelings.find((feeling) => feeling.id == obj.id);
      if (x) {
        // primer parent remove
        this.form.feelings = this.form.feelings.filter(
          (feeling) => feeling.id != obj.id
        );
      } else {
        //Primer Parent Add
        this.form.feelings.push(obj);
      }
    },
  },
};
</script>
