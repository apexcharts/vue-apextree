# vue-apextree

Vue 3 wrapper for [ApexTree](https://github.com/apexcharts/apextree) - a JavaScript library for creating organizational and hierarchical charts.

<img width="811" alt="ApexTree Example" src="https://github.com/apexcharts/tree/assets/17950663/e09212ec-6322-4c68-ac12-9afc524d2abd">

## Installation

```bash
npm install vue-apextree apextree
```

> **Note:** `apextree` is a peer dependency and must be installed alongside `vue-apextree`.

## Basic Usage

```vue
<script setup lang="ts">
import { ApexTreeChart } from 'vue-apextree';
import type { NestedNode } from 'vue-apextree';

const data: NestedNode = {
  id: '1',
  name: 'CEO',
  children: [
    {
      id: '2',
      name: 'CTO',
      children: [
        { id: '3', name: 'Dev Lead', children: [] },
        { id: '4', name: 'QA Lead', children: [] },
      ],
    },
    {
      id: '5',
      name: 'CFO',
      children: [],
    },
  ],
};
</script>

<template>
  <ApexTreeChart
    :data="data"
    :options="{ width: 800, height: 600, direction: 'top', nodeWidth: 120, nodeHeight: 80 }"
  />
</template>
```

## Setting License Key

If you have a commercial license, set it once at app initialization:

```ts
// main.ts
import { setApexTreeLicense } from 'vue-apextree';

setApexTreeLicense('your-license-key');
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `NestedNode` | Yes | Root node of the tree hierarchy |
| `options` | `Partial<TreeOptions>` | No | All chart configuration options (see below) |
| `class` | `string` | No | CSS class applied to the container `<div>` |
| `style` | `CSSProperties` | No | Inline styles applied to the container `<div>` |

### options

All fields map directly to [`TreeOptions`](https://github.com/apexcharts/apextree) from the core library — no re-definition in the wrapper. Pass any subset as a plain object; unset fields fall back to core defaults.

**Layout**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Direction the tree grows from the root |
| `width` | `number \| string` | `'100%'` | Canvas width (number = px, string = CSS value) |
| `height` | `number \| string` | `'auto'` | Canvas height |
| `siblingSpacing` | `number` | `50` | Horizontal gap between sibling nodes in pixels |
| `childrenSpacing` | `number` | `50` | Vertical gap between a parent and its children in pixels |
| `groupLeafNodes` | `boolean` | `false` | Stack leaf nodes vertically instead of spreading them |
| `enableToolbar` | `boolean` | `false` | Show the zoom/pan/export toolbar |
| `enableAnimation` | `boolean` | `true` | Animate expand/collapse transitions |
| `canvasStyle` | `string` | `''` | Arbitrary CSS injected onto the SVG container |
| `containerClassName` | `string` | `'root'` | CSS class on the SVG container element |

**Nodes**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `nodeWidth` | `number` | `50` | Node width in pixels |
| `nodeHeight` | `number` | `30` | Node height in pixels |
| `nodeTemplate` | `(content: string) => string` | — | Custom HTML string rendered inside each node |
| `contentKey` | `string` | `'name'` | Key in node data used as the display label |
| `nodeStyle` | `string` | `''` | Inline CSS applied to each node element |
| `nodeClassName` | `string` | `'apextree-node'` | CSS class on each node element |
| `nodeBGColor` | `string` | `'#FFFFFF'` | Default node background color |
| `nodeBGColorHover` | `string` | `'#FFFFFF'` | Node background color on hover |
| `borderWidth` | `number` | `1` | Node border width in pixels |
| `borderStyle` | `string` | `'solid'` | Node border style |
| `borderRadius` | `string` | `'5px'` | Node border radius |
| `borderColor` | `string` | `'#BCBCBC'` | Node border color |
| `borderColorHover` | `string` | `'#5C6BC0'` | Node border color on hover |
| `highlightOnHover` | `boolean` | `true` | Highlight hovered node and its edges |
| `enableExpandCollapse` | `boolean` | `true` | Show expand/collapse buttons on nodes |
| `expandCollapseButtonBGColor` | `string` | `'#FFFFFF'` | Expand/collapse button background color |
| `expandCollapseButtonBorderColor` | `string` | `'#BCBCBC'` | Expand/collapse button border color |

**Edges**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `edgeWidth` | `number` | `1` | Edge stroke width in pixels |
| `edgeColor` | `string` | `'#A1A1A1'` | Edge color |
| `edgeColorHover` | `string` | `'#5C6BC0'` | Edge color on hover |

**Font**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fontSize` | `string` | `'14px'` | Font size for node text |
| `fontFamily` | `string` | — | Font family for node text |
| `fontWeight` | `string` | `'400'` | Font weight for node text |
| `fontColor` | `string` | `'#000000'` | Font color for node text |

**Tooltip**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableTooltip` | `boolean` | `false` | Show tooltip on node hover |
| `tooltipTemplate` | `(content: string) => string` | — | Custom HTML for tooltip content |
| `tooltipBGColor` | `string` | `'#FFFFFF'` | Tooltip background color |
| `tooltipBorderColor` | `string` | `'#BCBCBC'` | Tooltip border color |
| `tooltipFontColor` | `string` | `'#000000'` | Tooltip font color |
| `tooltipFontSize` | `string` | `'12px'` | Tooltip font size |
| `tooltipPadding` | `number` | `8` | Tooltip inner padding in pixels |
| `tooltipOffset` | `number` | `10` | Distance between tooltip and cursor in pixels |
| `tooltipMinWidth` | `number` | `100` | Tooltip minimum width in pixels |
| `tooltipMaxWidth` | `number` | — | Tooltip maximum width in pixels |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `node-click` | `unknown` | Emitted when a node is clicked. The payload is the raw node data object. |

> `onNodeClick` is intentionally excluded from `options` — use the `@node-click` emit instead.

```vue
<script setup lang="ts">
import { ApexTreeChart } from 'vue-apextree';

const handleNodeClick = (node: unknown) => {
  console.log('Node clicked:', node);
};
</script>

<template>
  <ApexTreeChart :data="data" @node-click="handleNodeClick" />
</template>
```

## Exposed Methods

Access imperative methods via a template ref:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ApexTreeChart } from 'vue-apextree';
import type { ApexTreeExpose } from 'vue-apextree';

const treeRef = ref<ApexTreeExpose | null>(null);
</script>

<template>
  <ApexTreeChart ref="treeRef" :data="data" />
  <button @click="treeRef?.changeLayout('left')">Rotate</button>
  <button @click="treeRef?.fitScreen()">Fit Screen</button>
  <button @click="treeRef?.collapse('node-id')">Collapse</button>
  <button @click="treeRef?.expand('node-id')">Expand</button>
</template>
```

| Method | Signature | Description |
|--------|-----------|-------------|
| `changeLayout` | `(direction?: TreeDirection) => void` | Change tree grow direction |
| `collapse` | `(nodeId: string) => void` | Collapse a node by id |
| `expand` | `(nodeId: string) => void` | Expand a node by id |
| `fitScreen` | `() => void` | Fit the tree to the container |
| `getGraph` | `() => GraphInstance \| null` | Get the underlying graph instance |

## Custom Node Templates

```vue
<script setup lang="ts">
import { ApexTreeChart } from 'vue-apextree';
import type { NestedNode } from 'vue-apextree';

interface PersonData {
  title: string;
  imageURL: string;
}

const data: NestedNode<PersonData> = {
  id: '1',
  name: 'Alice',
  data: { title: 'CEO', imageURL: '/alice.png' },
  children: [],
};

const nodeTemplate = (content: string): string => {
  const person = JSON.parse(content) as PersonData;
  return `
    <div style="display:flex;flex-direction:column;align-items:center;height:100%;">
      <img src="${person.imageURL}" style="width:50px;height:50px;border-radius:50%;" />
      <div style="font-weight:bold;">${person.title}</div>
    </div>
  `;
};
</script>

<template>
  <ApexTreeChart
    :data="data"
    :options="{ contentKey: 'data', nodeWidth: 150, nodeHeight: 100, nodeTemplate }"
  />
</template>
```

## Reactivity

The component re-renders automatically when `data` or `options` change:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ApexTreeChart } from 'vue-apextree';
import type { NestedNode } from 'vue-apextree';

