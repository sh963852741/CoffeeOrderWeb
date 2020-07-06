<template>
    <div>
        <div class="header">
            餐点信息
        </div>
        <div :style="{margin:'20px 0px'}">
            <Button class="button" @click="backward">
                <Icon type="ios-arrow-back" />
                返回
            </Button>
            <Button type="primary" class="button" @click="saveMealInfo">
                <Icon type="md-copy" />
                保存
            </Button>
        </div>
        <Row type="flex">
            <i-col span='7'></i-col>
            <i-col span='10'>
            <Form :model="mealInfo" label-position="left" :label-width="80">
                <FormItem label="餐点名称">
                    <!--Input v-model="mealInfo.mealName" placeholder="餐点名称"/-->
                    <Input :value="冰美式咖啡" placeholder="餐点名称"/>
                </FormItem>   
                <FormItem label="餐点类别">
                    <!--i-select v-model="mealInfo.type" >
                            <i-option v-for="(item,index) in menuType" v-bind:key="index" :value="item">{{item}}</i-option>
                    </i-select-->
                    <Select>
                        <Option>主食</Option>
                        <Option>小食</Option>
                        <Option>饮品</Option>
                    </Select>
                </FormItem>
                <FormItem label="餐点库存">
                    <!--Input v-model="mealInfo.amount" placeholder="餐点库存"/-->
                    <Input :value="200" placeholder="餐点库存"/>
                </FormItem>
                <FormItem label="餐点价格">
                    <!--Input v-model="mealInfo.price" placeholder="餐点价格"/-->
                    <Input :value="15" placeholder="餐点价格"/>
                </FormItem>
                <FormItem label="餐点详情">
                    <!--Input type="textarea" v-model="mealInfo.mealDetail" :autosize="{minRows: 3,maxRows: 5}" placeholder="相关餐点描述"/-->
                    <Input type="textarea" :value="这是一款用进口咖啡豆研磨的美式咖啡" :autosize="{minRows: 3,maxRows: 5}" placeholder="相关餐点描述"/>
                </FormItem>
                <Button type="primary" style="float:right;margin:0px 0px 30px 0px;" @click="saveMealInfo">
                <Icon type="md-copy" />
                保存
            </Button>
            </Form>
            </i-col>
        <i-col span="7"></i-col>
        </Row>
    </div>
</template>

<script>
const axios = require("axios");
export default {
    data () {
        return {
            formItem: {
                mealName: '',
                mealNumber:'',
                category: '',
                mealDetail:'',
            },
            mealInfo:{},
            menuType:[]
        }
    },
    created(){
        this.mealInfo.mealId=this.$router.query.mealId;
    },
    mounted(){
        this.getMealDetail();
        this.getMenuType();
        },
    methods:{
        getMealDetail(){
            axios.post("/api/menu/modifyMeal", {mealId: this.mealInfo.mealId})
            .then(response=>{
                this.mealInfo = response.data;
            })
            .catch(error=>{
                console.log(error);
            });
        },
        getMenuType(){
             axios.post("/api/menu/getMenuList", {})
            .then(response=>{
                this.menuType = response.data.type;
            })
            .catch(error=>{
                console.log(error);
            });
        },
        backward(){
            this.$router.push({name:'MenuDetail'});
        },
        saveMealInfo(){
            axios.post("/api/menu/modifyMeal", {mealId: this.mealInfo.mealId, 
            price:this.mealInfo.price,
            amount:this.mealInfo.amount,
            menuId:this.mealInfo.menuId,
            type:this.mealInfo.type})
            .then(response => {
                if(response.data.success){
                    this.$Message.success("保存成功");
                }
                else{
                    this.$Message.error("保存失败");
                }
                console.log(response);
            })
            .catch(error => {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    if (error.response.status >= 400 && error.response.status < 600)
                        this.$Message.error(error.message);
                    else 
                        this.$Message.warning(error.message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    this.$Message.error("构建请求时出错")
                }
            });
        }
    }
}
</script>

<style scoped>
.header{
    height:50px;
    border-bottom: 1px solid #d7dde4;
    background: white ;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    font-size: 25px;
}
.button{
    margin:0px 20px 0px 0px;
}
</style>
