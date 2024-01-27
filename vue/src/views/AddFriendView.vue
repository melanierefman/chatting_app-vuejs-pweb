<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="border p-4 rounded shadow" style="background-color: #F4F8FA;">
          <h2 class="text-center mb-4">Add Friend</h2>
          <form @submit.prevent="addFriend">
            <div class="mb-3">
              <label for="friend_name" class="form-label">Friend's Name</label>
              <input v-model="addFriendData.name" type="text" class="form-control" id="friend_name" required>
            </div>
            <div class="mb-3">
              <label for="phone_number" class="form-label">Phone Number</label>
              <input v-model="addFriendData.phone_number" type="text" class="form-control" id="phone_number" required>
            </div>
            <button type="submit" class="btn btn-primary">Add Friend</button>
          </form>
          <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
          </div>
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
      addFriendData: {
        name: '',
        phone_number: ''
      },
      errorMessage: '',
    };
  },
  methods: {
    addFriend() {
      axios.post('http://localhost:3000/api/friends', this.addFriendData)
        .then(response => {
          console.log('Berhasil menambahkan teman:', response.data);
          this.$router.push({ name: 'dashboard' });
        })
        .catch(error => {
          console.error('Gagal menambahkan teman:', error.response ? error.response.data : error.message);
          this.errorMessage = 'Gagal menambahkan teman. Silakan coba lagi.';
        });
    }
  }
};
</script>

<!-- <template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="border p-4 rounded shadow" style="background-color: #F4F8FA;">
          <h2 class="text-center mb-4">Add Friend</h2>
          <form @submit.prevent="addFriend">
            <div class="mb-3">
              <label for="friend_name" class="form-label">Friend's Name</label>
              <input v-model="addFriendData.name" type="text" class="form-control" id="friend_name" required>
            </div>
            <div class="mb-3">
              <label for="phone_number" class="form-label">Phone Number</label>
              <input v-model="addFriendData.phone_number" type="text" class="form-control" id="phone_number" required>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="!isAuthenticated">Add Friend</button>
          </form>
          <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
          </div>
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
      addFriendData: {
        name: '',
        phone_number: '',
      },
      errorMessage: '',
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('authToken');
    },
  },
  methods: {
    addFriend() {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('User not authenticated.');
        return;
      }

      axios.post('http://localhost:3000/api/friends', this.addFriendData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => {
          console.log('Berhasil menambahkan teman:', response.data);
          this.$router.push({ name: 'dashboard' });
        })
        .catch(error => {
          console.error('Gagal menambahkan teman:', error.response ? error.response.data : error.message);
          this.errorMessage = 'Gagal menambahkan teman. Silakan coba lagi.';
        });
    },
  },
};
</script>

<style>
  /* Your existing CSS styles */
</style> -->



