// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

// 1. Importação dos componentes/telas que você irá criar
// (Lembre-se de criar estes arquivos em src/views/)
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue' 
import QuizView from '../views/QuizView.vue'
import RankingView from '../views/RankingView.vue' 

// 2. Definição das Rotas
const router = createRouter({
  // Usa o histórico baseado no browser (URLs limpas)
  history: createWebHistory(import.meta.env.BASE_URL), 
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      // Esta meta indica que a rota NÃO exige autenticação.
      meta: { requiresAuth: false } 
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    // Rota Raiz (Dashboard/Home - Protegida)
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      // Esta meta indica que a rota EXIGE autenticação.
      meta: { requiresAuth: true } 
    },
    // Rota do Quiz (Protegida)
    {
      path: '/quiz',
      name: 'Quiz',
      component: QuizView,
      meta: { requiresAuth: true }
    },
    // Rota do Ranking (Protegida)
    {
        path: '/ranking',
        name: 'Ranking',
        component: RankingView,
        meta: { requiresAuth: true }
    },
    // Rota de 404 (opcional)
    {
        path: '/:catchAll(.*)',
        redirect: '/' // Redireciona qualquer rota inválida para o Dashboard
    }
  ]
})

// 3. O Navigation Guard: O Porteiro da Aplicação
router.beforeEach((to, from, next) => {
  // Verifica se a rota para onde estamos indo exige autenticação
  const requiresAuth = to.meta.requiresAuth; 
  // Busca o token de autenticação no armazenamento local
  const isAuthenticated = localStorage.getItem('authToken'); 

  if (requiresAuth && !isAuthenticated) {
    // Se a rota for protegida E o usuário NÃO tiver token:
    // Redireciona para a página de Login.
    next({ name: 'Login' });
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    // Se o usuário já está logado e tenta ir para Login/Registro:
    // Redireciona para o Dashboard/Home.
    next({ name: 'Dashboard' });
  } else {
    // Em qualquer outro caso, permite a navegação.
    next();
  }
})



// ... código anterior (definição da constante router) ...

// 3. O Navigation Guard: Lógica de Proteção de Rotas
router.beforeEach((to, from, next) => {
  // 1. Verifica se a rota atual (destino) exige autenticação
  const requiresAuth = to.meta.requiresAuth; 
  
  // 2. Verifica se o token de autenticação está salvo no localStorage
  const isAuthenticated = localStorage.getItem('authToken'); 

  if (requiresAuth && !isAuthenticated) {
    // Caso 1: Rota Protegida + Usuário NÃO autenticado
    // Redireciona para a página de Login e interrompe a navegação atual.
    console.log(`[Guard] Bloqueado o acesso a ${to.path}. Redirecionando para Login.`);
    next({ name: 'Login' });
  
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    // Caso 2: Rota Login/Registro + Usuário JÁ autenticado
    // Redireciona para o Dashboard para evitar que o usuário logado acesse telas de login novamente.
    console.log(`[Guard] Usuário logado tentou acessar ${to.path}. Redirecionando para Dashboard.`);
    next({ name: 'Dashboard' });
  
  } else {
    // Caso 3: Rota não protegida OU Rota protegida + Usuário AUTENTICADO
    // Permite a navegação.
    next();
  }
})

export default router

