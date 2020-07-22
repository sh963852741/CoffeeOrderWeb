<template>
    <Card title="用户详情">
        <Row>
            <Button  @click="back">
                <Icon type="ios-arrow-back" />返回
            </Button>
            <Divider type="vertical" />
            <Button type="primary" @click="saveUserInfo">保存</Button>
        </Row>
        <Divider />
        <Row>
            <i-col span="6" offset="9">
                <Form :model="userInfo" label-position="left" :label-width="80">
                    <FormItem label="用户名">
                        <i-input v-model="userInfo.userName"></i-input>
                    </FormItem >
                    <FormItem label="密码">
                        <Button v-if="isSelf" >进入个人中心</Button>
                        <Button v-else @click="showModal = true">设置新密码</Button>
                    </FormItem >
                    <FormItem label="电话">
                        <i-input v-model="userInfo.telephone"></i-input>
                    </FormItem >
                    <FormItem label="电子邮箱">
                        <i-input v-model="userInfo.email"></i-input>
                    </FormItem >
                    <FormItem label="角色">
                         <i-select v-model="userInfo.role" multiple>
                            <i-option v-for="(item, index) in role" v-bind:key="index" :value="item.roleId">{{item.roleName}}</i-option>
                         </i-select>
                    </FormItem >
                    <FormItem >
                        <Button type="primary" @click="saveUserInfo">保存</Button>
                    </FormItem >
                </Form>
            </i-col>
        </Row>
        <Modal v-if="isSelf" v-model="showModal" @on-ok="changePassword">

        </Modal>
        <Modal v-else v-model="showModal" @on-ok="setPassword" >
            <br>
            <Form label-position="left" :label-width="75" :model="modalData">
                <FormItem label="新密码" prop="password">
                    <Input v-model="modalData.newPassword" placeholder="请输入新密码" />
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
const axios = require("axios");
const sha1 = require('sha1');
export default {
    data(){
        return {
            userInfo: {} ,
            role:[] ,
            isSelf: !this.$route.query.userId,
            showModal: false,
            modalData: {}
        }
    },
    created() {
        this.userInfo.userId = this.$route.query.userId;
    },
    mounted(){
        this.getUserDetails();
        this.getRolelist();
    },
    methods:{
        getUserDetails() {
            axios.post("/CoffeeOrderService/api/usermanage/getUserInfo", {userId: this.userInfo.userId})
            .then(response=>{
                this.userInfo = response.data;
            })
            .catch(error=>{
                console.log(error);
            });
        },
        saveUserInfo() {
            axios.post("/CoffeeOrderService/api/usermanage/setUserInfo", {userId: this.userInfo.userId,
                userName: this.userInfo.userName,
                telephone: this.userInfo.telephone,
                email: this.userInfo.email,
                roles: this.userInfo.role
             })
            .then(response => {
                if(response.data.success){
                    this.$Message.success("保存成功");
                }
                else{
                    this.$Message.error("保存失败");
                }
            })
            .catch(error => {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    if (error.response.status >= 400 && error.response.status < 600)
                        this.$Message.error(error.message);
                    else 
                        this.$Message.warning(error.message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    this.$Message.error("无法发送请求")
                }
            });
        },
        back() {
            this.$router.go(-1);
        },
        getRolelist(){
            axios.post("/CoffeeOrderService/api/usermanage/getRoleList", {})
            .then(response => {
                this.role = response.data.roleObj;
            })
            .catch(error=>{
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
        setPassword(){
            axios.post("/CoffeeOrderService/api/usermanage/setPassword", {userId: this.userInfo.userId, password: sha1(this.modalData.newPassword)})
            .then(response => {
                if(response.data.success){
                    let pwd = this.modalData.newPassword;
                    this.$Modal.success({
                        title: "成功修改密码",
                        content: `请将新密码<strong>&nbsp;${pwd}&nbsp;</strong>告知用户！`
                    });
                } else {
                    this.$Message.error(response.data.msg);
                }
            })
            .catch(error=>{
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
        changePassword() {
            this.$Message.info('功能正在开发中');
        }
    }
}
</script>

<style>
    #backbutton{
        margin-top: -4px;

    }


</style>