<template>
  <div>
    <b-row>
      <b-col cols="md-6">
        <BarChart />
      </b-col>
      <b-col cols="md-6">
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


