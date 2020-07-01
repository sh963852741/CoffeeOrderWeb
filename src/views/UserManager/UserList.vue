<template>
    <div>
        <Row align="middle">
            <i-col span="5"  ><h3>用户列表</h3></i-col>
            <i-col span="6" offset="13"><i-input placeholder="请输入用户名进行搜索"> <i-button slot="append" icon="ios-search"></i-button></i-input></i-col>
        </Row>
        <br>
        <Row>
            <i-table stripe :columns="columns" :data="data">
            </i-table>    
        </Row>
    </div>
</template>

<script>
const axios = require("axios");
export default {
    data(){
        return{
            columns:[
                {
                    title:"用户名",
                    key:"用户名",
                    render :(h,params)=> {
                            return h('div',[
                                h('strong',params.row.用户名)
                            ]);
                        },
      
                },
                {
                    title:"用户ID",
                    key:"用户Id"
                },
                {
                    title:"电话",
                    key:"电话",
                    render :(h,params)=>{
                        if(params.row.电话=="")
                        return h('div',{},"暂无该数据");
                        else
                        return h('div',{},params.row.电话);
                    }
                },
                {
                    title:"邮箱",
                    key:"邮箱",
                     render :(h,params)=>{
                        if(params.row.邮箱=="")
                        return h('div',{},"暂无该数据");
                        else
                        return h('div',{},params.row.邮箱);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render :(h,params)=> {
                        return h('div',[
                            h('i-button',{
                                props:{
                                    type:'primary',
                                    size:'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on:{
                                    click:()=>{
                                        this.show(params.row);
                                    }
                                }
                            },'详情'),
                            h('i-button',{
                                props:{
                                    type:'error',
                                    size:'small',
                                },
                                on:{
                                    click:()=>{
                                        this.show(params.row)
                                    }
                                }
                            },'删除')
                        ]);
                    }
                }
            ],
            data:[]
        }
    },
    mounted(){
       this.getUserlist();
    },
    methods:{
        getUserlist(){
           axios.post("/api/usermanage/getUserList", {})
           .then(Response=>{
               console.log(Response.data);
               this.data=Response.data;
               console.log(this.data)
           })
           .catch(error=>{
               console.error(error);
           });
        },
        show(row){
            
            this.$router.push({name:"UserDetail",query:{name:this.data[row]}
            })
        }
    }
}
</script>

<style>
</style>