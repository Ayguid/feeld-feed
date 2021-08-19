<template>
  <div class="">
    <b-row no-gutters>
      <b-col class="" cols="12">
        <TagsForm :userTags="userTags" />
      </b-col>
    </b-row>
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

    <div class="mb-2">
      <ul
        id="my-custom-tags-list"
        class="list-unstyled d-inline-flex flex-wrap mb-0"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions removals"
      >
        <b-card
          v-for="tag in userTags"
          :key="tag.id"
          tag="li"
          class="mt-1 mr-1"
          body-class="py-1 pr-2 text-nowrap"
        >
          <strong>{{ tag.label }}</strong>
          <b-button @click="deleteTag(tag.id)" variant="link" size="sm"
            >remove</b-button
          >
        </b-card>
      </ul>
    </div>

    <div>
      <p>Ex: #son, #family, #job, #behaviour, #food, #eggs, not feelings!</p>
      <p>
        This tags/triggers we will later relate to multiple memories. Keep it
        simple...
      </p>
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
    async deleteTag(id) {
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
      if (res) this.$store.dispatch("deleteUSerTag", id);
    },
  },
};
</script>
