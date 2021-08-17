<template>
  <div class="">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-row no-gutters>
        <b-col cols="10">
          <b-form-group label="" label-for="tags-validation" :state="state">
            <b-form-tags
              input-id="tags-validation"
              v-model="tags"
              :input-attrs="{ 'aria-describedby': 'tags-validation-help' }"
              :tag-validator="tagValidator"
              :state="state"
              separator=" "
              tagVariant="info"
            ></b-form-tags>

            <template #invalid-feedback>
              You must provide at least {{ tagsMin }} tags and no more than
              {{ tagsMax }}
            </template>

            <template #description>
              <div id="tags-validation-help">
                Tags must be {{ tagMinChar }} to {{ tagMaxChar }} characters in
                length and all lower case. Enter tags separated by spaces or
                press enter.
              </div>
            </template>
          </b-form-group>
        </b-col>
        <b-col class="" cols="2">
          <div class="d-flex justify-content-center">
            <b-form-group>
              <b-button type="submit" variant="outline-primary"
                ><b-icon icon="plus" scale="2"></b-icon
              ></b-button>
            </b-form-group>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "TagsForm",
  props: ["userTags"],
  data() {
    return {
      tagMinChar: 2,
      tagMaxChar: 15,
      tagsMin: 2,
      tagsMax: 6,
      tags: [],
      show: true,
      dirty: false,
    };
  },
  computed: {
    state() {
      // Overall component validation state
      return this.dirty
        ? this.tags.length > this.tagsMin - 1 &&
            this.tags.length < this.tagsMax + 1
        : null;
    },
  },
  watch: {
    tags() {
      // params: newValue, oldValue
      // Set the dirty flag on first change to the tags array
      this.dirty = true;
    },
  },
  methods: {
    tagValidator(tag) {
      //console.log(tag);
      // Individual tag validator function
      return (
        tag === tag.toLowerCase() &&
        tag.length > this.tagMinChar - 1 &&
        tag.length < this.tagMaxChar + 1 &&
        !this.userTags.find((t) => t.label == tag)
      );
    },
    onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form))
      this.$store.dispatch("addUserTags", this.tags);
      this.$emit("close_modal");
      this.onReset(event);
      //alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
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
