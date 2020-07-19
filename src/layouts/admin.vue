<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">咖啡厅点餐系统</div>
                    <div class="layout-nav">
                        <Dropdown>
                            <Button ghost type="text">
                                {{login ? userInfo.userName : "未登录"}}
                                <Icon type="ios-arrow-down"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="profile" @click.native="$router.push({'name': 'UserCenter'})">个人中心</DropdownItem>
                                <DropdownItem name="logout" @click.native="logout">注销</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu :active-name="activeMenu" theme="light" width="auto" :open-names="['1','2','3']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                菜单与菜品管理
                            </template>
                            <MenuItem name="MenuList" :to="{name: 'MenuList'}">菜单管理</MenuItem>
                            <MenuItem name="MenuDetail" :to="{name: 'MenuDetail'}">菜品管理</MenuItem>
                            <MenuItem name="MenuAnalyze" :to="{name: 'MenuAnalyze'}">菜品分析</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="UserList" :to="{name: 'UserList'}">用户列表</MenuItem>
                            <MenuItem name="2-2" :to="{name: 'RoleManager'}">角色管理</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                订单管理
                            </template>
                            <MenuItem name="adminOrderList" :to="{name: 'adminOrderList'}">订单列表</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                系统配置
                            </template>
                            <MenuItem name="4-1">关于</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '24px'}">
                    <Content :style="{padding: '0px', minHeight: '0px', background: '#fff'}">
                        <slot></slot>
                    </Content>
                    <Footer class="layout-footer-center">2020 &copy; 精神小伙点餐吧</Footer>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    const axios = require("axios");
    export default {
        data() {
            return {
                activeMenu: this.$route.name,
                userInfo: {},
                login: false
            }
        },
        mounted() {
            this.getUserInfo();
        },
        methods: {
            logout() {
                axios.post("/CoffeeOrderService/api/usermanage/logout", {})
                .then(response => {
                    if(response.data.success) {
                        this.$Message.success("注销成功");
                    } else {
                        this.$Message.warning(response.data.msg || "未知错误");
                    }
                    setTimeout(() => {
                        this.$router.push({name: "LogIn"});
                    }, 2000);
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status >= 400 && error.response.status < 600)
                            this.$Message.error(error.message);
                        else 
                            this.$Message.warning(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                });
            },
            getUserInfo() {
                axios.post("/CoffeeOrderService/api/usermanage/getUserInfo", {})
                .then(response => {
                    if(response.data.success) {
                        this.userInfo = response.data;
                        this.login = true;
                    } else {
                        if(response.data.errorcode === 403)
                        this.login = false;
                        else
                        this.$Message.warning(response.data.msg || "未知错误");
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status >= 400 && error.response.status < 600)
                            this.$Message.error(error.message);
                        else 
                            this.$Message.warning(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                });
            }
        },
        watch: {
            $route(to) {
                this.activeMenu = to.name;
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
    width: 250px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>