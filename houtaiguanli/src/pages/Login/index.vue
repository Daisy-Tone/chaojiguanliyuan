<template>
<div>
    <!-- <common-form
        :formLabel='loginFormLabel'
        :form="loginForm"
        :rules='rules'
        ref="form"
    ></common-form> -->
    <!-- <el-card> -->
        <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="form"
            label-width="100px"
            class="login-container"
        >
            <h3>系统登录</h3>
            <el-form-item
                label="用户名"
                label-width="80px"
                prop="username"
                class="username"
            >
                <el-input
                    type="input"
                    v-model="form.username"
                    auto-complete="off"
                    placeholder="请输入账号"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="密码"
                label-width="80px"
                prop="password"
            >
                <el-input
                    type="password"
                    v-model="form.password"
                    auto-complete="off"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login" class="loginSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    <!-- </el-card> -->
    
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import Mock from 'mockjs'
import {getMenu} from '../../api/data'

export default {
    name:'login',
    components:{ CommonForm },
    data() {
        return {
            loginFormLabel:[
                {
                    model:'account',
                    label:'用户名',
                    type:'input'
                },
                {
                    model:'password',
                    label:'密码',
                    type:'input'
                }
            ],
            loginForm:{
                account:'',
                password:''
            },
            form:{
                account:'',
                password:''
            },
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:3,message:'用户名长度不能小于3位',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:3,message:'用户名长度不能小于3位',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        login(){
            getMenu(this.form).then(
                ({data:response}) => {
                    // 请求成功后
                    if(response.code === 20000){
                        this.$store.commit('clearMenu')
                        this.$store.commit('setMenu',response.data.menu)
                        this.$store.commit('setToken',response.data.token)
                        this.$store.commit('addMenu',this.$router)
                        this.$router.push({name:'home'})
                    }
                    else{
                        this.$message.warning(response.data.message)
                    }
                },
            )
            // const token = Mock.Random.guid()
            // this.$store.commit('setToken',token)
            // this.$router.push({name:'home'})
        }
    }
}
</script>

<style lang="less" scoped>
    // .el-card{
    //     text-align: center;
    //     position: absolute;
    //     width: 400px;
    //     height: 300px;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50% , -50%);
    //     h3{
    //         text-align: center;
    //         margin-bottom: 20px;
    //     }
    // }
    .login-container{
        width: 350px;
        border-radius: 15px;
        background-clip: padding-box;
        padding: 35px 35px 15px 35px;
        background-color: white;
        border:1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    h3{
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .loginSubmit{
        margin: 10px auto 0 auto;
    }
</style>