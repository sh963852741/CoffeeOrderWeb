<template>
    <Card title="订单详情">
        <Row type="flex" :gutter="16" align="middle">
            <i-col>
                <Button type="primary" @click="modal = true" disabled>新建餐点</Button>
            </i-col>
            <i-col>
                <Input search enter-button placeholder="搜索餐点"/>
            </i-col>
        </Row>
        <Divider />
        <Row>
            <i-table border :columns="mealListHeader" :data="mealListContent">
            </i-table>
        </Row>  
        <Modal v-model="modal" title="新建餐点" loading  ok-text="新建">
            <Form :model="mealModel" label-position="left" :label-width="80">
                <FormItem label="餐点名">
                    <i-input v-model="mealModel.mealName"></i-input>
                </FormItem>
                <FormItem label="餐点类型">
                    <i-input v-model="mealModel.type"></i-input>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
// const axios = require("axios");
export default {
    data () {
        return {
            modal: false,
            mealModel: {},
            mealListContent: [],
            mealListHeader:[
                {
                    title: "餐点名称",
                    key: 'mealName'
                },
                {
                    title: "订餐数量",
                    key: 'amount'
                }
            ]
        }
    },
    created(){
        this.mealListContent = this.$route.query.Orders;
    },
    methods:{
        backward(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
</style>
