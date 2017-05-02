import config from '../config/config'

export default {
  computedTheme: function (action) {
    let theme = {};
    switch (action) {
      case 'movie': {
        theme.topbarTitle = config.barTitle.Movie;
        theme.bgColor = config.BgColor.C3;
        break;
      }
      case 'music': {
        theme.topbarTitle = config.barTitle.Music;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'book': {
        theme.topbarTitle = config.barTitle.Book;
        theme.bgColor = config.BgColor.C1;
        break;
      }
      case 'photo': {
        theme.topbarTitle = config.barTitle.Photo;
        theme.bgColor = config.BgColor.C4;
        break;
      }
      case 'recommendSongs': {
        theme.topbarTitle = config.barTitle.RecommendSongs;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'rank': {
        theme.topbarTitle = config.barTitle.Rank;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'hotSongs': {
        theme.topbarTitle = config.barTitle.HotSong;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'songsResource': {
        theme.topbarTitle = config.barTitle.SongsResource;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'r1d': {
        theme.topbarTitle = config.barTitle.R1d;
        theme.bgColor = config.BgColor.C1;
        break;
      }
      case 'musicList/0': {
        theme.topbarTitle = config.barTitle.Music0;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/1': {
        theme.topbarTitle = config.barTitle.Music1;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/2': {
        theme.topbarTitle = config.barTitle.Music2;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/3': {
        theme.topbarTitle = config.barTitle.Music3;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/4': {
        theme.topbarTitle = config.barTitle.Music4;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/5': {
        theme.topbarTitle = config.barTitle.Music5;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/6': {
        theme.topbarTitle = config.barTitle.Music6;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/7': {
        theme.topbarTitle = config.barTitle.Music7;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/8': {
        theme.topbarTitle = config.barTitle.Music8;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/9': {
        theme.topbarTitle = config.barTitle.Music9;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/10': {
        theme.topbarTitle = config.barTitle.Music10;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/11': {
        theme.topbarTitle = config.barTitle.Music11;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/12': {
        theme.topbarTitle = config.barTitle.Music12;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/13': {
        theme.topbarTitle = config.barTitle.Music13;
        theme.bgColor = config.BgColor.C2;
      }
      case 'musicList/14': {
        theme.topbarTitle = config.barTitle.Music14;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/15': {
        theme.topbarTitle = config.barTitle.Music15;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/16': {
        theme.topbarTitle = config.barTitle.Music16;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/17': {
        theme.topbarTitle = config.barTitle.Music17;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/18': {
        theme.topbarTitle = config.barTitle.Music18;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/19': {
        theme.topbarTitle = config.barTitle.Music19;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/20': {
        theme.topbarTitle = config.barTitle.Music20;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'musicList/21': {
        theme.topbarTitle = config.barTitle.Music21;
        theme.bgColor = config.BgColor.C2;
        break;
      }
      case 'singerInfo':{
        theme.topbarTitle = config.barTitle.SingerInfo;
        theme.bgColor = config.BgColor.C5;
        break;
      }
      case 'albumInfo':{
        theme.topbarTitle = config.barTitle.AlbumInfo;
        theme.bgColor = config.BgColor.C5;
        break;
      }
      case 'about':{
        theme.topbarTitle = config.barTitle.About;
        break;
      }

    }
    return theme;
  }
}
