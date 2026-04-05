import { shallowRef, onUnmounted } from 'vue'
import ApexTree from 'apextree'
import type { TreeOptions, NestedNode, TreeDirection } from 'apextree'
import type { GraphInstance } from '../types'

interface ApexTreeInstance {
  render(data: NestedNode): GraphInstance
  destroy(): void
}

/**
 * composable for managing ApexTree instance lifecycle
 * provides reactive tree management with imperative methods
 */
export function useApexTree() {
  const treeRef = shallowRef<ApexTreeInstance | null>(null)
  const graphRef = shallowRef<GraphInstance | null>(null)

  /**
   * renders tree in the container element; destroys any previous instance first.
   * onNodeClick is injected here rather than inside options so callers can
   * keep options stable and pass the callback separately.
   */
  function render(
    container: HTMLElement,
    data: NestedNode,
    options: Omit<Partial<TreeOptions>, 'onNodeClick'>,
    onNodeClick?: (node: unknown) => void
  ): GraphInstance | null {
    // destroy previous instance via the core API
    if (treeRef.value) {
      treeRef.value.destroy()
      treeRef.value = null
      graphRef.value = null
    }

    const mergedOptions: Partial<TreeOptions> = {
      ...options,
      ...(onNodeClick !== undefined && { onNodeClick }),
    }

    const tree = new ApexTree(container, mergedOptions)
    const graph = tree.render(data) as GraphInstance

    treeRef.value = tree as unknown as ApexTreeInstance
    graphRef.value = graph

    return graph
  }

  /**
   * changes tree layout direction
   */
  function changeLayout(direction?: TreeDirection): void {
    graphRef.value?.changeLayout(direction)
  }

  /**
   * collapses a node by id
   */
  function collapse(nodeId: string): void {
    graphRef.value?.collapse(nodeId)
  }

  /**
   * expands a node by id
   */
  function expand(nodeId: string): void {
    graphRef.value?.expand(nodeId)
  }

  /**
   * fits tree to screen
   */
  function fitScreen(): void {
    graphRef.value?.fitScreen()
  }

  /**
   * gets the underlying graph instance
   */
  function getGraph(): GraphInstance | null {
    return graphRef.value
  }

  /**
   * destroys the chart instance and releases resources
   */
  function destroy(): void {
    treeRef.value?.destroy()
    treeRef.value = null
    graphRef.value = null
  }

  // destroy on component unmount
  onUnmounted(destroy)

  return {
    graphRef,
    render,
    changeLayout,
    collapse,
    expand,
    fitScreen,
    getGraph,
    destroy,
  }
}
