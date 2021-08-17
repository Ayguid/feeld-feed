<template>
  <div>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="First" active><p>I'm the first tab</p></b-tab>
        <b-tab title="Second"><p>I'm the second tab</p></b-tab>
        <b-tab title="Very, very long title"
          ><p>I'm the tab with the very, very long title</p></b-tab
        >
        <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
      </b-tabs>
    </div>
    <b-row>
      <b-col cols="md-6">
        <BarChart />
      </b-col>
      <b-col cols="md-6">
        <BarChart />
        <!--
        <b-img src="https://thechalkboardmag.com/wp-content/uploads/2018/04/feelings-wheel-explained.jpg" fluid alt="Responsive image"></b-img>
        -->
      </b-col>
    </b-row>
  </div>
</template>
<script>
import BarChart from "@/components/charts/BarChart.vue";
export default {
  name: "Analisis",
  props: {},
  components: {
    BarChart,
  },
};
</script>
