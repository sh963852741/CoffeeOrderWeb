<template>
    <Layout
        style="margin: 50px 10%"
        :style="{padding: '0', minHeight: '280px', background: ''}"
    >
        <Content>
                <Card :model="orderInfo" :bordered="false" dis-hovez style="width:67%;float:left;">
                    <Form>
                    <FormItem>
                        <template slot="label">
                                <strong style="font-size:18px;">就餐方式:</strong>
                            </template>
                        <RadioGroup v-model="diningWay" @click.native="calcTakeOutCharge">
                            <Radio label="堂食" border ></Radio>
                            <Radio label="外卖" border ></Radio>
                        </RadioGroup>
                    </FormItem>
                    </Form>
                    <Form label-position="top">
                        <FormItem  ref="carrayOutForm" v-if='diningWay==="外卖"'>
                            <template slot="label">
                                <strong style="font-size:18px;">收货地址:</strong>
                            </template>
                            <Row type="flex">
                                <i-col
                                    span="8"
                                    style="padding: 0 10px 10px 0;"
                                    v-for="(item,index) in addrList"
                                    v-bind:key="index"
                                >          
                                    <Card @click.native="chooseAddr(index)">
                                        <Row type="flex" align="middle">
                                            <i-col span="12">
                                            <p style="font-size:16px;">{{item.receiver}}（收）</p>
                                            </i-col>  
                                            <i-col span="12">
                                                <Tag style="float:right;" color="geekblue" v-if="item.isDefaultAddr===true" >默认地址</Tag>
                                            </i-col>
                                        </Row>
                                        <Divider style="margin:10px 0;height:0.5px;" size="small"/>
                                        <!--p style="font-size:16px;" slot="title">{{item.receiver}}（收）</p>
                                        <Tag style="float:right;"  color="geekblue" v-if="item.isDefaultAddr===true" >默认地址</Tag-->
                                        <p>{{item.telephone}}</p>
                                        <P>{{item.provence+item.city+item.street+item.address}}</P>
                                    </Card>
                                </i-col>          
                            </Row>
                        </FormItem>
                        <FormItem >
                            <template slot="label">
                                <strong style="font-size:18px;">我的订单:</strong>
                            </template>
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
                        <FormItem>
                            <template slot="label">
                                <strong style="font-size:18px;">餐具数量:</strong>
                            </template>
                            <Input v-model="tablewareNumber" placeholder="请输入所需餐具数量" />
                        </FormItem>
                        <FormItem >
                            <template slot="label">
                                <strong style="font-size:18px;">订单备注:</strong>
                            </template>
                            <i-input v-model="remark" placeholder="请输入订单备注" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></i-input>
                        </FormItem>
                        <FormItem>
                            <template slot="label">
                                <strong style="font-size:18px;">支付方式:</strong>
                            </template>
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
                <Affix>
                    <List border style="background:#fff;float:right;width:32%;">
                        <template slot="header">
                            <p style="text-align: center;font-size:18px" ><strong>订单合计</strong></p>
                        </template>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                            <i-col span="8">
                                <p>送餐至：</p> 
                            </i-col>
                            <i-col span="16">
                                <p style="text-align: right;">
                                    <strong>
                                    {{addrList[chooseAddrIndex].provence+addrList[chooseAddrIndex].city+addrList[chooseAddrIndex].street+addrList[chooseAddrIndex].address}}
                                    </strong>
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
                                    <p style="text-align: right;">预计送餐时间<br>
                                        <strong>{{this.estimatedTime}}</strong>
                                    </p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>收货人：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">
                                        <strong>
                                            {{addrList[chooseAddrIndex].receiver}}
                                        </strong>
                                    </p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>联系电话：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">
                                        <strong>
                                            {{addrList[chooseAddrIndex].telephone}}
                                        </strong>
                                    </p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>小计：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">
                                        <strong>
                                            ¥{{subPrice}}
                                        </strong>
                                    </p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>包装费：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">
                                        <strong>
                                            ¥{{packingCharges}}
                                        </strong>
                                    </p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>配送费：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">
                                        <strong>
                                            ¥{{deliveryFee}}
                                        </strong>
                                    </p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p style="font-size:18px;color:green;">
                                        <strong>总计：</strong>
                                    </p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;color:green;font-size:18px;">
                                        <strong>¥{{totalPrice}}</strong>
                                    </p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem>
                            <Button type="primary" long @click="createOrder">提交订单</Button>
                        </ListItem>
                    </List>
               </Affix>
            </Content>
    </Layout>
