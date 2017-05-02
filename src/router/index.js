import Vue from 'vue'
import Router from 'vue-router'
import Home from './../pages/home/Index'
import Book from './../pages/book/Index'
import Movie from '@/pages/movie'
import Music from '@/pages/music'
import Photo from '@/pages/photo'
import RecommendSongs from '@/pages/music/recommendSongs'
import Rank from '@/pages/music/Rank'
import SongsResource from '@/pages/music/songsResource'
import Play from '@/pages/music/components/play'
import HotSongs from '@/pages/music/hotSongs'
import R1d from '@/pages/book/R1Details'
import SingerInfo from '@/pages/music/singerInfo'
import MusicList from '@/pages/music/musicList'
import AlbumInfo from '@/pages/music/albumInfo'
import About from '@/pages/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      children:[
        {path:'movie',component:Movie},
        {path:'music',component:Music},
        {path:'book',component:Book},
        {path:'photo',component:Photo}
      ]
    },
    {path:'/recommendSongs',component:RecommendSongs},
    {path:'/rank',component:Rank},
    {path:'/hotSongs',component:HotSongs},
    {path:'/musicList/:rankId',component:MusicList},
    {path:'/play',component:Play},
    {path:'/r1d/:_id',component:R1d},
    {path:'/songsResource',component:SongsResource},
    {path:'/singerInfo',component:SingerInfo},
    {path:'/albumInfo',component:AlbumInfo},
    {path:'/about',component:About},
    {path:'*', redirect: '/home/book'}
  ]
})
