import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import AddFiendView from '../views/AddFriendView.vue';
import ChatView from '../views/ChatView.vue';
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard/:userId',
    name: 'dashboard',
    component: DashboardView
  }, 
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    props: (route) => ({
      user: route.query.user,
      friend: route.query.friend,
    }),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
