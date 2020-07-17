<template>
    <Card id="role-manager">
        <Row type="flex" :gutter="16">
            <i-col><Input placeholder="请输入角色名" v-model="newRole"/></i-col>
            <i-col><Button type="primary" @click="addRole" :loading="loading">添加角色</Button></i-col>
        </Row>
        <Divider/>
        <Collapse v-if="role.length">
            <Panel v-for="(item, index) in role" :key="index">
                {{item.roleName}}<a href="javascript:;" @click="removeRole(item.roleId)">[删除]</a>
                <div slot="content">
                    <div class="role-line">
                        <CheckboxGroup v-model="item.permission">
                            <Checkbox :key="k" v-for="(v, k) in all" :label="v.privilegeId">{{v.privilegeName}}</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <Button class="btn" :loading="item.loading" type="primary" @click="save(item)">提交</Button>
                </div>
            </Panel>
        </Collapse>
        <p v-else style="text-align: center;">暂无角色</p>
    </Card>
</template>
<script>
const axios = require("axios");
export default {
    mounted() {
        this.getRoleList();
    },
    data() {
        return{
            loading: false,
            newRole: "",
            all: [],
            role: []
        }
    },
    methods: {
        getRoleList() {
            axios.post("/CoffeeOrderService/api/usermanage/getRoleList", {})
            .then(response => {
                if(response.data.success) {
                    response.data.roleObj.forEach(v=>{
                        axios.post("/CoffeeOrderService/api/usermanage/getRolePri", {roleId: v.roleId})
                            .then(response => {
                                 this.role.push({roleName: v.roleName, roleId: v.roleId, loading: false, permission: response.data.permission.map(p=>p.privilegeId)})
                            })
                    })
                    this.all = response.data.permissions;
                } else {
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
        },
        save(item) {
            item.loading = true;
            axios.post("/CoffeeOrderService/api/usermanage/modifyRolePri", {roleId: item.roleId, permission: item.permission})
            .then(response => {
                if(response.data.success){
                    this.$Message.success("修改成功");
                    window.location.reload();
                } else {
                    this.$Message.error(response.data.msg);
                }
                item.location = false;
            })
            .catch(error => {
                console.log(error);
            });
        },
        addRole() {
            this.loading = true;
            axios.post("/CoffeeOrderService/api/usermanage/addRoleList", {roleName: this.newRole})
            .then(response => {
                if(response.data.success){
                    this.$Message.success("新增成功");
                    window.location.reload();
                } else {
                    this.$Message.error(response.data.msg);
                }
                this.loading = false;
            })
            .catch(error => {
                console.log(error);
            });
        },
        removeRole(id) {
            if (!confirm("是否删除该角色")) {
                return;
            }
            axios.post("/CoffeeOrderService/api/usermanage/removeRoleList", { roleId: id })
            .then(response => {
                if(response.data.success){
                    this.$Message.success("删除成功");
                    window.location.reload();
                } else {
                    this.$Message.error(response.data.msg);
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        change(item) {
            console.log(item)
        }
    }
}
</script>
<style scoped>
.role-line{
    padding: 16px 0px;
}
.role-line .ivu-checkbox-group {
    display: inline-block;
}
</style>