<script setup lang="ts">
import { ApexTreeChart } from 'vue-apextree';
import type { NestedNode } from 'vue-apextree';

const data: NestedNode<unknown> = {
  id: '1',
  name: 'CEO',
  data: undefined,
  children: [
    {
      id: '2',
      name: 'CTO',
      data: undefined,
      children: [
        { id: '3', name: 'Dev Lead', data: undefined, children: [] },
        { id: '4', name: 'QA Lead', data: undefined, children: [] },
      ],
    },
    {
      id: '5',
      name: 'CFO',
      data: undefined,
      children: [
        { id: '6', name: 'Accountant', data: undefined, children: [] },
      ],
    },
    {
      id: '7',
      name: 'COO',
      data: undefined,
      children: [
        { id: '8', name: 'Operations Manager', data: undefined, children: [] },
        { id: '9', name: 'HR Manager', data: undefined, children: [] },
      ],
    },
  ],
};

const handleNodeClick = (node: unknown) => {
  console.log('Node clicked:', node);
  const n = node as { name?: string };
  alert(`Clicked: ${n.name}`);
};
</script>

<template>
  <div class="example">
    <h2>Basic Usage</h2>
    <p>A simple organizational chart with click handling.</p>

    <div class="chart-container">
      <ApexTreeChart
        :data="data"
        :options="{ width: 800, height: 500, direction: 'top', nodeWidth: 120, nodeHeight: 60, highlightOnHover: true }"
        @node-click="handleNodeClick"
      />
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

.chart-container {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
</style>
