<template>
  <v-layout row wrap class="nvmanage-image">
    <div class="page-toolbar">
      <a-upload
        name="file"
        :multiple="true"
        action="/newview/manage/uploadCarousel"
        @change="uploadImages"
      >
        <a-button>
          <a-icon type="upload" /> Click to Upload
        </a-button>
      </a-upload>
    </div>

    <a-table :columns="columns" :dataSource="carousels" bordered>
      <template slot="filePath" slot-scope="render">
        <v-img
          :src="render.smFilePath"
          :width="144"
          :height="81"
          @click="previewImage(render.filePath)"
          style="cursor: pointer;"
        />
      </template>
      <template slot="imageTitle" slot-scope="record">
        <editable-cell :text="record.title" @change="onCellChange(record._id, $event)"/>
      </template>
      <!-- <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
      </span> -->
      <span slot="action" slot-scope="record" class="table-action">
        <a-upload
          name="file"
          action="/newview/manage/reuploadCarousel"
          :data="{ id: record._id }"
          @change="reuploadImage(record, $event)"
        >
          <a-tooltip placement="top" title="重新上传图片">
            <a-icon type="upload" />
          </a-tooltip>
        </a-upload>
        <a-divider type="vertical" />
        <a-tooltip placement="top" title="删除记录">
          <a-icon type="delete" @click="removeRecord(record)" />
        </a-tooltip>
      </span>
    </a-table>

    <v-dialog
      v-model="dialog"
      scrollable
      content-class="image-pre-dialog"
    >
      <v-img :src="previewSrc" contain @click="dialog = false"></v-img>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from '@/tools/axios'

const columns = [{
  title: 'Image',
  scopedSlots: { customRender: 'filePath' }
}, {
  title: 'Action',
  width: '300px',
  scopedSlots: { customRender: 'action' }
}]

export default {
  data: () => ({
    carousels: [],
    columns,
    dialog: false,
    previewSrc: ''
  }),
  methods: {
    async init () {
      this.carousels = await axios.get('/manage/fetchCarousel')
      this.loadImages()
    },
    loadImages () {
      for (let item of this.carousels) {
        const img = new Image()
        img.src = item.filePath
      }
    },
    previewImage (filePath) {
      this.previewSrc = filePath
      this.dialog = true
    },
    uploadImages (info) {
      let { file, file: { status } } = info
      if (status === 'done') {
        const { response: { code, msg } } = file
        code === '0'
          ? this.$message.success(`上传成功`)
          : this.$message.error(msg)
        this.init()
      } else if (status === 'error') {
        this.$message.error(`上传失败`)
      }
    },
    reuploadImage (record, info) {
      let { file, file: { status } } = info
      if (status === 'done') {
        const { response: { code, msg } } = file
        code === '0'
          ? this.$message.success(`修改成功`)
          : this.$message.error(msg)
        this.init()
      } else if (status === 'error') {
        this.$message.error(`修改失败`)
      }
    },
    removeRecord (record) {
      const _this = this
      this.$confirm({
        title: `删除照片`,
        content: `是否确定要删除？`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        async onOk () {
          return new Promise(async (resolve, reject) => {
            await axios.post('/manage/removeCarousel', {
              id: record._id
            })
            _this.$message.success(`删除成功`)
            _this.carousels.splice(_this.carousels.indexOf(record), 1)
            resolve()
          })
        }
      })
    }
  },
  async mounted () {
    this.init()
  }
}
</script>

<style lang="less">
.nvmanage-carousel {
  padding: 16px;
}
.carousel-panel-flex {
  position: relative;
  height: 162px;
  margin-bottom: 56px;
}
.carousel-panel {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 288px;
  height: 162px;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow .2s;
  &:hover {
    box-shadow: 0px 0px 16px 2px rgba(0, 0, 0, 0.3);
    .anticon-close-circle {
      opacity: 1;
    }
  }
  .anticon-close-circle {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 20px;
    color: #fafafa;
    cursor: pointer;
    opacity: 0;
    transition: all .2s;
  }
}
.carousel-image {
  cursor: pointer;
}

.carousel-panel-upload {
  border: 2px dashed #dedede;
  background-color: #fdfdfd;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 16px 2px rgba(0, 0, 0, 0.2);
  }
}
.carousel-upload {
  &,
  .ant-upload-btn,
  .ant-upload-select {
    display: inline-block;
  width: 100%;
  height: 100%;
  }
  .anticon-upload {
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
