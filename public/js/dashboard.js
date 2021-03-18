document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("DOM for dashboard loaded");
  }

  const salesChart = Highcharts.chart("container", {
    chart: {
      type: "line"
    },
    title: {
      text: "Weekly Sales Performance"
    },
    xAxis: {
      type: "datetime"
    },
    yAxis: {
      title: {
        text: "$ Weekly Earnings $"
      }
    },
    series: [
      {
        name: "Sales Total",
        // Data = sum of purchases made in one day
        data: [10, 5, 35, 25, 15, 60, 40],
        pointStart: Date.UTC(2021, 1, 7),
        // for one week intervals, add "* 7" at end
        pointInterval: 24 * 3600 * 1000
      }
    ]
  });

  return salesChart;
  // };
});
