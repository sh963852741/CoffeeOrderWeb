<template>
    <Card>
        <Row>
            <Avatar icon="ios-person" size="70" />
            <span class="large-label">{{this.menuName}}</span>
        </Row>
        <Row style="margin-top: 16px">
            <Tabs value="name1">
                <TabPane label="餐点列表" name="name1">
                    <Row type="flex" :gutter="16">
                        <i-col>
                            <Button type="primary" @click="modal = true">新建餐点</Button>
                        </i-col>
                        <i-col>
                            <Input
                                search
                                enter-button
                                placeholder="请输入餐点名"
                                @on-search="searchMeal"
                            />
                        </i-col>
                    </Row>
                    <Divider />
                    <Row>
                        <i-table border :columns="mealListHeader" :data="menuDetail">
                            <template slot-scope="{ row }" slot="action">
                                <Button
                                    type="primary"
                                    style="margin-right:15px;"
                                    @click="toMealDetail(row)"
                                >详情</Button>
                                <Button type="error" @click="delconfirm(row)">删除</Button>
                            </template>
                        </i-table>
                    </Row>
                </TabPane>
                <TabPane label="满意度分析" name="name2">标签三的内容</TabPane>
            </Tabs>
        </Row>
        <Modal v-model="modal" title="新建餐点" ref="modal" loading @on-ok="asyncSubmit" ok-text="新建">
            <Form
                :model="mealInfo"
                label-position="left"
                :rules="createMealrules"
                :label-width="80"
                ref="form"
            >
                <FormItem prop="mealName" label="餐点名">
                    <i-input v-model="mealInfo.mealName"></i-input>
                </FormItem>
                <FormItem prop="type" label="餐点类别">
                    <Select
                        v-model="mealInfo.type"
                        filterable
                        allow-create
                        style="width:200px"
                        @on-create="addType"
                    >
                        <Option
                            v-for="item in mealType"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="mealName" label="餐点菜单">
                    <Select v-model="mealInfo.menuId" style="width:200px">
                        <Option
                            v-for="item in menuType"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="price" label="餐点单价">
                    <i-input v-model="mealInfo.price" :number="true"></i-input>
                </FormItem>
                <FormItem prop="amount" label="餐点库存">
                    <i-input v-model="mealInfo.amount" :number="true"></i-input>
                </FormItem>
                <FormItem prop="mealDetail" label="餐点详情">
                    <Input
                        type="textarea"
                        v-model="mealInfo.mealDetail"
                        :autosize="{minRows: 3,maxRows: 5}"
                        placeholder="相关餐点描述"
                    />
                </FormItem>
                <Upload
                    action="/CoffeeOrderService/api/menu/uploadImg"
                    :format="['jpg','jpeg','png']"
                    :max-size="1024"
                    :before-upload="beforeUpload"
                    :on-exceeded-size="handleMaxSize"
                >
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
                <div v-if="file.name!==null">
                    <Tooltip content="单击下方新建按钮，图片将自动上传">
                        <Row>Upload file: {{ file.name }}</Row>
                    </Tooltip>
                </div>
            </Form>
        </Modal>
    </Card>
</template>

