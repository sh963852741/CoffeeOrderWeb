<template>
    <Card title="餐点信息">
        <Row type="flex" align="middle">
            <Button @click="backward">
                <Icon type="ios-arrow-back" />返回
            </Button>
            <Divider type="vertical" />
            <Button type="primary" @click="saveMealInfo">
                <Icon type="md-copy" />保存
            </Button>
        </Row>
        <Divider/>
        <Row type="flex" justify="center">
            <i-col span='12'>
                <Form :model="mealInfo" label-position="left" :label-width="80">
                    <FormItem label="餐点名称">
                        <Input v-model="mealInfo.mealName" placeholder="餐点名称"/>
                    </FormItem>   
                    <FormItem label="餐点类别">
                        <Input v-model="mealInfo.type" placeholder="餐点类别"/>
                    </FormItem>
                    <FormItem label="餐点库存">
                        <Input v-model="mealInfo.amount" placeholder="餐点库存" :number="true"/>
                    </FormItem>
                    <FormItem label="餐点价格">
                        <Input v-model="mealInfo.price" placeholder="餐点价格" :number="true"/>
                    </FormItem>
                    <FormItem label="餐点详情">
                        <Input type="textarea" v-model="mealInfo.mealDetail" :autosize="{minRows: 3,maxRows: 5}" placeholder="相关餐点描述"/>
                    </FormItem>
                    <FormItem label="图片">
                        <img width="100%" :src="`/CoffeeOrderService/api/menu/downloadImg?mealId=${mealInfo.mealId}`" alt="暂无菜品图片"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style="float:right;margin:0px 0px 30px 0px;" @click="saveMealInfo">
                            <Icon type="md-copy" />保存
                        </Button>
                    </FormItem>
                </Form>
            </i-col>
        </Row>
    </Card>
</template>

<script>
const axios = require("axios");
export default {
    data () {
        return {
            formItem: {
                mealName: '',
                mealNumber:'',
                category: '',
                mealDetail:'',
            },
            mealInfo:{},
        }
    },
    created(){
        this.mealInfo.mealId = this.$route.query.mealId;
    },
    mounted(){
        this.getMealDetail();
        },
    methods:{
        getMealDetail(){
            axios.post("/CoffeeOrderService/api/menu/getMeal", {mealId: this.mealInfo.mealId})
            .then(response=>{
                this.mealInfo = response.data;
            })
            .catch(error=>{
                console.log(error);
            });
        },
        backward(){
            this.$router.go(-1);
        },
        saveMealInfo(){
            axios.post("/CoffeeOrderService/api/menu/modifyMeal", {mealId: this.mealInfo.mealId,
            mealName:this.mealInfo.mealName, 
            price:this.mealInfo.price,
            amount:this.mealInfo.amount,
            menuId:this.mealInfo.menuId,
            type:this.mealInfo.type,
            mealDetail:this.mealInfo.mealDetail})
            .then(response => {
                if(response.data.success){
                    this.$Message.success("保存成功");
                }
                else{
                    this.$Message.error("保存失败");
                }
                console.log(response);
            })
            .catch(error => {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    if (error.response.status >= 400 && error.response.status < 600)
                        this.$Message.error(error.message);
                    else 
                        this.$Message.warning(error.message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    this.$Message.error("构建请求时出错")
                }
            });
        }
    }
}
</script>

<style scoped>
</style>
