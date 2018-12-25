<template>
  <div>
    <div class="table-tools">
      <a-button type="primary" icon="upload">上传</a-button>
    </div>
    <a-table :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="operation" slot-scope="email">
        <a-icon type="upload" :title="email" />
      </template>
    </a-table>
  </div>
</template>

<script>
import axios from '@/tools/axios'

const columns = [{
  title: 'Title',
  dataIndex: 'title',
  width: '50%'
}, {
  title: 'Email',
  dataIndex: 'email'
}, {
  title: 'Operate',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  name: 'home',
  data () {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    async fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      const result = await axios.get('/manage/fetchCarousels')
      console.log(result)
      const pagination = { ...this.pagination }
      pagination.total = 200
      this.loading = false
      this.data = result.data
      this.pagination = pagination
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style lang="less">
  .table-tools {
    height: 32px;
    margin-bottom: 16px;
  }
</style>
