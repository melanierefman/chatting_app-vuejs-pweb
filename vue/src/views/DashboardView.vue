<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/dashboard">ChatApp</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav ms-auto">
            <router-link to="/profile" class="nav-link">Profile</router-link>
            <button @click="logout" class="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="row">
        <h2>Your Friends</h2>
        <div class="d-flex flex-wrap">
          <friend-card></friend-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendCard from '@/components/FriendCard.vue';
import axios from 'axios';

export default {
  components: {
    FriendCard,
  },
  data() {
    return {
      friends: [],
    };
  },
  methods: {
    async fetchFriends() {
      try {
        const response = await axios.get('http://localhost:3000/api/friends');
        this.friends = response.data.docs;
      } catch (error) {
        console.error('Failed to fetch friends data:', error.message);
      }
    },
    logout() {
      // Example logout process
      // localStorage.removeItem('userId');
      // localStorage.removeItem('selectedUserId');
      // localStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('selectedUserId');
      sessionStorage.removeItem('token');
      console.log('You have been logged out!');
      this.$router.push('/');
    },
  },
  mounted() {
    this.fetchFriends();
  },
};
</script>

<style>
/* Additional styles if needed */
</style>

    
<style>
  /* Gaya CSS untuk dashboard */
  nav {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #F4F8FA;
  }
    
  nav div {
    display: flex;
  }
    
  nav div button {
    margin-left: 10px;
  }
    
  ul {
    list-style: none;
    padding: 0;
  }
    
  ul li {
    margin-bottom: 8px;
  }
</style>
  