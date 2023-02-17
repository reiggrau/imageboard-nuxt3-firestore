<script setup>
import LoginMenu from "./subcomponents/LoginMenu.vue";
import AddImageMenu from "./subcomponents/AddImageMenu.vue";

const props = defineProps({
    userData: {
        type: [Object],
    },
});
</script>

<template>
    <div class="header">
        <AddImageMenu />
        <h1 id="logo">
            <NuxtLink to="/" id="logoText"> imageBoard </NuxtLink>
        </h1>
        <LoginMenu @logOut="$emit('logOut')" v-bind:userData="userData" />
    </div>
</template>

<style scoped>
.header {
    width: 100%;
    margin: 0;
    height: 60px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
}

#logo {
    position: absolute;
    left: 43%;
}

#logoText {
    color: black;
    text-decoration: none;
}
</style>
