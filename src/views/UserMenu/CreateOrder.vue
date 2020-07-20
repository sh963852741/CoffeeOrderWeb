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
                        <RadioGroup v-model="diningWay">
                            <Radio label="堂食" border ></Radio>
                            <Radio label="外卖" border ></Radio>
                        </RadioGroup>
                    </FormItem>
                    </Form>
                    <Form label-position="top">
                        <FormItem label="选择收货地址:" ref="carrayOutForm" v-if='diningWay==="外卖"'>
                            <!--Row type="flex" justify="center">
                                <i-col span="7" >
                                    <Card>
                                        <p slot="title">用户名</p>
                                        <P>福建省厦门市思明区滨海街道厦大学生公寓</P>
                                    </Card>
                                </i-col>
                            <i-col span="7" >
                                    <Card>
                                        <p slot="title">用户名</p>
                                        <P>福建省厦门市思明区滨海街道厦大学生公寓</P>
                                    </Card>
                                </i-col>
                                <i-col span="7" >
                                    <Card>
                                        <p slot="title">用户名</p>
                                        <P>福建省厦门市思明区滨海街道厦大学生公寓</P>
                                    </Card>
                                </i-col>
                            </Row-->
                        </FormItem>
                    <FormItem label="我的订单:" >
                        <Table stripe :columns="columns1" :data=" data1">
                               <template slot-scope="{ row }" slot="mealName">
                                   <Row type="flex">
                                       <i-col span="11">
                                            <img src="@/assets/coffee-logo.png" width="70px" height="70px"/>
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
                    </FormItem>
                    <FormItem label="餐具数量:" >
                        <Input v-model="value" placeholder="Enter something..." />
                    </FormItem>
                    <FormItem label="订单备注:" >
                        <Input v-model="value" placeholder="Enter something..." type="textarea" :autosize="{minRows: 3,maxRows: 5}"/>
                    </FormItem>
                     <FormItem label="支付方式:" >
                        <RadioGroup >
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
                <!--i-col span="8" style="padding-left:10px;"-->
                
                    <List border style="background:#fff;float:right;width:32%;">
                        <template slot="header">
                            <p style="text-align: center;">订单合计</p>
                        </template>
                        <ListItem v-if='diningWay==="外卖"'>
                            <Row type="flex">
                            <i-col span="8">
                                <p>送餐至：</p> 
                            </i-col>
                            <i-col span="16">
                                <p style="text-align: right;">福建省厦门市思明区滨海街道厦大学生公寓</p> 
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
                        <ListItem >
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>小计：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">¥40</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>包装费：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">¥4</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>配送费：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">¥4</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem>
                            <Row type="flex" style="width:100%;">
                                <i-col span="8">
                                    <p>总计：</p> 
                                </i-col>
                                <i-col span="16">
                                    <p style="text-align: right;">¥40</p> 
                                </i-col>
                            </Row>
                        </ListItem>
                        <ListItem>
                            <Button type="primary" long>提交订单</Button>
                        </ListItem>
                    </List>
                    <!--Card>
                        <template slot="title">
                            <p style="text-align: center;">订单合计</p>
                        </template>
                        <Row type="flex">
                            <i-col span="6">
                                <P>送餐至：</P> 
                            </i-col>
                            <i-col span="18">
                                <P style="float:left;">福建省厦门市思明区滨海街道厦大学生公寓</P> 
                            </i-col>
                        </Row>           
                    </Card-->
                <!--/i-col-->
               </Affix>
            </Content>
        <!--/Row-->
    </Layout>
</template>

<script>
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
        }
    },
    methods:{
        eatIn(){
            console.log(this.diningWay);
        },
        carryOut(){
             console.log(this.diningWay);
        }
    }
}
</script>

<style scoped>
.ivu-form-item-label{
    font-size: 18px;
}
</style>

