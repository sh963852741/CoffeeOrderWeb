<template>
    <Row class="layout">
        <Row :style="{background:'#fff',height:'100px',padding:'0 0 0 50px'}">
            <div class="demo-avatar">
            <Avatar icon="ios-person" size="70" />
            <span class="large-label">{{menuDetail[0].mealId}}</span>
            </div>
        </Row>
        <Row :style="{padding: '0 50px',background:'#fff'}">
            <Tabs value="name1">
                <TabPane label="基本信息" name="name1">
                    标签一的内容
                </TabPane>
                <TabPane label="餐点列表" name="name2">
                    <Row type="flex" justify="center">
                        <i-col span="8" >
                            <span class="large-label" style="font-size:20px;">现有餐点</span>
                        </i-col>
                        <i-col span="5"></i-col>
                        <i-col span="3" style="padding:10px 0;">
                            <Button type="primary" @click="modal = true">新建餐点</Button>
                        </i-col>
                        <i-col span="8" style="padding:10px 0;">
                            <Input search enter-button placeholder="请输入餐点名" @on-search="searchMeal"/>
                        </i-col>
                    </Row>
                <Row>
                <i-table border :columns="mealListHeader" :data="menuDetail">
                    <template v-slot:action="props">
                        <i-button type="primary" @click="toMealDetail(props.row)">详情</i-button>
                        <i-button type="error" @click="deleteMeal(props.row)">删除</i-button>
                    </template>
                </i-table></Row>
                </TabPane>
                <TabPane label="满意度分析" name="name3">
                    标签三的内容
                </TabPane>
            </Tabs>
        </Row>
        <Modal v-model="modal" title="新建餐点" loading @on-ok="asyncSubmit" ok-text="新建">
            <Form :model="mealInfo" label-position="left" :label-width="80">
                <FormItem label="餐点名">
                    <i-input v-model="mealInfo.mealName"></i-input>
                </FormItem >
                <FormItem label="餐点类别">
                    <i-input v-model="mealInfo.menuId" readonly></i-input>
                </FormItem >
                <FormItem label="餐点单价">
                    <i-input v-model="mealInfo.price"></i-input>
                </FormItem >
                <FormItem label="餐点库存">
                    <i-input v-model="mealInfo.amount"></i-input>
                </FormItem >
            </Form>
        </Modal>
    </Row>
</template>

<script>
const axios = require("axios");
export default {
    data () {
        return {
            mealListHeader: [
                {
                    title: '餐点名',
                    key: 'mealId'
                },
                {
                    title: '单价',
                    key: 'price'
                },
                {
                    title: '库存',
                    key: 'amount'
                },
                {
                    title: '类别',
                    key: 'type'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                }
            ],
            mealListContent: [
                {
                    mealName: '原味吮指鸡',
                    category: '小食',
                    unitPrice: '8',
                    inventory: '2000',
                },
                {
                    mealName: '柠檬鸡块',
                    category: '小食',
                    unitPrice: '7.5',
                    inventory: '2000',
                }
            ],
            typeList:[
                {
                    label:"主食",
                    value:"主食"
                },
                {
                    label:"小食",
                    value:"小食"
                },
                {
                    label:"饮品",
                    value:"饮品"
                }
            ],
            menuDetail:[],
            data:[],
            mealInfo:{},
            modal: false
        }
    },
    mounted(){
        this.getMenuDetail();
    },
    created(){
        this.mealInfo.menuId=this.$router.query.menuId;
    },
    methods: {
        getMenuDetail(){
            axios.post("/CoffeeOrderService/api/menu/getMenuDetail", {})
            .then(response=>{
                this.data = response.data;
                this.menuDetail = this.data;
            })
            .catch(error=>{
                console.error(error);
            });
        },
        toMealDetail (row) {
            this.$router.push({name:"DishDetail", query:{mealId: row.mealId}});
        },
        searchMeal(condition) {
            this.menuDetail.mealList = this.data.mealList.filter(e => e.mealName.indexOf(condition) !== -1 );
        },
        deleteMeal(row){
            axios.post("/CoffeeOrderService/api/menu/delMeal", {mealId: row.mealId})
            .then(response=>{
                if(response.data.success){
                    this.$Message.success("删除成功");
                    this.getMenuDetail();
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
        }
    }
}
</script>

<style scoped>
.layout{
    border: 1px solid white;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.large-label{
    display:inline-block;
    font-size:32px;
    margin:10px;
    padding:0 15px;
}
</style>