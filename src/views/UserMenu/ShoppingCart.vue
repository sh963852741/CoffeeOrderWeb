<template>
    <Row type="flex" justify="center" style="margin-top: 50px">
        <i-col span="20">
            <Card title="我的购物车">
                <Row>
                    <Table stripe ref="myCart" :columns="columns" :data="mealList"  @on-selection-change="selectChange">
                        <template v-slot:mealId="props">
                            <strong>{{props.row.mealId}}</strong>
                        </template>
                        <template slot-scope="{index}" slot="quality">
                            <i-button
                                icon="md-remove"
                                shape="circle"
                                size="small"
                                @click="decShopCart(index)"
                            ></i-button>&nbsp;
                            <strong>{{mealList[index].quality}}</strong>
                            &nbsp;
                            <i-button
                                icon="md-add"
                                shape="circle"
                                size="small"
                                @click="addShopCart(index)"
                            ></i-button>
                        </template>
                        <template v-slot:allprice="props">
                            <strong>{{getSingleAllprice(props.row.quality,props.row.price)}}</strong>
                        </template>
                        <template slot-scope="{row,index}" slot="action">
                            <i-button type="error"  @click="delShopCart(row,index)">删除</i-button>
                        </template>
                    </Table>
                </Row>
                <Divider />
                <Card dis-hover>
                    <Row type="flex" :gutter="50" justify="end" align="middle">
                        <i-col >已选 {{getSelectCounts}} 件</i-col>
                        <i-col>共计 {{getSelectPrice}} 元</i-col>
                        <i-col>
                            <i-button type="primary">结算</i-button>
                        </i-col>
                    </Row>
                </Card>
            </Card>
        </i-col>
    </Row>
</template>


<script>
const axios = require("axios");
export default {
    data() {
        return {
            columns: [
                {
                    type: "selection",
                    title: "全选",
                    width: 60,
                    align: "center"
                },
                {
                    title: "商品信息",
                    align: "center",
                    slot: "mealId"
                },
                {
                    title: "单价",
                    align: "center",
                    key: "price"
                },
                {
                    title: "数量",
                    align: "center",
                    slot: "quality"
                },
                {
                    title: "金额",
                    align: "center",
                    slot: "allprice"
                },
                {
                    title: "操作",
                    slot: "action",
                    align: "center"
                }
            ],
            mealList: [],
            selectCounts:0,
            selectPrice:0,
            selectmeal:[]
        };
    },
    mounted() {
        this.getAllShop();
    },
    computed:{
        getSelectCounts:function(){
            console.log(this.selectmeal.length)
            return this.selectmeal.length;
        },
        getSelectPrice:function(){
            var all=0;
            for(var i=0;i<this.selectmeal.length;i++){
                all+=(this.selectmeal[i].price*this.selectmeal[i].quality)
            }
            console.log(all)
            return all;

        }
    },
    methods: {
        getAllShop() {
            axios.post("/CoffeeOrderService/api/shoppingcart/getShoppingCart", {})
                .then(response => {
                    if (response.data.success) {
                        this.mealList = response.data.data;
                    } else {
                        this.$Message.error(response.data.msg);
                    }
                });
        },
        getSingleAllprice(quality, price) {
            var allprice = quality * price;
            return allprice;
        },
        addShopCart(index) {
            this.mealList[index].quality++;
            axios
                .post("/CoffeeOrderService/api/shoppingcart/addShoppingCart", {
                    mealId: this.mealList[index].mealId,
                    price: this.mealList[index].price
                })
                .then(response => {
                    if (!response.data.success) {
                        this.$Message.error("添加失败");
                        this.mealList[index].quality--;
                    }
                    this.selectmeal=""
                })
                .catch(error => {
                    this.$Message.error(error.data.msg);
                });
        },
        decShopCart(index) {
            if (this.mealList[index].quality === 0) {
                return;
            }
            this.mealList[index].quality--;
            axios.post("/CoffeeOrderService/api/shoppingcart/decShoppingCart", {
                    mealId: this.mealList[index].mealId
                })
                .then(response => {
                    if (response.data.success) {
                        if (this.mealList[index].quality == 0)
                            this.getAllShop();
                    } else {
                        this.$Message.error("减少失败");
                        this.mealList[index].quality++;
                    }
                    this.selectmeal="";
                })
                .catch(error => {
                    this.$Message.error(error.data.msg);
                });
        },
        delShopCart(row,index){
            axios.post("/CoffeeOrderService/api/shoppingcart/delShoppingCart",{mealId:row.mealId})
            .then(response=>{
                if(response.data.success){
                    this.mealList.splice(index,1);
                }
                else{
                    this.$Message.error("删除失败");
                }
                this.selectmeal="";
            })
            .catch(error=>{
                this.$Message.error(error.data.msg);
            });
        },
        selectChange(selection){
            this.selectmeal=selection;
            console.log(selection);
        }
    }
};
</script>

<style>
</style>
