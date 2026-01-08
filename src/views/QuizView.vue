<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { exams } from '../data'
import { calculateResult } from '../utils/scoring'
import { saveResult } from '../utils/storage'
import QuestionCard from '../components/QuestionCard.vue'

const route = useRoute()
const router = useRouter()

const exam = computed(() => exams.find(e => e.id === route.params.examId))
const currentIndex = ref(0)
const answers = ref<Record<number, number>>({})

const currentQuestion = computed(() => exam.value?.questions[currentIndex.value])
const isLastQuestion = computed(() =>
  exam.value ? currentIndex.value === exam.value.questions.length - 1 : false
)
const hasAnswer = computed(() =>
  currentQuestion.value ? answers.value[currentQuestion.value.id] !== undefined : false
)

function selectAnswer(answer: number) {
  if (currentQuestion.value) {
    answers.value[currentQuestion.value.id] = answer
  }
}

function next() {
  if (!hasAnswer.value || !exam.value) return

  if (isLastQuestion.value) {
    const result = calculateResult(exam.value, answers.value)
    saveResult(result)
    router.push({ name: 'results', params: { examId: exam.value.id } })
  } else {
    currentIndex.value++
  }
}
</script>

<template>
  <div v-if="exam && currentQuestion" class="quiz">
    <h2>{{ exam.name }}</h2>
    <QuestionCard
      :question="currentQuestion"
      :question-number="currentIndex + 1"
      :total-questions="exam.questions.length"
      :selected-answer="answers[currentQuestion.id] ?? null"
      :scale-max="exam.scaleMax"
      @select="selectAnswer"
    />
    <button
      class="next-btn"
      :disabled="!hasAnswer"
      @click="next"
    >
      {{ isLastQuestion ? 'Finish' : 'Next' }}
    </button>
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

.next-btn {
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background: #333;
  color: white;
  cursor: pointer;
}

.next-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.next-btn:not(:disabled):hover {
  background: #444;
}
</style>
