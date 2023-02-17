<script setup>
import add_image_pic from "../../assets/add-image.png";
</script>

<script>
export default {
    data() {
        return {
            imageMenu: false,
            newImage: {
                preview: add_image_pic,
                title: "",
                description: "",
                tags: "",
                path: "",
                file: undefined,
            },
        };
    },

    methods: {
        toggleImageMenu() {
            console.log("tggleImageMenu");
            this.imageMenu ? (this.imageMenu = false) : (this.imageMenu = true);
        },

        setImagePreview(e) {
            if (e.target.files && e.target.files[0]) {
                this.newImage.file = e.target.files[0];

                var reader = new FileReader();

                reader.onload = function (e) {
                    this.newImage.preview = e.target.result;
                }.bind(this);

                reader.readAsDataURL(e.target.files[0]);
            }
        },
    },
};
</script>

<template>
    <div>
        <h1 id="addBtn" class="button" @click="toggleImageMenu">+</h1>

        <div v-if="imageMenu" id="overlay">
            <div class="menu">
                <h4 @click="toggleImageMenu" id="xBtn">X</h4>
                <img id="preview" v-bind:src="newImage.preview" alt="image preview" />
                <form id="form" action="/image" method="post" enctype="multipart/form-data">
                    <input @change="setImagePreview" type="file" name="file" required />

                    <input v-model="newImage.title" type="text" name="title" placeholder="Title" required />
                    <input v-model="newImage.description" type="text" name="description" placeholder="Description" required />
                    <input v-model="newImage.tags" type="text" name="tags" placeholder="Tags" required />
                    <input type="button" value="Upload" @click="uploadImage" />
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
#addBtn {
    background-color: whitesmoke;
    height: min-content;
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
}

.button {
    cursor: pointer;
    color: grey;
}

.button:hover {
    color: black;
}

#preview {
    margin: 0 26px;
    max-height: 625px;
    object-fit: cover;
    background-color: silver;
}

#form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 0 26px 26px 26px;
}

.menu {
    background-color: white;
    box-shadow: 0 0 10px black;
    border-radius: 2px;
    height: fit-content;
    align-self: center;
}
</style>
