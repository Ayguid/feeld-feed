<template>
  <div class="home">
    <!--
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <h1>HOME</h1>

    <b-row>
      <b-col cols="4">
        <Feed />
      </b-col>
      <b-col cols="4">
        <div class="small">
          <TimeLineChart :chart-data="datacollection" :options="chartOptions" />
          <button class="btn" @click="fillData()">Randomize</button>
        </div>
      </b-col>
      <b-col cols="4">
        <AddForm />
      </b-col>
      <div class="w-100"></div>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Feed from "@/components/Feed.vue";
import AddForm from "@/components/forms/AddForm.vue";
import TimeLineChart from "@/components/charts/TimeLineChart.js";
export default {
  name: "Home",
  data() {
    return {
      datacollection: {},
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  components: {
    Feed,
    AddForm,
    TimeLineChart,
  },
  computed: {
    userFeelings() {
      return this.$store.state.userFeelings;
    },
    feelings() {
      return this.$store.state.baseFeelings;
    },
  },
  methods: {
    fillData() {
      var dates = this.userFeelings.map(function (a) {
        return a.date.toLocaleTimeString();
      });
      //let uniqueItems = [...new Set(dates)]
      //console.log(dates);
      var dataSets = [];
      //refinar start
      this.feelings.forEach((element) => {
        // un dataset por cada mainFeeling
        var data = [];
        const feelingsByCategory = this.userFeelings.filter((feeling) =>
          feeling.feelings.some((o) => o.id == element.id)
        );
        feelingsByCategory.forEach(function (feeling) {
          console.log(feeling.feelings);
          feeling.feelings.forEach(function (feel) {
            if (feel.id == element.id) {
              console.log(feel.value);
              data.push(feel.value);
            }
          });
        });
        //refinar end
        var o = Math.round, r = Math.random, s = 255;
        var color=  'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
        dataSets.push({
          label: element.name,
          backgroundColor: color,
          data: data//[this.getRandomInt(), this.getRandomInt(),this.getRandomInt(), this.getRandomInt(),this.getRandomInt(), this.getRandomInt()],
        });
      });

      this.datacollection = {
        labels: dates,
        datasets: dataSets,
      };
      /*
      this.datacollection = {
        labels: dates,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
      */
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>