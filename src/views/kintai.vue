<template>
  <div>
    <button @click="start_work">出勤</button>
    <button @click="end_work">退勤</button>
    <button @click="datalist">履歴</button>
    <div>
      <table>
        <tr>
          <th>出勤</th>
          <th>退勤</th>
        </tr>
        <tr v-for="(item,index) in userbox" :key="index">
          <td v-if="item.number == 0">{{item.date}}  {{item.time}}</td>
          <td>{{item.date}}  {{item.time}}</td>
        </tr>
      </table>
    </div>
    <button @click="logout">ログアウト</button>
    <!-- <button @click="cnt">カウント</button> -->
  </div>
</template>

<script>
import axios from 'axios'
import api from '../index'
export default {
  data(){
    return{
      worklist:[],
      username:"",
      userbox:[],
      count:0,
      idtoken:""
    }
  },
  created(){

      var self = this
      this.idtoken = sessionStorage.getItem('IDToken')
      //データベースからデータを取得(動的にURLを変更)
    axios( {
          method:'GET',// GET,POSTなど
          url:"https://3rh22uarg3.execute-api.us-east-1.amazonaws.com/kintaiApi/getitem",// APIのURL
          headers:{
          'X-Api-Key':this.idtoken//リクエストヘッダー
        }},
        )
      .then(response =>
      self.count = response.data.length);
      // this.items = response.data
      // console.log(response));
      // self.count = response.data.count
      // console.log(this.count)  
  },
  methods:{
    // cnt(){
    //     console.log(this.count)
    // },
    start_work(){
      //一時的に保存したデータを取得
      //ストレージからusernameを取得
      this.username = sessionStorage.getItem('username')
      //ストレージからidtokenを取得
      this.idtoken = sessionStorage.getItem('IDToken')

      console.log("idtokenとusernameをストレージから取得")

      console.log(this.username)

      //現在の年月日時を取得
      var start_date = new Date().toLocaleDateString()
      var start_time = new Date().toLocaleTimeString()
      console.log(start_date,start_time)



      //カウントを１足していく
      this.count += 1

      var box = {
        "id":this.username,
        "date":start_date,
        "time":start_time,
        "type":"出勤",
        "number":0,
        "count":this.count
      }

      api.post("https://3rh22uarg3.execute-api.us-east-1.amazonaws.com/kintaiApi/putitem",box,true)

      alert("出勤時間は" + start_date+start_time + "です")

      //JSON.stringify(["id","date","time","type","number","count"]);
        
      //データベースにデータを送る
      // axios({
      //     method:'POST',// GET,POSTなど
      //     url:"https://3rh22uarg3.execute-api.us-east-1.amazonaws.com/kintaiApi/putitem",// APIのURL
      //     headers:{
      //     'Authorization':this.idtoken  //リクエストヘッダー
      //     }
      //   },box)
      // .then(response =>{
      //   console.log(response)
      //   alert("出勤時間は" + start_date+start_time + "です")
      // })
    },

    end_work(){
      //現在の年月日時を取得
      var end_date = new Date().toLocaleDateString()
      var end_time = new Date().toLocaleTimeString()
      console.log(end_date,end_time)
      //ストレージからIDトークンを取得
      this.idtoken = sessionStorage.getItem('IDToken')
      //ストレージからusernameを取得
      this.username = sessionStorage.getItem('username')

      console.log(this.username)

      console.log("idtokenとusenameをストレージから取得")
      //データベースにデータを送る(動的にURLを変更)
      //カウントを１足していく
      this.count += 1

      var box1 = {
        "id":this.username,
        "date":end_date,
        "time":end_time,
        "type":"退勤",
        "number":"1",
        "count": this.count
      }

      api.post("https://3rh22uarg3.execute-api.us-east-1.amazonaws.com/kintaiApi/putitem",box1,true)

      alert("出勤時間は" + end_date + end_time + "です")

      // axios({
      //     method:'POST',// GET,POSTなど
      //     url:"https://3rh22uarg3.execute-api.us-east-1.amazonaws.com/kintaiApi/putitem",// APIのURL
      //     headers:{
      //     'Authorization':this.idtoken//リクエストヘッダー
      //     }
      //   },box1)
      // .then(response =>{
      //   console.log(response)
      //   alert("出勤時間は" + end_date + end_time + "です")
      // })
    },
    async datalist(){
      var self = this
      //userboxの初期化
      this.userbox = []
      this.idtoken = sessionStorage.getItem('IDToken')
      //データベースからデータを取得(動的にURLを変更)
     var box = await axios( {
          method:'GET',// GET,POSTなど
          url:"https://3rh22uarg3.execute-api.us-east-1.amazonaws.com/kintaiApi/getitem",// APIのURL
          headers:{
          'X-Api-Key':this.idtoken//リクエストヘッダー
        }},
        )
     .then(response => this.items = response.data);

    console.log("ここにボックスが入ってます")
    console.log(box)

     //boxをworklistに入れる
     this.worklist = box
     //worklistの中身を表示
     console.log(this.worklist)
     //ストレージからusernameを取得して、usernameに入れる
     this.username = sessionStorage.getItem('username')

     for(var i = 0; i < self.worklist.length; i++){
      //  console.log(this.worklist[i].id)
      //  console.log(this.username)
       if(self.worklist[i].id === self.username){
         self.userbox.push(self.worklist[i])
         console.log(self.worklist[i])
       }
       //console.log(this.userbox)
     }
     //console.log("ここに表示",this.userbox)
    },
    logout(){
      this.$router.go(-1)
    }
  }
}
</script>