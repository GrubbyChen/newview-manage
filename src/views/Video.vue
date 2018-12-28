<template>
  <v-layout row wrap class="nvmanage-image">
    <div class="page-toolbar">
      <a-upload
        name="file"
        action="/newview/manage/uploadVideo"
        @change="uploadVideo"
      >
        <a-button>
          <a-icon type="upload" /> Click to Upload
        </a-button>
      </a-upload>
    </div>
    <a-table :columns="columns" :dataSource="videos" bordered>
      <a slot="filePath" slot-scope="filePath" href="javascript:;">
        <video :src="filePath" controls style="width: 344px;">
          您的浏览器不支持 video 标签。
        </video>
      </a>
      <template slot="videoTitle" slot-scope="record">
        <editable-cell :text="record.title" @change="onCellChange(record._id, $event)"/>
      </template>
      <span slot="action" slot-scope="record" class="table-action">
        <a-tooltip placement="top" title="删除记录">
          <a-icon type="delete" @click="removeRecord(record)" />
        </a-tooltip>
      </span>
    </a-table>
  </v-layout>
</template>

<script>
import axios from '@/tools/axios'
import EditableCell from '@/components/EditableCell'

const columns = [{
  title: 'Video',
  dataIndex: 'filePath',
  width: '200px',
  scopedSlots: { customRender: 'filePath' }
}, {
  title: 'Title',
  scopedSlots: { customRender: 'videoTitle' }
}, {
  title: 'Action',
  width: '220px',
  scopedSlots: { customRender: 'action' }
}]

export default {
  components: { EditableCell },
  data () {
    return {
      videos: [],
      columns
    }
  },
  methods: {
    async init () {
      this.videos = await axios.get('/manage/fetchVideo')
    },
    uploadVideo (info) {
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
      await axios.post('/manage/updateVideoInfo', { id, title })
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
            await axios.post('/manage/removeVideo', {
              id: record._id
            })
            _this.$message.success(`删除成功`)
            _this.videos.splice(_this.videos.indexOf(record), 1)
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
