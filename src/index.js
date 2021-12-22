//import Utils from '../utils'
//import Storage from '../storage'

// 通信ライブラリ
import axios from 'axios'
const client = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:8080'
})

/**
 * API
 */
export default {
  method: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },

  // get(url, isAuth, store) {
  //   return new Promise((resolve, reject) => {
  //     if (isAuth) {
  //       const userInfo = Storage.userInfo(store)
  //       if (!userInfo.idToken) {
  //         const internalServerError = Utils.getInternalServerError()
  //         reject(internalServerError)
  //         return
  //       }

  //       client.defaults.headers.common['Authorization'] = userInfo.idToken
  //     }

  //     client
  //       .get(url)
  //       .then((response) => {
  //         Utils.log({
  //           response
  //         })

  //         resolve(response)
  //       })
  //       .catch((error) => {
  //         Utils.log({
  //           error
  //         })

  //         reject(error)
  //       })
  //   })
  //},

  post(url, params, isAuth) {
    return new Promise((resolve, reject) => {
      if (isAuth) {
        const userInfo = sessionStorage.getItem('IDToken')
        if (!userInfo) {
          //const internalServerError = Utils.getInternalServerError()
          reject("サーバーエラーが発生致しました。")
          return 
        }

        client.defaults.headers.common['Authorization'] = userInfo
      }

      client
        .post(url, params)
        .then((response) => {
        //   Utils.log({
        //     response
        //   })

          resolve(response)
        })
        .catch((error) => {
        //   Utils.log({
        //     error
        //   })

          reject(error)
        })
    })
  },

  // put(url, params, isAuth, store) {
  //   return new Promise((resolve, reject) => {
  //     if (isAuth) {
  //       const userInfo = Storage.userInfo(store)
  //       if (!userInfo.idToken) {
  //         const internalServerError = Utils.getInternalServerError()
  //         reject(internalServerError)
  //         return
  //       }

  //       client.defaults.headers.common['Authorization'] = userInfo.idToken
  //     }

  //     client
  //       .put(url, params)
  //       .then((response) => {
  //         Utils.log({
  //           response
  //         })

  //         resolve(response)
  //       })
  //       .catch((error) => {
  //         Utils.log({
  //           error
  //         })

  //         reject(error)
  //       })
  //   })
  // },

  // delete(url, isAuth, store) {
  //   return new Promise((resolve, reject) => {
  //     if (isAuth) {
  //       const userInfo = Storage.userInfo(store)
  //       if (!userInfo.idToken) {
  //         const internalServerError = Utils.getInternalServerError()
  //         reject(internalServerError)
  //         return
  //       }

  //       client.defaults.headers.common['Authorization'] = userInfo.idToken
  //     }

  //     client
  //       .delete(url)
  //       .then((response) => {
  //         Utils.log({
  //           response
  //         })

  //         resolve(response)
  //       })
  //       .catch((error) => {
  //         Utils.log({
  //           error
  //         })

  //         reject(error)
  //       })
  //   })
  // }
}
