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
      children: [
        { id: '6', name: 'Accountant' },
      ],
    },
    {
      id: '7',
      name: 'COO',
      children: [
        { id: '8', name: 'Operations Manager' },
        { id: '9', name: 'HR Manager' },
      ],
    },
  ],
};

const handleNodeClick = (node: NodeData) => {
  console.log('Node clicked:', node);
  alert(`Clicked: ${node.name}`);
};
</script>

<template>
  <div class="example">
    <h2>Basic Usage</h2>
    <p>A simple organizational chart with click handling.</p>

    <div class="chart-container">
      <ApexTreeChart
        :data="data"
        :width="800"
        :height="500"
        direction="top"
        :node-width="120"
        :node-height="60"
        :highlight-on-hover="true"
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
