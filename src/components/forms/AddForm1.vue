<template>
  <div>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="Your Feeling:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.desc"
          placeholder="Enter thought/idea"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
          
        <b-form-checkbox-group
          v-model="form.feelings"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
        <div class="main-feeling" v-for="(mainFeeling, i) in feelings" :key="i" >
            <b-form-checkbox :value="{parent_id: mainFeeling.parent_id,id:mainFeeling.id, name: mainFeeling.name, value:10}">{{mainFeeling.name}}</b-form-checkbox>
            <br>
            <b-form-input v-if="validateIfShow(mainFeeling.id)" type="range" class="form-control-range" min="0" max="100" step="10" value="10" @change="changeValue($event, mainFeeling.id)"></b-form-input>
        </div>
        
        </b-form-checkbox-group>
        
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>

    {{ $store.state.userFeelings }}
  </div>
</template>
<script>
export default {
  name: "AddForm",
  data() {
    return {
      form: {
        desc: "",
        feelings: [],
      },
      show: true,
    };
  },
  computed:{
      feelings () {
        return this.$store.state.baseFeelings
      }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("addUserFeeling", this.form);
      //alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.desc = "";
      this.form.feelings = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    validateIfShow(id) {
       return this.form.feelings.find(feeling=>feeling.id == id) 
    },
    changeValue(event, id){
      console.log(event);
      const x = this.form.feelings.find((feeling)=>feeling.id == id)
      x.value = event
    }
  },
};
</script>
