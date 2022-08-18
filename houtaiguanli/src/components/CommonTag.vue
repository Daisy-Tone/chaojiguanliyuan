<template>
  <div class="tags">
    <el-tag
        v-for="(tag,index) in tags"
        :key="index"
        :closable="tag.name !== 'home'"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag)"
        size="small"
    >{{tag.label}}</el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'CommonTag',
    data() {
        return {

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    },
    methods:{
        changeMenu(tag){
            this.$router.push({name:tag.name})
        },
        handleClose(tag){
            this.tags.splice(this.tags.indexOf(tag), 1);
        }
    }
}
</script>

<style lang="less" scoped>
.tags{
    margin-top: 20px;
    .el-tag{
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>