<script setup lang="ts">
import type { Question } from '../types'

defineProps<{
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedAnswer: number | null
  scaleMax: number
}>()

const emit = defineEmits<{
  select: [answer: number]
}>()
</script>

<template>
  <div class="question-card">
    <div class="progress">
      Question {{ questionNumber }} of {{ totalQuestions }}
    </div>
    <p class="question-text">{{ question.text }}</p>
    <div class="scale">
      <div class="scale-labels">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
      <div class="scale-buttons">
        <button
          v-for="n in scaleMax"
          :key="n"
          :class="{ selected: selectedAnswer === n }"
          @click="emit('select', n)"
        >
          {{ n }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-card {
  text-align: center;
}

.progress {
  color: #666;
  margin-bottom: 1rem;
}

.question-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}

.scale-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.scale-buttons button {
  width: 3rem;
  height: 3rem;
  border: 2px solid #ccc;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.scale-buttons button:hover {
  border-color: #666;
}

.scale-buttons button.selected {
  background: #333;
  color: white;
  border-color: #333;
}
</style>
