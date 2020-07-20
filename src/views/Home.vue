<template>
    <Row style="padding: 0 10%">
        <div>
            <Carousel loop autoplay :autoplay-speed="3500" :radius-dot="true" arrow="hover" style="margin-top: 40px">
                <CarouselItem>
                    <div class="carousel-pic">1</div>
                </CarouselItem>
                <CarouselItem>
                    <div class="carousel-pic">1</div>
                </CarouselItem>
                <CarouselItem>
                    <div class="carousel-pic">1</div>
                </CarouselItem>
            </Carousel>
            <Card class="login-box" dis-hover :padding="24">
                <Tabs value="name1">
                    <TabPane label="密码登录" name="name1">
                        <Form  style="margin-top: 16px" :model="logInModel" :rules="rules" ref="login">
                            <FormItem prop="userName">
                                <Input prefix="md-person" placeholder="请输入账号" size="large" clearable v-model="logInModel.userName"/>
                            </FormItem>
                            <FormItem prop="password">
                                <Input prefix="ios-lock" placeholder="请输入密码" size="large" type="password" @on-enter="logIn" v-model="logInModel.password" password/>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" long  size="large" keypress.enter.native ref="loginbutton" :loading="loading" @click="logIn">登录</Button>
                                <Checkbox v-model="logInModel.rememberPwd" size="small">下次自动登录</Checkbox>
                            </FormItem>
                             <Row type="flex" justify="center" align="middle">
                                <Button size="small" type="text" :to="{name: 'Regist'}">注册用户</Button>
                                <Divider type="vertical" />
                                <Button size="small" type="text" :to="{name: 'ForgotPwd'}">忘记密码</Button>
                            </Row>
                        </Form>
                    </TabPane>
                    <TabPane label="短信登录" name="name2">
                        <Form style="margin-top: 16px" :model="logInByMobileModel" :rules="rules2" ref="logInByMobile">
                            <FormItem prop="phoneNumber">
                                <Input prefix="ios-phone-portrait" placeholder="请输入手机号" size="large" clearable v-model="logInByMobileModel.phoneNumber"/>
                            </FormItem>
                            <FormItem prop="verificationCode">
                                <Row type="flex" justify="space-between">
                                <i-input prefix="md-keypad" style="width: 60%" placeholder="请输入验证码" size="large" v-model="logInByMobileModel.verificationCode">
                                    <template v-slot:prepend>
                                        <Icon type="md-keypad"/>
                                    </template>
                                </i-input>
                                <Button size="large" :disabled="waitForCount" @click="getVerificationCode">{{codeTip}}</Button>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" long  size="large" keypress.enter.native  :loading="loading" @click="logInByMobile1">登录</Button>
                            </FormItem>
                             <Row type="flex" justify="center" align="middle">
                                <Button size="small" type="text">注册用户</Button>
                            </Row>
                        </Form>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
        <Row type="flex" justify="space-between" style="margin-top: 24px">
            <i-col span="4" v-for="index in 4" :key="index">
                <Card>
                    <div>
                        <img src="../assets/coffee-logo.png" alt="coffee-logo2" width="100%"/>
                        <h2>新品推送</h2>
                    </div>
                </Card>
            </i-col>
        </Row>
        <Row type="flex" justify="space-between" style="margin-top: 24px; margin-bottom: 24px">
            <i-col span="4" v-for="index in 4" :key="index">
                <Card>
                    <div>
                        <img src="../assets/coffee-logo.png" alt="coffee-logo2" width="100%"/>
                        <h2>新品推送</h2>
                    </div>
                </Card>
            </i-col>
        </Row>
    </Row>
</template>


<script>
import rules from "@/common/formRule.js"
const sha1 = require('sha1');
const axios = require("axios");
import app from "@/common/app.js"
    export default {
        data () {
            return {
                logInModel: {
                    userName:"",
                    password:"",
                    rememberPwd: false
                },
                logInByMobileModel:{
                    phoneNumber:"",
                    verificationCode:""
                },
                rules: rules.login,
                rules2: rules.loginByMobile,
                loading: false,
                count: 0,
                codeTip: "获取验证码",
                waitForCount: false
            }
        },
        mounted() {},
        created() {
            if(app.loginSettings.rememberPwd){
                this.logInModel = app.loginSettings;
            }
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
                                    this.$router.push({name: "OrderMenu"});
                                }, 1500);
                            } else {
                                this.loading=false;
                                this.$Message.error(response.data.msg);
                            }
                        })
                        .catch(error => {
                            this.loading=false;
                            console.log(error);
                        });
                    } else {
                        console.log(valid)
                    }
                });
            },
            logInByMobile1(){
                this.$refs["logInByMobile"].validateField('verificationCode',valid => {
                    if (valid==='') {
                        this.loading=true;
                        axios.post("/CoffeeOrderService/api/usermanage/loginByMobile", {code: this.logInByMobileModel.verificationCode})
                        .then(response => {
                            if(response.data.success){
                                this.$Message.success("登录成功");
                                setTimeout(()=>{
                                    this.$router.push({name: "OrderMenu"});
                                }, 1500);
                            } else {
                                this.loading=false;
                                this.$Message.error(response.data.msg);
                            }
                        })
                        .catch(error => {
                            this.loading=false;
                            console.log(error);
                        });
                    } else {
                        console.log(valid)
                    }
                });
            },
            getVerificationCode(){
                this.$refs["logInByMobile"].validateField('phoneNumber',valid => {
                    if(!valid) {
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
                        axios.post("/CoffeeOrderService/api/usermanage/getVerificationCode", {telephone: this.logInByMobileModel.phoneNumber})
                        .then(response => {
                            if(response.data.success){
                                this.logInByMobileModel.verificationCode = response.data.VerificationCode;
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

<style scoped>
.login-box{
    position: absolute;
    top: 75px;
    right: 200px;
    width:350px;
}
.carousel-pic{
    background: cornflowerblue;
    height: 436px;
    width: 100%;
}
</style>