<template>
    <Row type="flex" justify="center">
        <i-col span="6">
            <Card title="页面跳转" icon="ios-options" :padding="0">
                <CellGroup>
                    <Cell v-for="(item, index) in routes" :key="index" :title="item.name" :to="{name: item.name}"/>
                </CellGroup>
            </Card>
        </i-col>
        <!--HelloWorld msg="Welcome to Your Vue.js App" /-->
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
    <div class="layout">
        <Layout>
            <Header :style="{background:'#fff'}">
                <Menu mode="horizontal" theme="light" active-name="1">
                    <div class="layout-logo">
                        <img src="../assets/color-logo.png" width="60px" height="40px" alt="coffee-logo" style="float:left;"/> 
                        <p style="float:left;line-height:40px;margin-top:6px;">全能咖啡厅</p>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="md-home" />
                            首&nbsp;页
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-paper" />
                            浏览菜单
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="md-cart" />
                            购物车
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="md-person" />
                            我的账户
                        </MenuItem>
                        <MenuItem name="5">
                            <Icon type="md-help-circle" />
                            <Dropdown>
                                <a href="javascript:void(0)"> 帮&nbsp;助&nbsp;
                                    <Icon type="md-arrow-dropdown" />
                                 </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>网站条款</DropdownItem>
                                    <DropdownItem>常见问题</DropdownItem>
                                    <DropdownItem>订餐须知</DropdownItem>
                                    <DropdownItem>餐饮公示</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0px 50px',background:'#fff',position:'relative'}">
                <Card dis-hover :bordered="false">
                    <Carousel v-model="value3" loop autoplay :autoplay-speed="3500" :radius-dot="true" arrow="never">
                        <CarouselItem>
                            <div class="demo-carousel">1</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">2</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">3</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">4</div>
                        </CarouselItem>
                    </Carousel>
                    <Card style="width: 285px;position:absolute;top:50px;right:50px;z-index:50;">
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
                            <Row type="flex" justify="center">
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
                </Card>
                
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                value3: 0,
                setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                }
            }
        },
        methods:{
            c(){

            }
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
}
.demo-carousel{
    height:450px;
    width:100%;
    background: cornflowerblue;
}
</style-->