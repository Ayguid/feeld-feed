<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <!-- Start Input text      -->
      <b-form-group>
        <span v-for="(mainFeeling, i) in mainFeelings" :key="i">
          
          <b-button
          variant="primary"
          @click="addFeeling({id:mainFeeling.id, name: mainFeeling.name, feelings: []})"
          >{{mainFeeling.name}}</b-button>
        
          <span v-if="findInForm(mainFeeling.id)">
            <span v-for="(feeling, i) in mainFeeling.feelings" :key="i">
              <b-button
                variant="secondary"
                v-if="checkIfShowChild(feeling)"
                @click="addChildFeeling({id:feeling.id, name: feeling.name, parent_id: feeling.parent_id, feelings: []})"
              >{{feeling.name}}
              </b-button>

            <span v-for="(f, i) in feeling.feelings" :key="i">
              <b-button
                v-if="checkIfShowSecondChild(feeling)"
                @click="addSecondChildFeeling({id:f.id, name: f.name, parent_id: f.parent_id}, feeling.parent_id)"
                variant="outline-success"
              >{{f.name}}
              </b-button>
            </span>

            </span>
            


            <div></div>
          </span>
        
        </span>

      </b-form-group>
      <!-- End Input text  -->


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
   mainFeelings() {
     let feelings = ''
     if(this.form.feelings.length < this.mainFeelingsLimit){//all main feelings
       feelings =  this.$store.state.baseFeelings
     }
     else if (this.form.feelings.length == this.mainFeelingsLimit){ // main permited feelings
       var activeIds =  this.form.feelings.map(a => a.id)//array con los ids de los feelings seleccionados en el form
       feelings = this.$store.state.baseFeelings.filter(({id}) => activeIds.includes(id));// feelings con esos ids,,
     }
     return feelings
   }
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
    addFeeling(obj){
      //first parent feeling
      const mainFeeling = this.findInForm(obj.id)
      //console.log(obj, mainFeeling);
      if(!mainFeeling && this.form.feelings.length < this.mainFeelingsLimit){//new main parent
        this.form.feelings.push(obj)
      }
      if(mainFeeling){// remove main parent
        this.form.feelings = this.form.feelings.filter((feeling) => feeling.id != obj.id);
      }
    },
    addChildFeeling(obj){
      const mainFeeling = this.findInForm(obj.parent_id)
      const hasChildren = mainFeeling?.feelings.length > 0 //preguntamos si tiene child el main feeling
      if(hasChildren){//remove child
        mainFeeling.feelings = []
      }else{//addchild
        mainFeeling.feelings.push(obj)
      }
    },
    findInForm(id){
      return this.form.feelings.find((feeling) => feeling.id == id);
    },
    checkIfShowChild(obj){
      //console.log(obj);
      const x = this.findInForm(obj.parent_id)?.feelings.length
      if( x < this.childFeelingsLimit){
        return true
      }
      else if( x == this.childFeelingsLimit && this.findInForm(obj.parent_id)?.feelings[0].id == obj.id){
        //corregir estos si se quiere mas de un child....por el [0], tendria que haber un array de ids
        return true
      }
      else {
        return false
      }
      
    },
    checkIfShowSecondChild(obj){
      //console.log(obj);
      if(this.findInForm(obj.parent_id)?.feelings.length == this.childFeelingsLimit){
        return true
      }
      else {
        return false
      }
    },
    addSecondChildFeeling (obj, grandParentId){
      const mainFeeling = this.findInForm(grandParentId)
      const secFeeling =  mainFeeling?.feelings[0]
      if(secFeeling?.feelings.length < this.childFeelingsLimit){
        console.log('Add')
        mainFeeling.feelings.find((feeling) => feeling.id == obj.parent_id).feelings.push(obj)
      }else{
        console.log('Remove')
        mainFeeling.feelings.find((feeling) => feeling.id == obj.parent_id).feelings = []
      }
      //console.log(obj, mainFeeling);
    }
  },
  mounted (){

  }
};
</script>
