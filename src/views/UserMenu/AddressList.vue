<template>
    <Content>
        <Layout :style="{minHeight: '300px',background:'#fff',padding:'20px '}">
            <Content>
                <Row type="flex" style="padding: 10px 0">
                    <i-col>
                        <Button type="primary" @click="modal=true">添加新地址</Button>
                    </i-col>
                </Row>
                <Table :data="data" :columns="columns">
                    <template slot-scope="{row}" slot="address">
                        {{row.provence}}&nbsp;{{row.city}}&nbsp;{{row.street}}&nbsp;{{row.address}}
                    </template>
                    <template slot-scope="{row,index}" slot="action">
                        <Button type="text" @click="changeAddress(index)">修改</Button>|
                        <Button type="text" @click="delAddress(row,index)">删除</Button>
                    </template>
                    <template slot-scope="{row,index}" slot="default">
                        <Button
                            type="text"
                            @click="setDefaultAddr(index)"
                            v-if="!row.isDefaultAddr"
                        >设为默认地址</Button>
                    </template>
                </Table>
                <Modal
                    v-model="modal"
                    title="添加地址"
                    ref="modal"
                    loading
                    @on-ok="newAddress"
                    ok-text="新建"
                >
                    <Form
                        :model="newAddressInfo"
                        label-position="left"
                        :rules="createAddrRules"
                        :label-width="100"
                        ref="form"
                    >
                        <FormItem label="收货人姓名" prop="receiver">
                            <Row type="flex">
                                <i-col span="6">
                                    <i-input placeholder="姓名" v-model="newAddressInfo.receiver"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="手机号码" prop="telephone">
                            <Row type="flex">
                                <i-col span="12">
                                    <i-input placeholder="+86" v-model="newAddressInfo.telephone"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="省份" prop="provence">
                            <Row type="flex">
                                <i-col span="8">
                                    <i-input placeholder="省份" v-model="newAddressInfo.provence"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="城市" prop="city">
                            <Row type="flex">
                                <i-col span="8">
                                    <i-input placeholder="城市" v-model="newAddressInfo.city"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="街道" prop="street">
                            <Row type="flex">
                                <i-col span="8">
                                    <i-input placeholder="街道" v-model="newAddressInfo.street"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="详细地址" prop="address">
                            <i-input
                                v-model="newAddressInfo.address"
                                type="textarea"
                                :rows="3"
                                placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等"
                            ></i-input>
                        </FormItem>
                        <FormItem>
                            <Checkbox v-model="newAddressInfo.isDefaultAddr">设置为默认地址</Checkbox>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    v-model="changemodal"
                    title="修改地址"
                    ref="AlterModal"
                    loading
                    @on-ok="submitChange"
                    ok-text="修改"
                >
                    <Form
                        :model="changeInfo"
                        label-position="left"
                        :rules="createAddrRules"
                        :label-width="100"
                        ref="changeform"
                    >
                        <FormItem label="收货人姓名" prop="receiver">
                            <Row type="flex">
                                <i-col span="6">
                                    <i-input placeholder="姓名" v-model="changeInfo.receiver"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="手机号码" prop="telephone">
                            <Row type="flex">
                                <i-col span="12">
                                    <i-input placeholder="+86" v-model="changeInfo.telephone"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="省份" prop="provence">
                            <Row type="flex">
                                <i-col span="8">
                                    <i-input placeholder="省份" v-model="changeInfo.provence"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="城市" prop="city">
                            <Row type="flex">
                                <i-col span="8">
                                    <i-input placeholder="城市" v-model="changeInfo.city"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="街道" prop="street">
                            <Row type="flex">
                                <i-col span="8">
                                    <i-input placeholder="街道" v-model="changeInfo.street"></i-input>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="详细地址" prop="address">
                            <i-input
                                v-model="changeInfo.address"
                                type="textarea"
                                :rows="3"
                                placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等"
                            ></i-input>
                        </FormItem>
                        <FormItem>
                            <Checkbox v-model="changeInfo.isDefaultAddr">设置为默认地址</Checkbox>
                        </FormItem>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    </Content>
</template>

<script>
import rules from "@/common/formRule.js";
const axios = require("axios");
export default {
    data() {
        return {
            columns: [
                {
                    title: "收货人",
                    key: "receiver"
                },
                {
                    title: "送餐地址",
                    slot: "address",
                    width:200
                },
                {
                    title: "电话",
                    key: "telephone",
                    width: 150
                },
                {
                    title: "操作",
                    slot: "action",
                    align: "center"
                },
                {
                    title: "设置",
                    slot: "default",
                    align: "center"
                }
            ],
            data: [],
            modal: false,
            changemodal:false,
            newAddressInfo: {
                isDefaultAddr: false,
                country: "中国",
                zipcode: "30000"
            },
            DefaultIndex: "",
            createAddrRules: rules.createAddr,
            changeInfo:{}
        };
    },
    mounted() {
        this.getAddress();
    },
    methods: {
       changeAddress(index){
            this.changeInfo={
                address: this.data[index].address,
                city: this.data[index].city,
                country: this.data[index].country,
                id: this.data[index].id,
                isDefaultAddr: this.data[index].isDefaultAddr,
                provence: this.data[index].provence,
                receiver:this.data[index].receiver,
                street: this.data[index].street,
                telephone: this.data[index].telephone,
                userId: this.data[index].userId,
                zipcode: this.data[index].zipcode,
            };
            this.changemodal=true;
        },
        submitChange(){
             this.$refs["changeform"].validate(valid => {
                 if(valid){
                     axios.post( "/CoffeeOrderService/api/usermanage/SaveAddrById",{...this.changeInfo})
                     .then(response=>{
                         if(response.data.success){
                             this.$Message.success("修改成功")
                             this.getAddress();
                         }
                         else{
                             this.$Message.error("修改失败")
                         }
                     })
                     .catch(error=>{
                         console.log(error)
                     })
                     .finally(()=>{
                         this.changemodal=false;
                     })
                 }
                 else{
                     this.$refs.AlterModal.buttonLoading = false;
                 }
             })
        },
        delAddress(row, index) {
            axios
                .post("/CoffeeOrderService/api/usermanage/DelAddrById", {
                    id: row.id
                })
                .then(response => {
                    if (response.data.success) {
                        this.$Message.success("删除成功");
                        this.data.splice(index, 1);
                    } else {
                        this.$Message.error("删除失败");
                        this.$Message.error(response.data.msg);
                    }
                });
        },
        newAddress() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    axios
                        .post(
                            "/CoffeeOrderService/api/usermanage/SaveAddrById",
                            {
                                ...this.newAddressInfo
                            }
                        )
                        .then(response => {
                            if (response.data.success) {
                                this.getAddress();
                                this.$Message.success("添加成功");
                            } else {
                                console.log("2");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            this.modal = false;
                        });
                }
                else{
                    this.$refs.modal.buttonLoading = false;
                }
            });
        },
        getAddress() {
            axios
                .post(
                    "/CoffeeOrderService/api/usermanage/getAddrListByUserId",
                    {}
                )
                .then(response => {
                    if (response.data.success) {
                        this.data = response.data.data;
                    } else {
                        this.$Message.error(response.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        setDefaultAddr(index) {
            this.data[index].isDefaultAddr=true;
            axios.post("/CoffeeOrderService/api/usermanage/SaveAddrById",{...this.data[index]})
            .then(response=>{
                if(response.data.success){
                    this.getAddress();
                }
                else{
                    this.data[index].isDefaultAddr=false;
                    this.$Message.error("设置失败，请刷新重试")
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
};
</script>

<style>
</style>