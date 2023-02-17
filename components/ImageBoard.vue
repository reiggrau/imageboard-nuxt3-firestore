<script setup>
import PhotoSelect from "./subcomponents/PhotoSelect.vue";
</script>

<script>
export default {
    props: ["userData"],
    data() {
        return {
            images: [[], [], []],
            imageIndex: 3,
            oldestId: 0,
            selectedPhotoId: null,
        };
    },

    methods: {
        selectImage(id) {
            console.log("selectImage id:", id);
            this.selectedPhotoId = id;
        },
        deselectImage() {
            console.log("deselectImage()");
            this.selectedPhotoId = undefined;
        },
    },

    mounted() {
        $fetch("/api/newest_images").then((data) => {
            console.log("useFetch data :", data);
            this.oldestId = data[0].id;

            for (let image of data) {
                this.images[this.imageIndex % 3].unshift(image);
                this.imageIndex++;
            }
        });
    },
};
</script>

<template>
    <div v-if="images" id="board">
        <div class="column" id="column0">
            <div v-for="image in images[0]" v-bind:key="image.id" @click="selectImage(image.id)" class="container">
                <img class="image" v-bind:src="image.url" v-bind:alt="image.id" />
                <div class="imageOverlay">
                    <h1 class="overlayText">{{ image.title }}</h1>
                </div>
            </div>
        </div>
        <div class="column" id="column0">
            <div v-for="image in images[1]" v-bind:key="image.id" @click="selectImage(image.id)" class="container">
                <img class="image" v-bind:src="image.url" v-bind:alt="image.id" />
                <div class="imageOverlay">
                    <h1 class="overlayText">{{ image.title }}</h1>
                </div>
            </div>
        </div>
        <div class="column" id="column0">
            <div v-for="image in images[2]" v-bind:key="image.id" @click="selectImage(image.id)" class="container">
                <img class="image" v-bind:src="image.url" v-bind:alt="image.id" />
                <div class="imageOverlay">
                    <h1 class="overlayText">{{ image.title }}</h1>
                </div>
            </div>
        </div>
        <PhotoSelect v-if="selectedPhotoId" v-bind:userData="userData" v-bind:selectedPhotoId="selectedPhotoId" @close-photo="deselectImage" />
    </div>
</template>

<style scoped></style>
