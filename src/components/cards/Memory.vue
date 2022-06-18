<template>
  <div>
    <!-- 
    {{ memory }}
    -->

    <b-card title="" :sub-title="formatDate(memory.date)">
      <b-card-text>
        {{ memory.text }}
      </b-card-text>

      <b-card-text>
        <span v-for="feeling in tree_feelings" :key="feeling.id">
          <FeelingBadge :feeling="feeling" />
          <hr />
        </span>

        <div>
          <span class="mr-2" v-for="(tag, i) in memory.tags" :key="i"
            >#{{ tag }}</span
          >
        </div>
      </b-card-text>

      <div id="controls">
        <a
          href="#"
          @click.prevent="callAction('edit-memory')"
          class="card-link mr-2"
          ><b-icon icon="pencil" aria-label="Help"></b-icon
        ></a>

        <a
          href="#"
          @click.prevent="callAction('tag-memory')"
          class="card-link mr-2"
          ><b-icon icon="journal-bookmark-fill" aria-label="Help"></b-icon
        ></a>

        <a href="#" class="card-link mr-2"
          ><b-icon icon="paperclip" aria-label="Help"></b-icon
        ></a>

        <a href="#" class="card-link mr-2"
          ><b-icon icon="eye-slash" aria-label="Help"></b-icon
        ></a>

        <a
          href="#"
          @click.prevent="callAction('delete-memory')"
          class="card-link mr-2"
          ><b-icon icon="trash" scale="1"></b-icon
        ></a>
      </div>
    </b-card>
  </div>
</template>
<script>
import FeelingBadge from "@/components/cards/FeelingBadge.vue";
export default {
  name: "Memory",
  props: ["memory"],
  components: {
    FeelingBadge,
  },
  data() {
    return {};
  },
  computed: {
    tree_feelings() {
      //pasa la lista plana a un arbol de feelings
      let list = JSON.parse(JSON.stringify(this.memory.feelings)); //JSON.parse(JSON.stringify(this.memory.feelings));
      var map = {},
        node,
        roots = [],
        i;
      for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parent_id !== null) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.parent_id]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    },
  },
  methods: {
    /*
    deleteMemory() {
      this.$emit("delete_memory", this.memory.id);
    },
    openInModal() {
      this.$emit("open_modal", this.memory);
    },
    */
    async callAction(action) {
      //console.log(action);
      await this.$store.dispatch("selectUserMemory", this.memory);
      this.$emit("memory-action", action);
    },
  },
  mounted() {},
};
</script>
