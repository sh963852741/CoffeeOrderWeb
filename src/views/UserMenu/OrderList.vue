<template>
    <Content>
        <Layout :style="{minHeight: '300px',background:'#fff',padding:'20px '}">
            <Content>
                <Row type="flex">
                    <i-col span="6">
                        <div style="font-size:20px;margin:10px 0;">   
                            订单记录
                        </div>
                    </i-col>
                    <i-col span="8"></i-col>
                    <i-col span="10" style="padding:10px 0;">
                        <Input search enter-button placeholder="请输入日期：年-月-日" @on-search="searchFinishedOrder"/>
                    </i-col>
                </Row>
                <Tabs v-model="value">
                    <TabPane label="所有订单" name="name1" @click="resetData">
                        <Table stripe :columns="columns12" :data="data">
                            <template slot-scope="{ row }" slot="orderId">
                            <strong>{{ row.orderId }}</strong>
                            </template>
                            <template slot-scope="{ row }" slot="totalPrice">
                            ¥{{ row.totalPrice }}元
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="primary" size="small" style="margin-right: 5px" @click="toDetail(row)">查看详情</Button>
                            </template>
                        </Table>
                    </TabPane>
                    <TabPane label="已完成" name="name2" @click="resetData">
                        <Table stripe :columns="columns12" :data="finishedOrderList">
                        <template slot-scope="{ row }" slot="orderId">
                        <strong>{{ row.orderId }}</strong>
                        </template>
                        <template slot-scope="{ row }" slot="totalPrice">
                        ¥{{ row.totalPrice }}元
                        </template>
                        <template slot-scope="{ row }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="toDetail(row)">查看详情</Button>
                        </template>
                    </Table>
                    </TabPane>
                    <TabPane label="进行中" name="name3" @on-click="resetData">
                        <Table stripe :columns="columns12" :data="unfinishedOrderList">
                            <template slot-scope="{ row }" slot="orderId">
                            <strong>{{ row.orderId }}</strong>
                            </template>
                            <template slot-scope="{ row }" slot="totalPrice">
                            ¥{{ row.totalPrice }}元
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="primary" size="small" style="margin-right: 5px" @click="toDetail(row)">查看详情</Button>
                            </template>
                        </Table>
                    </TabPane>
                    
                </Tabs>
            </Content>
        </Layout>
    </Content>
</template>

<script>
const axios = require("axios");
export default {
    data(){
        return {
                columns12: [
                    {
                        title: '订单编号',
                        slot: 'orderId'
                    },
                    {
                        title: '下单时间',
                        width: 200,
                        key: 'createdTime'
                    },
                    {
                        title: '总价',
                        key: 'totalPrice',
                        slot:'totalPrice'
                    },
                    {
                        title: '订单状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: [
                    {
                        orderId: '001',
                        orderTime: '2020/7/14',
                        totalPrice: 20.4,
                        orderState:'已完成'
                    },
                   {
                        orderId: '002',
                        orderTime: '2020/7/14',
                        totalPrice: 50,
                        orderState:'已完成'
                    },
                ],
                data:[],
                data1:[],
                data2:[],
                data3:[],
                finishedOrderList:[],
                unfinishedOrderList:[],
                value:"name1"
            }
    },
    mounted(){
        this.getOrderListByUserId();
        this.sortOrderList();
    },
    methods:{
        getOrderListByUserId(){
            axios.post('/CoffeeOrderService/api/ordermanage/getOrderListByUserId',{})
            .then(response=>{
                if(response.data.success){
                    this.data = response.data.data;
                    this.data3=this.data;
                    this.data1=this.data.filter(e=>e.status.indexOf("已完成")!==-1);
                    this.data2=this.data.filter(e=>e.status.indexOf("已创建")!==-1);
                    this.finishedOrderList=this.data1;
                    this.unfinishedOrderList= this.data2;
                }
                else{
                    this.$Message.error(response.data.msg)
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
        sortOrderList(){
            
            this.finishedOrderList=this.data.filter(e=>e.status.indexOf("已完成")!==-1);
            this.unfinishedOrderList=this.data.filter(e=>e.status.indexOf("已创建")!==-1);

        },
        toDetail(row){
            this.$router.push({name:"OrderDetail",query: {orderId: row.orderId,createdTime:row.createdTime,totalPrice:row.totalPrice,status:row.status}});
        },
        searchFinishedOrder(condition){
            if(this.value==="name1"){
                this.finishedOrderList=this.data1.filter(e=>e.createdTime.indexOf(condition)!==-1);
            }
            else if(this.value==="name2"){
                this.unFinishedOrderList=this.data2.filter(e=>e.createdTime.indexOf(condition)!==-1);
            }else{
                this.data=this.data3.filter(e=>e.createdTime.indexOf(condition)!==-1);
            }
        },
        resetData(){
            if(this.value==="name1"){
                this.finishedOrderList=this.data1;
                console.log(this.finishedOrderList);
            }
            else if(this.value==="name2"){
                this.unFinishedOrderList=this.data2;
            }else{
                this.data=this.data3;
                console.log(this.data3);
            }
        }
    }
}
</script>

<style scoped>

</style>