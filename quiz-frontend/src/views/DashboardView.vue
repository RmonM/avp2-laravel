<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const user = ref(null);

// Rota protegida essencial para persistir o login (GET /api/user)
onMounted(async () => {
    try {
        const response = await api.get('/user');
        user.value = response.data;
    } catch (e) {
        // Se a chamada falhar (token expirado/inválido), força o logout
        console.error('Sessão expirada ou inválida. Redirecionando para login.');
        handleLogout();
    }
});

const handleLogout = async () => {
    try {
        // Chama o endpoint de logout
        await api.post('/logout'); 
    } catch (e) {
        // Ignora erros no logout do backend (o frontend fará o logoff de qualquer forma)
        console.warn('Erro ao chamar logout, mas efetuando logoff local.');
    }
    
    // Limpa o token localmente e redireciona
    localStorage.removeItem('authToken');
    router.push({ name: 'Login' });
};
</script>

<template>
  <div class="dashboard-container">
    <h1>Bem-vindo(a), {{ user ? user.name : 'Usuário' }}!</h1>

    <div class="actions-panel">
      <h3>O que você gostaria de fazer?</h3>
      <nav>
        <router-link to="/quiz" class="btn btn-primary">Iniciar um Novo Quiz</router-link>
        <router-link to="/ranking" class="btn btn-secondary">Ver o Ranking Global</router-link>
      </nav>
    </div>

    <button @click="handleLogout" class="btn btn-logout">Sair (Logout)</button>
  </div>
</template>