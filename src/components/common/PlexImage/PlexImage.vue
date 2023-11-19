<template>
  <a-image :src="imageSrc" v-bind="$attrs" @error="onImageError" />
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { Image } from "ant-design-vue";

export default defineComponent({
  name: "HPlexImage",
  components: {
    AImage: Image,
  },
  props: {
    width: {
      type: Number,
      default: 360,
    },
    height: {
      type: Number,
      default: 360,
    },
    plexThumb: String,
    plexUrl: String,
    plexToken: String,
  },
  setup(props, { emit }) {
    let url = props.plexUrl || inject("plexUrl");
    let token = props.plexToken || inject("plexToken");

    let imageSrc = computed(() => {
      return (
        url +
        "/photo/:/transcode?width=" +
        props.width +
        "&height=" +
        props.height +
        "&minSize=1&upscale=1&url=" +
        props.plexThumb +
        "&X-Plex-Token=" +
        token
      );
    });

    const onImageError = () => {};
    return {
      imageSrc,
      onImageError,
    };
  },
});
</script>

<style lang="less" scoped></style>
