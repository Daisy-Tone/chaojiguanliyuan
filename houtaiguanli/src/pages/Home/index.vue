<template>
  <el-row class="home">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img class="avatar" :src="userImg">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <div class="login-info">
          <p>上次登录时间:<span>2021-7-19</span></p>
          <p>上次登录地点:<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px;height:420px">
        <el-table :data="tableData" max-height="380">
          <el-table-column
            v-for="(val,key) in tableLabel" 
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top:20px;" :span="16">
      <div class="num">
        <el-card
        v-for="item in countData"
        :key="item.name"
        :body-style="{display:'flex'}"
        >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="name">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card class="line-chart" style="height:200px" shadow="hover">
        <!-- <div style="height:200px" ref="echarts"></div> -->
        <Echart :chartData="echartData.order" style="height:200px"/>
      </el-card>
      <div class="graph">
        <el-card style="height:260px" shadow="hover">
          <!-- <div style="height:240px" ref="userEcharts"></div> -->
          <Echart :chartData="echartData.user" style="height:240px"/>
        </el-card>
        <el-card style="height:260px" shadow="hover">
          <!-- <div style="height:240px" ref="videoEcharts"></div> -->
          <Echart :chartData="echartData.video" :isAxisChart="false" style="height:240px"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api/data.js'
// import *as echarts from 'echarts'
import Echart from '../../components/Echarts.vue'
export default {
    name:'Home',
    components:{Echart},
    data() {
        return {
            userImg:require('@/assets/images/avatar.jpg'),
            tableData:[],
            tableLabel:{
              name:'课程',
              todayBuy:'今日购买',
              monthBuy:'本月购买',
              totalBuy:'总共购买'
            },
            countData:[
              {
                name:'今日支付订单',
                value:1234,
                icon:'success',
                color:'#2ec7c9'
              },
              {
                name:'今日收藏订单',
                value:210,
                icon:'star-on',
                color:'#ffb980'
              },
              {
                name:'今日未支付订单',
                value:1234,
                icon:'s-goods',
                color:'#5ab1ef'
              },
              {
                name:'本月支付订单',
                value:1234,
                icon:'success',
                color:'#2ec7c9'
              },
              {
                name:'本月收藏订单',
                value:210,
                icon:'star-on',
                color:'#ffb980'
              },
              {
                name:'本月未支付订单',
                value:1234,
                icon:'s-goods',
                color:'#5ab1ef'
              },
            ],
            echartData:{
              order:{
                xData:[],
                series:[]
              },
              user:{
                xData:[],
                series:[]
              },
              video:{
                series:[]
              }
            }
        }
    },
    mounted(){
      getData().then(
      response => {
        // 请求成功后
        const { code,data } = response.data
        if(code === 20000){
          this.tableData = data.tableData

          const order = data.orderData
          // x轴标识
          const xData = order.date
          // 图例数据
          const keyArray = Object.keys(order.data[0])
          const series = []
          keyArray.forEach(key => {
            series.push({
              name:key,
              data:order.data.map(item => item[key]),
              type:'line'
            })
          })
          // 折线图
          this.echartData.order.xData = xData
          this.echartData.order.series = series
          // const option = {
          //   xAxis:{
          //     data:xData
          //   },
          //   yAxis:{},
          //   legend:{
          //     data:keyArray
          //   },
          //   series
          // }
          // const E = echarts.init(this.$refs.echarts)
          // E.setOption(option)

          // 柱状图 用户配置
          this.echartData.user.xData = data.userData.map(item => item.date)
          this.echartData.user.series = 
          [
            {
              name:'新增用户',
              data:data.userData.map(item => item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.userData.map(item => item.active),
              type:'bar'
            }
          ]
          // const userOption = {
          //   legend:{
          //     // 图例文字颜色
          //     textStyle:{
          //       color:'#333'
          //     }
          //   },
          //   grid:{
          //     left:'20%'
          //   },
          //   // 提示框
          //   tooltip:{
          //     trigger:'axis'
          //   },
          //   xAxis:{
          //     type:'category',  //类目轴
          //     data:data.userData.map(item => item.date),
          //     axisLine:{
          //       color:'#17b3a3'
          //     },
          //     axisLabel:{
          //       interval:0,
          //       color:'#333'
          //     }
          //   },
          //   yAxis:[
          //     {
          //       type:'value',
          //       axisLine:{
          //         lineStyle:{
          //           color:'#17b3a3'
          //         }
          //       }
          //     }
          //   ],
          //   color:['#2ec7c9','#b6a2de'],
          //   series:[
          //     {
          //       name:'新增用户',
          //       data:data.userData.map(item => item.new),
          //       type:'bar'
          //     },
          //     {
          //       name:'活跃用户',
          //       data:data.userData.map(item => item.active),
          //       type:'bar'
          //     }
          //   ]
          // }
          // const U = echarts.init(this.$refs.userEcharts)
          // U.setOption(userOption)

          // 饼图
          this.echartData.video.series = [
            {
              data:data.videoData,
              type:'pie'
            },
          ]
          // const videoOption = {
          //   tooltip:{
          //     trigger:'item'
          //   },
          //   color:[
          //     '#0f78f4',
          //     '#dd536b',
          //     '#9462e5',
          //     '#a6a6a6',
          //     '#e1bb22',
          //     '#39c362',
          //     '#3ed1cf',
          //   ],
          //   series:[
          //     {
          //       data:data.videoData,
          //       type:'pie'
          //     },
          //   ],
          // }
          // const V = echarts.init(this.$refs.videoEcharts)
          // V.setOption(videoOption)
        }
        console.log(response)
      },
      error => {
        // 请求失败后更新List数据
        
      })
    }
}
</script>

<style lang="less" scoped>
.user{
  display: flex;
  .avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .userInfo{
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name{
      font-size: 24px;
    }
    .access{
      color: #ccc;
    }
  }
}
.login-info{
  font-size: 12px;
  color: #bbb;
  span{
    margin-left: 50px;
    color: rgb(106, 106, 106);
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  width: 96%;
  margin: auto;
  // justify-content: space-around;
  .el-card{
    width: 30.3%;
    margin-right: 3%;
    margin-bottom: 15px;
    /deep/ .el-card__body{
      padding: 10px;
    }
    i{
      width: 50px;
      height: 50px;
      border-radius: 4px;
      text-align: center;
      line-height: 50px;
    }
    .icon{
      color: white;
      font-size: 24px;
    }
    .detail{
      margin-left: 10px;
      .num{
        font-weight: 600;
        font-size: 20px;
      }
      .name{
        color: #bbb;
        font-size: 12px;
        margin-top: 6px;
      }
    }
  }
}
.line-chart{
  width: 96%;
  margin: auto;
}
.graph{
  width: 96%;
  margin: auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 49%;
  }
}


</style>