<template>
  <div class="">
    <!--  
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="tag-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-tags
          separator=" ,;"
          tag-variant="primary"
          placeholder="Enter new tags separated by space, comma or semicolon"
          no-add-on-enter
        ></b-form-tags>
      </b-input-group>
        -->
    <TagsForm :userTags="userTags" />

    <div>
      <b-badge
        class="m-1 p-2"
        v-for="tag in userTags"
        :key="tag.id"
        variant="info"
        >{{ tag.label }} &nbsp;
        <b-button variant="primary" @click="deleteTag(tag.id)"
          >-</b-button
        ></b-badge
      >
    </div>
    <div>
      <p>Ex: #son, #family, #job, #behaviour, #food, #eggs, not feelings!</p>
      <p>This tags we will later relate to multiple feelings.</p>
    </div>
  </div>
</template>

<script>
import TagsForm from "@/components/forms/TagsForm.vue";
export default {
  name: "Tags",
  data() {
    return {};
  },
  components: {
    TagsForm,
  },
  computed: {
    userTags() {
      return this.$store.state.userTags;
    },
  },
  watch: {},
  methods: {
    deleteTag(id) {
      this.$store.dispatch("deleteUSerTag", id);
    },
  },
};
</script>
