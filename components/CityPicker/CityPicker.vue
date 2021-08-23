<template>
  <view class="citypicker">
    <!-- 搜索 -->
    <view class="city-search-wrap">
      <view class="city-search">
        <image src="./image/city_search.png" />
        <input v-model="search" @input="onInput" placeholder-class="placeholder" type="text" placeholder="搜索地址" />
      </view>
    </view>

    <view class="scroll-view">
      <scroll-view scroll-y="true" :scroll-into-view="scrollIntoId">
        <!-- 定位 -->
        <view class="city-location-wrap" id="top">
          <view class="city-location" :class="city=='定位中'?'loading':''">
            <image src="./image/city_location.png" />
            {{city}}
          </view>

          <view class="get-location" @click="getlocation">重新定位</view>
        </view>

        <!-- 热门 -->
        <view class="city-hot-wrap">
          <view class="title">热门城市</view>
          <view class="city-hot">
            <view class="city-hot-li" v-for="item in hotCityList" :key="item.adcode">{{ item.name }}</view>
          </view>
        </view>
        <!-- 城市列表 -->
        <view class="city-list-wrap" v-for="(item, index) in list" :id="getId(index)" :key="index">
          <view class="spell">{{ getId(index) }}</view>
          <view class="city-list-li" v-for="city in item" :key="city.adcode">
            <view>{{ city.name }}</view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 右侧字母 -->
    <view class="city-letters-wrap">
      <view @click="scrollTo('top')">#</view>
      <view v-for="item in letter" :key="item" @click="scrollTo(item)">{{ item }}</view>
    </view>

    <!-- 选中提示 -->
    <view class="mask" v-show="showMask">
      <view class="mask-item">{{selectLetter}}</view>
    </view>
  </view>
</template>

<script>
import { city, hotCityList } from './city';
import * as location from '@/util/location';
export default {
  data() {
    return {
      /* 数据源 */
      cityList:city,
      hotCityList: hotCityList,

      letter: [],
      list: [],

      search:'',

      city: '定位中',

      showMask: false,
      selectLetter: '',

      scrollIntoId: '',
    };
  },
  created() {
    this.getlocation();

    let mu = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'X', 'Y', 'Z'];
    let tmp = [];
    for (let i = 0; i < mu.length; i++) {
      let item = mu[i];
      for (let j = 0; j < this.cityList.length; j++) {
        let spell = this.cityList[j].spell;
        if (spell.substring(0, 1) == item) {
          if (tmp.indexOf(item) == -1) {
            this.list[i] = [this.cityList[j]];
            tmp.push(item);
            this.letter.push(item.toUpperCase());
          } else {
            this.list[i].push(this.cityList[j]);
          }
        }
      }
    }
  },
  methods: {
    /* 定位 */
    async getlocation() {
      let result = await location.getLocationFn();
      this.city = typeof result.addressComponent.city === 'string' ? result.addressComponent.city : result.addressComponent.province;
    },

    /* 搜索 */
    query(source, text) {
      console.log(source,text)
      // let res = [];
      // var self = this;
      // res = source.filter((item) => {
      //   const arr = [];
      //   let isHave = false;
      //   Object.keys(item).forEach((prop) => {
      //     const itemStr = item[prop];
      //     self.isString(itemStr) &&
      //       itemStr.split(',').forEach((val) => {
      //         arr.push(val);
      //       });
      //   });
      //   arr.some((val) => {
      //     isHave = new RegExp('^' + text).test(val);
      //     return isHave;
      //   });
      //   return isHave;
      // });
      // return res;
    },
    isString(obj) {
      return typeof obj === 'string';
    },
    onInput(e) {
      const value = e.target.value;
      if (value !== '' && city && city.length > 0) {
        const queryData = this.query(city, String(value).trim());
        this.searchList = queryData;
      } else {
        this.searchList = [];
      }
      console.log(this.searchList)
    },

    /* 获取id */
    getId(index) {
      return this.letter[index];
    },

    /* 滚动定位 */
    scrollTo(letter) {
      this.showMask = true;
      this.selectLetter = letter === 'top' ? '#' : letter;
      setTimeout(() => {
        this.showMask = false;
      }, 300);
      this.scrollIntoId = letter;
    },
  },
};
</script>

<style lang="scss" scoped>
.citypicker {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f7f7f7;
}
/deep/.scroll-view {
  height: calc(100% - 82px);
  uni-scroll-view {
    height: 100%;
  }
}

/* 搜索 */
.city-search-wrap {
  position: sticky;

  //#ifdef APP-PLUS
  top: 0rpx;
  //#endif

  //#ifdef H5
  top: 88rpx;
  //#endif
  z-index: 999;
  margin-bottom: 8rpx;
  padding: 32rpx;
  background: #fff;

  .city-search {
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;

    width: 686rpx;
    height: 88rpx;

    background: #f7f7f7;
    border-radius: 44rpx;

    image {
      margin-right: 16rpx;
      width: 40rpx;
      height: 40rpx;
    }

    input {
      flex: 1;
      font-size: 32rpx;
      color: #333;
    }

    .placeholder {
      font-size: 28rpx;
      color: #ccc;
    }
  }
}

/* 定位 */
.city-location-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  
  border-bottom: 1rpx solid #e0e0e0;

  .city-location {
    display: flex;
    align-items: center;
    
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;

    image {
      margin-right: 8rpx;
      width: 48rpx;
      height: 48rpx;
    }
  }

  .get-location {
    font-size: 28rpx;
    color: #999999;
  }

  /* loading动画 */
  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis 2s infinite;
    content: '\2026';
    /* ascii code for the ellipsis character */
  }

  @keyframes ellipsis {
    from {
      width: 4rpx;
    }

    to {
      width: 36rpx;
    }
  }
}

/* 热门 */
.city-hot-wrap {
  padding: 32rpx;

  .title {
    margin-bottom: 32rpx;
    font-size: 24rpx;
    line-height: 32rpx;
    color: #999;
  }

  .city-hot {
    display: grid;
    grid-template-columns: repeat(3, 192rpx);
    grid-template-rows: repeat(3, 88rpx);
    grid-gap: 24rpx;

    .city-hot-li {
      display: flex;
      justify-content: center;
      align-items: center;

      background: #fff;
      border: 1rpx solid #cccccc;
      border-radius: 16rpx;
    }
  }
}

/* 城市列表 */
.city-list-wrap {
  .spell {
    padding: 12rpx 32rpx;

    font-weight: bold;
    font-size: 32rpx;
    line-height: 40rpx;
    color: #333333;

    background: #f7f7f7;
  }

  .city-list-li {
    background: #fff;

    view {
      margin: 0 32rpx;
      padding: 32rpx 0;
      border-bottom: 1rpx solid #e0e0e0;
    }

    &:last-child {
      view {
        border: none;
      }
    }
  }
}

/* 右侧字母 */
.city-letters-wrap {
  position: fixed;
  right: 24rpx;

  //#ifdef APP-PLUS
  top: 148px;
  //#endif

  //#ifdef H5
  top: 192px;
  //#endif

  width: 48rpx;

  font-weight: 500;
  font-size: 24rpx;
  line-height: 36rpx;
  text-align: center;
  color: #999999;
}

/* 选中提示 */
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 678rpx;

  background: rgba(0, 0, 0, 0);

  .mask-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 36rpx;

    height: 220rpx;
    width: 220rpx;
    border-radius: 60rpx;
    background: rgba(0, 0, 0, 0.6);

    font-size: 96rpx;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
