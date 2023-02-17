<script>
export default {
    name: "PhotoSelect",
    props: ["userData", "selectedPhotoId"],

    data() {
        return {
            selectedPhoto: {
                id: "",
                url: "url",
                username: "username",
                title: "title",
                description: "description",
                tags: "tags",
                created_at: "created_at",
                likes: "0",
                comments: "0",
            },
            commentsShown: false,
        };
    },

    methods: {
        toggleComments() {
            this.commentsShown ? (this.commentsShown = false) : (this.commentsShown = true);
        },
    },

    mounted() {
        let id = this.selectedPhotoId;

        console.log("PhotoSelect mounted(). this.selectedPhotoId :", this.selectedPhotoId);

        $fetch(`/api/image/` + id).then((data) => {
            this.selectedPhoto = data;
        });
    },
};
</script>

<template>
    <div v-if="this.selectedPhoto.id" id="overlay">
        <div id="photoNcomments">
            <div id="photo">
                <h4 @click="$emit('close-photo')" id="xBtn">X</h4>
                <img id="image" v-bind:src="selectedPhoto.url" v-bind:alt="selectedPhoto.description" />
                <div id="info">
                    <div id="stats">
                        <p>
                            <span>{{ selectedPhoto.title }} By: {{ selectedPhoto.username }}</span>
                        </p>
                        <p>
                            <span>{{ selectedPhoto.likes }} 🤍</span><span @click="toggleComments"> {{ selectedPhoto.comments }} 💬</span>
                        </p>
                    </div>
                    <p>{{ selectedPhoto.description }}</p>
                    <p>Tags: {{ selectedPhoto.tags }}</p>
                    <p>{{ selectedPhoto.created_at }}</p>
                </div>
            </div>
            <!-- <show-comments
        v-if="commentsShown"
        @close-comments="toggleComments"
        v-bind:image-id="image.id"
      >
      </show-comments> -->
        </div>
    </div>
</template>

<style scoped></style>
