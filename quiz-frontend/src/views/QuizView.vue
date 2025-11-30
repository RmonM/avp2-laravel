<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quizStore'; // Importa o Pinia Store

const store = useQuizStore();
const router = useRouter();
const currentQuestionIndex = ref(0);

const currentQuestion = computed(() => {
  return store.questions[currentQuestionIndex.value];
});

const quizFinished = computed(() => {
  return store.quizResult !== null;
});

const allAnswered = computed(() => {
    if (store.questions.length === 0) return false;
    // Verifica se o número de respostas é igual ao número de perguntas
    return Object.keys(store.userAnswers).length === store.questions.length;
});

const nextQuestion = () => {
  if (currentQuestionIndex.value < store.questions.length - 1) {
    currentQuestionIndex.value++;
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const handleSubmit = async () => {
  if (!allAnswered.value) {
      alert('Por favor, responda a todas as perguntas antes de finalizar.');
      return;
  }
  try {
    await store.submitQuiz();
    alert(`Quiz finalizado! Sua pontuação: ${store.quizResult.score} de ${store.quizResult.total_questions}`);
  } catch (e) {
    alert('Não foi possível finalizar o quiz. Tente novamente.');
  }
};

onMounted(async () => {
  if (store.questions.length === 0) {
    try {
      await store.startQuiz();
      currentQuestionIndex.value = 0;
    } catch (e) {
      // Falha ao carregar quiz, retorna ao dashboard
      alert('Falha ao carregar o quiz. Verifique seu login ou se há perguntas cadastradas.');
      router.push({ name: 'Dashboard' });
    }
  }
});
</script>

<template>
  <div class="quiz-container">
    <div v-if="store.isLoading" class="loading-state">Carregando Quiz...</div>
    
    <div v-else-if="quizFinished" class="results-state">
        <h3>🎉 Quiz Finalizado!</h3>
        <p>Você acertou **{{ store.quizResult.score }}** de **{{ store.quizResult.total_questions }}** questões.</p>
        <router-link to="/ranking" class="btn btn-success">Ver Ranking Global</router-link>
    </div>

    <div v-else-if="store.questions.length > 0" class="question-state">
      <h4>Questão {{ currentQuestionIndex + 1 }} de {{ store.questions.length }}</h4>
      
      <p class="question-text">{{ currentQuestion.text }}</p>

      <div class="options-list">
        <div v-for="option in currentQuestion.options" :key="option.id" class="option-item">
          <input 
            type="radio" 
            :id="`option-${option.id}`" 
            :value="option.id" 
            :name="`question-${currentQuestion.id}`" 
            @change="store.setAnswer(currentQuestion.id, option.id)"
            :checked="store.userAnswers[currentQuestion.id] === option.id"
          />
          <label :for="`option-${option.id}`">{{ option.text }}</label>
        </div>
      </div>
      
      <div class="navigation-controls">
        <button @click="prevQuestion" :disabled="currentQuestionIndex === 0">← Anterior</button>
        
        <button 
          v-if="currentQuestionIndex < store.questions.length - 1" 
          @click="nextQuestion"
          :disabled="!store.userAnswers[currentQuestion.id]"
        >
          Próximo →
        </button>

        <button 
          v-else 
          @click="handleSubmit" 
          :disabled="!allAnswered"
          class="submit-button"
        >
          Finalizar Quiz ({{ Object.keys(store.userAnswers).length }}/{{ store.questions.length }})
        </button>
      </div>
    </div>
    
    <div v-else class="empty-state">
        Não foi possível carregar as perguntas.
    </div>
  </div>
</template>