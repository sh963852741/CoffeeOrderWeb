<template>
    <Card title="餐品满意度分析">
        <Row type="flex" :gutter="16" align="middle">
            <i-col span="6">
                <Card>
                    <p slot="title" style="height:100%">
                        订单量
                        <Tag color="green" style="float:right">
                            月
                        </Tag>
                    </p>
                    <h1 style="margin-top:40px;margin-bottom:10px">{{data.totalOrders}}</h1>
                    <p>累计评分</p>
                    <Rate allow-half v-model="valueHalf"/>
                    <Row style="border-bottom: 1px solid #e8eaec;margin-top:54px;margin-bottom:10px">
                    </Row>
                    <Row>             
                        <i-col span="12">
                            <div>总访问量</div>
                        </i-col>
                        <i-col span="12">
                            <div style="float:right">{{data.totalOrders}}</div>
                        </i-col>
                    </Row>
                </Card>
            </i-col>
            <i-col span="6">
                <Card>
                    <p slot="title" style="height:100%">
                        销售额
                        <Tag color="blue" style="float:right">
                            月
                        </Tag>
                    </p>
                    <div >
                        <h1 style="margin-top:40px">¥{{data.moneyPerMonth}}元</h1>
                        <Progress :percent="65" hide-info style="margin-top:30px;"/>
                    </div>
                    <Row style="border-bottom: 1px solid #e8eaec;margin-top:69px;margin-bottom:10px">
                    </Row>
                    <Row>             
                        <i-col span="12">
                            <div>总销售额</div>
                        </i-col>
                        <i-col span="12">
                            <div style="float:right">{{data.moneyPerMonth}}</div>
                        </i-col>
                    </Row>
                </Card>
            </i-col>
            <i-col span="6">
                <Card>
                    <p slot="title" style="height:100%">
                        支付方式
                        <Tag color="red" style="float:right">
                            月
                        </Tag>
                    </p>
                    <div id="paymentWay" style="height:200px;width:100%;"/>
                    <Row style="border-bottom: 1px solid #e8eaec;margin-bottom:10px;">
                    </Row>
                    <Row>             
                        <i-col span="12">
                            <div>支付最多方式</div>
                        </i-col>
                        <i-col span="12">
                            <div style="float:right">{{mostPayment.name}}</div>
                        </i-col>
                    </Row>
                </Card>
            </i-col>
            <i-col span="6">
                <Card>
                    <p slot="title" style="height:100%">
                        餐点订购情况
                        <Tag color="default" style="float:right">
                            月
                        </Tag>
                    </p>
                    <div id="mealCondition" style="height:200px;width:100%;overflow:hidden;"/>
                     <Row style="border-bottom: 1px solid #e8eaec;margin-bottom:10px;">
                    </Row>
                    <Row>             
                        <i-col span="12">
                            <div>订购最多餐点</div>
                        </i-col>
                        <i-col span="12">
                            <div style="float:right">{{mostMeal.name}}</div>
                        </i-col>
                    </Row>
                </Card>
            </i-col>
        </Row>
        <Divider />
        <Card>
            <p slot="title" style="height:100%">
                <Tag color="blue">
                    <Icon type="ios-stats"/>
                </Tag>
                本月订单情况
            </p>
            <Row :gutter="15">
                <i-col span="18">
                    <div id="lineChart" style="height:250px;width:100%;overflow:hidden;"/>
                </i-col>
                <i-col span="6">
                    <h3>本月Top5</h3>
                    <Row v-for='(item,index) in data.topFiveOrders' :key="index" style="margin:10px">
                        <i-col span="15">
                            <Row>
                                <Tag color="blue" v-if="index<=2">
                                    {{index+1}}
                                </Tag>
                                <Tag color="default" v-else>
                                    {{index+1}}
                                </Tag>
                                订单数: {{item.amount}}
                            </Row>
                        </i-col>
                        <i-col span="9">
                            {{item.date}}
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </Card>
    </Card>
</template>

<script>
const axios = require("axios");
const echarts = require("echarts");
    export default {
        data () {
            return {
                modal: false,
                menuModel: {},
                mealListHeader: [
                    {
                        title: "餐点名",
                        key: "mealName"
                    },
                    {
                        title: "购买总量",
                        key: "totalAmount"
                    }
                ],
                totalOrders: 0,
                data:[],
                mostMeal:{},
                mostPayment:{},
                valueHalf: 2.5,
                lineData: {
                    title:[
                        {text: "订单量趋势"}
                    ],
                    xAxis: {
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'line'
                    }]
                },
                paymentWay: {
                    title: {
                        left: '50%',
                        top: '80%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#515A6E',
                            fontSize: '20',
                            fontWeight: 'normal'
                        }
                    },
                    series: [{
                        type: 'pie',
                        center: ['50%', '50%'],
                        data:[],
                        radius: ['60%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        left: 0,
                        right:0,
                        top: 0,
                        bottom:0
                    }],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c} ({d}%)' 
                    }
                },
                mealCondition: {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c} ({d}%)' 
                    },
                    title: {
                        left: '50%',
                        top: '80%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#515A6E',
                            fontSize: '20',
                            fontWeight: 'normal'
                        }
                    },
                    series: [{
                            type: 'pie',
                            center: ['50%', '50%'],
                            data: [],
                            label: {
                                position: 'outer',
                                fontSize: '15'
                            },
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }]
                    }
                };
        },
        mounted(){
            this.getMealFavor();
        },
        methods: {
            getMealFavor() {
                axios.post("/CoffeeOrderService/api/menu/MealSatisfaction", {})
                .then(response=>{
                    this.data = response.data;
                    this.data.moneyPerMonth = this.data.moneyPerMonth.toFixed(2);
                    this.lineData.xAxis.data = this.data.OrderChangeListX;
                    this.lineData.series[0].data = this.data.OrderChangeListY;
                    this.paymentWay.series[0].data = this.data.paymentWay;
                    this.mostMeal = this.data.mealList[0];
                    this.mostPayment = this.data.paymentWay[0];
                    if(this.data.mealList.length>5){
                        for(let i=5;i<this.data.mealList.length;i++){
                            this.data.mealList[4].value+=this.data.mealList[i].value;
                        }
                        this.data.mealList = this.data.mealList.splice(0,5);
                        this.data.mealList[4].name= '其他';
                    }
                    this.mealCondition.series[0].data =this.data.mealList
                    this.getLineChart();
                    this.getPieChart1();
                    this.getPieChart2();
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
            searchMeal(condition) {
                this.mealListContent = this.mealList.filter(e => e.mealName.indexOf(condition) !== -1 );
            },
            getLineChart() {
                var lineCharts = echarts.init(document.getElementById('lineChart'));
                lineCharts.setOption(this.lineData);
            },
            getPieChart1() {
                let ele = document.getElementById("paymentWay");
                let instance = echarts.init(ele);
                instance.setOption(this.paymentWay);
            },
            getPieChart2() {
                let ele = document.getElementById("mealCondition");
                let instance = echarts.init(ele);
                instance.setOption(this.mealCondition);
            }
        }
    }
</script>
