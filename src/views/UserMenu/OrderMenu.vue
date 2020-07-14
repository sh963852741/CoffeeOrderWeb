<template>
    <Content>
    <Layout :style="{minHeight: '50vh'}">
        <Sider  hide-trigger collapsible width="240" :collapsed-width="78" :style="{background: 'white'}">
            <Menu theme="light" active-name="0" :style="{minwidth:300}">
                 <MenuItem name="0" @click.native="toAllmeal">
                    <Icon type="ios-pizza" />
                        全部
                </MenuItem>
                <MenuItem v-for="(value,key) in sortMeal" :key="key" :name="key" @click.native="toSpecialMeal(key)">
                    <Icon type="ios-pizza"  />
                        {{key}}
                </MenuItem>
            </Menu>
        </Sider>
        <Content >
            <Card :bordered="false">
                <Row type="flex" :style="{margin:'20px 0px '}" >
                    <i-col span="6" v-for="(item,index) in meal" v-bind:key="index"  style="margin-bottom:20px;">
                        <Card style="width:220px" >
                            <div style="text-align:center">
                                <img src="@/assets/coffee-logo.png">
                                <h3>{{item.mealName}}</h3>
                            </div>
                            <Divider></Divider>
                            <Row type="flex">
                                <i-col span="8">
                                    <b ><font color="green" size="3">{{item.price}}元</font></b>
                                </i-col>
                                <i-col span="8"></i-col>
                                <i-col span="8" >
                                    <Button icon="ios-cart-outline" type="error" size="small">添加</Button>
                                </i-col>
                            </Row>
                        </Card>
                    </i-col>
                </Row>   
            </Card>       
        </Content>
    </Layout>
    </Content>
</template>


<script>
const axios = require("axios");
export default {
    data(){
        return{
            meal:[],
            allMeal:[],
            sortMeal:{},
            nowtitle:{title:""},
            userInfo:{}
        }
    },
    mounted(){
       this.getAllmeal();
       this.nowtitle.title="全部";
       this.getmealbysort();
    },
    methods:{
        toAllmeal(){
            this.meal=this.allMeal;
            this.nowtitle.title="全部";
        },
        toSpecialMeal(key){
            this.meal=this.sortMeal[key];
            this.nowtitle.title=key;
        },
        getAllmeal()
        {
            axios.post("/CoffeeOrderService/api/menu/getAllMeal",{})
            .then(response=>{
                if(response.data.success){
                    this.meal=response.data.data;
                    this.allMeal=this.meal;
                }
                else{
                    this.$Message.error(response.data.msg);
                }
            })
            .catch(error=>{
                console.error(error.data)
            })
        },
        getmealbysort()
        {
            axios.post("/CoffeeOrderService/api/menu/getMealBySort",{})
            .then(response=>{
                if(response.data.success){
                    this.sortMeal=response.data.data
                }
            })
            .catch(error=>{
                console.error(error.data)
            })
        },
        addShopCard(id,mprice)
        {
             axios.post("/CoffeeOrderService/api/shoppingcart/addShoppingCart",{mealId:id,price:mprice})
             .then(response=>{
                 if(response.data.success){
                     this.$Message.success("添加成功");
                     this.getAllShop();
                 }else{
                     this.$Message.error(response.data.msg)
                 }
             })
             .catch(error=>{
                 this.$Message.error(error.data.msg)
             })
        },
    }
    
}
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 300px;
    height: 40px;
    background: white;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 20px;
    font-size:25px;
}
.layout-nav{
    width: 555px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
    background: rgb(160,115,50);
}
.demo-carousel{
    height:430px;
    background: cornflowerblue;
    font-size: 30px;
}
.ivu-card-body{
    padding:auto 0px;
}
.carousel-img{
    height:430px;
    width:100%;
    border-radius: 5px;
}
.pop-ups-img{
    width:230px;
    height:150px;
}

.header{
    height:50px;
    background: white ;
    position: relative;
    overflow: hidden;
    font-size: 25px;
}

</style>
