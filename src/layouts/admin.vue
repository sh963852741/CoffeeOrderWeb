<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">咖啡厅点餐系统</div>
                    <div class="layout-nav"></div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                菜单与菜品管理
                            </template>
                            <MenuItem name="1-1" :to="{name: 'MenuList'}">菜单管理</MenuItem>
                            <MenuItem name="1-2">菜品管理</MenuItem>
                            <MenuItem name="1-3">菜品分析</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="2-1" :to="{name: 'UserList'}">用户列表</MenuItem>
                            <MenuItem name="2-2">角色管理</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                系统配置
                            </template>
                            <MenuItem name="3-1">关于</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <slot></slot>
                    </Content>
                    <Footer class="layout-footer-center">2020 &copy; 精神小伙点餐吧</Footer>
                </Layout>
            </Layout>
        </Layout>
    </div>
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
    width: 100px;
    height: 30px;
    line-height: 30px;
    color: #FFFFFF;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>