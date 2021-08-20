<template>
  <div>
    <!--
    {{ $store.state.selectedMemory }}
  -->
    <b-row no-gutters>
      <b-col class="" cols="10">
        <div>
          <b-form-select v-model="filterFeeling" class="mb-2 ">
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
            @click="actionInModal('add-memory')"
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
                  @memory-action="actionInModal($event)"
                  :memory="userMemory"
                />
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-modal
      :centered="true"
      @hidden="resetModal"
      v-model="modalShow"
      ref="my-modal"
      hide-footer
      title="Feel"
    >
      <!-- v-bind="child_component_props" -->
      <component
        @close_modal="modalShow = !modalShow"
        :is="child_component"
      ></component>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
//import Feed from "@/components/Feed.vue";
import MemoryForm from "@/components/forms/AddMemoryForm.vue";
import MemoryCard from "@/components/cards/Memory.vue";
import MemoryTagForm from "@/components/forms/MemoryTagForm.vue";
import DeleteMemoryForm from "@/components/forms/DeleteMemoryForm.vue";
export default {
  name: "Home",
  components: {
    //Feed,
    MemoryCard,
    //MemoryTagForm,
    //MemoryForm,
  },
  data() {
    return {
      modalShow: true, // false
      filterFeeling: null,
      //selectedMemory: {},
      //tagModalShow: false,
      child_component: MemoryForm, // ""
      MemoryForm,
      MemoryTagForm,
      DeleteMemoryForm,
    };
  },

  computed: {
    /*
    child_component_props: function() {
      if (this.child_component == this.MemoryTagForm) {
        return { memory: this.selectedMemory };
      }
      return {};
    },*/
    userMemories() {
      let x = [];
      if (this.filterFeeling) {
        x = this.$store.state.userMemories.filter((memory) =>
          memory.feelings.some((o) => o.id == this.filterFeeling)
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
    async resetModal() {
      await this.$store.dispatch("selectUserMemory", null);
    },
    actionInModal(action) {
      //console.log(action);
      this.modalShow = true;
      switch (action) {
        case "add-memory":
        case "edit-memory":
          this.child_component = this.MemoryForm;
          break;
        case "tag-memory":
          this.child_component = this.MemoryTagForm;
          break;
        case "delete-memory":
          this.child_component = this.DeleteMemoryForm;
          break;
        default:
      }
    },
  },
};
</script>
