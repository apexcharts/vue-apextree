<script setup lang="ts">
import { ref, computed } from 'vue';
import { ApexTreeChart } from 'vue-apextree';
import type { NestedNode } from 'vue-apextree';

// use unknown so callers don't need to supply data: undefined on every node
type AnyNode = NestedNode<unknown>;

const nodes = ref<AnyNode[]>([
  {
    id: '2',
    name: 'CTO',
    data: undefined,
    children: [
      { id: '3', name: 'Dev Lead', data: undefined, children: [] },
    ],
  },
  {
    id: '4',
    name: 'CFO',
    data: undefined,
    children: [],
  },
]);

const data = computed<AnyNode>(() => ({
  id: '1',
  name: 'CEO',
  data: undefined,
  children: nodes.value,
}));

let nodeCounter = 10;

const addNode = () => {
  const newNode: AnyNode = {
    id: String(nodeCounter++),
    name: `New Node ${nodeCounter - 10}`,
    data: undefined,
    children: [],
  };
  nodes.value = [...nodes.value, newNode];
};

const addChildToCTO = () => {
  const ctoIndex = nodes.value.findIndex((n: AnyNode) => n.id === '2');
  if (ctoIndex !== -1) {
    const newChild: AnyNode = {
      id: String(nodeCounter++),
      name: `Engineer ${nodeCounter - 10}`,
      data: undefined,
      children: [],
    };
    nodes.value = nodes.value.map((node: AnyNode, index: number) => {
      if (index === ctoIndex) {
        return { ...node, children: [...node.children, newChild] };
      }
      return node;
    });
  }
};

const removeLastNode = () => {
  if (nodes.value.length > 1) {
    nodes.value = nodes.value.slice(0, -1);
  }
};

const renameRandomNode = () => {
  const allIds: string[] = [];
  const collectIds = (nodeList: AnyNode[]) => {
    for (const node of nodeList) {
      allIds.push(node.id);
      collectIds(node.children as AnyNode[]);
    }
  };
  collectIds(nodes.value);

  const targetId = allIds[Math.floor(Math.random() * allIds.length)];
  const newName = `Renamed ${Date.now() % 1000}`;

  const updateNodeName = (nodeList: AnyNode[]): AnyNode[] => {
    return nodeList.map((node: AnyNode) => {
      if (node.id === targetId) {
        return { ...node, name: newName };
      }
      return { ...node, children: updateNodeName(node.children as AnyNode[]) };
    });
  };

  nodes.value = updateNodeName(nodes.value);
};
</script>

<template>
  <div class="example">
    <h2>Reactive Data</h2>
    <p>
      The chart automatically updates when data changes. Deep watching ensures
      nested changes are detected.
    </p>

    <div class="controls">
      <button @click="addNode">Add Top-Level Node</button>
      <button @click="addChildToCTO">Add Child to CTO</button>
      <button @click="removeLastNode">Remove Last Node</button>
      <button @click="renameRandomNode">Rename Random Node</button>
    </div>

    <div class="chart-container">
      <ApexTreeChart
        :data="data"
        :options="{ width: 800, height: 400, direction: 'top', nodeWidth: 120, nodeHeight: 50, highlightOnHover: true, enableExpandCollapse: true }"
      />
    </div>

    <div class="data-preview">
      <h4>Current Data:</h4>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.example h2 {
  margin-bottom: 0.5rem;
  color: #333;
}

.example p {
  color: #666;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #667eea;
  border-radius: 4px;
  background: white;
  color: #667eea;
  cursor: pointer;
  transition: all 0.2s;
}

.controls button:hover {
  background: #667eea;
  color: white;
}

.chart-container {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.data-preview {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
}

.data-preview h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.data-preview pre {
  font-size: 12px;
  max-height: 200px;
  overflow: auto;
  margin: 0;
}
</style>
