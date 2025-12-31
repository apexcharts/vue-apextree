import type { CSSProperties } from 'vue';

export type TreeDirection = 'top' | 'bottom' | 'left' | 'right';

/**
 * node data structure expected by ApexTree
 */
export interface NodeData<T = unknown> {
  id: string;
  name?: string;
  data?: T;
  options?: NodeOptions;
  children?: Array<NodeData<T>>;
}

/**
 * per-node styling options
 */
export interface NodeOptions {
  nodeBGColor?: string;
  nodeBGColorHover?: string;
  borderColor?: string;
  borderColorHover?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  fontColor?: string;
}

/**
 * graph instance returned by ApexTree.render()
 */
export interface GraphInstance {
  changeLayout: (direction?: TreeDirection) => void;
  collapse: (nodeId: string) => void;
  expand: (nodeId: string) => void;
  fitScreen: () => void;
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
 * props for the ApexTreeChart Vue component
 */
export interface ApexTreeProps<T = unknown> {
  // required
  data: NodeData<T>;

  // container
  class?: string;
  style?: CSSProperties;

  // dimensions
  width?: number | string;
  height?: number | string;

  // layout
  direction?: TreeDirection;
  siblingSpacing?: number;
  childrenSpacing?: number;
  containerClassName?: string;
  canvasStyle?: string;

  // node options
  contentKey?: string;
  nodeWidth?: number;
  nodeHeight?: number;
  nodeTemplate?: (content: unknown) => string;
  nodeStyle?: string;
  nodeClassName?: string;
  nodeBGColor?: string;
  nodeBGColorHover?: string;
  borderWidth?: number;
  borderStyle?: string;
  borderRadius?: string;
  borderColor?: string;
  borderColorHover?: string;

  // edge options
  edgeWidth?: number;
  edgeColor?: string;
  edgeColorHover?: string;

  // font options
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontColor?: string;

  // tooltip options
  enableTooltip?: boolean;
  tooltipId?: string;
  tooltipTemplate?: (content: unknown) => string;
  tooltipMaxWidth?: number;
  tooltipMinWidth?: number;
  tooltipBorderColor?: string;
  tooltipBGColor?: string;
  tooltipFontColor?: string;
  tooltipFontSize?: string;
  tooltipPadding?: number;
  tooltipOffset?: number;

  // features
  highlightOnHover?: boolean;
  enableToolbar?: boolean;
  enableExpandCollapse?: boolean;
  expandCollapseButtonBGColor?: string;
  expandCollapseButtonBorderColor?: string;
  groupLeafNodes?: boolean;
  groupLeafNodesSpacing?: number;

  // callbacks
  onNodeClick?: (node: NodeData<T>) => void;
}
