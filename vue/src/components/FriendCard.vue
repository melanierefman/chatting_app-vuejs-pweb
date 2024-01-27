<template>
  <div>
    <div v-for="user in users" :key="user.id">
      <div v-if="user.id !== getStoredUserId()" class="card m-2">
        <div class="card-body border p-4 rounded shadow-sm" style="background-color: #F4F8FA;">
          <h5 class="card-title fw-bold">{{ user.name }}</h5>
          <p class="card-text">{{ user.email }}</p>
          <button @click="chat(user.id)" class="btn btn-primary">Chat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/members');
        this.users = response.data.docs;
      } catch (error) {
        console.error('Failed to fetch users data:', error.message);
      }
    },
    chat(selectedUserId) {
      // Save selectedUserId to localStorage
      //localStorage.setItem('selectedUserId', selectedUserId);
      sessionStorage.setItem('selectedUserId', selectedUserId);
      console.log('friend:', selectedUserId);

      // Get the current userId from localStorage
      //const currentUserId = localStorage.getItem('userId');
      const currentUserId = sessionStorage.getItem('userId');
      console.log('current user:', currentUserId);

      // Navigate to the updated URL
      this.$router.push({
        name: 'chat',
        query: { user: currentUserId, friend: selectedUserId },
      });
    },
    getStoredUserId() {
      //return localStorage.getItem('userId');
      return sessionStorage.getItem('userId');
    },
  },
};
</script>

<style>
/* Additional styles if needed */
</style>





