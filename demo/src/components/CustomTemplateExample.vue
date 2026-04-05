<script setup lang="ts">
import { ApexTreeChart } from 'vue-apextree';
import type { NestedNode } from 'vue-apextree';

interface PersonData {
  name: string;
  title: string;
  avatar: string;
}

const data: NestedNode<PersonData> = {
  id: '1',
  name: 'John Smith',
  data: {
    name: 'John Smith',
    title: 'CEO',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  children: [
    {
      id: '2',
      name: 'Sarah Johnson',
      data: {
        name: 'Sarah Johnson',
        title: 'CTO',
        avatar: 'https://i.pravatar.cc/100?img=5',
      },
      children: [
        {
          id: '3',
          name: 'Mike Wilson',
          data: {
            name: 'Mike Wilson',
            title: 'Dev Lead',
            avatar: 'https://i.pravatar.cc/100?img=3',
          },
          children: [],
        },
        {
          id: '4',
          name: 'Emily Brown',
          data: {
            name: 'Emily Brown',
            title: 'QA Lead',
            avatar: 'https://i.pravatar.cc/100?img=9',
          },
          children: [],
        },
      ],
    },
    {
      id: '5',
      name: 'David Lee',
      data: {
        name: 'David Lee',
        title: 'CFO',
        avatar: 'https://i.pravatar.cc/100?img=8',
      },
      children: [],
    },
  ],
};

const nodeTemplate = (content: string): string => {
  const person = JSON.parse(content) as PersonData;
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

const tooltipTemplate = (content: string): string => {
  const person = JSON.parse(content) as PersonData;
  return `
    <div style="text-align: center;">
      <strong>${person.name}</strong><br/>
      <span style="color: #667eea;">${person.title}</span>
    </div>
  `;
};

const handleNodeClick = (node: unknown) => {
  const n = node as { data?: PersonData };
  if (n.data) {
    alert(`${n.data.name} - ${n.data.title}`);
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
        :options="{
          width: 800,
          height: 500,
          direction: 'top',
          contentKey: 'data',
          nodeWidth: 140,
          nodeHeight: 100,
          nodeTemplate,
          enableTooltip: true,
          tooltipTemplate,
          nodeBGColor: '#f8f9fa',
          nodeBGColorHover: '#e8eaf6',
          borderColor: '#667eea',
          borderColorHover: '#764ba2',
          borderWidth: 2,
          borderRadius: '8px',
        }"
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
