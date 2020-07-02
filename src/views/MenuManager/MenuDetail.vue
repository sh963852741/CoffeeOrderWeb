<template>
    <div class="layout">
        <Layout>
            <Header :style="{background:'#fff',height:'100px'}">
                 <div class="demo-avatar">
                    <Avatar icon="ios-person" size="70" />
                    <span class="large-label">{{this.menuDetail.menuName}}</span>
                 </div>
            </Header>
            <Content :style="{padding: '0 50px',background:'#fff'}">
                <Tabs value="name1">
                     <TabPane label="基本信息" name="name1">标签一的内容</TabPane>
                     <TabPane label="餐点列表" name="name2">
                         <Row type="flex" justify="center">
                            <i-col span="8" >
                                <span class="large-label" style="font-size:20px;">现有餐点</span>
                            </i-col>
                            <i-col span="8"></i-col>
                            <i-col span="8" style="padding:10px 0;">
                                <Input search enter-button placeholder="请输入餐点名" @on-search="searchMeal"/>
                            </i-col>
                        </Row>
                        <i-table border :columns="mealListHeader" :data="this.menuDetail.mealList">
                            <template v-slot:action="props">
                                <i-button type="primary" @click="toMealDetail(props.row)">详情</i-button>
                                <i-button type="error">删除</i-button>
                            </template>
                        </i-table>
                     </TabPane>
                    <TabPane label="满意度分析" name="name3">标签三的内容</TabPane>
                 </Tabs>
            </Content>
        </Layout>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                mealListHeader: [
                    {
                        title: '餐点名',
                        key: 'mealName'
                    },
                    {
                        title: '类别',
                        key: 'category'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '库存',
                        key: 'inventory'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                menuDetail:[],
                data:[]
            }
        },
        mounted(){
            this.getMenuDetail();
        },
        methods: {
            getMenuDetail(){
                axios.post("/api/menu/getMenuDetail", {})
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