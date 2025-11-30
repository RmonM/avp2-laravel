<script setup>
import { onMounted, ref } from 'vue';
import api from '@/services/api'; 

const rankingList = ref([]);
const isLoading = ref(true);
const error = ref(null);

const fetchRanking = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        // Chama o endpoint protegido de Ranking
        const response = await api.get('/ranking'); 
        // Supondo que a API retorna um array de objetos: 
        // [{ name: 'Usuário A', score: 90 }, { name: 'Usuário B', score: 85 }, ...]
        rankingList.value = response.data; 
    } catch (e) {
        error.value = 'Não foi possível carregar o ranking. Tente novamente.';
        console.error('Erro ao buscar ranking:', e);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchRanking);
</script>

<template>
  <div class="ranking-container">
    <h2>🏆 Ranking Global do Quiz</h2>

    <div v-if="isLoading">Carregando ranking...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="rankingList.length === 0">Nenhum resultado de quiz encontrado ainda.</div>

    <table v-else class="ranking-table">
      <thead>
        <tr>
          <th>Posição</th>
          <th>Usuário</th>
          <th>Pontuação Máxima</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rankingList" :key="index">
          <td>{{ index + 1 }}º</td>
          <td>{{ item.user_name || item.name }}</td> 
          <td>{{ item.score || item.max_score }} pontos</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>