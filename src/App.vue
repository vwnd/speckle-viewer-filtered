<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Viewer, SpeckleLoader, CameraController } from "@speckle/viewer";
import { getObjectId } from "./lib/get-object-id";

const container = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!container.value) return;

  // Create viewer.
  const viewer = new Viewer(container.value);

  // Init loader.
  await viewer.init();

  // Extensions
  viewer.createExtension(CameraController);

  // Get object id
  const objectsIds = await getObjectId();

  // Create Loader
  for (const id of objectsIds) {
    const loader = new SpeckleLoader(
      viewer.getWorldTree(),
      `https://perkinswill.speckle.xyz/streams/e271025504/objects/${id}`,
      undefined,
      true
    );

    // Load object
    await viewer.loadObject(loader, false);
  }
});
</script>

<template>
  <div
    ref="container"
    style="height: 600px; width: 800px; background-color: aqua"
  />
</template>
