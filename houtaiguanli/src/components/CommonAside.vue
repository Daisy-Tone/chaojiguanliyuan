<template>
<!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <span slot="title">分组一</span>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <span slot="title">导航三</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
  </el-menu-item>
</el-menu> -->
    <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
          <!-- 单级菜单 -->
            <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.path" :index="item.path">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <!-- 多级菜单 -->
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
                <template slot="title">
                  <i :class="'el-icon-' + item.icon"></i>
                  <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path" >
                  <el-menu-item @click="clickMenu(subItem)" :index="subIndex+''">{{subItem.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
    </el-row>
</template>

<script>
// import { mapState } from 'vuex'
//#region 
//   export default {
//     data() {
//       return {
//         isCollapse: false
//       };
//     },
//     methods: {
//       handleOpen(key, keyPath) {
//         console.log(key, keyPath);
//       },
//       handleClose(key, keyPath) {
//         console.log(key, keyPath);
//       }
//     }
//   }
//#endregion
  export default {
    data() {
        return {
          menu:[
              // {
              //     path:'/home',
              //     name:'home',
              //     label:'首页',
              //     icon:'s-home',
              //     url:'Home/Home'
              // },
              // {
              //     path:'/mall',
              //     name:'mall',
              //     label:'商品管理',
              //     icon:'video-play',
              //     url:'MallManage/MallManage'
              // },
              // {
              //     path:'/user',
              //     name:'user',
              //     label:'用户管理',
              //     icon:'user',
              //     url:'UserManage/UserManage'
              // },
              // {
              //     label:'其他',
              //     icon:'location',
              //     children:[
              //       {
              //           path:'/page1',
              //           name:'page1',
              //           label:'页面1',
              //           icon:'setting',
              //           url:'Other/pageOne'
              //       },
              //       {
              //           path:'/page2',
              //           name:'page2',
              //           label:'页面2',
              //           icon:'setting',
              //           url:'Other/pageTwo'
              //       },
              //     ]
              // },
          ]
        }
    },
    computed:{
        // 判断该导航栏下没有子菜单
        noChildren(){
            // return this.menu.filter(item => !item.children)
            return this.asyncMenu.filter(item => !item.children)
        },
        // 判断该导航栏下有子菜单
        hasChildren(){
            // return this.menu.filter(item => item.children)
            return this.asyncMenu.filter(item => item.children)
        },
        // 是否折叠菜单栏
        isCollapse(){
          return this.$store.state.tab.isCollapse
        },
        asyncMenu(){
          return this.$store.state.tab.menu
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 路由跳转
      clickMenu(item){
        this.$router.push({
          name:item.name
        })
        this.$store.commit('selectMenu',item)
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100vh;
  }
  .el-menu--collapse{
    height: 100vh;
  }
  .el-row{
    height: 100%;
    .el-col{
      height: 100%;
      border: none;
      h3{
        color: white;
        text-align: center;
        margin: 10px 0;
      }
    }
  }
</style>