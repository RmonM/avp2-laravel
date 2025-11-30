// src/stores/quizStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api'; // O cliente Axios configurado

export const useQuizStore = defineStore('quiz', () => {
  // Estado
  const questions = ref([]);
  const currentAttemptId = ref(null);
  const userAnswers = ref({}); 
  const isLoading = ref(false);
  const quizResult = ref(null);

  // Ações
  const startQuiz = async () => {
    isLoading.value = true;
    try {
      // Chama a API para iniciar e obter as perguntas
      const response = await api.get('/quiz/start'); 
      
      // Armazena o ID da tentativa de quiz e as perguntas
      currentAttemptId.value = response.data.quiz_attempt_id; 
      questions.value = response.data.questions;
      userAnswers.value = {}; 
      quizResult.value = null;
      
    } catch (error) {
      console.error('Erro ao iniciar o quiz:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const setAnswer = (questionId, optionId) => {
    // Registra a resposta do usuário
    userAnswers.value[questionId] = optionId;
  };

  const submitQuiz = async () => {
    isLoading.value = true;
    try {
      const payload = {
        quiz_attempt_id: currentAttemptId.value,
        // Formato necessário para o backend
        answers: Object.entries(userAnswers.value).map(([question_id, option_id]) => ({
          question_id: parseInt(question_id),
          option_id: option_id,
        })),
      };

      // Chama a API para submeter e obter o resultado
      const response = await api.post('/quiz/submit', payload);

      quizResult.value = response.data; 

      return response.data;
    } catch (error) {
      console.error('Erro ao submeter o quiz:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return { 
    questions, 
    userAnswers, 
    isLoading, 
    quizResult, 
    startQuiz, 
    setAnswer, 
    submitQuiz 
  };
});