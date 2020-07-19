<template>
    <Card title="餐品满意度分析">
        <Row type="flex" :gutter="16" align="middle">
            <i-col>
                <Input search enter-button placeholder="搜索餐品" @on-search="searchMeal"/>
            </i-col>
        </Row>
        <Divider />
        <Row>
            <i-table border :columns="mealListHeader" :data="mealListContent">
            </i-table>
        </Row>  
    </Card>
</template>

<script>
const axios = require("axios");
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
                mealListContent: [],
                mealList:[]
            };
        },
        mounted(){
            this.getMealFavor();
        },
        methods: {
            getMealFavor() {
                axios.post("/CoffeeOrderService/api/menu/MealSatisfaction", {})
                .then(response=>{
                    this.mealListContent = response.data.data;
                    this.mealList = this.mealListContent;
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
            }
        }
    }
</script>
