<template>
    <Row style="padding: 0 10%">
        <div>
            <Carousel loop autoplay :autoplay-speed="3500" :radius-dot="true" arrow="hover" style="margin-top: 40px">
                <CarouselItem>
                     <img src="@/assets/Carousel1.jpg"  style="width:100%" />
                </CarouselItem>
                <CarouselItem>
                    <img src="@/assets/Carousel2.jpg"  style="width:100%" />
                </CarouselItem>
                <CarouselItem>
                    <img src="@/assets/Carousel3.jpg"  style="width:100%" />
                </CarouselItem>
            </Carousel>
            <Card class="login-box" dis-hover :padding="24" style="margin-right:6%;margin-top:4%;">
                <Tabs value="name1">
                    <TabPane label="密码登录" name="name1">
                        <Form  style="margin-top: 16px" :model="logInModel" :rules="rules" ref="login">
                            <FormItem prop="userName">
                                <Input prefix="md-person" :maxlength="20" max placeholder="请输入账号" size="large" clearable v-model="logInModel.userName"/>
                            </FormItem>
                            <FormItem prop="password">
                                <Input prefix="ios-lock" :maxlength="14" placeholder="请输入密码" size="large" type="password" @on-enter="logIn" v-model="logInModel.password" password/>
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
        <Row type="flex" style="margin-top: 24px" :gutter="24"  v-if="meal">
            <i-col span="6" v-for="index in 4" :key="index">
                <Card v-if="meal[index]">
                    <div class="good">
                        <Tag class="tag" color="orange">店长推荐</Tag>
                        <img
                                :src="`/CoffeeOrderService/api/menu/downloadImg?mealId=${meal[index].mealId}`"
                                alt="coffee-logo2"
                                style="width:60%;height:150px"
                                :onabort="defaultImg"
                                :onerror="defaultImg"
                            />
                        <Row>
                            <div class="title">{{meal[index].mealName}}</div>
                            <div class="desc">{{meal[index].mealDetail}}</div>
                            <span class="price">{{meal[index].price}}元</span>
                        </Row>
                    </div>
                </Card>
            </i-col>
        </Row>
        <Row type="flex" justify="space-between" style="margin-top: 24px; margin-bottom: 24px" :gutter="24">
            <i-col span="6" v-for="index in 4" :key="index">
                <Card v-if="meal[index+4]">
                    <div class="good">
                        <Tag class="tag" color="green">降价促销</Tag>
                       <img
                                :src="`/CoffeeOrderService/api/menu/downloadImg?mealId=${meal[index+4].mealId}`"
                                alt="coffee-logo2"
                                style="width:60%;height:150px"
                                :onabort="defaultImg"
                                :onerror="defaultImg"
                            />
                        <div class="title">{{meal[index+4].mealName}}</div>
                        <div class="desc">{{meal[index+4].mealDetail}}</div>
                        <span class="price">{{meal[index+4].price-4}}元</span>
                        <s class="price" style="color: #c5c8ce;">{{meal[index+4].price}}元</s>
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
                waitForCount: false,
                meal:[],
                defaultImg:
                'this.src="' + require("@/assets/coffee-logo.png") + '"',
            }
        },
        mounted() {
            this.getAllmeal();
        },
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
            },
            getAllmeal() {
                axios
                    .post("/CoffeeOrderService/api/menu/getAllMeal", {})
                    .then(response => {
                        if (response.data.success) {
                            this.meal = response.data.data;
                        } else {
                            this.$Message.error("获取推荐失败");
                        }
                    })
                    .catch(error => {
                        console.error(error.data);
                    });
                },
           
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

.good{
    text-align: center;
}

.good .title{
    font-size: 16px;
    font-weight: 700;
    margin: 8px 0;
}
.good .desc{
    font-size: 14px;
    color: #808695;
}
.good .price{
    font-size: 14px;
    color: #ff6700;
    margin: 8px 0;
}
.good .tag{
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>