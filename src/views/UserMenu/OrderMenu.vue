<template>
            <Layout :style="{minHeight: '100vh'}">
                <Sider  hide-trigger collapsible width="auto" :collapsed-width="78" :style="{background: 'white'}">
                    <Menu :theme="light">
                        <Submenu name="1" >
                            <template slot="title">
                                <Icon type="ios-beer" />
                                饮品
                            </template>
                        </Submenu>
                        <Submenu name="2" >
                            <template slot="title">
                                <Icon type="ios-pizza-outline" />
                                小吃
                            </template>
                            <Menuitem v-for="(item,index) in menu" v-bind:key="index" ></Menuitem>
                        </Submenu>
                        <Submenu name="3" >
                            <template slot="title">
                                <Icon type="ios-pizza" />
                                主食
                            </template>
                        </Submenu>
                    </Menu>
                </Sider>
                <Content :style="{minwideth}">
                    <Card>
                        <Row type="flex" :style="{margin:'20px 0px '}">
                            <i-col span="6" v-for="(num,index) in 5" v-bind:key="index">
                                <Card style="width:320px">
                                    <div style="text-align:center">
                                        <img src="@/assets/coffee-logo.png">
                                        <h3>coffee</h3>
                                    </div>
                                     <Divider></Divider>
                                     <Row type="flex" :gutter="16">
                                         <i-col span="5" :style="{margin:'0 0 0 20'}">
                                            <b ><font color="green" size="3">xxx元</font></b>
                                         </i-col>
                                         <i-col span="4" offset="11">
                                            <Button icon="ios-cart-outline" type="error">添加</Button>
                                         </i-col>
                                     </Row>
                                </Card>
                            </i-col>
                        </Row>   
                    </Card>         
                </Content>
            </Layout>
</template>


<script>
export default {
    
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
