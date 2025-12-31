<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import type {
  ApexTreeProps,
  ApexTreeExposed,
  NodeData,
  TreeDirection,
} from '../types';
import { buildOptions } from '../utils';
import { useApexTree } from '../composables/useApexTree';

const props = withDefaults(defineProps<ApexTreeProps>(), {
  width: 400,
  height: 400,
  direction: 'top',
});

const containerRef = ref<HTMLElement | null>(null);

const {
  render,
  changeLayout,
  collapse,
  expand,
  fitScreen,
  getGraph,
} = useApexTree();

// compute options from props (excluding vue-specific props)
const options = computed(() => buildOptions(props));

/**
 * renders the tree with current data and options
 */
function renderTree(): void {
  if (!containerRef.value || !props.data) {
    return;
  }

  render(containerRef.value, props.data as NodeData, options.value);
}

// initial render
onMounted(() => {
  renderTree();
});

// watch for data changes (deep watch for nested updates)
watch(
  () => props.data,
  () => {
    renderTree();
  },
  { deep: true }
);

// watch for options changes
watch(
  options,
  () => {
    renderTree();
  },
  { deep: true }
);

// expose imperative methods
defineExpose<ApexTreeExposed>({
  changeLayout: (direction?: TreeDirection) => changeLayout(direction),
  collapse: (nodeId: string) => collapse(nodeId),
  expand: (nodeId: string) => expand(nodeId),
  fitScreen: () => fitScreen(),
  getGraph: () => getGraph(),
});
</script>

<template>
  <div
    ref="containerRef"
    :class="props.class"
    :style="props.style"
  />
</template>
