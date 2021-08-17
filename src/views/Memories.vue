<template>
  <div>
    <b-row no-gutters>
      <b-col class="" cols="10">
        <div>
          <b-form-select v-model="selectedFeeling" class="mb-3 ">
            <b-form-select-option :value="null"
              >Filter by Feel -- All</b-form-select-option
            >
            <b-form-select-option
              v-for="(feeling, i) in feelings"
              :key="i"
              :value="feeling.id"
              >{{ feeling.label }}</b-form-select-option
            >
          </b-form-select>
        </div>
      </b-col>
      <b-col cols="2">
        <div class="d-flex justify-content-center">
          <b-button
            type="submit"
            variant="outline-primary"
            @click="modalShow = !modalShow"
            ><b-icon icon="plus" scale="2"></b-icon
          ></b-button>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <div class="feed overflow-auto">
          <div class="">
            <div v-if="userMemories.length == 0">
              Please add a Memory
            </div>

            <div class="">
              <div
                class="mb-2 list-complete-item"
                v-for="userMemory in userMemories"
                :key="userMemory.id"
              >
                <MemoryCard
                  @open_modal="openInModal($event)"
                  @delete_memory="deleteMemory($event)"
                  :data="userMemory"
                />
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-modal v-model="modalShow" ref="my-modal" hide-footer title="Feel">
      <div class="d-block text-center">
        <h3>Hello!</h3>
      </div>
      <AddForm @close_modal="modalShow = !modalShow" />
    </b-modal>
    <b-modal v-model="tagModalShow" ref="my-modal" hide-footer title="Feel">
      <div class="d-block text-center">
        <h5>Assign Some tags if you want to</h5>
        <div></div>
        <MemoryTagForm
          @close_modal="tagModalShow = !tagModalShow"
          :memory="selectedMemory"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
//import Feed from "@/components/Feed.vue";
import AddForm from "@/components/forms/AddMemoryForm.vue";
import MemoryCard from "@/components/cards/Memory.vue";
import MemoryTagForm from "@/components/forms/MemoryTagForm.vue";

export default {
  name: "Home",
  data() {
    return {
      modalShow: false,
      selectedFeeling: null,
      selectedMemory: {},
      tagModalShow: false,
    };
  },
  components: {
    //Feed,
    MemoryCard,
    MemoryTagForm,
    AddForm,
  },
  computed: {
    userMemories() {
      let x = [];
      if (this.selectedFeeling) {
        x = this.$store.state.userMemories.filter((memory) =>
          memory.feelings.some((o) => o.id == this.selectedFeeling)
        );
      } else {
        x = this.$store.state.userMemories;
      }
      return x.slice().reverse(); //para que aparezca de ultimo a primero,,tipo feed
    },
    feelings() {
      return this.$store.state.baseFeelings;
    },
  },
  methods: {
    async deleteMemory(id) {
      console.log(id);
      const res = await this.$bvModal.msgBoxConfirm("Are you sure?", {
        title: "Confirmation",
        size: "sm",
        buttonSize: "sm",
        okTitle: "Yes",
        okVariant: "success",
        cancelTitle: "No",
        cancelVariant: "info",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true,
      });
      if (res) this.$store.dispatch("deleteUserMemory", id);
    },
    openInModal(obj) {
      this.tagModalShow = true;
      this.selectedMemory = obj;
      //console.log(obj);
    },
  },
};
</script>
