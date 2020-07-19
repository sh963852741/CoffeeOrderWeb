<template>
    <Content>
        <Layout :style="{minHeight: '300px',background:'#fff',padding:'20px '}">
            <Content>
                <Row type="flex">
                    <i-col span="6">
                        <div style="font-size:20px;margin:10px 0;">地址薄</div>
                    </i-col>
                    <i-col span="12"></i-col>
                    <i-col span="6" style="padding:10px 0;">
                        <Button type="primary" @click="modal=true">添加新地址</Button>
                    </i-col>
                </Row>
                <Table :data="data" :columns="columns">
                    <template slot-scope="{row,index}" slot="action">
                        <Button type="text" @click="changeAddress(row,index)">修改</Button>|
                        <Button type="text" @click="delAddress(row,index)">删除</Button>
                    </template>
                    <template slot-scope="{row,index}" slot="default">
                        <Button type="text" @click="setDefault(row,index)">设为默认地址</Button>
                    </template>
                </Table>
                <Modal
                    v-model="modal"
                    title="添加地址"
                    ref="modal"
                    loading
                    @on-ok="asyncSubmit"
                    ok-text="新建"
                >

                    <Form
                        :model="addressInfo"
                        label-position="left"
                        :label-width="100"
                        ref="form"
                    >
                        <FormItem label="地址信息">
                            <i-input></i-input>
                        </FormItem>
                        <FormItem label="详细地址">
                            <i-input></i-input>
                        </FormItem>
                        <FormItem label="收货人姓名">
                            <i-input></i-input>
                        </FormItem>
                        <FormItem label="手机号码">
                            <i-input></i-input>
                        </FormItem>
                        <FormItem>
                            <Checkbox v-model="addressInfo.isdefault">设置为默认地址</Checkbox>
                        </FormItem>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    </Content>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: "收货人",
                    key: "people"
                },
                {
                    title: "送餐地址",
                    key: "address"
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
            data: [
                {
                    people: "123",
                    address: "dw",
                    telephone: "123456789"
                }
            ],
            modal: false,
            addressInfo:{}
        };
    },
    methods: {
        changeAddress(row, index) {
            console.log(row, index);
        },
        delAddress(row, index) {
            console.log(row, index);
        },
        newAddress() {},
        getAddress() {},
        asyncSubmit(){

        }
    }
};
</script>

<style>
</style>