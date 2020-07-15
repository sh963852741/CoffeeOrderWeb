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
                        <FormItem prop="userName" label="用户名">
                            <i-input v-model="logInModel.userName" placeholder="请输入您的用户名"></i-input>
                        </FormItem>
                        <FormItem prop="password" label="密码">
                            <i-input v-model="logInModel.password" placeholder="请输入您的密码" type="password" password></i-input>
                        </FormItem>
                        <FormItem>
                            <Row type="flex" justify="center"> 
                                <Button type="primary" @click="logIn">登录后台</Button>
                            </Row> 
                        </FormItem>
                    </Form>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Button size="small" type="text" :to="{name: 'Regist'}">注册账号</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="text">切换前台</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="text">找回密码</Button>
                </Row>
            </Card>
        </i-col>
    </Row>
</template>

<script>
import rules from "@/common/formRule.js"
const axios = require("axios");
const sha1 = require('sha1');
export default {
    data() {
        return {
            logInModel: {},
            rules: rules.login
        };
    },
    mounted() {
        
    },
    methods: {
        logIn() {
            this.$refs["login"].validate((valid) => {
                if (valid) {
                    axios.post("/CoffeeOrderService/api/usermanage/login", {userName: this.logInModel.userName, password: sha1(this.logInModel.password)})
                    .then(response => {
                        if(response.data.success){
                            this.$Message.success("登录成功");
                            setTimeout(()=>{
                                this.$router.push({name: "UserList"});
                            }, 1500);
                        } else {
                            this.$Message.error(response.data.msg);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
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