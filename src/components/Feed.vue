<template>
  <div class="">
    <!--
    {{ $store.state.userMemories }}
    -->
    <div>
      <b-form-select v-model="selectedFeeling" class="mb-3">
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

    <b-modal v-model="tagModalShow" ref="my-modal" hide-footer title="Feel">
      <div class="d-block text-center">
        <h3>Assign Some tags if you want to</h3>
        <div></div>
        <MemoryTagForm />
      </div>
    </b-modal>
  </div>
</template>
<script>
import MemoryCard from "@/components/cards/Memory.vue";
import MemoryTagForm from "@/components/forms/MemoryTagForm.vue";
export default {
  name: "Feed",
  components: {
    MemoryCard,
    MemoryTagForm,
  },
  data() {
    return {
      selectedFeeling: null,
      selectedMemory: {},
      tagModalShow: false,
    };
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
<style scoped>
/*
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter, .list-complete-leave-to{
  opacity: 0;
}
.list-complete-leave-active {
  position: absolute;
}
*/
</style>
