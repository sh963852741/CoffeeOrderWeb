<template>
    <Content>
        <Layout :style="{minHeight: '300px',background:'#fff',padding:'0 0px 0 20px'}">
            <Content>
                <Row type="flex">
                    <i-col span="6">
                        <div style="font-size:20px;margin:10px 0px;">   
                            订单记录
                        </div>
                    </i-col>
                    <i-col span="8"></i-col>
                    <i-col span="10" style="padding:10px 0;">
                         <Input search enter-button placeholder="Enter something..." />
                    </i-col>
                </Row>
                        <!--Row type="flex" justify="center" style="height:45px;padding:10px;border:solid 1px grey;">
                             <i-col span="6">
                                 
                                 <span>
                                 订单编号：001
                                 </span>
                                 
                             </i-col>
                             <i-col span="6">
                                 <span>下单时间：2020/07/12</span>
                             </i-col>
                             <i-col span="6">
                                 <span>总价：</span>
                             </i-col>
                             <i-col span="6">
                                 <span>已完成</span>
                             </i-col>
                        </Row-->
                        <!--List border>
                            <ListItem>
                                <div style="width:25%;">
                                    <span>订单编号:001</span>
                                </div>
                                 <div style="width:25%;float:left;">
                                     <span>下单时间：2020/07/12</span>
                                </div>
                                <div style="width:25%;float:left;">
                                     <span>总价：24.50元</span>
                                </div>
                                <div style="width:25%;float:left;">
                                     <span>订单状态：已完成</span>
                                     <Button type="primary" size="small" style="float:right;">详情</Button>
                                </div>
                            </ListItem>
                             <ListItem>
                                 <div style="width:25%;">
                                    <span>订单编号:001</span>
                                </div>
                                 <div style="width:25%;float:left;">
                                     <span>下单时间：2020/07/12</span>
                                </div>
                                <div style="width:25%;float:left;">
                                     <span>总价：24.50元</span>
                                </div>
                                <div style="width:25%;float:left;">
                                     <span>订单状态：已完成</span>
                                     <Button type="primary" size="small" style="float:right;" @click="toDetail">详情</Button>
                                </div>
                             </ListItem>
                        </List-->
                    <Table stripe :columns="columns12" :data="data6">
                         <template slot-scope="{ row }" slot="orderId">
                            <strong>{{ row.orderId }}</strong>
                         </template>
                         <template slot-scope="{ row }" slot="totalPrice">
                            ¥{{ row.totalPrice }}元
                         </template>
                        <template slot-scope="{  }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="toDetail()">查看详情</Button>
                        </template>
                    </Table>
            </Content>
        </Layout>
    </Content>
</template>

<script>
const axios = require("axios");
export default {
    data(){
        return {
                columns12: [
                    {
                        title: '订单编号',
                        slot: 'orderId'
                    },
                    {
                        title: '下单时间',
                        key: 'orderTime'
                    },
                    {
                        title: '总价',
                        key: 'totalPrice',
                        slot:'totalPrice'
                    },
                    {
                        title: '订单状态',
                        key: 'orderState'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: [
                    {
                        orderId: '001',
                        orderTime: '2020/7/14',
                        totalPrice: 20.4,
                        orderState:'已完成'
                    },
                   {
                        orderId: '002',
                        orderTime: '2020/7/14',
                        totalPrice: 50,
                        orderState:'已完成'
                    },
                ],
                orderList:[],
                data:[]
            }
    },
    mounted(){
        this.getOrderListByUserId();
    },
    methods:{
        getOrderListByUserId(){
            axios.post('api/order/getOrderListByUserId',{})
            .then(response=>{
                    this.orderList = response.data.data;
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
        toDetail(){
            this.$router.push({name:"OrderDetail"});
        }
    }
}
</script>

<style scoped>

</style>