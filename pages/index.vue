<script setup>
import default_user from "../assets/default_user.jpeg";
</script>

<script>
export default {
    data() {
        return {
            userData: {
                id: "1",
                username: "test",
                email: "",
                picture: default_user,
                created_at: "",
            },
        };
    },
    methods: {
        logOut() {
            this.userData = {
                id: "",
                username: "",
                email: "",
                picture: default_user,
                created_at: "",
            };
        },
    },
};
</script>

<template>
    <div>
        <header><BoardHeader @logOut="logOut" v-bind:userData="userData" /></header>
        <main>
            <ImageBoard v-bind:userData="userData" />
        </main>

        <footer>
            <MoreButton />
        </footer>
    </div>
</template>

<style>
/* GLOBAL */
* {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
}

body {
    max-width: 100vw;
    margin: 0;
}

/* MENUS */
#overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-content: center;
    z-index: 2;
}

.menu {
    background-color: white;
    box-shadow: 0 0 10px black;
    border-radius: 2px;
    height: fit-content;
    align-self: center;
}

#xBtn {
    position: relative;
    text-align: right;
    margin: 4px 7px;
    color: grey;
    cursor: pointer;
}

/* FOOTER */
footer {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#board {
    padding-top: 60px;
    margin: 0 24px;
    columns: 3;
    grid-column-gap: 24px;
    align-items: start;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.column {
    display: grid;
    row-gap: 24px;
}

.imageDiv {
    width: 100%;
    cursor: zoom-in;
    overflow: hidden;
}

.image {
    width: 100%;
    object-fit: cover;
}

.imageOverlay {
    background-color: none;
    width: 100%;
    height: 99%;
    position: relative;
    top: -100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.3s;
    cursor: pointer;
}

.overlayText {
    text-align: center;
    opacity: 0;
    height: 0;
}

.imageOverlay:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

.imageOverlay:hover .overlayText {
    color: white;
    opacity: 1;
}

#photoNcomments {
    margin: 20px auto;
    display: flex;
    gap: 20px;
}

#photo {
    background-color: white;
    box-shadow: 0 0 10px black;
    border-radius: 2px;
}

#image {
    margin: 0 26px;
    max-height: 80%;
    object-fit: cover;
}

#info {
    margin: 0 26px;
}

#stats {
    display: flex;
    justify-content: space-between;
}

/* COMMENTS */
#commentsDiv {
    background-color: white;
    box-shadow: 0 0 10px black;
    border-radius: 2px;
    width: 400px;
    height: fit-content;
}

#commentsList {
    margin: 0 26px 26px 26px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.comment {
    background-color: whitesmoke;
    border-radius: 5px;
    padding: 5px 10px;
}

.date {
    font-size: 12px;
}
</style>
