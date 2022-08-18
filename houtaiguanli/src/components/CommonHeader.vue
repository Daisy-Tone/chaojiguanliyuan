<template>
  <header>
    <div class="l-content">
        <el-button @click="handleMenu" plain size="mini" icon="el-icon-menu"></el-button>
        <!-- <h3 style="color:#fff">首页</h3> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
            v-for="item in tags"
            :key="item.path"
            :to="{ path: item.path }">
            {{item.label}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown trigger="click" szie="mini">
            <span>
                <img class="avatar" :src="userImg" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            userImg:require('@/assets/images/avatar.jpg')
        }
    },
    methods:{
        handleMenu(){
            this.$store.commit('tab/collapseMenu')
        },
        logout(){
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            this.$router.push('/login')
        }
    },
    computed:{
        ...mapState(
            // ['tabtabsList']
            {
                tags:state => state.tab.tabsList
            }
        )
    }
}
</script>

<style lang="less" scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .l-content{
        display: flex;
        align-items: center;
        .el-button{
            margin-right: 20px;
        }
        /deep/.el-breadcrumb__inner{
            color: white;
        }
    }
    .r-content{
        .avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid rgb(99, 99, 99);
        }
    }
}
</style>