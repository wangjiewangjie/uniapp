<template>
  <view class="container">
    <view class="page-body">
      <view class="wrapper">
        <view
          class="toolbar"
          @tap="format"
          style="height: 120px; overflow-y: auto"
        >
          <view
            :class="formats.bold ? 'ql-active' : ''"
            class="iconfont icon-zitijiacu"
            data-name="bold"
          ></view>
          <view class="toolbar-font-size" v-show="hideFontSize">
            <view data-name="fontSize" data-value="12px">小</view>
            <view data-name="fontSize" data-value="24px">中</view>
            <view data-name="fontSize" data-value="36px">大</view>
          </view>
          <view class="iconfont icon-fontsize" @tap="insertFontsize"></view>

          <view class="iconfont icon-charutupian" @tap="insertImage"></view>
        </view>

        <view class="editor-wrapper">
          <editor
            id="editor"
            class="ql-container"
            placeholder="开始输入..."
            showImgSize
            showImgToolbar
            showImgResize
            @statuschange="onStatusChange"
            @ready="onEditorReady"
          ></editor>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formats: {},
      hideFontSize: false,
    };
  },
  methods: {
    insertFontsize() {
      this.hideFontSize = !this.hideFontSize;
    },

    onEditorReady() {
      uni
        .createSelectorQuery()
        .select('#editor')
        .context((res) => {
          this.editorCtx = res.context;
        })
        .exec();
    },
    format(e) {
      let { name, value } = e.target.dataset;
      if (!name) return;
      // console.log('format', name, value)
      this.editorCtx.format(name, value);
    },
    onStatusChange(e) {
      const formats = e.detail;
      this.formats = formats;
    },

    insertImage() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.editorCtx.insertImage({
            src: res.tempFilePaths[0],
            alt: '图像',
            success: function () {
              console.log('insert image success');
            },
          });
        },
      });
    },
  },
};
</script>

<style>
@import './editor-icon.css';

.page-body {
  height: calc(100vh - var(--window-top) - var(--status-bar-height));
}

.wrapper {
  height: 100%;
}

.editor-wrapper {
  height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
  background: #fff;
}

.iconfont {
  display: inline-block;
  padding: 8px 8px;
  cursor: pointer;
  font-size: 20px;
}

.toolbar {
  box-sizing: border-box;
  border-bottom: 0;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.ql-container {
  box-sizing: border-box;
  padding: 12px 15px;
  width: 100%;
  min-height: 30vh;
  height: 100%;
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
}

.ql-active {
  color: #06c;
}

.toolbar-font-size{
  display: flex;
}
</style>
