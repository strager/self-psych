<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { exams } from '../data'
import { getResults, deleteResult } from '../utils/storage'

const resultCount = ref(0)

function loadResults() {
  const raw = getResults()
  resultCount.value = raw.length
  return raw
    .map((result, index) => {
      const exam = exams.find(e => e.id === result.examId)
      return {
        ...result,
        originalIndex: index,
        examName: exam?.name ?? result.examId,
        subscales: exam?.subscales ?? []
      }
    })
    .reverse()
}

let results = ref(loadResults())

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleString()
}

function confirmDelete(originalIndex: number) {
  if (confirm('Delete this result?')) {
    deleteResult(originalIndex)
    results.value = loadResults()
  }
}
</script>

<template>
  <div class="history">
    <h2>History</h2>
    <div v-if="results.length === 0" class="empty">
      <p>No results yet.</p>
      <RouterLink to="/" class="btn">Take an Assessment</RouterLink>
    </div>
    <ul v-else class="result-list">
      <li v-for="result in results" :key="result.originalIndex" class="result-item">
        <div class="result-header">
          <div>
            <strong>{{ result.examName }}</strong>
            <span class="date">{{ formatDate(result.completedAt) }}</span>
          </div>
          <button class="delete-btn" @click="confirmDelete(result.originalIndex)">Delete</button>
        </div>
        <div class="result-scores">
          <div class="total">
            <span class="label">Total:</span>
            <span class="value">{{ result.totalScore }}</span>
          </div>
          <div class="subscale-scores">
            <div
              v-for="subscale in result.subscales"
              :key="subscale.name"
              class="subscale"
              :class="{ elevated: result.subscaleElevated?.[subscale.name] }"
            >
              <span class="label">{{ subscale.name }}:</span>
              <span class="value">
                {{ result.subscaleScores[subscale.name] }}
                <template v-if="result.subscalePercentHigh">
                  ({{ result.subscalePercentHigh[subscale.name] }}%)
                </template>
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.history {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1.5rem;
}

.empty {
  text-align: center;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  background: #333;
  color: white;
}

.result-list {
  list-style: none;
  padding: 0;
}

.result-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.result-header > div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date {
  font-size: 0.875rem;
  color: #666;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  color: #666;
  cursor: pointer;
}

.delete-btn:hover {
  background: #fee;
  border-color: #c66;
  color: #c00;
}

.result-scores {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.total {
  font-weight: bold;
}

.subscale-scores {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #666;
}

.label {
  margin-right: 0.5rem;
}

.subscale.elevated {
  color: #856404;
  font-weight: 500;
}
</style>
