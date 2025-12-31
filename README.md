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
import { ApexTreeChart, type NodeData } from 'vue-apextree';

const data: NodeData = {
  id: '1',
  name: 'CEO',
  children: [
    {
      id: '2',
      name: 'CTO',
      children: [
        { id: '3', name: 'Dev Lead' },
        { id: '4', name: 'QA Lead' },
      ],
    },
    {
      id: '5',
      name: 'CFO',
    },
  ],
};
</script>

<template>
  <ApexTreeChart
    :data="data"
    :width="800"
    :height="600"
    direction="top"
    :node-width="120"
    :node-height="80"
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

## Using Template Ref Methods

Access methods like `changeLayout`, `collapse`, `expand`, and `fitScreen` via template ref:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ApexTreeChart, type ApexTreeExpose } from 'vue-apextree';

const treeRef = ref<ApexTreeExpose | null>(null);

const handleChangeLayout = () => {
  treeRef.value?.changeLayout('left');
};

const handleCollapse = (nodeId: string) => {
  treeRef.value?.collapse(nodeId);
};

const handleExpand = (nodeId: string) => {
  treeRef.value?.expand(nodeId);
};

const handleFitScreen = () => {
  treeRef.value?.fitScreen();
};
</script>

<template>
  <div>
    <button @click="handleChangeLayout">Change Layout</button>
    <button @click="handleFitScreen">Fit Screen</button>

    <ApexTreeChart
      ref="treeRef"
      :data="data"
      :width="800"
      :height="600"
    />
  </div>
</template>
```

## Custom Node Templates

```vue
<script setup lang="ts">
import { ApexTreeChart } from 'vue-apextree';

interface PersonData {
  name: string;
  imageURL: string;
}

const nodeTemplate = (content: unknown): string => {
  const person = content as PersonData;
  return `
    <div style="display: flex; flex-direction: column; align-items: center; height: 100%;">
      <img 
        src="${person.imageURL}" 
        style="width: 50px; height: 50px; border-radius: 50%;" 
      />
      <div style="font-weight: bold;">${person.name}</div>
    </div>
  `;
};
</script>

<template>
  <ApexTreeChart
    :data="data"
    :width="800"
    :height="600"
    content-key="data"
    :node-width="150"
    :node-height="100"
    :node-template="nodeTemplate"
  />
</template>
```

## Reactivity

The component automatically re-renders when props change, including deep changes to the `data` object:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ApexTreeChart, type NodeData } from 'vue-apextree';

const data = ref<NodeData>({
  id: '1',
  name: 'Root',
  children: [],
});

// this will trigger a re-render
const addChild = () => {
  data.value.children?.push({
    id: String(Date.now()),
    name: 'New Node',
  });
};
</script>

<template>
  <button @click="addChild">Add Child</button>
  <ApexTreeChart :data="data" :width="800" :height="600" />
</template>
```

## Events

```vue
<script setup lang="ts">
import { ApexTreeChart, type NodeData } from 'vue-apextree';

const handleNodeClick = (node: NodeData) => {
  console.log('Node clicked:', node);
};
</script>

<template>
  <ApexTreeChart
    :data="data"
    :width="800"
    :height="600"
    @node-click="handleNodeClick"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `NodeData` | **required** | Tree data structure |
| `width` | `number \| string` | `400` | Width of the container |
| `height` | `number \| string` | `400` | Height of the container |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Direction of tree growth |
| `contentKey` | `string` | `'name'` | Key for node content |
| `siblingSpacing` | `number` | `50` | Spacing between siblings |
| `childrenSpacing` | `number` | `50` | Spacing between parent and children |
| `nodeWidth` | `number` | `50` | Width of nodes |
| `nodeHeight` | `number` | `30` | Height of nodes |
| `nodeTemplate` | `(content: unknown) => string` | - | Custom HTML template for nodes |
| `nodeStyle` | `string` | - | CSS styles for nodes |
| `nodeBGColor` | `string` | `'#FFFFFF'` | Node background color |
| `nodeBGColorHover` | `string` | `'#FFFFFF'` | Node background color on hover |
| `borderWidth` | `number` | `1` | Node border width |
| `borderStyle` | `string` | `'solid'` | Node border style |
| `borderRadius` | `string` | `'5px'` | Node border radius |
| `borderColor` | `string` | `'#BCBCBC'` | Node border color |
| `borderColorHover` | `string` | `'#5C6BC0'` | Node border color on hover |
| `edgeWidth` | `number` | `1` | Edge line width |
| `edgeColor` | `string` | `'#BCBCBC'` | Edge line color |
| `edgeColorHover` | `string` | `'#5C6BC0'` | Edge line color on hover |
| `fontSize` | `string` | `'14px'` | Font size |
| `fontFamily` | `string` | - | Font family |
| `fontWeight` | `string` | `'400'` | Font weight |
| `fontColor` | `string` | `'#000000'` | Font color |
| `highlightOnHover` | `boolean` | `true` | Enable highlight on hover |
| `enableToolbar` | `boolean` | `false` | Show toolbar |
| `enableExpandCollapse` | `boolean` | `false` | Enable expand/collapse buttons |
| `enableTooltip` | `boolean` | `false` | Enable tooltips |
| `tooltipTemplate` | `(content: unknown) => string` | - | Custom tooltip template |
| `groupLeafNodes` | `boolean` | `false` | Stack leaf nodes |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `node-click` | `NodeData` | Emitted when a node is clicked |

## Exposed Methods

| Method | Description |
|--------|-------------|
| `changeLayout(direction?)` | Change tree direction |
| `collapse(nodeId)` | Collapse a node |
| `expand(nodeId)` | Expand a node |
| `fitScreen()` | Fit tree to screen |
| `getGraph()` | Get the underlying graph instance |

## Data Structure

```ts
interface NodeData<T = unknown> {
  id: string;           // unique identifier
  name?: string;        // display name (or use contentKey)
  data?: T;             // custom data for templates
  options?: NodeOptions; // per-node styling
  children?: NodeData<T>[];
}

interface NodeOptions {
  nodeBGColor?: string;
  nodeBGColorHover?: string;
  borderColor?: string;
  borderColorHover?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  fontColor?: string;
}
```

## TypeScript Support

Full TypeScript support with exported types:

```ts
import type {
  ApexTreeProps,
  ApexTreeExpose,
  NodeData,
  NodeOptions,
  TreeDirection,
  GraphInstance,
} from 'vue-apextree';
```

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
