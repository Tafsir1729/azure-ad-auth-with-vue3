<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from './config/useAuth'
import { msalObj, state } from './config/authConfig'
import axios from 'axios'

const { login, logout, handleRedirect, getAccessToken } = useAuth()

const getToken = async () => {
  const token = await getAccessToken()
  console.log(token)
}

const callAPI = async () => {
  const token = await getAccessToken()
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  axios
    .get('https://localhost:7081/Department/GetAll', config)
    .then((response: any) => {
      console.log(response.data)
      alert('Success')
    })
    .catch((error: any) => {
      console.error('Api call error:', error)
      alert('Api call error')
    })
}
const handleLogin = async () => {
  await login()
}
const handleLogout = async () => {
  await logout()
}

const initialize = async () => {
  try {
    await msalObj.initialize()
  } catch (error) {
    console.error('Initialization error: ', error)
  }
}
onMounted(async () => {
  await initialize()
  await handleRedirect()
})
</script>

<template>
  <div
    class="wrapper"
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    "
  >
    <div style="text-align: center">
      <div v-if="state.isAuthenticated">
        <div>Welcome {{ state.user?.name }}!</div>
        <button
          style="
            margin: 10px;
            padding: 8px 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
          @click="handleLogout"
        >
          Log Out
        </button>
      </div>
      <div v-else>
        <button
          style="
            margin: 10px;
            padding: 8px 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
          @click="handleLogin"
        >
          Log in
        </button>
      </div>
      <div>
        <br />
        <button
          style="
            margin: 10px;
            padding: 8px 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
          @click="callAPI"
        >
          Call API
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
