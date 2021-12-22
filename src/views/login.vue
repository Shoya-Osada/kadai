<template>
  <div>
    <h1>勤怠ログイン画面</h1>
    <input type="text" v-model="email" placeholder="メールアドレスを入力">
    <div>
      <input type="password" v-model="password" placeholder="パスワードを入力">
    </div>
    <button @click="login">ログイン</button>
    <button @click="back">戻る</button>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      email:"",
      password:"",
      userid:"",
      text:"",
    }
  },
  methods:{
    login(){
      var self = this
      //通信ライブラリでデータを送る
      axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + "AIzaSyAR4HImtY6KRc9Mv0QjHsbWn0FLfl-JEgc",{
        
        email:this.email,
        password:this.password
      })
      //うまくいったときの処理
      .then(response => {
        console.log(response)
        //localIdを取得してuseridにいれる。
        self.userid = response.data.localId
        console.log(self.userid)
        //ブラウザを切った後に、消えるストレージに一時的に保存する
        sessionStorage.setItem('name',self.userid)
        //勤怠画面に画面遷移
        this.$router.push('/kintai')
        
        //うまくいかなかったときの処理
      }).catch(() => {
        alert("メールアドレスまたはパスワードが間違っています。やり直してください。")
        //間違っていたら、打ち直し
        this.email = "";
        this.password = "";
      })
    },
    back(){
      this.$router.go(-1)
    }
  }
}
</script>