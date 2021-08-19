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
        <!--
               {{memory}}
              -->
        <span v-for="feeling in memory.feelings" :key="feeling.id">
          <b-badge variant="light">
            {{ feeling.label }}
          </b-badge>
          <!--
                {{ feeling.value }} %
                -->
          &nbsp;
          <span v-for="fee in feeling.children" :key="fee.id">
            <b-badge variant="success">
              {{ fee.label }}
            </b-badge>
            &nbsp;
            <span v-for="f in fee.children" :key="f.id">
              <b-badge variant="warning">
                {{ f.label }}
              </b-badge>
            </span>
            &nbsp;
          </span>
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
export default {
  name: "Memory",
  props: ["memory"],
  data() {
    return {};
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
};
</script>
