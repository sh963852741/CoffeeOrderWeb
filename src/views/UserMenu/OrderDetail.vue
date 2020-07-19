<template>
    <Content>
        <Layout :style="{minHeight: '300px',background:'#fff',padding:'10px 20px 10px 20px'}">
            <Content>
                <div style="font-size:20px;margin:0px 0px 10px 0;">   
                    订单明细
                 </div>
                 <Card>
                    <p class="info" style="">订单编号：100002321321-eefaa-112212</p>
                    <p slot="extra" style="font-size:17px;"><strong>已完成</strong></p>
                    <p class="info">订单内容：</p>
                    <Row type="flex">
                        <i-col span="2"></i-col>
                        <i-col span="20">
                            <!--Row type="flex" style="margin-bottom:10px;">
                                <i-col span="3">
                                    <Icon type="ios-pizza" size="70"/>
                                </i-col>
                                <i-col span="7">
                                    <p class="info2">香芋派</p>
                                </i-col>
                                <i-col span="7">
                                    <p class="info2">×2</p>
                                </i-col>
                                <i-col span="7">
                                   <p class="info2"> ¥20元</p>
                                </i-col>
                            </Row>

                             <Row type="flex" style="margin-bottom:10px;">
                                <i-col span="3">
                                    <Icon type="ios-pizza" size="70"/>
                                </i-col>
                                <i-col span="7">
                                    <p class="info2">香芋派</p>
                                </i-col>
                                <i-col span="7">
                                    <p class="info2">×2</p>
                                </i-col>
                                <i-col span="7">
                                   <p class="info2"> ¥20元</p>
                                </i-col>
                            </Row-->
                            <Table stripe :columns="columns1" :data="data1">
                               <template slot-scope="{ row }" slot="mealName">
                                   <Row type="flex">
                                       <i-col span="11">
                                            <img v-bind:src="row.mealPic" width="70px" height="70px"/>
                                       </i-col>
                                       <i-col span="13">
                                            <p style="padding:25px 0;float:left;"><strong>{{row.mealName}}</strong></p>
                                       </i-col> 
                                   </Row>
                               </template>
                               <template slot-scope="{ row }" slot="price">
                                   ¥{{row.price}}元
                               </template>
                               <template slot-scope="{ row }" slot="amount">
                                   ×{{row.amount}}
                               </template>
                               <template slot-scope="{ row }" slot="subtotal">
                                   ¥{{row.subtotal}}元
                               </template>
                            </Table>
                            <Row type="flex">
                                <i-col span="6">
                                    <p class="info">包装费：¥4元</p>
                                </i-col>
                                <i-col span="2"></i-col>
                                <i-col span="6">
                                    <p class="info">配送费：¥4元</p>
                                </i-col>
                                <i-col span="5"></i-col>
                                <i-col span="5">
                                     <p class="info" style="font-size:18px;"><strong>总计：¥28元</strong></p>
                                </i-col>
                            </Row>
                        </i-col> 
                        <i-col span="2"></i-col> 
                    </Row>
                    <p class="info" style="float:left;">配送地址：</p>
                    <p class="info" >福建省厦门市思明区滨海街道厦大学生公寓</p>
                    <p class="info">配送骑手：外卖小哥（联系方式：1390000000）</p>
                    <p class="info">下单时间：2020/7/14 22:39:30</p>
                    <p class="info">支付方式：微信支付</p>
                 </Card>
             </Content>
        </Layout>
    </Content>
</template>

<script>
export default {
    data(){
        return{
            columns1:[
                {
                    title:"餐点名称",
                    slot:"mealName",
                    width:200,
                    align: 'center'
                },
                {
                    title:"餐点单价",
                    slot:"price",
                    key:"price",
                },
                {
                    title:"餐点份数",
                    slot:"amount",
                    key:"amount"
                },
                {
                    title:"小计",
                    slot:"subtotal",
                    key:"subtotal",
                    width:120,
                }
            ],
            data1:[
                {
                    'mealPic':require('@/assets/coffee-logo.png'),
                    mealName:"香芋派",
                    price:10,
                    amount:2,
                    subtotal:20
                },
                {
                    'mealPic':require('@/assets/coffee-logo.png'),
                    mealName:"香芋派",
                    price:10,
                    amount:2,
                    subtotal:20
                },
            ]
        }
    }
}
</script>

<style scoped>
.info{
    margin: 10px 0;
    font-size:16.5px;
    
}
.info2{
    padding:25px 0;
    font-size:15px;
}
</style>