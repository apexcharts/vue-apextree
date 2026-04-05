<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { ApexTreeProps, ApexTreeExposed, ApexTreeEmits, TreeDirection } from '../types';
import type { NestedNode } from 'apextree';
import { useApexTree } from '../composables/useApexTree';

const props = defineProps<ApexTreeProps>();
const emit = defineEmits<ApexTreeEmits>();

const containerRef = ref<HTMLElement | null>(null);

const {
  render,
  changeLayout,
  collapse,
  expand,
  fitScreen,
  getGraph,
} = useApexTree();

/**
 * renders the tree with current data and options
 */
function renderTree(): void {
  if (!containerRef.value || !props.data) {
    return;
  }

  render(
    containerRef.value,
    props.data as NestedNode,
    props.options ?? {},
    (node) => emit('nodeClick', node)
  );
}

// initial render
onMounted(() => {
  renderTree();
});

// watch for data or options changes and re-render
watch(
  () => [props.data, props.options],
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
