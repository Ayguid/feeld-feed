<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group :label="memory.text" label-for="tags-with-dropdown">
        <b-form-tags
          id="tags-with-dropdown"
          v-model="form.tags"
          no-outer-focus
          class="mb-2"
        >
          <template v-slot="{ tags, disabled, addTag, removeTag }">
            <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
              <li v-for="tag in tags" :key="tag" class="list-inline-item">
                <b-form-tag
                  @remove="removeTag(tag)"
                  :title="tag.label"
                  :disabled="disabled"
                  variant="info"
                  >{{ tag }}</b-form-tag
                >
              </li>
            </ul>

            <b-dropdown
              size="sm"
              variant="outline-secondary"
              block
              menu-class="w-100"
            >
              <template #button-content>
                <b-icon icon="tag-fill"></b-icon> Choose tags
              </template>
              <b-dropdown-form @submit.stop.prevent="() => {}">
                <b-form-group
                  label="Search tags"
                  label-for="tag-search-input"
                  label-cols-md="auto"
                  class="mb-0"
                  label-size="sm"
                  :description="searchDesc"
                  :disabled="disabled"
                >
                  <b-form-input
                    v-model="search"
                    id="tag-search-input"
                    type="search"
                    size="sm"
                    autocomplete="off"
                  ></b-form-input>
                </b-form-group>
              </b-dropdown-form>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button
                v-for="option in availableOptions"
                :key="option.id"
                @click="onOptionClick({ option, addTag })"
              >
                {{ option.label }}
              </b-dropdown-item-button>
              <b-dropdown-text v-if="availableOptions.length === 0">
                There are no tags available to select
              </b-dropdown-text>
            </b-dropdown>
          </template>
        </b-form-tags>
      </b-form-group>
      <div class="d-flex justify-content-center">
        <b-form-group>
          <b-button type="submit" variant="outline-primary"
            ><b-icon icon="plus" scale="2"></b-icon
          ></b-button>
        </b-form-group>
      </div>
      {{ form.tags }}
    </b-form>
  </div>
</template>
<script>
export default {
  name: "MemoryTagForm",
  props: ["memory"],
  data() {
    return {
      search: "",
      show: true,
      form: {
        tags: this.memory.tags || [],
      },
    };
  },
  computed: {
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    userTags() {
      return this.$store.state.userTags;
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.userTags.filter(
        (opt) => this.form.tags.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.label.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "There are no tags matching your search criteria";
      }
      return "";
    },
  },
  methods: {
    onOptionClick({ option, addTag }) {
      addTag(option.label);
      this.search = "";
    },
    removeTag(event) {
      console.log(event);
    },
    onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form))
      const obj = {
        memory_id: this.memory.id,
        tags: this.form.tags,
      };
      //console.log(obj);
      this.$store.dispatch("addTagsToMemory", obj);
      this.$emit("close_modal");
      this.onReset(event);
      //alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form form.tagss
      this.tags = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
