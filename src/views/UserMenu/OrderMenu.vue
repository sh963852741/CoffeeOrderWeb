<template>
    <Layout style="margin: 50px 10%" :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
        <Sider style="background-color: #FFF">
            <Affix>
                <Menu width="auto" theme="light" active-name="0">
                    <MenuItem name="0" @click.native="toAllmeal">
                        <Icon type="ios-pizza" />
                            全部
                    </MenuItem>
                    <MenuItem v-for="(value,key) in sortMeal" :key="key" :name="key" @click.native="toSpecialMeal(key)">
                        <Icon type="ios-pizza"  />
                            {{key}}
                    </MenuItem>
                </Menu>
            </Affix>
        </Sider>
        <Content>
            <Row type="flex" style="margin: 0 24px">
                <i-col span="6" style="margin-bottom: 24px" v-for="(item,index) in meal" v-bind:key="index">
                    <Card style="width: 80%">
                        <div style="text-align:center">
                            <img src="@/assets/coffee-logo.png">
                            <h3>{{item.mealName}}</h3>
                        </div>
                        <Divider></Divider>
                        <Row type="flex" justify="space-between" align="middle">
                            <i-col>
                                <b ><font color="green" size="3">{{item.price}}元</font></b>
                            </i-col>
                            <i-col>
                                <Button icon="ios-cart-outline" type="error" @click="addShopCard(item.mealId,item.mealName,item.price)">添加</Button>
                            </i-col>
                        </Row>
                    </Card>
                </i-col>
            </Row>  
        </Content>
    </Layout>
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
        addShopCard(id,name,mprice)
        {
             axios.post("/CoffeeOrderService/api/shoppingcart/addShoppingCart",{mealId:id,mealName:name,price:mprice})
             .then(response=>{
                 if(response.data.success){
                     this.$Message.success("添加成功");
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

</style>
