<script>
export default {
    name: "MoreButton",

    data() {
        return {};
    },

    methods: {},
    components: {},
};
</script>

<template>
    <h3 @click="$emit('more-photos')" id="moreBtn" class="button">More</h3>
</template>

<style scoped>
#moreBtn {
    cursor: pointer;
    color: grey;
}

#moreBtn:hover {
    color: black;
}
</style>
