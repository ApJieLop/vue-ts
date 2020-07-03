<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import './assets/css/public.css';
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
}
.el-dialog__header {
  line-height: 0;
}
.el-table {
  .el-button {
    padding: 0;
  }
}
.el-table td,
.el-table th {
  font-size: 12px !important;
}
.el-table th {
  background: #fafafa !important;
}
.el-input__inner {
  height: 34px !important;
  line-height: 34px !important;
}
.el-select-dropdown__item {
  text-align: left;
}
.el-main {
  height: 100%;
  padding: 0!important;
  .el-container {
    height: 100%;
  }
}
.el-footer {
  height: 70px !important;
}
.el-footer /deep/ .el-pagination__editor.el-input .el-input__inner {
  height: 28px !important;
}
.el-footer p {
  color: #b1b1b1;
  font-size: 12px;
  border-top: 1px solid #e6e6e6;
  line-height: 30px;
  margin-top: 6px;
  img {
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
