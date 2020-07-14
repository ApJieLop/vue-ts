<template>
  <!-- 登录 -->
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="accountNumber" class="z2">
        <img class="lb" src="../assets/images/lb_3.png" alt />
        <el-input v-model="ruleForm.accountNumber" placeholder="请输入用户名" class="z1"></el-input>
      </el-form-item>
      <el-form-item prop="Password" class="z2">
        <img class="lb" src="../assets/images/lb_1.png" alt />
        <el-input type="password" v-model="ruleForm.Password" placeholder="请输入密码" class="z1"></el-input>
      </el-form-item>
      <el-form-item prop="verificationCode" class="z2">
        <img class="lb" src="../assets/images/lb_2.png" alt />
        <el-input
          v-model="ruleForm.verificationCode"
          placeholder="请输入验证码"
          style="width: 60%;float: left;"
        ></el-input>
        <el-tooltip class="item" effect="light" content="点击更新" placement="bottom">
          <p class="yzm" @click="ghyzm" v-loading="loading">
            <span>{{ num1 }}</span>
            <span>{{ fh }}</span>
            <span>{{ num2 }}</span>
            <span>=</span>
            <span>?</span>
          </p>
        </el-tooltip>
      </el-form-item>
      <el-form-item style="margin-bottom:0;">
        <el-button type="primary" class="dl" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ElementUI from "element-ui";
import  zString  from '../assets/js/requireFunction'

@Component
export default class login extends Vue {
  public $md5: any;
  public $Qs: any;
  public $httpApi: any;
  public $encapsulationFunction: any;
  ruleForm: any = {
    accountNumber: "",
    Password: "",
    verificationCode: ""
  };
  rules: object = {
    accountNumber: [
      { required: true, message: "请输入用户名", trigger: "blur" }
    ],
    Password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };
  loading: boolean = false;
  num1: number | null = null; // 第一个数
  num2: number | null = null; // 第二个数
  fh: any = ""; // 验证码符号  +  -  *  /
  yzms: any = ""; // 正确的验证码

  submitForm() {
      if (!this.ruleForm.accountNumber) {
          this.$message.warning("请输入账号");
      } else if (!this.ruleForm.Password) {
          this.$message.warning("请输入密码");
      } else if (this.ruleForm.verificationCode) {
      if (Number(this.ruleForm.verificationCode) != this.yzms) {
        this.ruleForm.verificationCode = "";
        this.ghyzm();
        this.$message.warning("验证码有误,请重新填写");
        return false;
      } else {
        const loading = this.$loading({
          fullscreen: true,
          background: "rgba(0,0,0,.4)"
        });
        let type = "post";
        let url = this.$httpApi.urlb + "appv1/usdpc1/userLogin";
        let data = {
          username: this.ruleForm.accountNumber,
          password: this.$md5(this.$md5(this.ruleForm.Password))
        };
        this.$httpApi.myLogin(type, url, data, (res: any) => {
          let _this = this;
          if (res.data.code == 4) {
            setTimeout(function() {
              localStorage.setItem("token", "ztoken"); // 测试token
              localStorage.setItem("uid", res.data.data.uid); // 用户id：用户的唯一标识
              localStorage.setItem("type", res.data.data.type); // 1、企业用户；2、个人用户；3、定制用户
              localStorage.setItem("username", res.data.data.username); // 用户名
              localStorage.setItem("nick", res.data.data.nick); // 昵称
              localStorage.setItem("himg", res.data.data.himg); // 户头像
              ElementUI.Loading.service({}).close();
              _this.$router.push("/publicShell");
            }, 1000);
          } else if (res.data.code == 5) {
            loading.close();
            this.$message.warning("密码错误");
            this.ghyzm();
          } else if (res.data.code == 3) {
            ElementUI.Loading.service({}).close();
            this.$message.warning("用户名未知");
            this.ghyzm();
          } else if (res.data.code == 2) {
            ElementUI.Loading.service({}).close();
            this.$message.warning("用户名输入错误");
            this.ghyzm();
          } else {
            ElementUI.Loading.service({}).close();
            this.$message.warning(res.data.message);
            this.ghyzm();
          }
        });
      }
    } else {
      this.$message.warning("请填写验证码");
      return false;
    }
  }
  // 更新验证码
  ghyzm() {
    let _this = this;
    _this.ruleForm.verificationCode = "";
    let num1 = Math.ceil(Math.random() * 10);
    let num2 = Math.ceil(Math.random() * 10);
    let num3 = Math.ceil(Math.random() * 3);
    _this.num1 = num1;
    _this.num2 = num2;
    if (num3 == 1) {
      _this.fh = "+";
      _this.yzms = num1 + num2;
    } else if (num3 == 2) {
      _this.fh = "-";
      if (num1 < num2) {
        _this.yzms = num2 - num1;
        _this.num1 = num2;
        _this.num2 = num1;
      } else {
        _this.yzms = num1 - num2;
      }
    } else if (num3 == 3) {
      _this.fh = "*";
      _this.yzms = num1 * num2;
    } else {
      _this.fh = "+";
      _this.yzms = num1 + num2;
    }
    _this.loading = true;
    setTimeout(() => {
      _this.loading = false;
    }, 1000);
  }
  // 初始化dom
  mounted() {
    this.ghyzm();
  }
  // 初始化data
  created() {
    // console.log(zString.Format(1542274800000))
    
    console.log((new Date(1542274800000) as any).Format('yy-MM-dd hh:mm:ss'))
    console.log('%c★cauthor：赵金福 ★ QQ：931571231 ★ 微信/手机号：18332521721 ★ startDate：2020-07-03','color:red');
  }
}
// // 初始化数据
</script>
  
<style lang="less" scoped>
.login {
  height: 100%;
  background: url("../assets/images/home1.jpg") center no-repeat no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  video {
    position: fixed;
    top: 0;
    left: 0;
    object-fit: fill;
  }
  .el-form {
    display: block;
    width: 550px;
    background: url("../assets/images/home31.png") center no-repeat no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    margin: auto;
    padding: 70px 20px 30px 20px;
    margin-top: 4%;
    position: absolute;
    top: 25%;
    left: 34.5%;
    .el-form-item {
      margin-bottom: 18px;
      width: 70%;
      margin: auto;
      margin-top: 20px;
      .lb {
        display: block;
        float: left;
        width: 24px;
        margin: 8px 0 0 10px;
      }
      .z1 {
        width: 90%;
        float: right;
      }
    }
    .yzm {
      float: left;
      height: 40px;
      line-height: 40px;
      width: 31%;
      color: #0ff1ff;
      font-size: 14px;
      cursor: pointer;
      letter-spacing: 5px;
    }
    .z2 {
      background: url(../assets/images/home5.png) center no-repeat no-repeat;
      background-size: 100% 100%;
    }
  }
}
.login /deep/ .el-form-item__content {
  line-height: 0 !important;
}
.login /deep/ .el-button--primary {
  color: #fff;
  background-color: #0582de;
  border-color: #0782e0;
  width: 140px;
  margin-top: 40px;
}
.login /deep/ .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: transparent !important;
  border: 0 !important;
  color: #0fc4f6 !important;
}
</style>
  