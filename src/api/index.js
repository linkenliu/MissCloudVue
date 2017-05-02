import axios from 'axios'

axios.defaults.withCredentials = true;


import config from '@/config/config'

const baseUrl0 = `${config.serviecPath}:3000/`;

const baseUrl1 = `${config.serviecPath}:3537/api/v1/`;

export default {
  recommendSongs (params) {
    return axios.get(`${baseUrl0}recommend/songs`);
  },
  login (params) {
    return axios.get(`login/cellphone?phone=15618788747&password=sheng3746956`);
  },
  topList (params) {
    return axios.get(`${baseUrl0}top_list?idx=${params.idx}`);
  },
  topicList (params) {
    return axios.get(`${baseUrl1}topics`);
  },
  topic (params) {
    return axios.get(`${baseUrl1}topic?_id=${params._id}`);
  },
  recommendResource () {
    return axios.get(`${baseUrl0}recommend/resource`);
  },
  recommendResourceDetail(params) {
    let list = [];
    return axios.get(`${baseUrl0}playlist/detail?id=${params.id}`).then(res => {


      let playlist = res.data.playlist.tracks;


      let p = (item) => {
        return new Promise((resolve, reject) => {
          axios.get(`${baseUrl0}music/url?id=${item.id}`).then(res => {
            let object = res.data.data[0];
            resolve(object);
          });
        })
      };
      return new Promise((resolve, reject) => {
        Promise.all(playlist.map(item => {
          p(item).then(res => {
            item.mp3Url = res.url;
            list.push(item);
            resolve(item)
          });
        }))
      }).then(() => {
        return list;
      });
    });
  },
  getLyric (params) {
    return axios.get(`${baseUrl0}lyric?id=${params.id}`);
  },
  checkMusic (path) {
    return axios.get(`${baseUrl0}checkMusic?path=${path}`);
  },
  personalFm (){
    return axios.get(`${baseUrl0}personal_fm`);
  },
  search (params){
    let P1 = function () {//单曲
      return new Promise((resolve, reject) => {
        axios.get(`${baseUrl0}search?keywords=${params.keyword}&type=1`).then(res => {
          200 == res.data.code ? resolve(res.data.result.songs) : reject('error');
        });
      });
    };
    let P2 = function () {//专辑
      return new Promise((resolve, reject) => {
        axios.get(`${baseUrl0}search?keywords=${params.keyword}&type=10`).then(res => {
          if (200 == res.data.code) {
            let data = res.data.result.albums;
            /* data.sort(function (v, b) {
             return b.publishTime - v.publishTime;
             });*/
            resolve(data);
          } else {
            reject('error');
          }
        });
      });
    };
    let P3 = function () {//歌手
      return new Promise((resolve, reject) => {
        axios.get(`${baseUrl0}search?keywords=${params.keyword}&type=100`).then(res => {
          200 == res.data.code ? resolve(res.data.result.artists) : reject('error');
        });
      });
    };
    return Promise.all([P1(), P2(), P3()]);
  },
  singerInfo (params){
    return axios.get(`${baseUrl0}artists?id=${params.id}`);
  },
  albumInfo (params){
    return axios.get(`${baseUrl0}album?id=${params.id}`);
  },
  artistAlbum (params){
    return axios.get(`${baseUrl0}artist_album?id=${params.id}`);
  },
  login (params){
    return axios.get(`${baseUrl0}login/cellphone`);
  }
}
