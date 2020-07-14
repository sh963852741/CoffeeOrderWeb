<template>
    <Row type="flex" justify="center" style="margin-top: 15vh">
        <i-col span="5">
            <Card dis-hover>
                <template v-slot:title>
                    <Row style="font-size: 28px; text-align: center">
                        欢迎注册
                    </Row>
                </template>
                <Row>
                    <Form :model="registModel" ref="regist" :rules="rules">
                        <FormItem prop="userName" :maxlength="20" label="用户名">
                            <i-input v-model="registModel.userName"></i-input>
                        </FormItem>
                        <FormItem prop="password" :maxlength="14" label="密码">
                            <i-input v-model="registModel.password" type="password"></i-input>
                        </FormItem>
                        <FormItem prop="checkPwd" :maxlength="14" label="确认密码">
                            <i-input v-model="registModel.checkPwd" type="password"></i-input>
                        </FormItem>
                        <FormItem prop="telephone" label="电话号码">
                            <i-input v-model="registModel.telephone" type="tel"></i-input>
                        </FormItem>
                        <FormItem prop="email" label="邮箱">
                            <i-input v-model="registModel.email" type="email"></i-input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="regist">注册用户</Button>
                            <Button type="text" size="small" :to="{name: 'LogIn'}">登录页面</Button>
                        </FormItem>
                    </Form>
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
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'));
            } else if (value !== this.registModel.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };
        return{
            registModel: {},
            rules: {
                ...rules.regist,
                checkPwd: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
            },
            
        }
    },
    methods: {
        regist() {
            this.$refs["regist"].validate((valid) => {
                if (valid) {
                    axios.post("/CoffeeOrderService/api/usermanage/regist", {...this.registModel, password: sha1(this.registModel.password)})
                    .then(response => {
                        if(response.data.success){
                            this.$Message.success("注册成功，跳转至登录页面. . .");
                            setTimeout(()=>{
                                this.$router.push({name: "LogIn"});
                            }, 1500);
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
                } else {
                    console.log(valid)
                }
            })
        }
    }
}
</script>

<style>

</style>