<template>
    <Card title="用户列表信息">
        <Row type="flex" :gutter="16">
            <i-col>
                <Button type="primary" @click="modal = true">新建用户</Button>
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
                    <i-button type="error" @click="delUser(props.row)">删除</i-button>
                </template>
            </i-table>    
        </Row>
        <Modal v-model="modal" title="新建用户" loading @on-ok="asyncSubmit" ok-text="新建">
            <Form :model="userInfo" label-position="left" :label-width="80">
                <FormItem label="用户名">
                    <i-input v-model="userInfo.userName"></i-input>
                </FormItem >
                <FormItem label="密码">
                    <i-input v-model="userInfo.password"></i-input>
                </FormItem >
                <FormItem label="电话">
                    <i-input v-model="userInfo.telephone"></i-input>
                </FormItem >
                <FormItem label="电子邮箱">
                    <i-input v-model="userInfo.email"></i-input>
                </FormItem >
            </Form>
        </Modal>
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
            data: [],
            userInfo: {},
            modal: false
        }
    },
    mounted(){
       this.getUserlist();
    },
    methods:{
        getUserlist() {
            axios.post("/CoffeeOrderService/api/usermanage/getUserList", {})
            .then(response => {
                if(response.data.success) {
                    this.data = response.data.data;
                    this.userlist = this.data;
                } else {
                    this.$Message.warning(response.data.msg || "未知错误");
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status >= 400 && error.response.status < 600)
                        this.$Message.error(error.message);
                    else 
                        this.$Message.warning(error.message);
                } else {
                    this.$Message.error("无法发送请求");
                }
            });
        },
        toDetail(row) {
            this.$router.push({name:"UserDetail", query:{userId: row.userId}});
        },
        searchUser(condition) {
            this.userlist = this.data.filter(e => e.userName.indexOf(condition) !== -1 );
        },
        delUser(row) {
            axios.post("/CoffeeOrderService/api/usermanage/deleteUser", {userId: row.userId})
            .then(response => {
                if(response.data.success) 
                {
                    this.$Message.success("删除成功");
                    this.getUserlist;
                } else {
                    this.$Message.warning(response.data.msg);
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status >= 400 && error.response.status < 600)
                        this.$Message.error(error.message);
                    else 
                        this.$Message.warning(error.message);
                } else {
                    this.$Message.error("无法发送请求");
                }
            });
        },
        asyncSubmit() {
            axios.post("/CoffeeOrderService/api/usermanage/regist", {...this.userInfo})
            .then(response => {
                if(response.data.success) {
                    this.$Message.success("新建成功");
                    this.getUserlist();
                } else {
                    this.$Message.warning(response.data.msg);
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status >= 400 && error.response.status < 600)
                        this.$Message.error(error.message);
                    else 
                        this.$Message.warning(error.message);
                } else {
                    this.$Message.error("无法发送请求");
                }
            })
            .finally(() => {
                this.modal = false;
            });
        }
       
    }
}
</script>

<style>
</style>