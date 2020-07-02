<template>
    <Card title="用户详情">
        <Row>
            <Button  @click="back">
                <Icon type="ios-arrow-back" />返回
            </Button>
            <Divider type="vertical" />
            <Button type="primary" @click="saveUserInfo">保存</Button>
        </Row>
        <Divider />
        <Row>
            <i-col span="6" offset="9">
                <Form :model="userInfo" label-position="left" :label-width="80">
                    <FormItem label="用户名">
                        <i-input v-model="userInfo.用户名"></i-input>
                    </FormItem >
                    <FormItem label="用户Id">
                        <i-input v-model="userInfo.用户Id"></i-input>
                    </FormItem >
                    <FormItem label="密码">
                        <i-input v-model="userInfo.密码"></i-input>
                    </FormItem >
                    <FormItem label="电子邮箱">
                        <i-input v-model="userInfo.电话"></i-input>
                    </FormItem >
                    <FormItem label="电话">
                        <i-input v-model="userInfo.邮箱"></i-input>
                    </FormItem >
                    <FormItem >
                        <Button type="primary" @click="saveUserInfo">保存</Button>
                    </FormItem >
                </Form>
            </i-col>
        </Row>
    </Card>
</template>

<script>
const axios=require("axios");
export default {
    data(){
        return {
            userInfo: {}
        }
    },
    created() {
        this.userInfo.userId = this.$route.query.userId;
    },
    mounted(){
        this.getUserDetails();
    },
    methods:{
        getUserDetails() {
            axios.post("/api/getUserDetails",{userId: this.userInfo.userId})
            .then(Response=>{
                console.log(Response);
                this.userInfo=Response.data;
            })
            .catch(error=>{
                console.log(error);
            })
        },
        saveUserInfo() {
            
        },
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>
    #backbutton{
        margin-top: -4px;

    }


</style>