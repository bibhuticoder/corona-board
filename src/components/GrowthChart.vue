<template>
  <div>
    <p class="lead">Growing Confirmed and Death cases</p>
    <canvas ref="growthChart" id="growth-chart"></canvas>
  </div>
</template>

<script>
import { fetchGrowthData } from "@/helpers/data";
// rgb(255, 193, 7) warning
// rgb(220, 53, 69) danger
// rgb(23, 162, 184) info
export default {
  name: "GrowthChart",
  data() {
    return {
      chart: {}
    };
  },

  created() {},

  mounted() {
    fetchGrowthData(growthData => {
      let labels = Object.keys(growthData);
      let datasets = [];
      datasets.push({
        label: "Confirmed",
        backgroundColor: "rgb(255, 193, 7, 0.5)",
        borderColor: "rgb(255, 193, 7)",
        borderWidth: 1,
        data: Object.values(growthData).map(d => d.confirmed)
      });
      datasets.push({
        label: "Deaths",
        backgroundColor: "rgb(220, 53, 69, 0.5)",
        borderColor: "rgb(220, 53, 69)",
        borderWidth: 1,
        data: Object.values(growthData).map(d => d.deaths)
      });
      this.initChart(labels, datasets);
    });
  },
  methods: {
    initChart(labels, datasets) {
      var ctx = this.$refs.growthChart.getContext("2d");
      let chart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets
        },

        // Configuration options go here
        options: {
          maintainAspectRatio: true,
          tooltips: {
            mode: "index",
            intersect: true
          },
          hover: {
            mode: "index",
            intersect: true
          },
          legend: {
            display: true,
            lineWidth: 1
          },
          elements: {
            point: {
              radius: 0
            }
          },
          scales: {
            yAxes: [
              {
                // display: false,
                gridLines: {
                  display: true,
                  lineWidth: "4px",
                  color: "rgba(0, 0, 0, .2)",
                  zeroLineColor: "transparent"
                }
              }
            ],
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false
                },
                ticks: {
                  fontColor: "#495057",
                  fontStyle: "bold"
                }
              }
            ]
          }
        }
      });
    }
  }
};
</script>

<style>
</style>