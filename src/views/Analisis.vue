<template>
  <div>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Charts" active>
          <b-row>
            <b-col cols="md-6">
              <b-card title="By feeling" sub-title="">
                <b-card-text>
                  <FeelingsChartDoughnut />
                </b-card-text>
              </b-card>
            </b-col>
            <b-col cols="md-6">
              <b-card title="By tag" sub-title="">
                <b-card-text>
                  <TagsChart />
                </b-card-text>
              </b-card>
              <!--
        <b-img src="https://thechalkboardmag.com/wp-content/uploads/2018/04/feelings-wheel-explained.jpg" fluid alt="Responsive image"></b-img>
        -->
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Most used words"
          ><p>Most used words</p>
          <div>
            <b-row>
              <b-col cols="md-6">
                <b-list-group>
                  <!--asi se puede loopear un objeto cuando no hay array en vue!!!  -->
                  <b-list-group-item
                    v-for="(value, propertyName, index) in mostUsedWords"
                    :key="index"
                    class="d-flex justify-content-between align-items-center"
                  >
                    {{ propertyName }}
                    <b-badge variant="primary" pill>{{ value }}</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col cols="md-6">
                {{ mostUsedWords }}
              </b-col>
            </b-row>
          </div>
        </b-tab>

        <b-tab title="Most used tags"><p>Most used tags</p></b-tab>
        <b-tab title="Foods"><p>Foods</p></b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
//import FeelingsChart from "@/components/charts/FeelingsChart.vue";
import TagsChart from "@/components/charts/TagsChart.vue";
import FeelingsChartDoughnut from "@/components/charts/FeelingsChartDoughnut.vue";
import { wordOccurrances } from "@/helpers/stringHelpers.js";

export default {
  name: "Analisis",
  props: {},
  components: {
    //FeelingsChart,
    TagsChart,
    FeelingsChartDoughnut,
  },
  computed: {
    mostUsedWords() {
      const memoriesText = this.$store.state.userMemories
        .map((x) => x.text)
        .join();
      return this.wordOccurrances(memoriesText);
    },
  },
  methods: {
    wordOccurrances,
  },
};
</script>
