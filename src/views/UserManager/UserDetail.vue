<template>
    <div>
        <Row type="flex" justify="start">
            <Icon type="ios-arrow-back"  @click="back"></Icon>
            <Button size="small" type="text"  @click="back" id="backbutton">返回</Button>
        </Row>
        <br>
        <Row >
            <i-col span="6" offset="9">
                <i-form :model="userInfo" :lable-width="80">
                    <Form-item label="用户名">
                    <i-input readonly :value.sync="userInfo.用户名"></i-input>
                    </Form-item>
                    <Form-item label="用户Id">
                    <i-input readonly :value.sync="userInfo.用户Id"></i-input>
                    </Form-item>
                    <Form-item label="密码">
                    <i-input :value.sync="userInfo.密码"></i-input>
                    </Form-item>
                    <Form-item label="电子邮箱">
                    <i-input :value.sync="userInfo.电话"></i-input>
                    </Form-item>
                    <Form-item label="电话">
                    <i-input :value.sync="userInfo.邮箱"></i-input>
                    </Form-item>
                </i-form>
            </i-col>
        </Row>
        <br>
        <Row>
            <i-col span="5" offset="21">
                <Button size="large" type="success" @click="changeUserInfo">保存</Button>
            </i-col>
        </Row>
    </div>
</template>

<script>
const axios=require("axios");
export default {
    data(){
        return {
            userInfo:{},
            name:this.$route.query.name
        }
    },
    mounted(){


    },
    methods:{
        getUserDetails(userName){
            axios.post("/api/getUserDetails",{userName})
            .then(Response=>{
                console.log(Response);
                this.userInfo=Response.data;
            })
            .catch(error=>{
                console.log(error);
            })
        },
        changeUserInfo()
        {
            
        },
        back(){
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