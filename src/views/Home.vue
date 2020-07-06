<template>
    <Row type="flex" justify="center">
        <i-col span="6">
            <Card title="页面跳转" icon="ios-options" :padding="0">
                <CellGroup>
                    <Cell v-for="(item, index) in routes" :key="index" :title="item.name" :to="{name: item.name}"/>
                </CellGroup>
            </Card>
        </i-col>
    </Row>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import routes from '@/router/routerecords.js'
export default {
    // name: "Home",
    // components: {
    //     HelloWorld
    // },
    data() {
        return {
            routes
        }
    }
};
</script>


<!--template>
            <Content :style="{padding: '0px 50px',background:'#fff',position:'relative'}">
                <div style="margin:16px 0px;">
                    <Carousel loop autoplay :autoplay-speed="3500" :radius-dot="true" arrow="never" style="border-radius: 3px;">
                        <CarouselItem >
                            <img src="../assets/carouselPic1.png" alt="carouselPic1" class="carousel-img"/>
                        </CarouselItem>
                        <CarouselItem >
                            <img src="../assets/carouselPic2.png" alt="carouselPic2" class="carousel-img"/>
                        </CarouselItem>
                        <CarouselItem>
                            <img src="../assets/carouselPic3.png" alt="carouselPic3" class="carousel-img"/>
                        </CarouselItem>
                    </Carousel>
                    <Card style="width: 285px;position:absolute;top:80px;right:90px;z-index:50;background-color: rgba(255, 255, 255, 0.8);" :bordered="false">
                        <List :split="false">
                            <Row type="flex" justify="center">
                                <i-col span="7"></i-col>
                                <i-col span="10" >
                                     <Icon type="ios-information-circle" size="24"/>
                                    <span> 开始订餐</span>
                                </i-col>
                                <i-col span="7"></i-col>
                            </Row>
                            <ListItem>
                                <Input prefix="md-person" placeholder="手机号/账号" clearable size="large"/>
                            </ListItem>
                            <ListItem :style="{padding:'8px 0px'}">
                                <Input  prefix="ios-lock" placeholder="密码" type="password" size="large"/>
                            </ListItem>
                            <ListItem :style="{padding:'0px'}">
                                <Checkbox :value="false" size="small">下次自动登录</Checkbox>
                            </ListItem>
                            <ListItem>
                                <Button type="primary" long size="large">登录</Button>
                            </ListItem>
                            <Row type="flex" justify="center" >
                                <i-col span="6" >
                                    <BreadcrumbItem to="/">注册用户</BreadcrumbItem>
                                </i-col>
                                <i-col span="12" ></i-col>
                                <i-col span="6">
                                    <BreadcrumbItem to="/">忘记密码</BreadcrumbItem>
                                </i-col>
                            </Row>
                         </List>
                    </Card>
                    <Row type="flex" justify="space-between" :style="{margin:'20px 0px'}">
                        <i-col>
                            <Card>
                                <div>
                                    <img src="../assets/coffee-logo.png" alt="coffee-logo2" class="pop-ups-img"/>
                                    <h2>新品推送</h2>
                                </div>
                            </Card>
                        </i-col>
                        <i-col>
                            <Card>
                                <div>
                                    <img src="../assets/coffee-logo.png" alt="coffee-logo2" class="pop-ups-img"/>
                                    <h2>新品推送</h2>
                                </div>
                            </Card>
                        </i-col>
                        <i-col>
                            <Card>
                                <div>
                                    <img src="../assets/coffee-logo.png" alt="coffee-logo2" class="pop-ups-img"/>
                                    <h2>新品推送</h2>
                                </div>
                            </Card>
                        </i-col>
                        <i-col>
                            <Card>
                                <div>
                                    <img src="../assets/coffee-logo.png" alt="coffee-logo2" class="pop-ups-img"/>
                                    <h2>新品推送</h2>
                                </div>
                            </Card>
                        </i-col>
                    </Row>
                </div>
            </Content>
</template>


<script>
    export default {
        data () {
            return {
            }
        },
        methods:{
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
</style-->