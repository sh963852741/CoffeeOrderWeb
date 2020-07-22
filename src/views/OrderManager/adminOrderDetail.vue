<template>
    <Card title="订单详情">
            <Row type="flex" :gutter="16" align="middle">
                <i-col>
                    <Button @click="backward">
                        <Icon type="ios-arrow-back" />返回
                    </Button>
                </i-col>
                <i-col>
                    <Input search enter-button placeholder="搜索餐点"/>
                </i-col>
            </Row>
            <Divider />
            <Row>
                <i-table border :columns="mealListHeader" :data="mealListContent">
                </i-table>
            </Row>
        <Modal v-model="modal" title="新建餐点" loading  ok-text="新建">
            <Form :model="mealModel" label-position="left" :label-width="80">
                <FormItem label="餐点名">
                    <i-input v-model="mealModel.mealName"></i-input>
                </FormItem>
                <FormItem label="餐点类型">
                    <i-input v-model="mealModel.type"></i-input>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
const axios = require("axios");
export default {
    data () {
        return {
            modal: false,
            mealModel: {},
            orderId: "",
            mealListContent: [],
            mealListHeader:[
                {
                    title: "餐点名称",
                    key: 'mealName'
                },
                {
                    title: "订餐数量",
                    key: 'amount'
                },
                {
                    title: "餐点价格",
                    key: 'price'
                },
                {
                    title: "餐点总价",
                    key: 'totalPrice'
                }
            ]
        }
    },
    created(){
        this.orderId = this.$route.query.orderId;
    },
    mounted(){
        this.getOrderDetail();
    },
    methods:{
        backward(){
            this.$router.go(-1);
        },
        getOrderDetail() {
             axios.post("/CoffeeOrderService/api/ordermanage/getOrderDetail", {orderId: this.orderId})
                .then(response=> {
                    this.mealListContent = response.data.meals;
                    this.mealListContent.forEach(v=>{
                        v.totalPrice = v.price*v.amount;
                    })
                })
                .catch(error=>{
                    if (error.response) {
                        if (error.response.status >= 400 && error.response.status < 600)
                            this.$Message.error(error.message);
                        else
                            this.$Message.warning(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                });
        }
    }
}
</script>

<style scoped>
</style>
