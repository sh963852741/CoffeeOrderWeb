<template>
    <Card>
        <Row>
            <Avatar icon="ios-person" size="70" />
            <span class="large-label">{{this.menuName}}</span>
        </Row>
        <Row style="margin-top: 16px">
            <Tabs value="name1">
                <TabPane label="餐点列表" name="name1">
                    <Row type="flex" :gutter="16">
                        <i-col>
                            <Button type="primary" @click="modal = true">新建餐点</Button>
                        </i-col>
                        <i-col>
                            <Input search enter-button placeholder="请输入餐点名" @on-search="searchMeal"/>
                        </i-col>
                    </Row>
                    <Divider />
                    <Row>
                    <i-table border :columns="mealListHeader" :data="menuDetail">
                        <template slot-scope="{ row }" slot="action">
                            <Button type="primary" style="margin-right:15px;"  @click="toMealDetail(row)">详情</Button>
                            <Button type="error" @click="deleteMeal(row)">删除</Button>
                        </template>
                    </i-table>
                    </Row>
                </TabPane>
                <TabPane label="满意度分析" name="name2">
                    标签三的内容
                </TabPane>
            </Tabs>
        </Row>
        <Modal v-model="modal" title="新建餐点" loading @on-ok="asyncSubmit" ok-text="新建">
            <Form :model="mealInfo" label-position="left" :label-width="80">
                <FormItem label="餐点名">
                    <i-input v-model="mealInfo.mealName"></i-input>
                </FormItem>
                <FormItem label="餐点类别">
                    <i-input v-model="mealInfo.type" ></i-input>
                </FormItem>
                <FormItem label="餐点单价">
                    <i-input v-model="mealInfo.price" :number="true"></i-input>
                </FormItem>
                <FormItem label="餐点库存">
                    <i-input v-model="mealInfo.amount" :number="true"></i-input>
                </FormItem>
                <FormItem label="餐点详情">
                    <Input type="textarea" v-model="mealInfo.mealDetail" :autosize="{minRows: 3,maxRows: 5}" placeholder="相关餐点描述"/>
                </FormItem>
                <Upload action="/CoffeeOrderService/api/menu/uploadImg" :format="['jpg','jpeg','png']" :before-upload="beforeUpload">
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
                <div v-if="file.name">
                    <Tooltip content="单击下方新建按钮，图片将自动上传">
                        <Row>Upload file: {{ file.name }}</Row>
                    </Tooltip>
                </div>
            </Form>
        </Modal>
    </Card>
</template>

<script>
const axios = require("axios");
export default {
    data () {
        return {
            mealListHeader: [
                {
                    title: '餐点名',
                    key: 'mealName'
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
                    title: '操作',
                    key: 'action',
                    slot:'action',
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
            menuName:"",
            data:[],
            mealInfo:{},
            modal: false,
            file: {}
        }
    },
    mounted(){
        this.getMenuDetail();
    },
    created(){
        this.mealInfo.menuId=this.$route.query.menuId;
    },
    methods: {
        getMenuDetail(){
            axios.post("/CoffeeOrderService/api/menu/getMealByMenuId", {menuId:this.mealInfo.menuId})
            .then(response=>{
                this.menuName=response.data.menuName;
                this.data = response.data.data;
                this.menuDetail = this.data;
            })
            .catch(error=>{
                console.error(error);
            });
        },
        toMealDetail (row) {
            this.$router.push({name:"DishManager", query:{mealId: row.mealId}});
        },
        searchMeal(condition) {
            this.menuDetail = this.data.filter(e => e.mealName.indexOf(condition) !== -1 );
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
        },
        asyncSubmit(){
            axios.post("/CoffeeOrderService/api/menu/addMeal", {...this.mealInfo})
            .then(response=>{
                if(response.data.success){
                    let loadingCloser = this.$Message.loading("菜品新建成功，正在上传图片");
                    this.getMenuDetail();
                    this.upload(response.data.mealId, loadingCloser);
                }
            })
            .catch(error=>{
                if(error.response){
                    if(error.response.status >= 400 && error.response.status < 600)
                        this.$Message.error(error.message);
                    else
                        this.$Message.warning(error.message);
                }else {
                    this.$Message.error("无法发送请求");
                }
            })
            .finally(() => {
                this.modal = false;
            });
        },
        beforeUpload(file) {
            this.file = file;
            return false;
        },
        upload(mealId, loadingCloser) {
            // eslint-disable-next-line
            debugger
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('mealId', mealId);
            axios.post("/CoffeeOrderService/api/menu/uploadImg", formData, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response=>{
                if(response.data.success){
                    this.$Message.success("保存成功");
                }
            })
            .catch(error=>{
                if(error.response){
                    if(error.response.status >= 400 && error.response.status < 600)
                        this.$Message.error(error.message);
                    else
                        this.$Message.warning(error.message);
                } else {
                    this.$Message.error("无法发送请求");
                }
            })
            .finally(() => {
                loadingCloser();
            })
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