const data = ref<NestedNode>({
  id: '1',
  name: 'Root',
  children: [],
});

const addChild = () => {
  data.value = {
    ...data.value,
    children: [
      ...data.value.children,
      { id: String(Date.now()), name: 'New Node', children: [] },
    ],
  };
};
</script>

<template>
  <button @click="addChild">Add Child</button>
  <ApexTreeChart :data="data" />
</template>
```

## Data Structure

```ts
import type { NestedNode } from 'vue-apextree';

// plain tree (no custom data)
const tree: NestedNode = {
  id: 'root',
  name: 'CEO',
  children: [
    { id: 'vp1', name: 'VP Engineering', children: [] },
    { id: 'vp2', name: 'VP Sales', children: [] },
  ],
};

// typed custom data payload
interface Employee {
  department: string;
  headcount: number;
}

const typedTree: NestedNode<Employee> = {
  id: 'root',
  name: 'CEO',
  data: { department: 'Executive', headcount: 1 },
  children: [],
};
```

Per-node visual overrides are set via the `options` field on each `NestedNode`:

```ts
const node: NestedNode = {
  id: 'highlighted',
  name: 'Special Node',
  children: [],
  options: {
    nodeBGColor: '#E8F5E9',
    borderColor: '#43A047',
    fontColor: '#1B5E20',
  },
};
```

## TypeScript Support

```ts
import type {
  ApexTreeProps,
  ApexTreeExpose,
  GraphInstance,
  NestedNode,
  TreeOptions,
  TreeDirection,
} from 'vue-apextree';
```

`TreeOptions` and `NestedNode` are re-exported directly from the core `apextree` package — no local re-definition, so types stay in sync automatically with core releases.

## License

vue-apextree uses the same dual-license model as ApexCharts. See [LICENSE](./LICENSE) for details.

- **Free** for individuals, non-profits, and small businesses (< $2M revenue)
- **Commercial license** required for larger organizations

## Links

- [ApexTree Documentation](https://github.com/apexcharts/apextree)
- [ApexCharts](https://apexcharts.com)
- [License Information](https://apexcharts.com/license)

## Development

### Running the Demo

The package includes a demo app showcasing various features:

```bash
# clone the repo
git clone https://github.com/apexcharts/vue-apextree.git
cd vue-apextree

# install dependencies
npm install
cd demo && npm install && cd ..

# build the library
npm run build

# run the demo
npm run demo
```

Then open http://localhost:5173 to see the examples.

### Available Scripts

- `npm run build` - Build the library
- `npm run dev` - Build in watch mode
- `npm run typecheck` - Run TypeScript type checking
- `npm run demo` - Run the demo app
- `npm run demo:build` - Build the demo app
