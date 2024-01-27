<template>
  <div class="container mt-5">
    <div class="mb-3">
      <input v-model="newMessage" class="form-control" placeholder="Type your message" />
    </div>
    <button @click="postMessage" class="btn btn-primary">Submit</button>

    <div class="mt-3">
      <div v-for="message in filteredMessages" :key="message.id" class="alert alert-info">
        <strong>Sender:</strong> {{ message.user.name }}
        <br>
        <strong>Friend:</strong> {{ message.friend.name }}
        <br>
        <strong>Message:</strong> {{ message.messages }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newMessage: '',
      messages: [],
    };
  },
  computed: {
    currentUserId() {
      //return localStorage.getItem('userId');
      return sessionStorage.getItem('userId');
    },
    friendId() {
      //return localStorage.getItem('selectedUserId');
      return sessionStorage.getItem('selectedUserId');
    },
    filteredMessages() {
      // Filter messages based on current user and friend IDs
      return this.messages.filter(message => (
        (message.user.id === this.currentUserId && message.friend.id === this.friendId) ||
        (message.user.id === this.friendId && message.friend.id === this.currentUserId)
      ));
    },
  },
  methods: {
    async postMessage() {
      try {
        // const currentUserId = localStorage.getItem('userId');
        // const friendId = localStorage.getItem('selectedUserId');

        const currentUserId = sessionStorage.getItem('userId');
        const friendId = sessionStorage.getItem('selectedUserId');

        await axios.post('http://localhost:3000/api/userMessages', {
          user: currentUserId,
          friend: friendId,
          messages: this.newMessage,
        });

        this.newMessage = '';

        // Instead of updating messages immediately, you can wait for the response
        await this.getMessages();
      } catch (error) {
        console.error('Error posting message:', error);
      }
    },
    async getMessages() {
      try {
        const response = await axios.get('http://localhost:3000/api/userMessages');
        this.messages = response.data.docs;
      } catch (error) {
        console.error('Error getting messages:', error);
      }
    },
  },
  mounted() {
    this.getMessages();
  },
};
</script>

