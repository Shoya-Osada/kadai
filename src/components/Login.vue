<template>
  <div class="login">
    <h2>cognitoログイン</h2>
    <form @submit.prevent="login">
      <div>
        ユーザー名:
        <input type="text" placeholder="username" v-model="username" required>
      </div>
      <div>
        パスワード:
        <input type="password" placeholder="password" v-model="password" required>
      </div>
      <button>ログイン</button>
    </form>
    <router-link to="/confirm">確認コード入力</router-link>
    <router-link to="/singup">ユーザー登録</router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$cognito.login(this.username, this.password)
        .then(result => {
            console.log(result)
            //データの中のリフレッシュトークンを取得して、新しい箱に
            var refreshToken = result.refreshToken.token
            //idtokenのjwtTokenを取得してIDTokenに
            var IDToken = result.idToken.jwtToken
            //usenameを取得して新しい箱に
            var username = result.accessToken.payload.username
            //ストレージにリフレッシュトークンとIDトークンとusernameを置く
            sessionStorage.setItem('refreshToken',refreshToken)
            sessionStorage.setItem('IDToken',IDToken)
            sessionStorage.setItem('username',username)
            
            //kintaiページに飛ぶ
          this.$router.push('/kintai')
        })
        .then(err => {
          this.error = err
        })
    }
  }
}
</script>