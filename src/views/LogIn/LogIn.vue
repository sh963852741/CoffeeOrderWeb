<template>
    <Row type="flex" justify="center">
        <i-col span="6">
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
    mounted() {
        this.getUserList();
    },
    methods: {
        getUserList() {
            axios.get('/CoffeeTest/demo1', {})
            .then(response => {
                this.userList = response.data;
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        },
        logIn() {
            axios.post("XXX", {userName: this.logInModel.userName, password: this.logInModel.password})
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