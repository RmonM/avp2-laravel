<script setup>
// Não precisa de código JavaScript complexo aqui, a mágica é feita
// pelo Vue Router, que já foi configurado no main.js.
</script>

<template>
  <div id="wrapper">
    <RouterView />
  </div>
</template>

<style>
/* Aqui ficariam os estilos globais ou importação de um CSS global.
  Abaixo está um CSS de exemplo (que você pode precisar ajustar) 
  para dar a aparência básica do quiz.
*/
:root {
  --color-primary: #4a90e2;
  --color-secondary: #50e3c2;
  --color-danger: #e24a4a;
  --color-background: #f4f7f6;
  --color-text: #333;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--color-background);
  color: var(--color-text);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#app {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  box-sizing: border-box;
}

.auth-container, .dashboard-container, .quiz-container, .ranking-container {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2, h3 {
  color: var(--color-primary);
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input[type="text"],
.input-group input[type="email"],
.input-group input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button, .btn {
  background-color: var(--color-primary);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px 0;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease;
}

button:hover, .btn:hover {
  background-color: #3b7ad6;
}

.btn-secondary {
  background-color: var(--color-secondary);
}

.btn-secondary:hover {
  background-color: #34c4a5;
}

.error-message {
  color: var(--color-danger);
  background-color: #fcebeb;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}
</style>