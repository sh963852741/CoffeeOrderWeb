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
                        <i-input v-model="userInfo.password"></i-input>
                    </FormItem >
                    <FormItem label="电话">
                        <i-input v-model="userInfo.telephone"></i-input>
                    </FormItem >
                    <FormItem label="电子邮箱">
                        <i-input v-model="userInfo.email"></i-input>
                    </FormItem >
                    <FormItem label="角色">
                         <i-select v-model="userInfo.role" multiple>
                            <i-option v-for="(item,index) in role" v-bind:key="index" :value="item">{{item}}</i-option>
                         </i-select>
                    </FormItem >
                    <FormItem >
                        <Button type="primary" @click="saveUserInfo">保存</Button>
                    </FormItem >
                </Form>
            </i-col>
        </Row>
    </Card>
</template>

<script>
const axios=require("axios");
export default {
    data(){
        return {
            userInfo: {},
            role:[]
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
            axios.post("/api/usermanage/getUserInfo", {userId: this.userInfo.userId})
            .then(response=>{
                this.userInfo = response.data;
            })
            .catch(error=>{
                console.log(error);
            });
        },
        saveUserInfo() {
            axios.post("/api/usermanage/setUserInfo", {userId: this.userInfo.userId,
                 userName:this.userInfo.userName,
                 telephone:this.userInfo.telephone,
                 email:this.userInfo.email,
                 password:this.userInfo.password,
                 roles:this.userInfo.role
             })
            .then(response => {
                if(response.data.success){
                    this.$Message.success("保存成功");
                }
                else{
                    this.$Message.error("保存失败");
                }
                console.log(response);
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
            axios.post("/api/usermanage/getRoleList",{})
            .then(response=>{
                this.role=response.data.roles;
                console.log(response.data);
                console.log(this.role)
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
        }
    }
}
</script>

<style>
    #backbutton{
        margin-top: -4px;

    }


</style>