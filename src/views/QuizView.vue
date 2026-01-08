<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { exams } from '../data'
import { calculateResult } from '../utils/scoring'
import { saveResult } from '../utils/storage'
import QuestionCard from '../components/QuestionCard.vue'

const route = useRoute()
const router = useRouter()

const exam = computed(() => exams.find(e => e.id === route.params.examId))
const currentIndex = computed(() => {
  const q = route.params.question
  if (!q || Array.isArray(q)) return 0
  const parsed = parseInt(q, 10)
  return isNaN(parsed) ? 0 : parsed - 1
})

const storageKey = computed(() => `quiz-answers-${route.params.examId}`)

function getStoredAnswers(): Record<number, number> {
  const data = sessionStorage.getItem(storageKey.value)
  if (!data) return {}
  return JSON.parse(data)
}

function storeAnswers(answers: Record<number, number>) {
  sessionStorage.setItem(storageKey.value, JSON.stringify(answers))
}

const currentQuestion = computed(() => exam.value?.questions[currentIndex.value])
const isLastQuestion = computed(() =>
  exam.value ? currentIndex.value === exam.value.questions.length - 1 : false
)

const selectedAnswer = computed(() => {
  if (!currentQuestion.value) return null
  const answers = getStoredAnswers()
  return answers[currentQuestion.value.id] ?? null
})

function selectAnswer(answer: number) {
  if (!currentQuestion.value || !exam.value) return

  const answers = getStoredAnswers()
  answers[currentQuestion.value.id] = answer
  storeAnswers(answers)

  if (isLastQuestion.value) {
    const result = calculateResult(exam.value, answers)
    saveResult(result)
    sessionStorage.removeItem(storageKey.value)
    router.push({ name: 'results', params: { examId: exam.value.id } })
  } else {
    router.push({
      name: 'quiz',
      params: { examId: exam.value.id, question: String(currentIndex.value + 2) }
    })
  }
}

// Redirect to question 1 if no question specified
watch(() => route.params, (params) => {
  if (params.examId && !params.question) {
    router.replace({
      name: 'quiz',
      params: { examId: params.examId, question: '1' }
    })
  }
}, { immediate: true })
</script>

<template>
  <div v-if="exam && currentQuestion" class="quiz">
    <h2>{{ exam.name }}</h2>
    <QuestionCard
      :question="currentQuestion"
      :question-number="currentIndex + 1"
      :total-questions="exam.questions.length"
      :selected-answer="selectedAnswer"
      :scale-max="exam.scaleMax"
      @select="selectAnswer"
    />
  </div>
  <div v-else>
    <p>Exam not found.</p>
  </div>
</template>

<style scoped>
.quiz {
  text-align: center;
}

h2 {
  margin-bottom: 2rem;
}
</style>
