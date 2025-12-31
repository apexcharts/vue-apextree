<script setup lang="ts">
import { ref, shallowRef, type Component } from "vue";
import BasicExample from "./components/BasicExample.vue";
import ImperativeExample from "./components/ImperativeExample.vue";
import CustomTemplateExample from "./components/CustomTemplateExample.vue";
import ReactivityExample from "./components/ReactivityExample.vue";

interface Tab {
  id: string;
  label: string;
  component: Component;
}

const tabs: Tab[] = [
  { id: "basic", label: "Basic", component: BasicExample },
  {
    id: "imperative",
    label: "Imperative Methods",
    component: ImperativeExample,
  },
  {
    id: "template",
    label: "Custom Template",
    component: CustomTemplateExample,
  },
  { id: "reactivity", label: "Reactivity", component: ReactivityExample },
];

const activeTab = ref("basic");

const currentComponent = shallowRef<Component>(BasicExample);

function selectTab(tab: Tab) {
  activeTab.value = tab.id;
  currentComponent.value = tab.component;
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Vue ApexTree Demo</h1>
      <p>Interactive examples showcasing vue-apextree features</p>
    </header>

    <nav class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: activeTab === tab.id }]"
        @click="selectTab(tab)"
      >
        {{ tab.label }}
      </button>
    </nav>

    <main class="content">
      <component :is="currentComponent" />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.header h1 {
  margin-bottom: 0.5rem;
}

.header p {
  opacity: 0.9;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
}

.tab {
  padding: 0.75rem 1.5rem;
  border: none;
  background: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.tab:hover {
  background: #e0e0e0;
}

.tab.active {
  background: #667eea;
  color: white;
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>
