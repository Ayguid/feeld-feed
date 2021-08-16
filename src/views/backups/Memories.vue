<template>
  <div>
    <b-row>
      <b-col cols="12">
        <div class="feed overflow-auto">
          <Feed />
        </div>
      </b-col>

      <b-col cols="12">
        <div class="formButton footer">
          <b-button
            type="submit"
            variant="outline-primary"
            @click="modalShow = !modalShow"
            ><b-icon icon="plus" scale="2"></b-icon
          ></b-button>
        </div>
      </b-col>
      <div class="w-100"></div>
    </b-row>

    <b-modal v-model="modalShow" ref="my-modal" hide-footer title="Feel">
      <div class="d-block text-center">
        <h3>Hello!</h3>
      </div>
      <AddForm @close_modal="modalShow = !modalShow" />
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from "@/components/Feed.vue";
import AddForm from "@/components/forms/AddMemoryForm.vue";

export default {
  name: "Home",
  data() {
    return {
      modalShow: false,
    };
  },
  components: {
    Feed,
    AddForm,
  },
  computed: {
    /*
    userFeelings() {
      return this.$store.state.userFeelings;
    },
    feelings() {
      return this.$store.state.baseFeelings;
    },
    */
  },
  methods: {},
};
</script>