</template>

<script>
const axios = require("axios");
export default {
    created(){
        let data = JSON.parse(localStorage.getItem("shoppingcart"));
        this.mealList = data.selectMeal;
        this.subPrice = data.total;
        this.totalPrice = this.subPrice;
        for(var i=0;i<this.mealList.length;++i){
            this.mealIdList.push({mealId:this.mealList[i].mealId,amount:this.mealList[i].quality});
            this.mealList[i].allprice=this.mealList[i].quality*this.mealList[i].price;
        }
    },
    data(){
        return{
            orderInfo: {},
            diningWay:'堂食',
            columns1:[
                {
                    title:"餐点名称",
                    slot:"mealName",
                    width: 200,
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
            mealIdList:[],
            subPrice:0,
            totalPrice:0,
            tablewareNumber:0,
            remark:"",
            paymentMethod:"微信支付",
            addrList:[],
            chooseAddrIndex:0,
            addrId:null,
            isTakeOut:false,
            packingCharges:0,
            deliveryFee:0,
            estimatedTime:"",
        }
    },
    mounted(){
        this.getALLAddr();
    },
    computed:{
    },
    methods:{
        getALLAddr(){
             axios.post('/CoffeeOrderService/api/usermanage/getAddrListByUserId',{})
            .then(response=>{
                    this.addrList = response.data.data;
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
            this.addrId=this.addrList[index].id;
        },
         calcTakeOutCharge(){
            if(this.diningWay==="堂食"){
                this.totalPrice=this.subPrice+8;
                this.packingCharges=4;
                this.deliveryFee=4;
                this.isTakeOut=true;
                this.addrId=this.addrList[this.chooseAddrIndex].id;
                let hh = new Date().getHours();
                let mf =new Date().getMinutes();
                if(mf<30){
                    mf+=30;
                }else{
                    if(mf>30 && mf<40){
                        mf="0"+mf-30;
                    }else{
                        mf-=30;
                    }
                    hh++;
                }
                this.estimatedTime=hh+":"+mf+":00";
            }else{
                this.totalPrice=this.subPrice;
                this.packingCharges=0;
                this.deliveryFee=0;
                this.isTakeOut=false;
                this.addrId=null;
            }
        },
        createOrder(){
            axios.post('/CoffeeOrderService/api/ordermanage/createOrder',
            {addrId:this.addrId,
            remark:this.remark,
            payment:this.paymentMethod,
            packingCharges:this.packingCharges,
            deliveryFee:this.deliveryFee,
            isTakeOut:this.isTakeOut,
            data:this.mealIdList})
            .then(response=>{
                if(response.data.success){
                    for(let i=0; i<this.mealList.length; ++i)
                    {
                        this.delShopCart(this.mealList[i]);
                    }
                    this.$Message.success("订单创建成功");
                    setTimeout(()=>{
                                this.$router.push({name: "OrderList"});
                    }, 1500);
                }else{
                    this.$Message.error(response.data.msg);
                }
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
        delShopCart(row){
            axios.post("/CoffeeOrderService/api/shoppingcart/delShoppingCart",{mealId:row.mealId})
            .then(response=>{
                if(response.data.success){
                    console.log("购物车选项清空成功");
                }
                else{
                    this.$Message.error("购物车选项清空失败");
                }
            })
            .catch(error=>{
                this.$Message.error(error.data.msg);
            });
        },
    }
}
</script>

<style scoped>
.ivu-form-item-label{
    font-size: 18px;
}
</style>

