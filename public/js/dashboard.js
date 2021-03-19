document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Dashboard DOM loaded");
  }

  const d = new Date();
  d.setDate(d.getDate() - 5);
  const salesChart = Highcharts.chart("container", {
    chart: {
      type: "line",
      zoomType: "x"
    },
    title: {
      text: "Weekly Sales Performance"
    },
    xAxis: {
      type: "datetime"
      // maxZoom: 48 * 3600 * 1000,
      // tickInterval: 24 * 3600 * 1000,
      // tickPositioner: function(min, max) {
      //   var interval = this.options.tickInterval,
      //     ticks = [],
      //     count = 0;

      //   while (min < max) {
      //     ticks.push(min);
      //     min += interval;
      //     count++;
      //   }

      //   ticks.info = {
      //     unitName: "day",
      //     count: 1,
      //     higherRanks: {},
      //     totalRange: interval * count,
      //   };
      //   return ticks;
      // },
    },
    yAxis: {
      title: {
        text: "$ Weekly Earnings $"
      }
    },
    series: [
      {
        name: "Sales Total",
        data: [25, 10, 40, 15, 60, 5, 35],
        pointStart: Date.UTC(
          d.getUTCFullYear(),
          d.getUTCMonth(),
          d.getUTCDate()
        ),
        pointInterval: 24 * 3600 * 1000 // one week
      }
    ]
  });
  console.log(d);
  return salesChart;
});
