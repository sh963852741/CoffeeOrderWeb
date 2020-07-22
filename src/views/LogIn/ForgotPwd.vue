<template>
    <Row type="flex" justify="center" style="margin-top: 15vh">
        <i-col span="5">
            <Card dis-hover>
                <template v-slot:title>
                    <Row style="font-size: 28px; text-align: center">
                        找回密码
                    </Row>
                </template>
                <Row>
                    <Form :model="pwdModel" :rules="rules" ref="pwd" label-position="left" :label-width="75">
                        <FormItem prop="userName" label="用户名">
                            <i-input v-model="pwdModel.userName" placeholder="请输入您的用户名"></i-input>
                        </FormItem>
                        <FormItem prop="mobile" label="手机号">
                            <i-input v-model="pwdModel.telephone" placeholder="请输入您的手机号"></i-input>
                        </FormItem>
                        <FormItem prop="verify" label="验证码">
                            <Row type="flex" justify="space-between">
                                <i-input style="width: 60%" placeholder="4位字母或数字" v-model="pwdModel.code"></i-input>
                                <Button @click="getCode" :disabled="waitForCount">{{codeTip}}</Button>
                            </Row>
                        </FormItem>
                        <FormItem prop="password" :maxlength="14" label="密码" placeholder="请输入密码">
                            <i-input v-model="pwdModel.password" type="password"></i-input>
                        </FormItem>
                        <FormItem prop="checkPwd" :maxlength="14" label="确认密码" placeholder="请输入确认密码">
                            <i-input v-model="pwdModel.checkPwd" type="password"></i-input>
                        </FormItem>
                        <Button type="primary" @click="setPwd" long>更改密码</Button>
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
    data(){
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'));
            } else if (value !== this.pwdModel.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };
        return{
            rules: {
                ...rules.forgotPwd,
                checkPwd: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ]
            },
            pwdModel: {},
            count: 0,
            waitForCount: false,
            codeTip: "获取验证码"
        }
    },
    methods: {
        getCode() {
            this.waitForCount = true;
            this.count = 60;
            let countDown = setInterval(() => {
                if(this.count < 1) {
                    this.waitForCount = false;
                    this.codeTip = "获取验证码"
                    clearInterval(countDown);
                } else {
                    this.codeTip = this.count-- + 's后重发';
                }
            }, 1000);
            axios.post("/CoffeeOrderService/api/usermanage/getVerificationCode", {userName: this.pwdModel.userName, telephone: this.pwdModel.telephone})
            .then(response => {
                if(response.data.success){
                    this.$Message.info("验证码已发送，请注意查收");
                    this.pwdModel.code = response.data.VerificationCode;
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
            });
        },
        setPwd(){
            axios.post("/CoffeeOrderService/api/usermanage/retrievePassword", {code: this.pwdModel.code, password: sha1(this.pwdModel.password)})
            .then(response => {
                if(response.data.success){
                    this.$Message.success("密码已更改");
                    setTimeout(()=>{
                        window.history.go(-1);
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
            });
        }
    }
}
</script>

<style>

</style>