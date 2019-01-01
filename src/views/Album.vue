<template>
  <v-layout row wrap class="nvmanage-image">
    <div class="page-toolbar">
      <a-upload
        name="file"
        action="/newview/manage/uploadAlbum"
        @change="uploadAlbum"
      >
        <a-button>
          <a-icon type="upload" /> 上传相册
        </a-button>
      </a-upload>
    </div>
    <a-table
      :columns="columns"
      :dataSource="albums"
      :rowKey="record => record._id"
      :pagination="pagination"
      bordered
      @change="handleTableChange"
      :loading="loading"
    >
      <template slot="expand">
        <span></span>
      </template>
      <template slot="filePath" slot-scope="record">
        <v-img
          :src="record.filePath"
          :lazy-src="record.smFilePath"
          :width="144"
          :height="81"
          @click="previewAlbum(record.filePath)"
          style="cursor: pointer;"
        />
      </template>
      <template slot="albumTitle" slot-scope="record">
        <editable-cell v-if="!record.parentId" :text="record.title" @change="onCellChange(record._id, $event)"/>
      </template>
      <span slot="action" slot-scope="record" class="table-action">
        <a-upload
          v-if="!record.parentId"
          name="file"
          :multiple="true"
          action="/newview/manage/uploadAlbumItem"
          :data="{ parentId: record._id }"
          @change="uploadAlbum"
        >
          <a-tooltip placement="top" title="上传相册照片">
            <a-icon type="upload" />
          </a-tooltip>
        </a-upload>
        <a-divider type="vertical" v-if="!record.parentId" />
        <a-upload
          name="file"
          :action="`${record.parentId ? '/newview/manage/reuploadAlbumItem' : '/newview/manage/reuploadAlbum' }`"
          :data="{ id: record._id }"
          @change="uploadAlbum"
        >
          <a-tooltip placement="top" title="重新上传图片">
            <a-icon type="cloud-upload" />
          </a-tooltip>
        </a-upload>
        <a-divider type="vertical" />
        <a-popconfirm v-if="!record.parentId" title='确定要删除这个相册，会将其中所有照片一起删除?' placement="left" okText="Yes" cancelText="No" @confirm="removeRecord(record)">
          <a-tooltip placement="top" title="删除记录">
            <a-icon type="delete" />
          </a-tooltip>
        </a-popconfirm>
        <a-popconfirm v-if="record.parentId" title='确定要删除这张照片?' placement="left" okText="Yes" cancelText="No" @confirm="removeAlbumItem(record)">
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
  title: '',
  width: '60px',
  scopedSlots: { customRender: 'expand' }
}, {
  title: 'Image',
  width: '200px',
  scopedSlots: { customRender: 'filePath' }
}, {
  title: 'Title',
  scopedSlots: { customRender: 'albumTitle' }
}, {
  title: 'Action',
  width: '220px',
  scopedSlots: { customRender: 'action' }
}]

export default {
  components: { EditableCell },
  data () {
    return {
      albums: [],
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
    async init (page = 1) {
      this.loading = true
      const result = await axios.get('/manage/fetchAlbum', {
        params: {
          pageSize: 6,
          page: this.current
        }
      })
      const pagination = { ...this.pagination }
      pagination.total = result.total
      this.albums = result.data
      this.loading = false
      this.pagination = pagination
    },
    handleTableChange (pagination) {
      this.current = pagination.current
      this.init()
    },
    previewAlbum (filePath) {
      this.previewSrc = filePath
      this.dialog = true
    },
    uploadAlbum (info) {
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
      await axios.post('/manage/updateAlbumInfo', { id, title })
    },
    async removeRecord (record) {
      await axios.post('/manage/removeAlbum', {
        id: record._id
      })
      this.$message.success(`删除成功`)
      // this.albums.splice(this.albums.indexOf(record), 1)
      this.init()
    },
    // -------------------- AlbumItem --------------------//
    async removeAlbumItem (record) {
      await axios.post('/manage/removeAlbumItem', {
        id: record._id
      })
      this.$message.success(`删除成功`)
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
