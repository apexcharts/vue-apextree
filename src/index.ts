// component
export { default as ApexTreeChart } from './components/ApexTreeChart.vue';

// composable
export { useApexTree } from './composables/useApexTree';

// types
export type {
  ApexTreeProps,
  ApexTreeExposed,
  ApexTreeExposed as ApexTreeExpose,
  GraphInstance,
  NodeData,
  NodeOptions,
  TreeDirection,
} from './types';

// re-export setLicense from apextree for convenience
import ApexTree from 'apextree';

/**
 * sets the license key for ApexTree
 * call this at app initialization before rendering any trees
 *
 * @example
 * ```ts
 * import { setApexTreeLicense } from 'vue-apextree';
 *
 * // in main.ts or app entry
 * setApexTreeLicense('your-license-key');
 * ```
 */
export function setApexTreeLicense(key: string): void {
  ApexTree.setLicense(key);
}
