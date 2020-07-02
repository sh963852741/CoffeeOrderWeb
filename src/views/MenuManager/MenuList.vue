<!--template>
    <div class="layout">
        <Layout>
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed" style="background:#fff;padding:10px;">
                <Row>
                    <i-col span="18">
                        <Input  search placeholder="Enter something..." size="default"/>
                    </i-col>
                    <i-col span="6" style="padding:0 5px 0 0;">
                        <Icon type="ios-add-circle-outline" size="30" style="float:right;"/>
                    </i-col>
                </Row>
                <Menu active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
                    <MenuGroup title="所有菜单">
                        <MenuItem name="1-1">
                            <span>菜单 1 类</span>
                        </MenuItem>
                        <MenuItem name="1-2">
                            <span>菜单 2 类</span>
                        </MenuItem>
                         <MenuItem name="1-3">
                            <span>菜单 3 类</span>
                        </MenuItem>
                    </MenuGroup>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                    <Row type="flex" justify="center">
                        <i-col span="8">
                            <div style="font-size:25px;">类别</div>
                        </i-col>
                        <i-col span="8"></i-col>
                        <i-col span="8">
                            <Input :style="{margin:'17px 0px 0px 0px'}" search enter-button placeholder="Enter something..." />
                        </i-col>
                    </Row>
                </Header>
                <Content :style="{background: '#fff', minHeight: '220px'}">
                    <Table stripe :style="{margin: '10px 20px 20px 10px'}" :columns="menuListHeader" :data="menuListContent"></Table>
                </Content>
            </Layout>
        </Layout>
    </div>
</template-->

<template>
    <div>
        <div class="header">
            菜单列表管理
        </div>
        <div :style="{margin:'20px 0px'}">
            <Row type="flex">
                <i-col span="3">
                     <Button type="primary" @click="backward"> 新建菜单</Button>
                </i-col>
                <i-col span="8">
                     <Input search enter-button placeholder="请输入菜单名"  @on-search="searchMenu"/>
                </i-col>
            </Row> 
        </div>
        <i-table  border :style="{margin: '10px 0px 20px 0px'}" :columns="menuListHeader" :data="menuList">
            <template v-slot:action="props">
                <i-button style="margin-right:15px" type="primary" @click="toDetail(props.row)">详情</i-button>
                <i-button type="error">删除</i-button>
            </template>
        </i-table>
    </div>
</template>

<script>
const axios = require("axios");
    export default {
        data () {
            return {
                isCollapsed: false,
                menuCategoryList:[

                ],
                menuListHeader: [
                    {
                        title: '菜单名',
                        key: 'menuName'
                    },
                    {
                        title: '类别',
                        key: 'category',
                        filters: [
                            {
                                label: '主食类',
                                value: '主食'
                            },
                            {
                                label: '小食类',
                                value: '小食'
                            },
                            {
                                label: '饮品类',
                                value: '饮品'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.category.indexOf(value) > -1;
                        }
                    },
                    {
                        title: '餐点数',
                        key: 'mealNumber'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                    }
                ],
                 menuListContent: [
                    {
                        menuName: "主食1类",
                        category: "主食",
                        mealNumber: '15',
                    },
                   {
                        menuName: "主食2类",
                        category: "主食",
                        mealNumber: '15',
                    },
                   {
                        menuName: "主食3类",
                        category: "主食",
                        mealNumber: '15',
                    },
                   {
                        menuName: "主食4类",
                        category: "主食",
                        mealNumber: '15',
                    },
                ],
                menuList:[],
                data:[]
            };
        },
        mounted(){
            this.menuModify();
        },
        methods: {
           menuModify(){
                axios.post("/api/menu/menuModify", {})
           .then(response=>{
               this.data = response.data;
               this.menuList = this.data;
            })
           .catch(error=>{
               console.error(error);
            });
            },
            toDetail(row) {
                this.$router.push({name:"MenuDetail", query:{menuId: row.menuId}});
            },
            searchMenu(condition) {
            this.menuList = this.data.filter(e => e.menuName.indexOf(condition) !== -1 );
            }
        }
    }
</script>

<!--style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style-->

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
</style>