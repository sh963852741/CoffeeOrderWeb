<template>
    <Card title="订单列表管理">
        <Row type="flex" :gutter="16" align="middle">
            <i-col>
                <Button type="primary" @click="modal = true" disabled>新建订单</Button>
            </i-col>
            <i-col>
                <Input search enter-button placeholder="搜索订单"/>
            </i-col>
        </Row>
        <Divider />
        <Row>
            <i-table border :columns="orderListHeader" :data="orderListContent">
                <template slot-scope="{row}" slot="action">
                    <Button type="primary" style="margin-right:15px;" @click="toOrderDetail(row)">详情</Button>
                </template>
            </i-table>
        </Row>  
        <Modal v-model="modal" title="新建订单" loading  ok-text="新建">
            <Form :model="orderModel" label-position="left" :label-width="80">
                <FormItem label="订单名">
                    <i-input v-model="orderModel.orderName"></i-input>
                </FormItem>
                <FormItem label="订单类型">
                    <i-input v-model="orderModel.type"></i-input>
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
                orderModel: {},
                orderListHeader: [
                    {
                        title: '用户名',
                        key: 'userName'
                    },
                    {
                        title: '总价',
                        key: 'totalPrice'
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                orderListContent: [],
            };
        },
        mounted(){
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                axios.post("/CoffeeOrderService/api/ordermanage/getAllOrder", {})
                .then(response=> {
                    this.orderListContent = response.data.data;
                    this.orderListContent.forEach(v=>{
                        v.totalPrice = Math.round(v.totalPrice * 100) / 100;
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
            },
            toOrderDetail(row) {
                this.$router.push({name:"adminOrderDetail", query:{orderId: row.orderId}});
            }
        }
    }
</script>

<style scoped>
</style>
