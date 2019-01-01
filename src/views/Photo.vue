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
          <a-icon type="upload" /> 上传照片
        </a-button>
      </a-upload>
    </div>
    <a-table
      :columns="columns"
      :dataSource="images"
      :rowKey="record => record._id"
      :pagination="pagination"
      bordered
      @change="handleTableChange"
      :loading="loading"
    >
      <template slot="filePath" slot-scope="record">
        <v-img
          :src="record.filePath"
          :lazy-src="record.smFilePath"
          :width="144"
          :height="81"
          @click="previewImage(record.filePath)"
          style="cursor: pointer;"
        />
      </template>
      <template slot="imageTitle" slot-scope="record">
        <editable-cell :text="record.title" @change="onCellChange(record._id, $event)"/>
      </template>
      <span slot="action" slot-scope="record" class="table-action">
        <a-upload
          name="file"
          action="/newview/manage/reuploadImage"
          :data="{ id: record._id }"
          @change="uploadImages"
        >
          <a-tooltip placement="top" title="重新上传图片">
            <a-icon type="cloud-upload" />
          </a-tooltip>
        </a-upload>
        <a-divider type="vertical" />
        <a-popconfirm title='确定要删除这张照片?' placement="left" okText="Yes" cancelText="No" @confirm="removeRecord(record)">
          <a-tooltip placement="top" title="删除记录">
            <a-icon type="delete" />
          </a-tooltip>
        </a-popconfirm>
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
      current: 1,
      pagination: {
        pageSize: 6
      },
      loading: false,
      dialog: false,
      previewSrc: ''
    }
  },
  methods: {
    async init () {
      this.loading = true
      const result = await axios.get('/manage/fetchImage', {
        params: {
          pageSize: 6,
          page: this.current
        }
      })
      const pagination = { ...this.pagination }
      pagination.total = result.total
      this.images = result.data
      this.loading = false
      this.pagination = pagination
    },
    handleTableChange (pagination) {
      this.current = pagination.current
      this.init()
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
    async removeRecord (record) {
      await axios.post('/manage/removeImage', {
        id: record._id
      })
      this.$message.success(`删除成功`)
      this.init()
      // const images = [...this.images]
      // this.images = images.filter(item => item._id !== record._id)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
