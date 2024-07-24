<template>
  <div class="page-container">
    <div class="page-inner">
      <t-form :data="searchQuery" layout="inline" label-width="0" @submit="search">
        <t-form-item>
          <t-input v-model="searchQuery.name" placeholder="请输入姓名"></t-input>
        </t-form-item>
        <t-form-item>
          <t-button theme="primary" type="submit">搜索</t-button>
        </t-form-item>
      </t-form>
      <t-table rowKey="id" :data="list" :columns="columns" size="small" :loading="listLoading" :pagination="pagination"
        @page-change="handlePageChange"></t-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { TableOptions } from "@2kk/admin-vueuse";
import { useTable } from "@2kk/admin-vueuse-tdesign";
import { searchTable } from '@/apis'

const options = reactive<TableOptions>({
  tableDataResolver: searchTable,
  searchQuery: { pageSize: 10, name: '' }
})

const { getList, list, listLoading, searchQuery, pagination, handlePageChange } = useTable(options)

const columns = ref([
  { colKey: 'id', title: 'ID' },
  { colKey: 'userName', title: '姓名' },
  { colKey: 'age', title: '年龄' },
])

const search = () => { getList() }
</script>

<style lang="scss" scoped></style>