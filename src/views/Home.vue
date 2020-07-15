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
                <Form style="margin-top: 16px">
                    <FormItem>
                        <Input prefix="md-person" placeholder="手机号/账号" size="large" clearable v-model="logInModel.userName"/>
                    </FormItem>
                    <FormItem>
                        <Input prefix="ios-lock" placeholder="密码" size="large" type="password" v-model="logInModel.password" password/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" long @click="logIn" size="large">登录</Button>
                        <Checkbox :value="false" size="small">下次自动登录</Checkbox>
                    </FormItem>
                </Form>
                <Row type="flex" justify="center" align="middle">
                    <Button size="small" type="text">注册用户</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="text">忘记密码</Button>
                </Row>
            </Card>
        </div>
        <Row type="flex" justify="space-between" style="margin-top: 24px">
            <i-col span="4" v-for="index in 4" :key="index">
                <Card>
                    <div>
                        <img src="../assets/coffee-logo.png" alt="coffee-logo2"/>
                        <h2>新品推送</h2>
                    </div>
                </Card>
            </i-col>
        </Row>
        <Row type="flex" justify="space-between" style="margin-top: 24px; margin-bottom: 24px">
            <i-col span="4" v-for="index in 4" :key="index">
                <Card>
                    <div>
                        <img src="../assets/coffee-logo.png" alt="coffee-logo2"/>
                        <h2>新品推送</h2>
                    </div>
                </Card>
            </i-col>
        </Row>
    </Row>
</template>


<script>
const sha1 = require('sha1');
const axios = require("axios");
    export default {
        data () {
            return {
                logInModel: {}
            }
        },
        mounted() {},
        methods: {
            logIn() {
                axios.post("/CoffeeOrderService/api/usermanage/login", {userName: this.logInModel.userName, password: sha1(this.logInModel.password)})
                .then(response => {
                    if(response.data.success){
                        this.$Message.success("登录成功");
                        setTimeout(()=>{
                            this.$router.push({name: "OrderMenu"});
                        }, 1500);
                    } else {
                        this.$Message.error(response.data.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
}
</script>

<style scoped>
.login-box{
    position: absolute;
    top: 100px;
    right: 200px;
}
.carousel-pic{
    background: cornflowerblue;
    height: 436px;
    width: 100%;
}
</style>