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
            oldestImage: null,
            selectedPhotoId: null,
            moreButton: true,
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
        morePhotos() {
            console.log("morePhotos() oldestImage :", this.oldestImage);
            $fetch("/api/more_images/" + this.oldestImage).then((data) => {
                console.log("useFetch data :", data);
                const imageArr = data;

                if (imageArr.length < 6) {
                    this.moreButton = false;
                }

                this.oldestImage = imageArr[imageArr.length - 1].id;
                console.log("oldestImage title :", imageArr[imageArr.length - 1].title, " id :", this.oldestImage);

                for (let image of imageArr) {
                    this.images[this.imageIndex % 3].push(image);
                    this.imageIndex++;
                }
            });
        },
    },

    mounted() {
        $fetch("/api/newest_images").then((data) => {
            console.log("useFetch data :", data);
            const imageArr = data;

            if (imageArr.length < 6) {
                this.moreButton = false;
            }

            this.oldestImage = imageArr[imageArr.length - 1].id;
            console.log("oldestImage title :", imageArr[imageArr.length - 1].title, " id :", this.oldestImage);

            for (let image of imageArr) {
                this.images[this.imageIndex % 3].push(image);
                this.imageIndex++;
            }
        });
    },
};
</script>

<template>
    <div>
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
        <footer>
            <MoreButton v-if="moreButton" @more-photos="morePhotos" />
        </footer>
    </div>
</template>

<style scoped></style>
