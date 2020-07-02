<template>
    <Card title="用户列表信息">
        <Row type="flex" :gutter="16">
            <i-col>
                <Button type="primary">新建用户</Button>
            </i-col>
            <i-col>
                <i-input placeholder="请输入用户名进行搜索" search enter-button @on-search="searchUser"></i-input>
            </i-col>
        </Row>
        <Divider />
        <Row>
            <i-table stripe :columns="columns" :data="userlist">
                <template v-slot:action="props">
                    <i-button type="primary" @click="toDetail(props.row)">详情</i-button>
                    &nbsp;
                    <i-button type="error">删除</i-button>
                </template>
            </i-table>    
        </Row>
    </Card>
</template>

<script>
const axios = require("axios");
export default {
    data(){
        return{
            columns: [
                {
                    title:"用户名",
                    key:"userName"
                },
                {
                    title:"电话",
                    key:"telephone"
                },
                {
                    title:"邮箱",
                    key:"email"
                },
                {
                    title: '操作',
                    slot: 'action'
                }
            ],
            userlist: [],
            data: []
        }
    },
    mounted(){
       this.getUserlist();
    },
    methods:{
        getUserlist() {
           axios.post("/api/usermanage/getUserList", {})
           .then(response=>{
               this.data = response.data;
               this.userlist = this.data;
           })
           .catch(error=>{
               console.error(error);
           });
        },
        toDetail(row) {
            this.$router.push({name:"UserDetail", query:{userId: row.userId}});
        },
        searchUser(condition) {
            this.userlist = this.data.filter(e => e.userName.indexOf(condition) !== -1 );
        }
    }
}
</script>

<style>
</style>