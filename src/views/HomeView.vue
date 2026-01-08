<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { exams } from '../data'
</script>

<template>
  <div class="home">
    <h1>Psychological Self-Assessments</h1>
    <p>Select an assessment to begin:</p>
    <ul class="exam-list">
      <li v-for="exam in exams" :key="exam.id">
        <RouterLink :to="`/quiz/${exam.id}`" class="exam-link">
          <strong>{{ exam.name }}</strong>
          <span class="question-count">{{ exam.questions.length }} questions</span>
          <span v-if="exam.id === 'psps'" class="citation">Hewitt et al., 2003</span>
          <span v-if="exam.id === 'fmps'" class="citation">Frost et al., 1990</span>
          <span v-if="exam.id === 'ysqr'" class="citation">Yalcin et al., 2022</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

h1 {
  margin-bottom: 0.5rem;
}

.exam-list {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}

.exam-link {
  display: block;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s;
}

.exam-link:hover {
  border-color: #666;
}

.exam-link strong {
  display: block;
  margin-bottom: 0.25rem;
}

.question-count {
  font-size: 0.875rem;
  color: #666;
}

.citation {
  display: block;
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.25rem;
}
</style>
