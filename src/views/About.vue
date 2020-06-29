<template>
    <Row>
        <span>{{inputValue}}</span>
        <Input :value="inputValue"/>
        <Button @click="getUserList">点我</Button>
    </Row>
</template>


<script>
export default {
    data() {
        return {
            inputValue: "123"
        };
    },
    mounted() {
        // setTimeout(() => {
        //     this.inputValue = "456";
        // }, 1000);
    },
    methods: {
        getUserList() {
            this.inputValue = "456";
        }
    }
}
</script>

<style>

</style>