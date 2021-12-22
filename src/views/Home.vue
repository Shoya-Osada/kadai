<template>
  <div class="home">
    <h1>勤怠ホーム画面</h1>
    <router-link to="/login2">アカウントをお持ちの方はこちら</router-link>
    <div>
      <router-link to="/About">アカウントをお持ちじゃない方はこちら</router-link>
    </div>
    <button @click="back">最初に戻る</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods:{
    back(){
      this.$router.push("/login")
    }
  }
}
</script>
