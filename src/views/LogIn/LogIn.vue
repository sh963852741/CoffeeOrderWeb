<template>
    <Row type="flex" justify="center">
        <i-col span="4">
            <Row>
                用户登录
            </Row>
            <Row>
                <Form :model="logInModel">
                    <FormItem prop="userName" label="用户名">
                        <i-input v-model="logInModel.userName" placeholder="请输入您的用户名"></i-input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <i-input v-model="logInModel.password" placeholder="请输入您的密码" type="password" password></i-input>
                    </FormItem>
                    <FormItem>
                        <Row type="flex" justify="center"> 
                            <Button type="primary" @click="logIn">登录</Button>
                        </Row> 
                    </FormItem>
                </Form>
            </Row>
            <Row type="flex" justify="center" align="middle">
                <Button size="small" type="text" :to="{name: 'Regist'}">注册账号</Button>
                <Divider type="vertical" />
                <Button size="small" type="text">后台登录</Button>
                <Divider type="vertical" />
                <Button size="small" type="text">找回密码</Button>
            </Row>
        </i-col>
    </Row>
</template>

<script>
const axios = require("axios");
export default {
    data() {
        return {
            logInModel: {}
        };
    },
    mounted() {},
    methods: {
        logIn() {
            axios.post("/CoffeeOrderService/api/usermanage/login", {userName: this.logInModel.userName, password: this.logInModel.password})
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
        }
    }
}
</script>

<style>

</style>