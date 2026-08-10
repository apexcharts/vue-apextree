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
   * reconciles a new dataset into the live tree: surviving nodes spring to their
   * new positions, new ids grow in, departed ones retract, and collapse state /
   * selection / focus / expanded cards survive.
   *
   * Returns false when the installed core predates `updateData`
   * (apextree < 2.0.0, which the `>=1.9.0` peer range still allows), so the
   * caller can fall back to a full re-render.
   */
  function updateData(data: NestedNode): boolean {
    const graph = graphRef.value
    if (!graph || typeof graph.updateData !== 'function') {
      return false
    }
    graph.updateData(data)
    return true
  }

  /**
   * changes tree layout direction
   */
  function changeLayout(direction?: TreeDirection): void {
    graphRef.value?.changeLayout(direction)
  }

  /**
   * expands every node in the tree
   */
  function expandAll(): void {
    graphRef.value?.expandAll()
  }

  /**
   * collapses every node in the tree
   */
  function collapseAll(): void {
    graphRef.value?.collapseAll()
  }

  /**
   * expands the tree down to a given depth
   */
  function expandToDepth(depth: number): void {
    graphRef.value?.expandToDepth(depth)
  }

  /**
   * spotlights a node's lineage and visible subtree
   */
  function focus(nodeId: string): void {
    graphRef.value?.focus(nodeId)
  }

  /**
   * clears the spotlight
   */
  function clearFocus(): void {
    graphRef.value?.clearFocus()
  }

  /**
   * flows an animated dash along the root-to-node lineage
   */
  function setActivePath(nodeIds: string[]): void {
    graphRef.value?.setActivePath(nodeIds)
  }

  /**
   * clears the active path
   */
  function clearActivePath(): void {
    graphRef.value?.clearActivePath()
  }

  /**
   * expands or collapses a node's card in place (not its children)
   */
  function toggleCard(nodeId: string): void {
    graphRef.value?.toggleCard(nodeId)
  }

  /**
   * zooms relative to the current scale
   */
  function zoom(factor: number): void {
    graphRef.value?.zoom(factor)
  }

  /**
   * centers the camera on a node, keeping the current zoom
   */
  function centerOnNode(nodeId: string): void {
    graphRef.value?.centerOnNode(nodeId)
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
    destroy,
  }
}
