<template>
  <div class="charts">
    <div class="charts" :id="'charts'+pageNum"></div>
  </div>
</template>
<style lang="less" scoped>
div {
  width: 100%;
}
.charts {
  height: 600px;
}
</style>
<script>
import $ from "jquery";
export default {
  props: ["options", "pageNum"],
  data() {
    return {};
  },
  created() {},
  watch: {
    options: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.getStudent();
      },
      deep: true //true 深度监听
    }
  },
  mounted() {
    this.getStudent();
  },
  methods: {
    getStudent() {
      let _this = this;
      let student = _this.$echarts.init(
        document.getElementById("charts" + this.pageNum)
      );
      $(window).resize(function() {
        student.resize();
      });
      student.setOption({
        title: {
          text: _this.options[_this.pageNum].lineName
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["电压", "电流", "功率"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: _this.options[_this.pageNum].times,
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: "value"
          // min: 220
        },
        series: [
          {
            name: "电压",
            type: "line",
            smooth: true,
            itemStyle : { normal: {label : {show: true}}},
            data: _this.options[_this.pageNum].dy
          },
          {
            name: "电流",
            type: "line",
            smooth: true,
            itemStyle : { normal: {label : {show: true}}},
            data: _this.options[_this.pageNum].dl
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.charts {
  width: 100%;
  height: 250px;
}
</style>