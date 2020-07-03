<template>
  <div class="_404" @click="arbitrarily"></div>
</template>
  
  <script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "404"
    };
  },
  // 是件集合
  methods: {
    arbitrarily(){
      this.$router.push("/");
    }
  }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scoped>
._404 {
  height: 100%;
  background: url("../assets/images/_404.png") no-repeat center;
}
</style>
  