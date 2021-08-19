<template>
  <div class="">
    <BarChart :chart-data="datacollection" :options="chartOptions" />
  </div>
</template>

<script>
import BarChart from "@/components/charts/DoughnutChart.js";

export default {
  name: "FeelingsChart",
  props: {
    msg: String,
    //datacollection: Object,
  },
  components: {
    BarChart,
  },
  data() {
    return {
      //datacollection: {
      //  labels: [],
      //  dataSets: []
      //},
      chartOptions: {
        maintainAspectRatio: false,
        legend: {
          position: "right",
        },
        //responsive: true,
      },
    };
  },
  //
  computed: {
    datacollection() {
      //console.log("mounted");
      var xAxis = [];
      var datasets = [
        {
          //type: "line",
          label: "Memory amount",
          backgroundColor: [],
          data: [],
        },
      ];
      this.$store.state.baseFeelings.forEach((feeling) => {
        xAxis.push(feeling.label);
        const feelsByCat = this.$store.state.userMemories.filter((memory) =>
          memory.feelings.some((o) => o.id == feeling.id)
        );
        datasets[0].data.push(feelsByCat.length);
        datasets[0].backgroundColor.push(feeling.color);
      });
      /*
      var xAxis = this.$store.state.baseFeelings.map((a) => a.label);
      */
      return {
        labels: xAxis,
        datasets: datasets,
      };
    },
  },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF".split("");
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  mounted() {
    //this.fillData()
  },
  //
};
</script>
