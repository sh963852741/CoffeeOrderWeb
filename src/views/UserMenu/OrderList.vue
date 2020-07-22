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
                            <strong>{{ row.orderId }}</strong><Tag color="gold" v-if="row.isTakeOut">外卖</Tag>
                            </template>
                            <template slot-scope="{ row }" slot="totalPrice">
                            ¥{{ row.totalPrice }}元
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="info" size="small" style="margin-right: 5px" v-if="row.status!='已完成'" @click="changeState(row.orderId,row.status)">{{nextState[row.status]}}</Button>
                                <Button type="primary" size="small" @click="toDetail(row)">查看详情</Button>
                            </template>
                        </Table>
                        <Page :total="allCount" :page-size="pageSize" show-total @on-change="changePage1" style="margin-top:15px;"/>
                    </TabPane>
                    <TabPane label="已完成" name="name2" @click="resetData">
                        <Table stripe :columns="columns12" :data="finishedOrderList">
                            <template slot-scope="{ row }" slot="orderId">
                            <strong>{{ row.orderId }}</strong><Tag color="gold" v-if="row.isTakeOut">外卖</Tag>
                            </template>
                            <template slot-scope="{ row }" slot="totalPrice">
                            ¥{{ row.totalPrice }}元
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="info" size="small" style="margin-right: 5px" v-if="row.status!='已完成'" @click="changeState(row.orderId,row.status)">{{nextState[row.status]}}</Button>
                                <Button type="primary" size="small" style="margin-right: 5px" @click="toDetail(row)">查看详情</Button>
                            </template>
                        </Table>
                        <Page :total="finishedCount" :page-size="pageSize" show-total @on-change="changePage2" style="margin-top:15px;"/>
                    </TabPane>
                    <TabPane label="待付款" name="name3" @on-click="resetData">
                        <Table stripe :columns="columns12" :data="unfinishedOrderList">
                            <template slot-scope="{ row }" slot="orderId">
                                <strong>{{ row.orderId }}</strong><Tag color="gold" v-if="row.isTakeOut">外卖</Tag>
                            </template>
                            <template slot-scope="{ row }" slot="totalPrice">
                            ¥{{ row.totalPrice }}元
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="info" size="small" style="margin-right: 5px" v-if="row.status!='已完成'" @click="changeState(row.orderId,row.status)">{{nextState[row.status]}}</Button>
                                <Button type="primary" size="small" style="margin-right: 5px" @click="toDetail(row)">查看详情</Button>
                            </template>
                        </Table>
                        <Page :total="unfinishedCount" :page-size="pageSize" show-total @on-change="changePage3" style="margin-top:15px;"/>
                    </TabPane>
                    <TabPane label="进行中" name="name4" @on-click="resetData">
                        <Table stripe :columns="columns12" :data="doingList">
                            <template slot-scope="{ row }" slot="orderId">
                            <strong>{{ row.orderId }}</strong><Tag color="gold" v-if="row.isTakeOut">外卖</Tag>
                            </template>
                            <template slot-scope="{ row }" slot="totalPrice">
                            ¥{{ row.totalPrice }}元
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="info" size="small" style="margin-right: 5px" v-if="row.status!='已完成'" @click="changeState(row.orderId,row.status)">{{nextState[row.status]}}</Button>
                                <Button type="primary" size="small" style="margin-right: 5px" @click="toDetail(row)">查看详情</Button>
                            </template>
                        </Table>
                        <Page :total="doingCount" :page-size="pageSize" show-total @on-change="changePage4" style="margin-top:15px;"/>
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
                        slot: 'orderId',
                        width: 350
                    },
                    {
                        title: '下单时间',
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
                finished:[],
                unfinished:[],
                doing:[],
                all:[],
                allCount:0,
                finishedCount:0,
                unfinishedCount:0,
                doingCount:0,
                pageSize:10,
                /*已完成 */
                finishedOrderList:[],
                /*待付款 */
                unfinishedOrderList:[],
                /*进行中 */
                doingList:[],
                value:"name1",
                nextState: {
                    "已创建":"付款",
                    "制作中":"取餐",
                    "配送中":"确认收货"
                },
                /*与上方的nextState key相同，只是对应的value改了个名字 点付款=传已完成 */
                changeStatus:{
                    "已创建":"制作中",
                    "制作中":"已完成",
                    "配送中":"已完成"
                }
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
                    for(let item of this.data){
                        item.createdTime = item.createdTime.substring(0, item.createdTime.length-2)
                    }
                    this.all=this.data;
                    this.finished=this.data.filter(e=>e.status.indexOf("已完成")!==-1);
                    this.unfinished=this.data.filter(e=>e.status.indexOf("已创建")!==-1);
                    this.doing = this.data.filter(e=>e.status.indexOf("配送中")!==-1||e.status.indexOf("制作中")!==-1);
                    this.finishedCount = this.finished.length;
                    this.unfinishedCount = this.unfinished.length;
                    this.allCount = this.all.length;
                    this.doingCount = this.doing.length;
                    if(this.allCount<this.pageSize) {
                        this.data = this.all;
                    } else {
                        this.data = this.all.slice(0,this.pageSize)
                    }
                    if(this.finishedCount<this.pageSize) {
                        this.finishedOrderList = this.finished;
                    } else {
                        this.finishedOrderList = this.finished.slice(0,this.pageSize)
                    }
                    if(this.unfinishedCount<this.pageSize) {
                        this.unfinishedOrderList = this.unfinished;
                    } else {
                        this.unfinishedOrderList = this.unfinished.slice(0,this.pageSize)
                    }
                    if(this.doingCount<this.pageSize) {
                        this.doingList = this.doing;
                    } else {
                        this.doingList = this.doing.slice(0,this.pageSize)
                    }
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
            this.$router.push({name:"OrderDetail",query:{orderId: row.orderId,},params: {createdTime:row.createdTime,totalPrice:row.totalPrice,status:row.status}});
        },
        searchFinishedOrder(condition){
            if(this.value==="name1"){
                this.data=this.all.filter(e=>e.createdTime.indexOf(condition)!==-1);
                console.log(this.data);             
            }
            else if(this.value==="name2"){
                this.finishedOrderList=this.finished.filter(e=>e.createdTime.indexOf(condition)!==-1);
            }else{
                this.unfinishedOrderList=this.unfinished.filter(e=>e.createdTime.indexOf(condition)!==-1);
            }
        },
        resetData(){
            if(this.value==="name2"){
                this.finishedOrderList=this.finished;
                console.log(this.finishedOrderList);
            }
            else if(this.value==="name3"){
                this.unfinishedOrderList=this.unfinished;
            }
            else if(this.value==="name4"){
                this.doingList = this.doing;
            }
            else{
                this.data=this.all;
                console.log(this.all);
            }
        },
        changePage1(index) {
            var start = (index-1)*this.pageSize;
            var end = index*this.pageSize;
            this.data = this.all.slice(start,end);
        },
        changePage2(index) {
            var start = (index-1)*this.pageSize;
            var end = index*this.pageSize;
            this.finishedOrderList = this.finished.slice(start,end);
        },
        changePage3(index) {
            var start = (index-1)*this.pageSize;
            var end = index*this.pageSize;
            this.unfinishedOrderList = this.unfinished.slice(start,end);
        },
        changePage4(index) {
            var start = (index-1)*this.pageSize;
            var end = index*this.pageSize;
            this.doingList = this.doing.slice(start,end);
        },
        changeState(orderId, status) {
            axios.post('/CoffeeOrderService/api/ordermanage/setOrderStatus',{orderId: orderId, targetStatus: this.changeStatus[status]})
            .then(response=>{
                if(response.data.success){
                    this.$Message.success("修改成功");
                    window.location.reload();
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
        }
    }
}
</script>

<style scoped>

</style>