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
            <Button type="primary" class="button" @click="save">
                <Icon type="md-copy" />
                保存
            </Button>
        </div>
        <div :style="{padding:'0px 300px'}">
            <Form :model="mealInfo" label-position="left" :label-width="80">
                <FormItem label="餐点名称">
                    <Input v-model="mealInfo.mealName" placeholder="餐点名称"/>
                </FormItem>
                <!--Row type="flex" justify="center">
                    <i-col span="12"> 餐点数
                        <Input v-model="formTop.input" placeholder="Enter something..."/>
                    </i-col>
                    <i-col span="2"></i-col>
                    <i-col span="12"> 类别
                    <Select v-model="formItem.select">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    </i-col>
                </Row-->
                <FormItem label="餐点数量">
                    <Input v-model="mealInfo.mealNumber" placeholder="餐点数量"/>
                </FormItem>    
                <FormItem label="餐点类别">
                    <Select v-model="mealInfo.category">
                        <Option>主食</Option>
                        <Option>小食</Option>
                        <Option>饮品</Option>
                    </Select>
                </FormItem>
                <FormItem label="餐点详情">
                    <Input type="textarea" v-model="mealInfo.mealDetail" :autosize="{minRows: 3,maxRows: 5}" placeholder="相关餐点描述"/>
                </FormItem>
            </Form>
        </div>
        <div :style="{padding:'0px 300px',margin:'0px 0px 30px 0px'}">
            <Button type="primary" style="float:right;" @click="saveMealInfo">
                <Icon type="md-copy" />
                保存
            </Button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formItem: {
                    mealName: '',
                    mealNumber:'',
                    category: '',
                    mealDetail:'',
                },
                mealInfo:[]
            }
        },
        mounted(){
        this.getMealDetail();
         },
        methods:{
            getMealDetail(){
                axios.post(".....getMealDetail", {mealId: this.mealInfo.mealId})
                .then(response=>{
                    this.mealInfo = response.data;
                })
                .catch(error=>{
                    console.log(error);
                });
            },
            backward(){
                this.$router.push({name:'MenuDetail'});
            },
            saveMealInfo(){
                axios.post("........setMealInfo", {mealId: this.mealInfo.mealId, updates: {...this.mealInfo}})
                .then(response => {
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