<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api'; // Importa a instância do Axios

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  error.value = '';
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    });
    
    // Supondo que o token vem em 'access_token' ou 'token'
    const token = response.data.token || response.data.access_token; 
    
    if (token) {
      localStorage.setItem('authToken', token);
      // Redireciona para o Dashboard (Home)
      router.push({ name: 'Dashboard' }); 
    }
  } catch (err) {
    error.value = 'Falha no login. Verifique suas credenciais.';
    console.error('Erro de Login:', err);
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>Fazer Login</h2>
    
    <form @submit.prevent="login">
      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="input-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required>
      </div>

      <div class="input-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required>
      </div>

      <button type="submit">Entrar</button>
    </form>
    
    <router-link to="/register">Não tem uma conta? Cadastre-se</router-link>
  </div>
</template>