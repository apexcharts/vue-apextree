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
  updateData,
  changeLayout,
  collapse,
  expand,
  fitScreen,
  expandAll,
  collapseAll,
  expandToDepth,
  focus,
  clearFocus,
  setActivePath,
  clearActivePath,
  toggleCard,
  zoom,
  centerOnNode,
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

/**
 * Reconciles a new dataset into the live tree, falling back to a full re-render
 * when the installed core predates `updateData` (apextree < 2.0.0).
 */
function applyData(): void {
  if (!props.data) {
    return;
  }
  if (!updateData(props.data as NestedNode)) {
    renderTree();
  }
}

// initial render
onMounted(() => {
  renderTree();
});

// Options are read at construction, so a change there needs a fresh instance.
watch(
  () => props.options,
  () => {
    renderTree();
  },
  { deep: true }
);

// A data change reconciles instead of rebuilding: surviving nodes spring to their
// new positions, new ids grow in, departed ones retract, and collapse state /
// selection / focus / expanded cards all survive. Before this, both watches shared
// one handler and every data change tore the chart down.
watch(
  () => props.data,
  () => {
    applyData();
  },
  { deep: true }
);

// expose imperative methods
defineExpose<ApexTreeExposed>({
  changeLayout: (direction?: TreeDirection) => changeLayout(direction),
  collapse: (nodeId: string) => collapse(nodeId),
  expand: (nodeId: string) => expand(nodeId),
  fitScreen: () => fitScreen(),
  updateData: (data: NestedNode) => {
    if (!updateData(data)) {
      renderTree();
    }
  },
  expandAll: () => expandAll(),
  collapseAll: () => collapseAll(),
  expandToDepth: (depth: number) => expandToDepth(depth),
  focus: (nodeId: string) => focus(nodeId),
  clearFocus: () => clearFocus(),
  setActivePath: (nodeIds: string[]) => setActivePath(nodeIds),
  clearActivePath: () => clearActivePath(),
  toggleCard: (nodeId: string) => toggleCard(nodeId),
  zoom: (factor: number) => zoom(factor),
  centerOnNode: (nodeId: string) => centerOnNode(nodeId),
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
