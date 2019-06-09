<template>
    <div class="container">
        <form @submit.prevent>
            <div class="form-group">
                <label for="username">Username or Email</label>
                <input id="username" type="text" class="form-control" placeholder="Enter username or email" v-model="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="login()"> Submit </button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
      return {
          username: "",
          password: ""
      }
  },
  methods: {
      login: async function () {
          console.log(`Logging in with ${this.username} and ${this.password}`)
          let payload = {
              usernameOrEmail: this.username,
              password: this.password
          };
          try {
            let access = await axios.post("http://localhost:3000/auth/login", payload)
            console.log(`Logged in. Access token is ${JSON.stringify(access)}`);    
          } catch (error) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAa")
            console.error(error)  
          }
          
      }
  }
}
</script>