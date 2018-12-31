<template>
  <v-layout row wrap class="nvmanage-image">
    <div class="page-toolbar">
      <a-upload
        name="file"
        :multiple="true"
        action="/newview/manage/uploadImage"
        @change="uploadImages"
      >
        <a-button>
          <a-icon type="upload" /> Click to Upload
        </a-button>
      </a-upload>
    </div>
    <a-table :columns="columns" :dataSource="images" bordered>
      <template slot="filePath" slot-scope="record">
        <v-img
          :src="record.smFilePath"
          :width="144"
          :height="81"
          @click="previewImage(record.filePath)"
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
          action="/newview/manage/reuploadImage"
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
import EditableCell from '@/components/EditableCell'

const columns = [{
  title: 'Image',
  width: '200px',
  scopedSlots: { customRender: 'filePath' }
}, {
  title: 'Title',
  scopedSlots: { customRender: 'imageTitle' }
}, {
  title: 'Action',
  width: '220px',
  scopedSlots: { customRender: 'action' }
}]

export default {
  components: { EditableCell },
  data () {
    return {
      images: [],
      columns,
      dialog: false,
      previewSrc: ''
    }
  },
  methods: {
    async init () {
      this.images = await axios.get('/manage/fetchImage')
      this.loadImages()
    },
    loadImages () {
      for (let item of this.images) {
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
    async onCellChange (id, title) {
      await axios.post('/manage/updateImageInfo', { id, title })
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
        title: `删除记录`,
        content: `是否确定要删除？`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        async onOk () {
          return new Promise(async (resolve, reject) => {
            await axios.post('/manage/removeImage', {
              id: record._id
            })
            _this.$message.success(`删除成功`)
            _this.images.splice(_this.images.indexOf(record), 1)
            resolve()
          })
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
