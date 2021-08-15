<template>
  <div>
    <!-- First Parent START-->
    <span class="main-feeling" v-for="(mainFeeling, i) in feelings" :key="i">
      <b-form-checkbox
        v-if="validateMain(mainFeeling.id)"
        v-model="form.feelings"
        :value="{
          parent_id: mainFeeling.parent_id,
          id: mainFeeling.id,
          name: mainFeeling.name,
          value: 10,
        }"
        button
        button-variant="info"
      >
        {{ mainFeeling.name }}
      </b-form-checkbox>
      <!-- First Child START-->
      <span class="main-feeling" v-for="(feel, j) in mainFeeling.feelings" :key="j">
        <b-form-checkbox
          v-if="validateSecondary(feel.parent_id, feel.id)"
          v-model="form.feelings"
          :value="{
            parent_id: feel.parent_id,
            id: feel.id,
            name: feel.name,
            value: 10,
          }"
          button
        >
        {{ feel.name }}
        </b-form-checkbox>  
      <!-- First Child END-->
      <!-- Second Child START-->
      <!--
      <span class="main-feeling" v-for="(f, k) in feel.feelings" :key="k">
        <b-form-checkbox
          v-if="findInForm(f.parent_id)"
          v-model="form.feelings"
          :value="{
            parent_id: f.parent_id,
            id: f.id,
            name: f.name,
            value: 10,
          }"
          button
          button-variant="primary"
        >
        {{ f.name }}
        </b-form-checkbox>  
      </span>
      -->
      <!-- Second Child END-->      
      </span>
      
    </span>
    <!-- First PARENT END -->
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
      mainFeelingsLimit: 2,
      childFeelingsLimit: 1,
      form: {
        text: "",
        feelings: [],
      },
      show: true,
    };
  },
  computed: {
    feelings() {
      /*
    let feelings
     if(this.form.feelings.length < this.mainFeelingsLimit){//all main feelings
       feelings =  this.$store.state.baseFeelings
     }
     else if (this.form.feelings.length == this.mainFeelingsLimit){ // main permited feelings
       var activeIds =  this.form.feelings.map(a => a.id)//array con los ids de los feelings seleccionados en el form
       feelings = this.$store.state.baseFeelings.filter(({id}) => activeIds.includes(id));// feelings con esos ids,,
     }
     return feelings
     */
    return this.$store.state.baseFeelings
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
    findInForm(id){
      return this.form.feelings.find((feeling) => feeling.id == id);
    },
    validateMain(id){
      let mainFeelsCount = this.form.feelings.filter(f=>f.parent_id == null).length
      return mainFeelsCount < this.mainFeelingsLimit || this.form.feelings.find((feeling) => feeling.id == id);
    },
    validateSecondary(parentId){
      let parentPresent = this.form.feelings.find((feeling) => feeling.id == parentId) 
      //let firstChildPresent = this.form.feelings.find((feeling) => feeling.id == childId)
      //console.log(firstChildPresent);
      if(parentPresent){
        return true
      } 
    }
  },
  mounted() {},
};
</script>
