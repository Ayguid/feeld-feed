<template>
  <div>
    <!-- 
    {{ data }}
    -->
    <b-card title="" :sub-title="formatDate(data.date)">
      <b-card-text>
        {{ data.text }}
      </b-card-text>

      <b-card-text>
        <!--
               {{data}}
              -->
        <span v-for="feeling in data.feelings" :key="feeling.id">
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
          <span class="mr-2" v-for="(tag, i) in data.tags" :key="i"
            >#{{ tag }}</span
          >
        </div>
      </b-card-text>

      <div id="controls">
        <a href="#" @click="deleteMemory" class="card-link"
          ><b-icon icon="trash" scale="1"></b-icon
        ></a>
        &nbsp; &nbsp;
        <a href="#" @click="openInModal" class="card-link"
          ><b-icon icon="journal-bookmark-fill" aria-label="Help"></b-icon
        ></a>
        &nbsp; &nbsp;
        <a href="#" class="card-link"
          ><b-icon icon="paperclip" aria-label="Help"></b-icon
        ></a>
        &nbsp; &nbsp;
        <a href="#" class="card-link"
          ><b-icon icon="eye-slash" aria-label="Help"></b-icon
        ></a>
      </div>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "Memory",
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    deleteMemory() {
      this.$emit("delete_memory", this.data.id);
    },
    openInModal() {
      this.$emit("open_modal", this.data);
    },
  },
};
</script>
