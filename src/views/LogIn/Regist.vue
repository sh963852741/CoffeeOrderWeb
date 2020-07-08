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
                            <Button type="text" size="small" :to="{name: 'LogIn'}">登录页面</Button>
                        </FormItem>
                    </Form>
                </Row>
            </Card>
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
                        if(response.data.success){
                            this.$Message.success("注册成功，跳转至登录页面. . .");
                            setTimeout(()=>{
                                this.$router.push({name: "LogIn"});
                            }, 1500);
                        } else {
                            this.$Message.error(response.data.msg);
                        }
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>