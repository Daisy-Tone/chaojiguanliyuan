import axios from "./axios";

// 根据使用者身份(管理员/用户)显示不同内容
export const getMenu = (params) => {
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:params
    })
}

export const getData = () => {
    return axios.request({
        url:'/home/getData'
    })
}

export const getUser = (params) => {
    return axios.request({
        url:'/user/getUser',
        method:'get',
        params
    })
}

export const deleteUser = (params) => {
    return axios.request({
        url:'/user/getUser',
        method:'get',
        params
    })
}