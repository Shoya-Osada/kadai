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
  </div>
</template>

<script>
import axios from 'axios'
//外部のindex.jsをapiの名前にして、apiのメソッドを呼ぶためのimport
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
      //階層を深くしないようにするための処理
      var self = this
      //this.idtokenにローカルストレージのIDTokenを入れる
      this.idtoken = sessionStorage.getItem('IDToken')

      //console.log(this.idtoken)

      //データベースからデータを取得(動的にURLを変更)
    axios( {
          method:'GET',// GET,POSTなど
          url:"https://itnwad21sg.execute-api.us-east-1.amazonaws.com/dev/getitem",// APIのURL
          headers:{
          'X-Api-Key':this.idtoken//リクエストヘッダー
        }},
        )
        //成功したらself.countに帰ってきたdataのlengthを入れる
      .then(response =>
      self.count = response.data.length);
      // this.items = response.data
      // console.log(response));
      // self.count = response.data.count
      // console.log(this.count)  
  },
  methods:{
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
      //外部のjsファイル（api）からpostメソッドを使用
      //第一引数・apigatewayのURL
      //第二引数・送る値
      //第三引数・ログインできたかどうかのboolean型
      api.post("https://itnwad21sg.execute-api.us-east-1.amazonaws.com/dev/putitem",box,true)

      alert("出勤時間は" + start_date+start_time + "です")
        
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

      //外部のjsファイル（api）からpostメソッドを使用
      //第一引数・apigatewayのURL
      //第二引数・送る値
      //第三引数・ログインできたかどうかのboolean型
      api.post("https://itnwad21sg.execute-api.us-east-1.amazonaws.com/dev/putitem",box1,true)

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
      //ボタンを押すたびにuserboxの初期化を行い、再取得
      this.userbox = []
      //ローカルストレージからIDTokenを取得して、this.idtokenに入れる
      this.idtoken = sessionStorage.getItem('IDToken')
      //データベースからデータを取得(動的にURLを変更)
     var box = await axios( {
          method:'GET',// GET,POSTなど
          url:"https://itnwad21sg.execute-api.us-east-1.amazonaws.com/dev/getitem",// APIのURL
          headers:{
          'X-Api-Key':this.idtoken//リクエストヘッダー
        }},
        )
        //成功したら返り値responseのdataをthis.itemsに入れる
     .then(response => this.items = response.data);

    console.log("ここにボックスが入ってます")
    console.log(box)

     //boxをworklistに入れる
     this.worklist = box
     //worklistの中身を表示
     console.log(this.worklist)
     //ストレージからusernameを取得して、usernameに入れる
     this.username = sessionStorage.getItem('username')
    
    //データーベースの中身を表示させるためにforで回す
     for(var i = 0; i < self.worklist.length; i++){
      //  console.log(this.worklist[i].id)
      //  console.log(this.username)
      //もしworklistのi番目のidがusernameと同じなら
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