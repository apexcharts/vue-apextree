import type { ApexTreeProps } from './types';

/**
 * props that should not be passed to ApexTree options
 */
const EXCLUDED_PROPS = ['data', 'class', 'style'] as const;

/**
 * extracts ApexTree options from Vue props
 * filters out vue-specific props (class, style, data)
 */
export function buildOptions<T>(props: ApexTreeProps<T>): Record<string, unknown> {
  const cleanOptions: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    // skip excluded props and undefined values
    if (EXCLUDED_PROPS.includes(key as typeof EXCLUDED_PROPS[number])) {
      continue;
    }

    if (value !== undefined) {
      cleanOptions[key] = value;
    }
  }

  return cleanOptions;
}
