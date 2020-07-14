<template>
    <Content>
        <Layout :style="{minHeight: '300px',background:'#fff',padding:'0 0px 0 20px'}">
            <Content>
                <Row type="flex">
                    <i-col span="6">
                        <div style="font-size:20px;margin:10px 0px;">   
                            订单记录
                        </div>
                    </i-col>
                    <i-col span="8"></i-col>
                    <i-col span="10" style="padding:10px 0;">
                         <Input search enter-button placeholder="Enter something..." />
                    </i-col>
                </Row>
                        <!--Row type="flex" justify="center" style="height:45px;padding:10px;border:solid 1px grey;">
                             <i-col span="6">
                                 
                                 <span>
                                 订单编号：001
                                 </span>
                                 
                             </i-col>
                             <i-col span="6">
                                 <span>下单时间：2020/07/12</span>
                             </i-col>
                             <i-col span="6">
                                 <span>总价：</span>
                             </i-col>
                             <i-col span="6">
                                 <span>已完成</span>
                             </i-col>
                        </Row-->
                        <List border>
                            <ListItem>
                                 <!--Row  justify="center" type="flex">
                                    <i-col span="6">
                                             <span>
                                            订单编号：001
                                             </span>
                                 
                             </i-col>
                             <i-col span="6">
                                 <div style="width:100%">
                                  <span>下单时间：2020/07/12</span>
                                 </div>
                             </i-col>
                             <i-col span="6">
                                 <span>总价：</span>
                             </i-col>
                             <i-col span="6">
                                 <span>已完成</span>
                             </i-col>
                        </Row-->
                                <div style="width:25%;">
                                    <span>订单编号:001</span>
                                </div>
                                 <div style="width:25%;float:left;">
                                     <span>下单时间：2020/07/12</span>
                                </div>
                                <div style="width:25%;float:left;">
                                     <span>总价：24.50元</span>
                                </div>
                                <div style="width:25%;float:left;">
                                     <span>订单状态：已完成</span>
                                     <Button type="primary" size="small" style="float:right;">详情</Button>
                                </div>
                            </ListItem>
                             <ListItem>
                                 <div style="width:25%;">
                                    <span>订单编号:001</span>
                                </div>
                                 <div style="width:25%;float:left;">
                                     <span>下单时间：2020/07/12</span>
                                </div>
                                <div style="width:25%;float:left;">
                                     <span>总价：24.50元</span>
                                </div>
                                <div style="width:25%;float:left;">
                                     <span>订单状态：已完成</span>
                                     <Button type="primary" size="small" style="float:right;" @click="toDetail">详情</Button>
                                </div>
                             </ListItem>
                        </List>
                 
            </Content>
        </Layout>
    </Content>
</template>

<script>
export default {
    data(){
        
    }
}
</script>

<style scoped>

</style>