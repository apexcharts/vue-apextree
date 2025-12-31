<script setup lang="ts">
import { ApexTreeChart, type NodeData } from 'vue-apextree';

interface PersonData {
  name: string;
  title: string;
  avatar: string;
}

const data: NodeData<PersonData> = {
  id: '1',
  data: {
    name: 'John Smith',
    title: 'CEO',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  children: [
    {
      id: '2',
      data: {
        name: 'Sarah Johnson',
        title: 'CTO',
        avatar: 'https://i.pravatar.cc/100?img=5',
      },
      children: [
        {
          id: '3',
          data: {
            name: 'Mike Wilson',
            title: 'Dev Lead',
            avatar: 'https://i.pravatar.cc/100?img=3',
          },
        },
        {
          id: '4',
          data: {
            name: 'Emily Brown',
            title: 'QA Lead',
            avatar: 'https://i.pravatar.cc/100?img=9',
          },
        },
      ],
    },
    {
      id: '5',
      data: {
        name: 'David Lee',
        title: 'CFO',
        avatar: 'https://i.pravatar.cc/100?img=8',
      },
    },
  ],
};

// custom template function for nodes
const nodeTemplate = (content: unknown): string => {
  const person = content as PersonData;
  return `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 8px;
      text-align: center;
    ">
      <img 
        src="${person.avatar}" 
        style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-bottom: 4px;
          border: 2px solid #667eea;
        "
      />
      <div style="font-weight: bold; font-size: 12px; color: #333;">
        ${person.name}
      </div>
      <div style="font-size: 10px; color: #666;">
        ${person.title}
      </div>
    </div>
  `;
};

// custom tooltip template
const tooltipTemplate = (content: unknown): string => {
  const person = content as PersonData;
  return `
    <div style="text-align: center;">
      <strong>${person.name}</strong><br/>
      <span style="color: #667eea;">${person.title}</span>
    </div>
  `;
};

const handleNodeClick = (node: NodeData) => {
  const person = node.data as PersonData | undefined;
  if (person) {
    alert(`${person.name} - ${person.title}`);
  }
};
</script>

<template>
  <div class="example">
    <h2>Custom Node Template</h2>
    <p>Nodes with avatars, names, and titles using custom templates.</p>

    <div class="chart-container">
      <ApexTreeChart
        :data="data"
        :width="800"
        :height="500"
        direction="top"
        content-key="data"
        :node-width="140"
        :node-height="100"
        :node-template="nodeTemplate"
        :enable-tooltip="true"
        :tooltip-template="tooltipTemplate"
        node-b-g-color="#f8f9fa"
        node-b-g-color-hover="#e8eaf6"
        border-color="#667eea"
        border-color-hover="#764ba2"
        :border-width="2"
        border-radius="8px"
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
