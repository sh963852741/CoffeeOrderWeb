<template>
    <Card title="订单列表管理">
        <Row type="flex" :gutter="16" align="middle">
            <i-col>
                <Button type="primary" @click="modal = true" disabled>新建订单</Button>
            </i-col>
            <i-col>
                <Button type="primary" @click="exportTable">导出Excel</Button>
            </i-col>
            <i-col>
                <Input search enter-button placeholder="按用户名搜索订单" @on-search="searchUser"/>
            </i-col>
        </Row>
        <Divider />
        <Row>
            <i-table border :columns="orderListHeader" :data="orderListContent" ref="orderTable">
                <template slot-scope="{row}" slot="action">
                    <Button type="primary" style="margin-right:15px;" @click="toOrderDetail(row)">详情</Button>
                </template>
            </i-table>
            <Page :total="dataCount" :page-size-opts="sizeArray" :page-size="pageSize" show-total show-sizer @on-page-size-change="pageSizeChange" @on-change="changePage" style="margin-top:15px;"/>
        </Row>
        <Modal v-model="modal" title="新建订单" loading  ok-text="新建">
            <Form :model="orderModel" label-position="left" :label-width="80">
                <FormItem label="订单名">
                    <i-input v-model="orderModel.orderName"></i-input>
                </FormItem>
                <FormItem label="订单类型">
                    <i-input v-model="orderModel.type"></i-input>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
const axios = require("axios");
    export default {
        data () {
            return {
                modal: false,
                dataCount: 0,
                pageSize:20,
                page:1,
                orderModel: {},
                sizeArray:[10,20,30,40,1000],
                orderListHeader: [
                    {
                        title: '用户名',
                        key: 'userName'
                    },
                    {
                        title: '总价',
                        key: 'totalPrice'
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                orderListContent: [],
                data:[]
            };
        },
        mounted(){
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                axios.post("/CoffeeOrderService/api/ordermanage/getAllOrder", {page: this.page, pageSize: this.pageSize})
                .then(response=> {
                    this.orderListContent = response.data.data;
                    this.orderListContent.forEach(v=>{
                        v.totalPrice = Math.round(v.totalPrice * 100) / 100;
                    })
                    this.data = this.orderListContent;
                    this.dataCount = response.data.totalRows;
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
            toOrderDetail(row) {
                this.$router.push({name:"adminOrderDetail", query:{orderId: row.orderId}});
            },
            changePage(index) {
                this.page = index;
                this.getOrderList();
            },
            pageSizeChange (pz) {
                this.pageSize = pz;
                this.getOrderList();
            },
            searchUser(condition) {
                this.orderListContent= this.data.filter(e => e.userName.indexOf(condition) !== -1 );
            },
            exportTable() {
                this.$refs.orderTable.exportCsv({
                    filename: "订单列表",
                    original: false,
                    columns: this.orderListHeader,
                    data: this.orderListContent
                });
            }
        }
    }
</script>

<style scoped>
</style>