<script>
import rules from "@/common/formRule.js";
const axios = require("axios");
export default {
    data() {
        return {
            mealListHeader: [
                {
                    title: "餐点名",
                    key: "mealName"
                },
                {
                    title: "单价",
                    key: "price"
                },
                {
                    title: "库存",
                    key: "amount"
                },
                {
                    title: "类别",
                    key: "type",
                    filters: [],
                    filterMethod(value, row) {
                        return row.type.indexOf(value) > -1;
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    slot: "action",
                    width: 180,
                    align: "center"
                }
            ],
            mealListContent: [
                {
                    mealName: "原味吮指鸡",
                    category: "小食",
                    unitPrice: "8",
                    inventory: "2000"
                },
                {
                    mealName: "柠檬鸡块",
                    category: "小食",
                    unitPrice: "7.5",
                    inventory: "2000"
                }
            ],
            typeList: [
                {
                    label: "主食",
                    value: "主食"
                },
                {
                    label: "小食",
                    value: "小食"
                },
                {
                    label: "饮品",
                    value: "饮品"
                }
            ],
            menuDetail: [],
            menuName: "",
            data: [],
            mealInfo: {},
            modal: false,
            delmodal: false,
            file: {},
            createMealrules: rules.createMeal,
            mealType: [],
            menuId: "",
            menuType: []
        };
    },
    mounted() {
        this.getMenuDetail();
        this.getmealtype();
        this.getMenuType();
    },
    created() {
        if (this.$route.query.menuId == undefined) {
            this.menuId = "";
        } else {
            this.menuId = this.$route.query.menuId;
        }
    },
    methods: {
        getMenuType() {
            axios
                .post("/CoffeeOrderService/api/menu/getMenuList", {})
                .then(response => {
                    if (response.data.success) {
                        this.menuType = [];
                        for (var p in response.data.data) {
                            this.menuType.push({
                                value: response.data.data[p].menuId,
                                label: response.data.data[p].menuName
                            });
                        }
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (
                            error.response.status >= 400 &&
                            error.response.status < 600
                        )
                            this.$Message.error(error.message);
                        else this.$Message.warning(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                });
        },
        getmealtype() {
            if (this.menuId) {
                axios.post("/CoffeeOrderService/api/menu/getMealByKind", { mealId: this.menuId })
                .then(response => {
                    if (response.data.success) {
                        this.mealType = [];
                        for (let val of response.data.data) {
                            this.mealType.push({
                                value: val,
                                label: val
                            });
                        }
                        this.mealListHeader[3].filters = this.mealType;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            } else {
                axios.post("/CoffeeOrderService/api/menu/getMealByKind", {})
                .then(response => {
                    if (response.data.success) {
                        this.mealType = [];
                        for (let val of response.data.data) {
                            this.mealType.push({
                                value: val,
                                label: val
                            });
                        }
                        this.mealListHeader[3].filters = this.mealType;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            }
        },
        getMenuDetail() {
            if (this.menuId) {
                axios.post("/CoffeeOrderService/api/menu/getMealByMenuId", {
                        menuId: this.menuId
                    })
                    .then(response => {
                        this.menuName = response.data.menuName;
                        this.data = response.data.data;
                        this.menuDetail = this.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                axios
                    .post("/CoffeeOrderService/api/menu/getAllMeal", {})
                    .then(response => {
                        this.menuName = "所有餐点";
                        this.data = response.data.data;
                        this.menuDetail = this.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        toMealDetail(row) {
            this.$router.push({
                name: "DishManager",
                query: { mealId: row.mealId }
            });
        },
        searchMeal(condition) {
            this.menuDetail = this.data.filter(
                e => e.mealName.indexOf(condition) !== -1
            );
        },
        deleteMeal(row) {
            axios
                .post("/CoffeeOrderService/api/menu/delMeal", {
                    mealId: row.mealId
                })
                .then(response => {
                    if (response.data.success) {
                        this.$Message.success("删除成功");
                        this.getMenuDetail();
                        this.getmealtype();
                    } else {
                        this.$Message.error("删除失败");
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (
                            error.response.status >= 400 &&
                            error.response.status < 600
                        )
                            this.$Message.error(error.message);
                        else this.$Message.warning(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                });
        },
        asyncSubmit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    axios
                        .post("/CoffeeOrderService/api/menu/addMeal", {
                            ...this.mealInfo
                        })
                        .then(response => {
                            if (response.data.success) {
                                let loadingCloser = this.$Message.loading(
                                    "菜品新建成功，正在上传图片"
                                );
                                this.getMenuDetail();
                                this.getmealtype();
                                this.upload(
                                    response.data.mealId,
                                    loadingCloser
                                );
                            }
                        })
                        .catch(error => {
                            if (error.response) {
                                if (
                                    error.response.status >= 400 &&
                                    error.response.status < 600
                                )
                                    this.$Message.error(error.message);
                                else this.$Message.warning(error.message);
                            } else {
                                this.$Message.error("无法发送请求");
                            }
                        })
                        .finally(() => {
                            this.modal = false;
                        });
                } else {
                    this.$refs.modal.buttonLoading = false;
                }
            });
        },
        beforeUpload(file) {
            this.file = file;
            return false;
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "文件大小超限",
                desc: "文件  " + file.name + " 太大，上传文件大小不能超过1M"
            });
        },
        upload(mealId, loadingCloser) {
            // eslint-disable-next-line
            debugger;
            let formData = new FormData();
            formData.append("file", this.file);
            formData.append("mealId", mealId);
            axios
                .post("/CoffeeOrderService/api/menu/uploadImg", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                .then(response => {
                    if (response.data.success) {
                        this.$Message.success("保存成功");
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (
                            error.response.status >= 400 &&
                            error.response.status < 600
                        )
                            this.$Message.error(error.message);
                        else this.$Message.warning(error.message);
                    } else {
                        this.$Message.error("无法发送请求");
                    }
                })
                .finally(() => {
                    loadingCloser();
                });
        },
        delconfirm(row) {
            this.$Modal.confirm({
                title: "删除提示",
                content: "<p>是否要删除此餐点?</p>",
                onOk: () => {
                    this.deleteMeal(row);
                },
                onCancel: () => {}
            });
        },
        addType(val) {
            this.mealType.push({
                value: val,
                label: val
            });
        }
    }
};
</script>

<style scoped>
.layout {
    border: 1px solid white;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.large-label {
    display: inline-block;
    font-size: 32px;
    margin: 10px;
    padding: 0 15px;
}
</style>