<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="light" active-name="1">
                    <Row type="flex" align="middle" class="layout-logo" @click.native="toHome">
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
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="md-person"/>我的账户
                            </template>
                            <MenuItem name="ShoppingCart" @click.native="toCart">购物车</MenuItem >
                            <MenuItem name="center" @click.native="toAccount">个人中心</MenuItem >
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="md-help-circle" />帮&nbsp;助&nbsp;
                            </template>
                            <MenuItem name="4-1">网站条款</MenuItem >
                            <MenuItem name="4-2">常见问题</MenuItem >
                            <MenuItem name="4-3">订餐须知</MenuItem >
                            <MenuItem name="4-4">餐饮公示</MenuItem >
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Content>
                <slot></slot>
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
        toHome(){
            this.$router.push({name: 'Home'});
        },
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

.ivu-layout-header {
    background: #FFF;
    padding: 0 10%;
    height: 60px;
    line-height: 60px;
}
</style>
