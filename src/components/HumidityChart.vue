<template>
  <div class="container">
    <canvas id="myChart2" width="10px" height="10px"></canvas>
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
    const ctx = document.getElementById("myChart2");
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.keys,
        datasets: [
          {
            label: "Wilgotność (%)",
            data: this.values,
            borderColor: "rgb(39, 154, 255)",
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
    newChart;
  },
};
</script>
