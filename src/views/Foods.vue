<template>
  <div>
    <b-row no-gutters>
      <b-col class="" cols="10">
        <div>
          <b-form-select class="mb-2">
            <b-form-select-option :value="null"
              >Filter by -- All</b-form-select-option
            >
            <!--
            <b-form-select-option
              v-for="(feeling, i) in feelings"
              :key="i"
              :value="feeling.id"
              >{{ feeling.label }}</b-form-select-option
            >
            -->
          </b-form-select>
        </div>
      </b-col>
      <b-col cols="2">
        <div class="d-flex justify-content-center">
          <b-button
            type="submit"
            variant="outline-primary"
            @click="modalShow = true"
            ><b-icon icon="plus" scale="2"></b-icon
          ></b-button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="feed overflow-auto">
          <div>
            <b-table
              table-variant="light"
              small
              :fields="tableFields"
              :items="userFoods"
              responsive="sm"
              striped
              hover
            >
              <template #cell(date)="data">
                <b class="text-info">{{ formatDate(data.value) }}</b>
              </template>

              <template #cell(time)="data">
                {{ data.value }}
              </template>

              <template #cell(type)="data">
                {{ data.value.desc }}
              </template>

              <template #cell(desc)="data">
                {{ data.value }}
              </template>

              <template #cell()="data">
                <!--{{ data.value }}-->
                <a href="#" class="card-link" @click="openInModal(data.value)">
                  <b-icon icon="pencil" scale="1"></b-icon>
                </a>

                <a href="#" class="card-link" @click="deleteFood(data.value)">
                  <b-icon icon="trash" scale="1"></b-icon>
                </a>
              </template>
            </b-table>
          </div>
        </div>
      </b-col>

      <div class="w-100"></div>
    </b-row>

    <b-modal
      v-model="modalShow"
      ref="my-modal"
      hide-footer
      title="Feel"
      @hide="resetForm()"
    >
      <div class="d-block text-center">
        <h3>Hello!</h3>
      </div>
      <AddForm
        @close_modal="modalShow = !modalShow"
        :toEditID="selectedFoodId"
      />
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
//import Feed from "@/components/Feed.vue";
import AddForm from "@/components/forms/AddFoodForm.vue";

export default {
  name: "Home",
  data() {
    return {
      selectedFoodId: "",
      modalShow: false,
      tableFields: [
        { key: "date", label: "Date", sortable: true },
        { key: "time", label: "Time", sortable: true },
        { key: "type", label: "Type", sortable: true },
        { key: "desc", label: "Desc" },
        { key: "id", label: "Actions" },
      ],
    };
  },
  components: {
    AddForm,
  },
  computed: {
    userFoods() {
      return this.$store.state.userFoods;
    },
  },
  methods: {
    resetForm() {
      this.modalShow = false;
      this.selectedFoodId = "";
    },
    openInModal(id) {
      this.modalShow = true;
      this.selectedFoodId = id;
    },
    async deleteFood(id) {
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
      if (res) this.$store.dispatch("deleteUserFood", id);
    },
  },
};
</script>
