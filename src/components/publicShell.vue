<template>
  <!-- 公共头部 -->
  <div class="publicShell">
    <el-container class="shell">
      <el-header>
        <el-row>
          <el-col :span="10" class="headLeft">
            <div class="grid-content bg-purple-dark">
              <img
                @click="jumpHome"
                class="logo"
                src="../assets/images/logo.png"
                alt=""
              />
              <p class="logoText">{{ userNanme }}管理平台</p>
              <i class="el-icon-s-operation stb" @click="stb"></i>
              <p class="v">1.0.0</p>
            </div>
          </el-col>
          <el-col :span="14" class="headRight">
            <div class="grid-content bg-purple-dark" style="float:right">
              <el-dropdown class="personal" @command="handleCommand">
                <span class="el-dropdown-link">
                  <img class="userImg" :src="'http://b.yumaoyou.cn:8008/'+userImg" alt="xxx" />
                  {{ userNanme }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item command="returnHome">返回首页</el-dropdown-item>
                  <el-dropdown-item divided command="signOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="shell1">
        <el-aside :class="!isCollapse?'kgLeft1':'kgLeft2'">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#000"
            active-text-color="#188f85"
            style="border-right:0;"
            unique-opened
            router
            :collapse="isCollapse"
          >
            <template v-for="item in routers">
              <template v-if="item.twoTitle">
                <el-submenu :index="item.oneTitle" :key="item.oneTitle" style="text-align: left;">
                  <template slot="title">
                    <img :src="item.imgSrc" alt style="width:20px;margin-right:10px;" />
                    <span>{{ item.oneTitle }}</span>
                  </template>
                  <el-menu-item
                    v-for="(item,index) in item.twoTitle"
                    :key="index"
                    :index="item.path"
                  >{{ item.title }}</el-menu-item>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="item.path" :key="item.path" style="text-align: left;">
                  <img :src="item.imgSrc" alt style="width:20px;margin-right:10px;" />
                  <span slot="title">{{ item.oneTitle }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

  <script>
export default {
  name: 'publicShell',
  data() {
    return {
      // 左侧导航 - 收起 / 关闭
      isCollapse: false,
      // 用户名称
      userNanme: '',
      // 用户头像
      userImg: '',
      // 路由串
      routers: [
        {
          oneTitle: 'pageOne',
          imgSrc: require('../assets/images/yonghu.png'),
          twoTitle: [
            {
              title: 'pageOne-1',
              path: '/corporateUser'
            },
            {
              title: 'pageOne-2',
              path: '/corporateAccount'
            },
            {
              title: 'pageOne-3',
              path: '/personalUser'
            }
          ]
        },
        {
          oneTitle: 'pageTwo',
          imgSrc: require('../assets/images/caifu.png'),
          twoTitle: [
            {
              title: 'pageTwo-1',
              path: '/InventoryEquipment'
            },
            {
              title: 'pageTwo-2',
              path: '/buyEquipment'
            },
            {
              title: 'pageTwo-3',
              path: '/equipmentFailure'
            }
          ]
        },
        {
          oneTitle: 'pageThree',
          imgSrc: require('../assets/images/bangzhu.png'),
          twoTitle: [
            {
              title: 'pageThree-1',
              path: '/videoData'
            },
            {
              title: 'pageThree-2',
              path: '/documentation'
            },
            {
              title: 'pageThree-3',
              path: '/submitFeedback'
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 点击logo / 文字跳转到对应的首页
    jumpHome() {
      this.$router.push('/home')
    },
    // 收起 / 展开 - 左侧导航
    stb() {
      this.isCollapse = !this.isCollapse
    },
    // 个人操作-右上角
    handleCommand(command) {
      // 退出登录
      if (command == 'signOut') {
        localStorage.clear()
        this.$router.push({
          path: '/'
        })
      }
      // 返回首页
      if (command == 'returnHome') {
        this.$router.push({
          path: '/home'
        })
      }
    }
  },
  mounted() {},
  created() {
    this.userNanme = localStorage.getItem('username')
    this.userImg = localStorage.getItem('himg')
  }
}
</script>
  
 <style lang="less" scoped>
.publicShell {
  height: 100%;
  .shell {
    .shell1 {
      height: 60%;
      ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #dddee0;
      }
      ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
      }
    }
    .kgLeft1 {
      width: 200px !important;
      animation: 1s;
    }
    .kgLeft2 {
      width: 65px !important;
      animation: 1s;
    }
    height: 100%;
    .el-header,
    .el-footer {
      text-align: center;
      line-height: 60px;
      height: 60px;
      border-bottom: 1px solid teal;
      .headLeft {
        height: 60px;
        text-align: left;
        .logo {
          display: block;
          width: 40px;
          height: 40px;
          margin-top: 10px;
          cursor: pointer;
          float: left;
        }
        .logoText {
          float: left;
          font-size: 17px;
          font-weight: 600;
          margin: 0 20px;
        }
        .stb {
          font-size: 20px;
          color: #008080;
          cursor: pointer;
          display: inline-block;
          line-height: 62px;
          float:left;
        }
        .v {
          float: left;
          line-height: 66px;
          font-size: 12px;
          color: #ccc;
          margin-left: 20px;
        }
      }
      .headRight {
        text-align: right;
        .sy {
          width: 35px;
          border-radius: 50%;
          vertical-align: middle;
          cursor: pointer;
          margin-right: 20px;
        }
        .personal {
          cursor: pointer;
        }
        .userImg {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          border-radius: 50%;
        }
      }
    }
    .el-aside {
      text-align: center;
      height: 100%;
      border-right: 1px solid #e6e6e6;
      overflow-x: hidden;
      .el-submenu .el-menu-item {
        padding-left: 50px !important;
        text-align: left;
      }
    }

    .el-main {
      color: #333;
      text-align: center;
      padding: 0;
    }
  }
}
</style>
  