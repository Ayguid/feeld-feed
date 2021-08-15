<template>
  <div class="">
    <BarChartFile :chart-data="datacollection" :options="chartOptions" />
  </div>
</template>

<script>
import BarChartFile from "@/components/charts/BarChartFile.js";

export default {
  name: "BarChart",
  props: {
    msg: String,
    //datacollection: Object,
  },
  components: {
    BarChartFile,
  },
  data() {
    return {
      //datacollection: {
      //  labels: [],
      //  dataSets: []
      //},
      chartOptions: {
        maintainAspectRatio: false,
        //responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                precision: 0, // sacar para decimales
              },
            },
          ],
        },
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
          label: "Value",
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
