<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const id1 = ref('')
const email1 = ref('')

async function login() {
  const res = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      email: email.value, 
      password: password.value })
  })

  const json = await res.json()
  console.log(json)

  if (json && json.user) {
    id1.value = json.user.id
    email1.value = json.user.email
  }
}

</script>

<template>
  Email: {{ email }}<br>
  Password: {{ password }}<br><br>

  ID1: {{ id1 }}<br>
  Email1: {{ email1 }}<br><br>

  <div v-if="id1 == ''">
    <h1>Login</h1><br>
    <input v-model="email" placeholder="email" /><br>
    <input v-model="password" placeholder="password" /><br>
    <button @click="login">Login</button>
  </div>


</template>
