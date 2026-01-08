<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { exams } from '../data'
import { getResults } from '../utils/storage'

const results = computed(() => {
  return getResults()
    .map(result => {
      const exam = exams.find(e => e.id === result.examId)
      return {
        ...result,
        examName: exam?.name ?? result.examId,
        subscales: exam?.subscales ?? []
      }
    })
    .reverse()
})

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleString()
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
      <li v-for="(result, index) in results" :key="index" class="result-item">
        <div class="result-header">
          <strong>{{ result.examName }}</strong>
          <span class="date">{{ formatDate(result.completedAt) }}</span>
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
            >
              <span class="label">{{ subscale.name }}:</span>
              <span class="value">{{ result.subscaleScores[subscale.name] }}</span>
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
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.date {
  font-size: 0.875rem;
  color: #666;
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
</style>
