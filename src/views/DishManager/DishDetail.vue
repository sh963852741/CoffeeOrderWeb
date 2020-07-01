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
            <Form :model="formItem" label-position="left" :label-width="80">
                <FormItem label="餐点名称">
                    <Input v-model="formItem.mealName" placeholder="餐点名称"/>
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
                    <Input v-model="formItem.mealNumber" placeholder="餐点数量"/>
                </FormItem>    
                <FormItem label="餐点类别">
                    <Select v-model="formItem.category">
                        <Option>主食</Option>
                        <Option>小食</Option>
                        <Option>饮品</Option>
                    </Select>
                </FormItem>
                <FormItem label="餐点详情">
                    <Input type="textarea" v-model="formItem.mealDetail" :autosize="{minRows: 3,maxRows: 5}" placeholder="相关餐点描述"/>
                </FormItem>
            </Form>
        </div>
        <div :style="{padding:'0px 300px',margin:'0px 0px 30px 0px'}">
            <Button type="primary" style="float:right;" @click="save">
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
                }
            }
        },
        methods:{
            backward(){
                this.$router.push({name:'MenuDetail'});
            },
            save(){

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