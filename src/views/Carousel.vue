<template>
  <div class="nvmanage-carousel">
    <div class="table-tools">
      <a-upload name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/">
        <a-button>
          <a-icon type="upload" /> Click to Upload
        </a-button>
      </a-upload>
    </div>
    <ul class="nvmanage-carousel-list">
      <li v-for="(item, index) in data" :key="index" draggable>
        <img :src="item.url" />
        <a-icon type="drag" />
      </li>
    </ul>
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
    .ant-upload-list {
      display: none;
    }
  }
  .nvmanage-carousel-list {
    li {
      position: relative;
      height: 108px;
      padding: 12px 0;
      border-bottom: 1px solid #ddd;
    }
    img {
      width: 192px;
    }
    .anticon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-10px);
      font-size: 20px;
      cursor: pointer;
    }
  }
  .nvmanage-carousel-preview {
    // width: 100%;
    height: 500px;
    margin-left: 400px;
  }
</style>
