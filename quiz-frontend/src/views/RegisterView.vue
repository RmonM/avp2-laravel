<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api'; 

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const router = useRouter();
const message = ref('');

const register = async () => {
  message.value = '';
  try {
    const response = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    
    message.value = 'Cadastro realizado com sucesso! Faça login.';
    // Opcional: Redirecionar automaticamente
    // setTimeout(() => router.push({ name: 'Login' }), 2000); 

  } catch (err) {
    message.value = 'Falha no cadastro. Verifique os dados.';
    console.error('Erro de Cadastro:', err.response.data);
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>Novo Cadastro</h2>

    <form @submit.prevent="register">
      <p v-if="message" class="info-message">{{ message }}</p>

      <div class="input-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="name" required>
      </div>

      <div class="input-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required>
      </div>

      <div class="input-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required>
      </div>

      <div class="input-group">
        <label for="confirm-password">Confirme a Senha:</label>
        <input type="password" id="confirm-password" v-model="password_confirmation" required>
      </div>

      <button type="submit">Cadastrar</button>
    </form>

    <router-link to="/login">Já tenho uma conta. Fazer Login</router-link>
  </div>
</template>