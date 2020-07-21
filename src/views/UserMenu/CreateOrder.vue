<template>
    <Layout
        style="margin: 50px 10%"
        :style="{padding: '0', minHeight: '280px', background: ''}"
    >
        <Content>
        <!--Row type="flex">
            <i-col span="16"-->
                <Card :model="orderInfo" :bordered="false" dis-hovez style="width:67%;float:left;">
                    <!--h3 style="float:left;">选择就餐方式:</h3>
                    <RadioGroup v-model="diningWay">
                        <Radio label="堂食" border></Radio>
                        <Radio label="外卖" border></Radio>
                    </RadioGroup-->
                    <Form>
                    <FormItem label="选择就餐方式:">
                        <RadioGroup v-model="diningWay" @click.native="calcTakeOutCharge">
                            <Radio label="堂食" border ></Radio>
                            <Radio label="外卖" border ></Radio>
                        </RadioGroup>
                    </FormItem>
                    </Form>
                    <Form label-position="top">
                        <FormItem label="选择收货地址:" ref="carrayOutForm" v-if='diningWay==="外卖"'>
                            <Row type="flex">
                                <i-col
                                    span="8"
                                    style="padding: 0 10px 10px 0;"
                                    v-for="(item,index) in addrList"
                                    v-bind:key="index"
                                >          
                                    <Card @click.native="chooseAddr(index)">
                                        <p slot="title">{{item.receiver}}（收）</p>
                                        <p slot="extra" v-if="item.isDefaultAddr===true">默认地址</p>
                                        <p>联系方式：{{item.telephone}}</p>
                                        <P>送餐地址：</P>
                                        <P>{{item.provence+item.city+item.street+item.address}}</P>
                                    </Card>
                                </i-col>          
                            </Row>
                        </FormItem>
                    <FormItem label="我的订单:" >
                        <Table stripe :columns="columns1" :data="mealList">
                               <template slot-scope="{ row }" slot="mealName">
                                   <Row type="flex">
                                       <i-col span="11">
                                            <img 
                                            :src="`/CoffeeOrderService/api/menu/downloadImg?mealId=${row.mealId}`"
                                            alt="暂无菜品图片" 
                                            width="70px" 
                                            height="70px"/>
                                       </i-col>
                                       <i-col span="13">
                                            <p style="padding:25px 0;float:left;"><strong>{{row.mealName}}</strong></p>
                                       </i-col> 
                                   </Row>
                               </template>
                               <template slot-scope="{ row }" slot="price">
                                   ¥{{row.price}}
                               </template>
                               <template slot-scope="{ row }" slot="quality">
                                   ×{{row.quality}}
                               </template>
                               <template slot-scope="{ row }" slot="allprice">
                                   ¥{{row.allprice}}
                               </template>
                            </Table>
                    </FormItem>
                    <FormItem label="餐具数量:" >
                        <Input v-model="tablewareNumber" placeholder="请输入所需餐具数量" />
                    </FormItem>
                    <FormItem label="订单备注:" >
                        <Input v-model="remark" placeholder="请输入订单备注" type="textarea" :autosize="{minRows: 3,maxRows: 5}"/>
                    </FormItem>
                     <FormItem label="支付方式:" >
                        <RadioGroup v-model="paymentMethod">
                            <Radio label="微信支付" border></Radio>
                            <Radio label="支付宝支付" border></Radio>
                            <Radio label="储蓄卡支付" border></Radio>
                            <Radio label="花呗支付" border></Radio>
                            <Radio label="咖啡币支付" border></Radio>
                        </RadioGroup>
                    </FormItem>
                    </Form>
                </Card>
            <!--/i-col-->
               <Affix>
                    <List border style="background:#fff;float:right;width:32%;">
                        <template slot="header">
                            <p style="text-align: center;">订单合计</p>
                        </template>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                            <i-col span="8">
                                <p>送餐至：</p> 
                            </i-col>
                            <i-col span="16">
                                <p style="text-align: right;">
                                    {{addrList[chooseAddrIndex].provence+addrList[chooseAddrIndex].city+addrList[chooseAddrIndex].street+addrList[chooseAddrIndex].address}}
                                </p> 
                            </i-col>
                        </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>送餐时间：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">预计送餐时间<br>2020/7/20 15:00</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>联系电话：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">{{addrList[chooseAddrIndex].telephone}}</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>小计：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">¥{{subPrice}}</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>包装费：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">¥{{packingCharges}}</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>配送费：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">¥{{deliveryFee}}</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>总计：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">¥{{totalPrice}}</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem>
                            <Button type="primary" long>提交订单</Button>
                        </ListItem>
                    </List>
               </Affix>
            </Content>
        <!--/Row-->
    </Layout>
</template>

<script>
const axios = require("axios");
export default {
    data(){
        return{
            orderInfo:{},
            diningWay:'堂食',
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
                    slot:"quality",
                    key:"quality"
                },
                {
                    title:"小计",
                    slot:"allprice",
                    key:"allprice",
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
            mealList:[],
            subPrice:0,
            totalPrice:0,
            tablewareNumber:0,
            remark:"",
            paymentMethod:"微信支付",
            addrList:[],
            chooseAddrIndex:0,
            isTakeOut:false,
            packingCharges:0,
            deliveryFee:0,
        }
    },
    created(){
        this.mealList=this.$route.params.selectMeal;
        this.subPrice=this.$route.params.getSelectPrice;
        this.totalPrice=this.subPrice;
    },
    mounted(){
        this.getALLAddr();
        this.createOrder();
    },
    computed:{
    },
    methods:{
        getALLAddr(){
             axios.post('/CoffeeOrderService/api/usermanage/getAddrListByUserId',{})
            .then(response=>{
                    this.addrList = response.data.data;
                    console.log(this.mealList);
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
        chooseAddr(index){
            this.chooseAddrIndex=index;
            console.log(this.chooseAddrIndex);
        },
         calcTakeOutCharge(){
            if(this.diningWay==="堂食"){
                this.totalPrice=this.subPrice+8;
                this.packingCharges=4;
                this.deliveryFee=4;
                this.isTakeOut=true;
            }else{
                this.totalPrice=this.subPrice;
                this.packingCharges=0;
                this.deliveryFee=0;
                this.isTakeOut=false;
            }
            console.log(this.deliveryFee);
        },
        createOrder(){
             axios.post('/CoffeeOrderService/api/ordermanage/createOrder',
             {addrId:this.chooseAddrIndex,
             remark:this.remark,
             payment:this.paymentMethod,
             packingCharges:this.packingCharges,
             deliveryFee:this.deliveryFee,
             isTakeOut:this.isTakeOut,
             data:this.mealList})
            .then(response=>{
                    this.addrList = response.data.data;
                    console.log(this.mealList);
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
.ivu-form-item-label{
    font-size: 18px;
}
</style>

