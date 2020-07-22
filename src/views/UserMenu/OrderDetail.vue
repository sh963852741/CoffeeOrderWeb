<template>
    <Content>
        <Layout :style="{minHeight: '300px',background:'#fff',padding:'20px'}">
            <Content>
                <div style="font-size:20px;margin:10px 0;" >   
                    订单明细
                    <Button type="primary" @click="back" style="float:right;" >
                        <Icon type="ios-arrow-back" />返回
                    </Button>
                 </div>
                
                 <Card>
                    <Steps :current="now"  v-if="!isTakeOut">
                        <Step title="已创建"></Step>
                        <Step title="制作中"></Step>
                        <Step title="已完成"></Step>
                    </Steps>
                    <Steps :current="now"  v-else>
                        <Step title="已创建"></Step>
                        <Step title="制作中"></Step>
                        <Step title="配送中"></Step>
                        <Step title="已完成"></Step>
                    </Steps>
                    <p class="info" style="">订单编号：{{orderInfo.orderId}}</p>
                    <p slot="extra" style="font-size:17px;"><strong>{{status}}</strong></p>
                    <p class="info">订单内容：</p>
                    <Row type="flex">
                        <i-col span="2"></i-col>
                        <i-col span="20">
                            <!--Row type="flex" style="margin-bottom:10px;">
                                <i-col span="3">
                                    <Icon type="ios-pizza" size="70"/>
                                </i-col>
                                <i-col span="7">
                                    <p class="info2">香芋派</p>
                                </i-col>
                                <i-col span="7">
                                    <p class="info2">×2</p>
                                </i-col>
                                <i-col span="7">
                                   <p class="info2"> ¥20元</p>
                                </i-col>
                            </Row>

                             <Row type="flex" style="margin-bottom:10px;">
                                <i-col span="3">
                                    <Icon type="ios-pizza" size="70"/>
                                </i-col>
                                <i-col span="7">
                                    <p class="info2">香芋派</p>
                                </i-col>
                                <i-col span="7">
                                    <p class="info2">×2</p>
                                </i-col>
                                <i-col span="7">
                                   <p class="info2"> ¥20元</p>
                                </i-col>
                            </Row-->
                            <Table :columns="columns1" :data="mealList.meals">
                               <template slot-scope="{ row }" slot="mealName">
                                   <Row type="flex">
                                       <i-col span="11">
                                           <img
                                                :src="`/CoffeeOrderService/api/menu/downloadImg?mealId=${row.mealId}`"
                                                alt="暂无菜品图片"
                                                style="width:100%;height:70px"
                                                :onabort="defaultImg"
                                                :onerror="defaultImg"
                                            />
                                       </i-col>
                                       <i-col span="13">
                                            <p style="padding:25px 0;float:left;"><strong>{{row.mealName}}</strong></p>
                                       </i-col> 
                                   </Row>
                               </template>
                               <template slot-scope="{ row }" slot="price">
                                   ¥{{row.price}}元
                               </template>
                               <template slot-scope="{ row }" slot="amount">
                                   ×{{row.amount}}
                               </template>
                               <template slot-scope="{  }" slot="subtotal">
                                   ¥20元
                               </template>
                            </Table>
                            <Row type="flex">
                                <i-col span="6">
                                    <p class="info">包装费：¥{{mealList.packingCharges}}元</p>
                                </i-col>
                                <i-col span="2"></i-col>
                                <i-col span="6">
                                    <p class="info">配送费：¥{{mealList.deliveryFee}}元</p>
                                </i-col>
                                <i-col span="4"></i-col>
                                <i-col span="6">
                                     <p class="info" style="font-size:18px;"><strong>总计：¥{{mealList.totalPrice}}元</strong></p>
                                </i-col>
                            </Row>
                        </i-col> 
                        <i-col span="2"></i-col> 
                    </Row>
                    <p class="info" style="float:left;">配送地址：</p>
                    <p class="info" v-if="JSON.stringify(address) != '{}'">{{address.provence}} {{address.street}}</p>
                    <p class="info" v-else>未填写</p>
                    <p class="info">配送骑手：外卖小哥（联系方式：1390000000）</p>
                    <p class="info">下单时间：{{mealList.createdTime}}</p>
                    <p class="info">支付方式: {{mealList.payment}}</p>
                    <p class="info">备注: {{mealList.remark}}</p>
                 </Card>
             </Content>
        </Layout>
    </Content>
</template>

<script>
const axios = require("axios");
export default {
    data(){
        return{
            columns1:[
                {
                    title:"餐点名称",
                    slot:"mealName",
                    width:200,
                    align: 'center'
                },
                {
                    title:"餐点单价",
                    slot:"price",
                    key:"price",
                },
                {
                    title:"餐点份数",
                    slot:"amount",
                    key:"amount"
                },
                {
                    title:"小计",
                    slot:"subtotal",
                    key:"subtotal",
                    width:120,
                }
            ],
            data1:[
                {
                    'mealPic':require('@/assets/coffee-logo.png'),
                    mealName:"香芋派",
                    price:10,
                    amount:2,
                    subtotal:20
                },
                {
                    'mealPic':require('@/assets/coffee-logo.png'),
                    mealName:"香芋派",
                    price:10,
                    amount:2,
                    subtotal:20
                },
            ],
            defaultImg:
                'this.src="' + require("@/assets/coffee-logo.png") + '"',
            orderInfo:{},
            mealList:[],
            now: 0,
            createdTime:"",
            totalPrice:0,
            deliveryFee:0,
            packingCharges:0,
            status:"",
            address:{},
            currentType:{
                "已创建":0,
                "制作中":1,
                "配送中":2,
                "已完成":3
            },
            isTakeOut: false
        }
    },
    created(){
        this.orderInfo.orderId=this.$route.query.orderId;
        this.createdTime=this.$route.params.createdTime;
        this.totalPrice=this.$route.params.totalPrice;
        this.status=this.$route.params.status;
    },
    mounted(){
        this.getOrderDetail();
    },
    methods:{
        getOrderDetail(){
            axios.post('/CoffeeOrderService/api/ordermanage/getOrderDetail',{orderId:this.orderInfo.orderId})
            .then(response=>{
                    this.mealList = response.data;
                    this.now = this.currentType[response.data.status];
                    if(this.mealList.addrId!=null)
                    this.getAddress(this.mealList.addrId)
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
        back(){
            this.$router.go(-1);
        },
        getAddress(addrId){
            axios.post('/CoffeeOrderService/api/usermanage/GetAddrById',{id:addrId})
            .then(response=>{
                 this.address = response.data;
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
.info{
    margin: 10px 0;
    font-size:16.5px;
    
}
.info2{
    padding:25px 0;
    font-size:15px;
}
</style>
