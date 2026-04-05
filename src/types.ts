import type { CSSProperties } from 'vue';
import type { TreeOptions, NestedNode, TreeDirection } from 'apextree';

export type { TreeOptions, NestedNode, TreeDirection };

/**
 * public API surface of the graph instance returned by ApexTree.render().
 * Defined as a structural interface to avoid exposing private class members
 * from the core Graph class in wrapper public types (prevents TS4094).
 */
export interface GraphInstance {
  options: TreeOptions;
  changeLayout(direction?: TreeDirection): void;
  collapse(nodeId: string): void;
  construct(data: NestedNode): void;
  expand(nodeId: string): void;
  fitScreen(): void;
  render(options?: { keepOldPosition?: boolean; mode?: 'initial' | 'expand' | 'collapse' | 'data-update' }): void;
}

/**
 * methods exposed via defineExpose
 */
export interface ApexTreeExposed {
  changeLayout: (direction?: TreeDirection) => void;
  collapse: (nodeId: string) => void;
  expand: (nodeId: string) => void;
  fitScreen: () => void;
  getGraph: () => GraphInstance | null;
}

/**
 * props for the ApexTreeChart Vue component.
 * onNodeClick is omitted from options; use the @node-click emit instead.
 */
export interface ApexTreeProps<T = undefined> {
  /** Tree data structure */
  data: NestedNode<T>;
  /** Configuration options — imported from core apextree, zero local re-definition */
  options?: Omit<Partial<TreeOptions>, 'onNodeClick'>;
  /** CSS class name for the container element */
  class?: string;
  /** Inline styles for the container element */
  style?: CSSProperties;
}

/**
 * emits for the ApexTreeChart Vue component
 */
export interface ApexTreeEmits {
  (e: 'nodeClick', node: unknown): void;
}
