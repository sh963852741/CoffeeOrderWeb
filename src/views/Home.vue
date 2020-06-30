<template>
    <Row type="flex" justify="center">
        <i-col span="6">
            <Card title="页面跳转" icon="ios-options" :padding="0">
                <CellGroup>
                    <Cell v-for="(item, index) in routes" :key="index" :title="item.name" :to="{name: item.name}"/>
                </CellGroup>
            </Card>
        </i-col>
        <!--HelloWorld msg="Welcome to Your Vue.js App" /-->
    </Row>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import routes from '@/router/routerecords.js'
export default {
    // name: "Home",
    // components: {
    //     HelloWorld
    // },
    data() {
        return {
            routes
        }
    }
};
</script>
