<template>
    <component :is="layout" id="app">
        <template v-slot:default>
            <router-view />
        </template>
    </component>
</template>

<script>
import adminLayout from "@/layouts/admin.vue";
import emptyLayout from "@/layouts/empty.vue";
import userLayout from "@/layouts/user.vue";
export default {
    components: {
        'admin-layout': adminLayout,
        'empty-layout': emptyLayout,
        'user-layout':userLayout
    },
    data() {
        return{
            
        }
    },
    computed: {
        layout() {
            let layout = (this.$route.meta.layout || "empty") + "-layout";
            return layout;
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #515a6e;
}
</style>
