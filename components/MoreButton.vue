<script>
export default {
  name: "MoreButton",

  data() {
    return {
      moreButton: true,
    };
  },

  methods: {},
  components: {},
};
</script>

<template>
  <h3 @click="moreImages" v-if="moreButton" id="moreBtn" class="button">
    More
  </h3>
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
