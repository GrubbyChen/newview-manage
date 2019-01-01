<template>
  <v-layout row wrap class="nvmanage-image">
    <div class="page-toolbar">
      <a-button @click="dialog = true">
        <a-icon type="upload" /> 上传视频
      </a-button>
    </div>
    <a-table
      :columns="columns"
      :dataSource="videos"
      :rowKey="record => record._id"
      :pagination="pagination"
      bordered
      @change="handleTableChange"
      :loading="loading"
    >
      <template slot="videoPreview" slot-scope="record">
        <iframe :src="record.src"></iframe>
      </template>
      <template slot="videoSrc" slot-scope="record">
        <editable-cell :text="record.src" @change="changeVideoSrc(record._id, $event)"/>
      </template>
      <template slot="videoTitle" slot-scope="record">
        <editable-cell :text="record.title" @change="changeVideoTitle(record._id, $event)"/>
      </template>
      <span slot="action" slot-scope="record" class="table-action">
        <a-popconfirm title='确定要删除这个视频?' placement="left" okText="Yes" cancelText="No" @confirm="removeRecord(record)">
          <a-tooltip placement="top" title="删除记录">
            <a-icon type="delete" />
          </a-tooltip>
        </a-popconfirm>
      </span>
    </a-table>

    <v-dialog
      v-model="dialog"
      max-width="700"
    >
      <v-card>
        <v-card-title style="padding-left: 30px;font-size: 20px;font-weight: bold;">上传视频</v-card-title>
        <v-form v-model="valid" ref="form" class="pl-3 pr-5 pb-4">
          <v-layout row mt-2>
            <v-flex xs4>
              <v-subheader style="align-items: flex-end; font-size: 16px;">Src<span class="required">(必须)</span></v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                v-model="form.src"
                :rules="srcRules"
                label="Src"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row mt-2>
            <v-flex xs4>
              <v-subheader style="align-items: flex-end">Title</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                v-model="form.title"
                label="Title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
        <v-card-actions class="pr-5 pb-4">
          <v-spacer></v-spacer>

          <v-btn
            color="blue-grey darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Cancle
          </v-btn>

          <v-btn color="success" @click="createVideo">Sure</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from '@/tools/axios'
import EditableCell from '@/components/EditableCell'

const columns = [{
  title: 'Video',
  width: '200px',
  scopedSlots: { customRender: 'videoPreview' }
}, {
  title: 'Src',
  scopedSlots: { customRender: 'videoSrc' }
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
      columns,
      current: 1,
      pagination: {
        pageSize: 6
      },
      loading: false,
      dialog: false,
      valid: false,
      form: {
        src: '',
        title: ''
      },
      srcRules: [
        v => !!v || 'Name is required'
      ]
    }
  },
  methods: {
    async init () {
      this.loading = true
      const result = await axios.get('/manage/fetchVideo', {
        params: {
          pageSize: 6,
          page: this.current
        }
      })
      const pagination = { ...this.pagination }
      pagination.total = result.total
      this.videos = result.data
      this.loading = false
      this.pagination = pagination
    },
    handleTableChange (pagination) {
      this.current = pagination.current
      this.init()
    },
    async createVideo () {
      if (this.$refs.form.validate()) {
        await axios.post('/manage/createVideo', this.form)
        this.$message.success(`上传成功`)
        this.form = {
          src: '',
          title: ''
        }
        this.init()
        this.dialog = false
      }
    },
    async changeVideoSrc (id, src) {
      await axios.post('/manage/updateVideoInfo', { id, src })
    },
    async changeVideoTitle (id, title) {
      await axios.post('/manage/updateVideoInfo', { id, title })
    },
    async removeRecord (record) {
      await axios.post('/manage/removeVideo', {
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
