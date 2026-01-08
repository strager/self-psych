<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { exams } from '../data'
import { getResults } from '../utils/storage'

const route = useRoute()

const exam = computed(() => exams.find(e => e.id === route.params.examId))
const latestResult = computed(() => {
  const results = getResults().filter(r => r.examId === route.params.examId)
  return results[results.length - 1]
})
</script>

<template>
  <div v-if="exam && latestResult" class="results">
    <h2>Results: {{ exam.name }}</h2>
    <div class="score-card">
      <div class="total-score">
        <span class="label">Total Score</span>
        <span class="value">{{ latestResult.totalScore }}</span>
      </div>
      <div class="subscales">
        <div
          v-for="subscale in exam.subscales"
          :key="subscale.name"
          class="subscale"
        >
          <span class="label">{{ subscale.name }}</span>
          <span class="value">{{ latestResult.subscaleScores[subscale.name] }}</span>
        </div>
      </div>
    </div>
    <div class="actions">
      <RouterLink :to="`/quiz/${exam.id}`" class="btn">Take Again</RouterLink>
      <RouterLink to="/" class="btn secondary">Home</RouterLink>
    </div>
    <p v-if="exam.id === 'psps'" class="citation">
      Source: Hewitt, P. L., Flett, G. L., Sherry, S. B., et al. (2003).
      The interpersonal expression of perfection: Perfectionistic self-presentation and psychological distress.
      <em>Journal of Personality and Social Psychology, 84</em>(6), 1303-1325.
    </p>
    <p v-if="exam.id === 'fmps'" class="citation">
      Source: Frost, R. O., Marten, P., Lahart, C., &amp; Rosenblate, R. (1990).
      The dimensions of perfectionism.
      <em>Cognitive Therapy and Research, 14</em>(5), 449-468.
    </p>
  </div>
  <div v-else>
    <p>No results found.</p>
    <RouterLink to="/">Go Home</RouterLink>
  </div>
</template>

<style scoped>
.results {
  text-align: center;
}

h2 {
  margin-bottom: 2rem;
}

.score-card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.total-score {
  margin-bottom: 2rem;
}

.total-score .label {
  display: block;
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.total-score .value {
  font-size: 3rem;
  font-weight: bold;
}

.subscales {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subscale {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
}

.subscale .label {
  color: #666;
}

.subscale .value {
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  background: #333;
  color: white;
}

.btn:hover {
  background: #444;
}

.btn.secondary {
  background: #666;
}

.citation {
  margin-top: 2rem;
  font-size: 0.75rem;
  color: #888;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>
