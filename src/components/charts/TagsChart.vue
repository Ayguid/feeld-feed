<template>
  <div class="">
    <BarChart :chart-data="datacollection" :options="chartOptions" />
    <!--
    {{ datacollection }}
    -->
  </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart.js";

export default {
  name: "TagsChart",
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
      colors: [
        "#fffebe",
        "#dbcbe5",
        "#bfebd4",
        "#fdefbe",
        "#ffbfbf",
        "#bfbfbf",
        "#c0dbf0",
      ],
      chartOptions: {
        maintainAspectRatio: false,
        //responsive: true,
        legend: {
          display: true,
        },
        tooltips: {
          enabled: true,
        },

        scales: {
          xAxes: {
            //stacked: true,
          },
          yAxes: [
            {
              //stacked: true,
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
      let labels = [];
      let datasets = [];

      labels = this.$store.state.baseFeelings.map((a) => a.label);

      this.$store.state.userTags.forEach((tag, i) => {
        let data = [];
        this.$store.state.baseFeelings.forEach((feeling) => {
          const memories = this.$store.state.userMemories
            .filter((memory) => memory.feelings.some((o) => o.id == feeling.id))
            .filter((m) => m.tags.includes(tag.label));
          data.push(memories.length);
          //labels.push(feeling.label);
        });
        datasets.push({
          type: "bar",
          label: tag.label,
          backgroundColor: this.colors[i], //this.getRandomColor(),
          fill: false,
          data: data,
        });
      });
      return {
        labels: labels,
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
