<!--template>
    <div class="layout">
        <Layout>
            <Header :style="{background:'#fff'}">
                <Menu mode="horizontal" theme="light" active-name="1">
                    <div class="layout-logo">
                        <img src="@/assets/coffee-logo.png" width="60px" height="40px" alt="coffee-logo" style="float:left;"/> 
                        <p style="float:left;line-height:40px;margin-top:6px;">全能咖啡厅</p>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1" :to="{name:'Home'}">
                            <Icon type="md-home" />
                            首&nbsp;页
                        </MenuItem>
                        <MenuItem name="2" :to="{name:'OrderMenu'}">
                            <Icon type="ios-paper" />
                            浏览菜单
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="md-cart" />
                            购物车
                        </MenuItem>
                        <MenuItem name="4" :to="{name:'OrderList'}">
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
                <Layout :style="{padding: '0 50px',background:'#fff'}" >
                    <Content :style="{margin:'10px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff',margin:'0 0 0px 0px'}" >
                            <div style="font-size:20px;margin:10px 0px;"> 
                                <Icon type="md-person" size="24"/>
                                我的账户
                            </div>
                                
                                     <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" >
                                    <MenuItem name="1" ><Icon type="ios-list-box" />追踪订单</MenuItem>
                                    <MenuItem name="2" :to="{name:'OrderList'}"><Icon type="ios-recording" />订单记录</MenuItem>
                                    <MenuItem name="3"><Icon type="ios-book" />地址簿</MenuItem>
                                    <MenuItem name="4"><Icon type="ios-person" />账户信息</MenuItem>
                                    <MenuItem name="5"><Icon type="ios-key" />修改密码</MenuItem>
                                    </Menu>
                           
                           
                        </Sider>
                        <slot></slot>
                    </Layout>
                </Content>
                </Layout>
            <Footer class="layout-footer-center">
                <Row type="flex" justify="space-between" style="background: rgb(160,115,50);color:white;">
                    <i-col span="6">
                        <List  :split="false" size="small">
                            <ListItem>
                                <h3>浏览菜单</h3>
                            </ListItem>
                            <ListItem>主食</ListItem>
                            <ListItem>小食</ListItem>
                            <ListItem>饮品</ListItem>
                        </List>
                    </i-col>
                    <i-col span="6">
                        <List :split="false" size="small">
                            <ListItem>
                                <h3>帮助</h3>
                            </ListItem>
                            <ListItem>网站条款</ListItem>
                            <ListItem>常见问题</ListItem>
                            <ListItem>订餐须知</ListItem>
                            <ListItem>餐饮公示</ListItem>
                        </List>
                    </i-col>
                    <i-col span="6"></i-col>
                    <i-col span="6"></i-col>
                </Row>
                <div style="height:50px;text-align:center;padding:16px 0px;color:white;border-top:1px solid #450f0f;">
                    2020 &copy; 精神小伙点餐吧
                </div>
            </Footer>
        </Layout>




    </div>
    
</template-->

<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="light" active-name="1">
                    <Row type="flex" align="middle" class="layout-logo" @click.native="$router.push({'name': 'Home'})">
                        <img src="@/assets/coffee-logo.png" width="60px" height="40px" alt="coffee-logo"/> 
                        <span>全能咖啡厅</span>
                    </Row>
                                      <div class="layout-nav">
                        <MenuItem name="Home" :to="{name:'Home'}">
                            <Icon type="md-home" />首&nbsp;页
                        </MenuItem>
                        <MenuItem name="OrderMenu" :to="{name:'OrderMenu'}">
                            <Icon type="ios-paper"/>浏览菜单
                        </MenuItem>
                        <MenuItem name="center" @click.native="toAccount">
                            <Icon type="md-person"/>我的账户
                        </MenuItem >
                        <MenuItem name="ShoppingCart" @click.native="toCart">
                            <Icon type="ios-cart"/>购物车
                        </MenuItem >
                    </div>
                </Menu>
            </Header>
            <Content>
                <Layout :style="{minHeight:'380px',margin:'50px 0',background: '#fff'}">
                    <Sider hide-trigger :style="{background: '#fff',padding:'20px 0px 0px 0px'}" >
                        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" >
                        <MenuGroup title="订单管理">
                            <MenuItem name="2" :to="{name:'OrderList'}"><Icon type="ios-recording" />订单记录</MenuItem>
                        </MenuGroup>
                        <MenuGroup title="用户信息">
                            <MenuItem name="3" :to="{name:'addressList'}"><Icon type="ios-book" />地址簿</MenuItem>
                            <MenuItem name="4" :to="{name: 'UserMenuCenter'}"><Icon type="ios-person" />账户信息</MenuItem>
                        </MenuGroup>
                        </Menu>  
                    </Sider>
                    <slot></slot>
                </Layout> 
            </Content>
            <Footer class="layout-footer-center">
                2020 &copy; 精神小伙点餐吧
            </Footer>
        </Layout>
    </div>
</template>


<script>
export default {
    methods:{
        toCart(){
            const {href} =this.$router.resolve({name: 'ShoppingCart'});
            window.open(href, '_blank');
        },
        toAccount(){
            const {href} =this.$router.resolve({name: 'OrderList'});
            window.open(href, '_blank');
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
    background: #FFF;
    border-radius: 3px;
    float: left;
    position: relative;
    margin-left: 64px;
    cursor: pointer; 
}
.layout-nav{
    width: 480px;
    margin: 0 auto;
    margin-right: 64px;
}
.layout-footer-center{
    text-align: center;
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

.ivu-layout-header {
    background: #FFF;
    padding: 0 10%;
    height: 60px;
    line-height: 60px;
}
.ivu-layout-content{
    padding: 0 10%;
}
</style>

