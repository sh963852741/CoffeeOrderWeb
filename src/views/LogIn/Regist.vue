<template>
    <Row type="flex" justify="center">
        <i-col span="4">
            <Row>
                欢迎注册
            </Row>
            <Row>
                <Button type="text" size="small" :to="{name: 'LogIn'}">登录页面</Button>
            </Row>
            <Row>
                <Form :model="registModel" ref="rgeForm">
                    <FormItem prop="userName" label="用户名">
                        <i-input v-model="registModel.userName"></i-input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <i-input v-model="registModel.password" type="password"></i-input>
                    </FormItem>
                    <FormItem prop="checkPwd" label="确认密码">
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
        return{
            registModel: {},
            //表单验证规则
            rules:{
                userName: [

                ]
            }
        }
    },
    methods: {
        regist() {
            this.$refs["rgeForm"].validate((valid) => {
                if (valid) {
                    axios.post("/CoffeeOrderService/api/usermanage/regist", {...this.registModel})
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                } else {
                    this.$Message.error('Fail!');
                }
            });
        }
    }
}
</script>

<style>

</style>