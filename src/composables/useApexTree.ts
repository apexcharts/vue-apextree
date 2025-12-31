import { ref, shallowRef, onUnmounted } from 'vue';
import ApexTree from 'apextree';
import type { GraphInstance, NodeData, TreeDirection } from '../types';

/**
 * composable for managing ApexTree instance
 * provides reactive tree management with imperative methods
 */
export function useApexTree() {
  const graphRef = shallowRef<GraphInstance | null>(null);
  const containerRef = ref<HTMLElement | null>(null);

  /**
   * renders tree in the container element
   */
  function render(
    container: HTMLElement,
    data: NodeData,
    options: Record<string, unknown>
  ): GraphInstance | null {
    // clear previous content
    container.innerHTML = '';

    // create new tree instance and render
    const tree = new ApexTree(container, options);
    const graph = tree.render(data as any) as GraphInstance;

    graphRef.value = graph;
    containerRef.value = container;

    return graph;
  }

  /**
   * changes tree layout direction
   */
  function changeLayout(direction?: TreeDirection): void {
    graphRef.value?.changeLayout(direction);
  }

  /**
   * collapses a node by id
   */
  function collapse(nodeId: string): void {
    graphRef.value?.collapse(nodeId);
  }

  /**
   * expands a node by id
   */
  function expand(nodeId: string): void {
    graphRef.value?.expand(nodeId);
  }

  /**
   * fits tree to screen
   */
  function fitScreen(): void {
    graphRef.value?.fitScreen();
  }

  /**
   * gets the underlying graph instance
   */
  function getGraph(): GraphInstance | null {
    return graphRef.value;
  }

  /**
   * cleans up container content
   */
  function cleanup(): void {
    if (containerRef.value) {
      containerRef.value.innerHTML = '';
    }
    graphRef.value = null;
  }

  // cleanup on unmount
  onUnmounted(cleanup);

  return {
    graphRef,
    containerRef,
    render,
    changeLayout,
    collapse,
    expand,
    fitScreen,
    getGraph,
    cleanup,
  };
}
