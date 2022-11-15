<template>
  <div class="container">
    <canvas id="myChart" width="10px" height="100px"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
    keys: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.keys,
        datasets: [
          {
            label: "Temperatura (\u00B0C)",
            data: this.values,
            borderColor: "rgb(255, 20, 70)",
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    myChart;
  },
};
</script>
