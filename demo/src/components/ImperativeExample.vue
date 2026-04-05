<script setup lang="ts">
import { ref } from 'vue';
import { ApexTreeChart } from 'vue-apextree';
import type { ApexTreeExpose, NestedNode, TreeDirection } from 'vue-apextree';

const treeRef = ref<ApexTreeExpose | null>(null);
const currentDirection = ref<TreeDirection>('top');

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
      children: [],
    },
  ],
};

const directions: TreeDirection[] = ['top', 'bottom', 'left', 'right'];

const changeLayout = (direction: TreeDirection) => {
  currentDirection.value = direction;
  treeRef.value?.changeLayout(direction);
};

const collapseNode = (nodeId: string) => {
  treeRef.value?.collapse(nodeId);
};

const expandNode = (nodeId: string) => {
  treeRef.value?.expand(nodeId);
};

const fitScreen = () => {
  treeRef.value?.fitScreen();
};
</script>

<template>
  <div class="example">
    <h2>Imperative Methods</h2>
    <p>Access methods like changeLayout, collapse, expand, and fitScreen via template ref.</p>

    <div class="controls">
      <div class="control-group">
        <span>Layout Direction:</span>
        <button
          v-for="dir in directions"
          :key="dir"
          :class="{ active: currentDirection === dir }"
          @click="changeLayout(dir)"
        >
          {{ dir }}
        </button>
      </div>

      <div class="control-group">
        <span>Node Actions:</span>
        <button @click="collapseNode('2')">Collapse CTO</button>
        <button @click="expandNode('2')">Expand CTO</button>
        <button @click="fitScreen">Fit Screen</button>
      </div>
    </div>

    <div class="chart-container">
      <ApexTreeChart
        ref="treeRef"
        :data="data"
        :options="{ width: 800, height: 400, direction: currentDirection, nodeWidth: 120, nodeHeight: 60, enableExpandCollapse: true }"
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

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.control-group span {
  font-weight: 500;
  color: #333;
  min-width: 120px;
}

.control-group button {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.control-group button:hover {
  background: #f0f0f0;
  border-color: #667eea;
}

.control-group button.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.chart-container {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
</style>
