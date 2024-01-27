<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="border p-4 rounded shadow" style="background-color: #F4F8FA;">
          <h2 class="text-center mb-4">Login Page</h2>
          <form @submit.prevent="loginUser">
            <!-- <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input v-model="loginData.name" type="text" class="form-control" id="exampleInputName" required>
            </div> -->
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input v-model="loginData.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input v-model="loginData.password" type="password" class="form-control" id="exampleInputPassword1" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
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
      loginData: {
        // name: '',
        email: '',
        password: '',
        rememberMe: false,
      },
      errorMessage: '',
      userId: null, // Menyimpan ID pengguna yang login
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/api/members', this.loginData);

        console.log('Berhasil login:', response.data);

        const { token, user } = response.data;

        // Periksa apakah userId ada sebelum menyimpannya
        if (user && user.id) {
          // Simpan token dan userId di localStorage
          // localStorage.setItem('token', token);
          // localStorage.setItem('userId', user.id);

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', user.id);

          // Simpan userId di state
          this.userId = user.id;

          console.log('User ID:', this.userId);

          this.$router.push({ name: 'dashboard', params: { userId: this.userId } });
          //this.refreshData();
          
        } else {
          console.error('Gagal login: User ID tidak ditemukan dalam respons server.');
          this.errorMessage = 'Gagal login. Silakan coba lagi.';
        }
      } catch (error) {
        console.error('Gagal login:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 401) {
          this.errorMessage = 'User does not exist. Please register.';
        }
      }
      try {
  const response = await axios.post('http://localhost:3000/api/members/login', this.loginData);

  console.log('Berhasil login:', response.data);

  const { token, user } = response.data;

  // Periksa apakah userId ada sebelum menyimpannya
  if (user && user.id) {
    // Setelah berhasil login atau ganti akun
    // localStorage.setItem('userId', user.id);
    // localStorage.setItem('selectedUserId', user.id); // Atur teman awal jika diperlukan

    sessionStorage.setItem('userId', user.id);
    sessionStorage.setItem('selectedUserId', user.id); // Atur teman awal jika diperlukan

    // Simpan token di localStorage
    //localStorage.setItem('token', token);

    sessionStorage.setItem('token', token);

    // Simpan userId di state
    this.userId = user.id;

    console.log('User ID:', this.userId);

    this.$router.push({ name: 'dashboard', params: { userId: this.userId } });
    //this.refreshData();

  } else {
    console.error('Gagal login: User ID tidak ditemukan dalam respons server.');
    this.errorMessage = 'Gagal login. Silakan coba lagi.';
  }
} catch (error) {
  console.error('Gagal login:', error.response ? error.response.data : error.message);

  if (error.response && error.response.status === 401) {
    this.errorMessage = 'User does not exist. Please register.';
  }
}
    },
  },
};
</script>

<!-- <script>
import axios from 'axios';

export default {
data() {
  return {
    loginData: {
      email: '',
      password: '',
      rememberMe: false,
    },
    errorMessage: '',
  };
},
methods: {
  async loginUser() {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', this.loginData);

      console.log('Berhasil login:', response.data);

      const token = response.data.token;
      localStorage.setItem('token', token);

      this.$router.push({ name: 'dashboard' });
    } catch (error) {
      console.error('Gagal login:', error.response ? error.response.data : error.message);

      if (error.response && error.response.status === 401) {
        this.errorMessage = 'User does not exist. Please register.';
        this.errorMessage = 'Gagal login. Silakan coba lagi.';
      }
    }
  }
}
};
</script> -->
