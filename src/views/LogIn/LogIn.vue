<template>
    <Row type="flex" justify="center">
        <i-col span="6">
            <Row>
                用户登录
            </Row>
            <Row>
                <Form :model="logInModel">
                    <FormItem prop="userName" label="用户名">
                        <i-input v-model="logInModel.userName"></i-input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <i-input v-model="logInModel.password" placeholder="请输入您的密码" type="password"></i-input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="logIn">登录</Button>
                    </FormItem>
                </Form>
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
            axios.post("/CoffeeTest/api/usermanage/login", {userName: this.logInModel.userName, password: this.logInModel.password})
            .then(response => {
                console.log(response);
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