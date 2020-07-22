<template>
    <Row type="flex" justify="center" style="margin-top: 15vh">
        <i-col span="5">
            <Card dis-hover>
                <template v-slot:title>
                    <Row style="font-size: 28px; text-align: center">
                        用户登录
                    </Row>
                </template>
                <Row>
                    <Form :model="logInModel" :rules="rules" ref="login">
                        <FormItem prop="userName"  label="用户名">
                            <i-input v-model="logInModel.userName" :maxlength="20" placeholder="请输入您的用户名" size="large"></i-input>
                        </FormItem>
                        <FormItem prop="password" label="密码">
                            <i-input v-model="logInModel.password" :maxlength="14" placeholder="请输入您的密码" size="large" @on-enter="logIn" type="password" password></i-input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="logIn" :loading="loading" size="large" long>登录后台</Button>
                            <Checkbox v-model="logInModel.rememberPwd" size="small">下次自动登录</Checkbox>
                        </FormItem>
                    </Form>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Button size="small" type="text" :to="{name: 'Regist'}">注册账号</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="text" :to="{name: 'Home'}">切换前台</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="text" :to="{name: 'ForgotPwd'}">找回密码</Button>
                </Row>
            </Card>
        </i-col>
    </Row>
</template>

<script>
import rules from "@/common/formRule.js"
import app from "@/common/app.js"
const axios = require("axios");
const sha1 = require('sha1');
export default {
    data() {
        return {
            logInModel: {
                rememberPwd: false
            },
            rules: rules.login,
            loading: false
        };
    },
    created() {
        if(app.loginSettings.rememberPwd){
            this.logInModel = app.loginSettings;
        }
    },
    mounted() {
        
    },
    methods: {
        logIn() {
            this.$refs["login"].validate((valid) => {
                if (valid) {
                    this.loading=true;
                    axios.post("/CoffeeOrderService/api/usermanage/login", {userName: this.logInModel.userName, password: sha1(this.logInModel.password)})
                    .then(response => {
                        if(response.data.success){
                            this.$Message.success("登录成功");
                            localStorage.setItem("loginSettings", JSON.stringify(this.logInModel));
                            setTimeout(()=>{
                                this.$router.push({name: "UserList"});
                            }, 1500);
                        } else {
                            this.$Message.error(response.data.msg);
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            this.$Message.error(error.message);
                        } else {
                            this.$Message.error("无法发送请求");
                        }
                    })
                    .finally(() => {
                        this.loading=false;
                    })
                } else {
                    console.log(valid)
                }
            });
        }
    }
}
</script>

<style>

</style>