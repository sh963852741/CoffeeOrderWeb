<template>
    <Card title="菜单列表管理">
        <Row type="flex" :gutter="16" align="middle">
            <i-col>
                <Button type="primary" @click="modal = true">新建菜单</Button>
            </i-col>
            <i-col>
                <Input search enter-button placeholder="搜索菜单名" @on-search="searchMenu"/>
            </i-col>
        </Row>
        <Divider />
        <Row>
            <i-table border :columns="menuListHeader" :data="menuListContent">
                <template v-slot:menuName="props">
                    {{props.row.menuName}}&nbsp;<Tag v-if="props.row.active" color="primary">已激活</Tag>
                </template>
                <template v-slot:action="props">
                    <Button type="primary" @click="toDetail(props.row)">详情</Button>
                    &nbsp;
                    <Button type="primary" :disabled="props.row.active" @click="setActive(props.row)">激活</Button>
                    &nbsp;
                    <Button type="error" @click="delMenu(props.row)">删除</Button>
                </template>
            </i-table>
        </Row>  
        <Modal v-model="modal" title="新建菜单" loading @on-ok="asyncSubmit" ok-text="新建">
            <Form :model="menuModel" label-position="left" :label-width="80">
                <FormItem label="菜单名">
                    <i-input v-model="menuModel.menuName"></i-input>
                </FormItem>
                <FormItem label="菜单类型">
                    <i-input v-model="menuModel.type"></i-input>
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
                menuModel: {},
                menuListHeader: [
                    {
                        title: '菜单名',
                        slot: 'menuName'
                    },
                    {
                        title: '类别',
                        key: 'type',
                        filters: [
                            {
                                label: '主食类',
                                value: '主食'
                            },
                            {
                                label: '小食类',
                                value: '小食'
                            },
                            {
                                label: '饮品类',
                                value: '饮品'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.type.indexOf(value) > -1;
                        }
                    },
                    {
                        title: '餐点数',
                        key: 'mealCount'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                menuListContent: [],
                menuList: []
            };
        },
        mounted(){
            this.getMenuList();
        },
        methods: {
            getMenuList(){
                axios.post("/CoffeeOrderService/api/menu/getMenuList", {})
                .then(response => {
                    this.menuList = response.data.data;
                    this.menuListContent = this.menuList;
                })
                .catch(error => {
                    if (error.response) {
                        this.$Message.error(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                });
            },
            setActive(row){
                axios.post("/CoffeeOrderService/api/menu/setMenuActive", {menuId: row.menuId})
                .then(response => {
                    if(response.data.success) this.getMenuList();
                    else this.$Message.error(response.data.msg);
                })
                .catch(error => {
                    if (error.response) {
                        this.$Message.error(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                });
            },
            toDetail(row) {
                this.$router.push({name:"MenuDetail", query: {menuId: row.menuId}});
            },
            searchMenu(condition) {
                this.menuListContent = this.menuList.filter(e => e.menuName.indexOf(condition) !== -1 );
            },
            delMenu(row) {
                axios.post("/CoffeeOrderService/api/menu/delMenu", {menuId: row.menuId})
                .then(response=>{
                    if(response.data.success){
                        this.$Message.success("删除成功");
                        this.getMenuList();
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
            asyncSubmit() {
                axios.post("/CoffeeOrderService/api/menu/addMenu", {...this.menuModel})
                .then(response => {
                    if(response.data.success){
                        this.$Message.success("新建成功");
                        this.getMenuList();
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status >= 400 && error.response.status < 600)
                            this.$Message.error(error.message);
                        else 
                            this.$Message.warning(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                })
                .finally(() => {
                    this.modal = false;
                });
            }
        }
    }
</script>

<style scoped>
</style>
