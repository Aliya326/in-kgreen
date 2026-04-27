<template>
  <div class="a-card">
    <a-card style="box-shadow: 0 2px 8px rgba(0,0,0,0.15); margin: 20px; width: 300px;">
      <template #cover>
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </template>
      <template #actions>
        <setting-outlined key="setting" @click="setting"/>
        <edit-outlined key="edit" />
        <ellipsis-outlined key="ellipsis" />
      </template>
      <a-card-meta title="user.name" description="user.description">
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" />
        </template>
      </a-card-meta>
    </a-card>
    <a-card title="#标签" style="box-shadow: 0 2px 8px rgba(0,0,0,0.15); margin: 20px; width: 300px;">
        <a-space :size="[0, 'small']" wrap style="flex-wrap: wrap;">
            <a-tag :bordered="false" color="processing"
            v-for="item in tagsData"
            :key="item.name"
        >{{item.name}}</a-tag>
        </a-space>
    </a-card>
  </div>
</template>
<script >
import { ref } from 'vue';
import { SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons-vue';

export default {
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
  setup() {
    const tagsData = ref([
    {
        name: '标签1',
        count: 100,
    },
    {
        name: '标签2',
        count: 2000,
    },
]);
    return {
        tagsData,
    }
  },
  methods: {
    setting() {
        console.log('setting');
    }
  }
}
</script>

<style>
.a-card {
    height: auto;
    position: sticky;
    top: 66px;
    flex-shrink: 0;
}
</style> 
