<template>
    <el-col class="home">
        <el-row :span="8">
            <el-card shadow="hover">
               <div class="user">
                    <img src="" alt="user-avatar" />
                    <div class="user-info">
                        <p class="name">Admin</p>
                        <p class="access">管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登入时间: <span>2026-04-26</span></p>
                    <p>上次登入IP: <span>192.168.1.1</span></p>
                </div>
            </el-card>
        </el-row>

        <el-row :gutter="20" class="overview-cards">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="overview-card" shadow="hover">
          <div class="card-left">
            <div class="card-icon icon-purple">
              <el-icon>
                <View />
              </el-icon>
            </div>
          </div>
          <div class="card-right">
            <div class="card-title">浏览量: {{ todayBrowseCount }}</div>
            <div class="card-stats">
              <span class="today-value">本月: {{ totalBrowseCount }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="overview-card" shadow="hover">
          <div class="card-left">
            <div class="card-icon icon-blue">
              <el-icon>
                <User />
              </el-icon>
            </div>
          </div>
          <div class="card-right">
            <div class="card-title">访客量: {{ visitorCount }}</div>
            <div class="card-stats">
              <span class="today-value">本月: {{ todayVisitorCount }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="overview-card" shadow="hover">
          <div class="card-left">
            <div class="card-icon icon-green">
              <el-icon>
                <ChatDotRound />
              </el-icon>
            </div>
          </div>
          <div class="card-right">
            <div class="card-title">评论数: {{ commentCount }}</div>
            <div class="card-stats">
              <span class="today-value">本月: {{ todayCommentCount }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="overview-card" shadow="hover">
          <div class="card-left">
            <div class="card-icon icon-orange">
              <el-icon>
                <UserFilled />
              </el-icon>
            </div>
          </div>
          <div class="card-right">
            <div class="card-title">用户数: {{ userCount }}</div>
            <div class="card-stats">
              <span class="today-value">本月: {{ todayUserCount }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

        <el-row :gutter="20" class="charts-section">
      <el-col :xs="24" :sm="24" :md="16" :lg="15" :xl="15">
        <el-card shadow="hover">
          <template #header>
            <div class="chart-header">
              <span>访问趋势</span>
              <el-radio-group v-model="trendType" size="small" @change="fetchTrendData">
                <el-radio-button value="daily">日</el-radio-button>
                <el-radio-button value="monthly">月</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div ref="trendChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="9" :xl="9">
        <el-card shadow="hover">
          <template #header>
            <div class="chart-header">
              <span>分类统计</span>
            </div>
          </template>
          <div ref="pieChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
    </el-col>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { User, ChatDotRound, UserFilled, View } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const browseCountData = ref([
  { time: '2026-4-1', value: 120 },
  { time: '2026-4-2', value: 98 },
  { time: '2026-4-3', value: 145 },
  { time: '2026-4-4', value: 88 },
  { time: '2026-4-5', value: 167 },
  { time: '2026-4-6', value: 203 },
  { time: '2026-4-7', value: 190 },
  { time: '2026-4-8', value: 156 },
  { time: '2026-4-9', value: 134 },
  { time: '2026-4-10', value: 178 },
  { time: '2026-4-11', value: 210 },
  { time: '2026-4-12', value: 245 },
  { time: '2026-4-13', value: 198 },
  { time: '2026-4-14', value: 176 },
  { time: '2026-4-15', value: 220 },
  { time: '2026-4-16', value: 258 },
  { time: '2026-4-17', value: 234 },
  { time: '2026-4-18', value: 189 },
  { time: '2026-4-19', value: 212 },
  { time: '2026-4-20', value: 276 },
  { time: '2026-4-21', value: 298 },
  { time: '2026-4-22', value: 256 },
  { time: '2026-4-23', value: 234 },
  { time: '2026-4-24', value: 267 },
  { time: '2026-4-25', value: 289 },
  { time: '2026-4-26', value: 312 },
  { time: '2026-4-27', value: 60 },
])

const visitorData = ref([
  { time: '2026-4-1', value: 45 },
  { time: '2026-4-2', value: 38 },
  { time: '2026-4-3', value: 56 },
  { time: '2026-4-4', value: 33 },
  { time: '2026-4-5', value: 67 },
  { time: '2026-4-6', value: 82 },
  { time: '2026-4-7', value: 75 },
  { time: '2026-4-8', value: 61 },
  { time: '2026-4-9', value: 52 },
  { time: '2026-4-10', value: 70 },
  { time: '2026-4-11', value: 88 },
  { time: '2026-4-12', value: 102 },
  { time: '2026-4-13', value: 79 },
  { time: '2026-4-14', value: 68 },
  { time: '2026-4-15', value: 90 },
  { time: '2026-4-16', value: 105 },
  { time: '2026-4-17', value: 95 },
  { time: '2026-4-18', value: 74 },
  { time: '2026-4-19', value: 85 },
  { time: '2026-4-20', value: 112 },
  { time: '2026-4-21', value: 120 },
  { time: '2026-4-22', value: 100 },
  { time: '2026-4-23', value: 92 },
  { time: '2026-4-24', value: 108 },
  { time: '2026-4-25', value: 118 },
  { time: '2026-4-26', value: 130 },
  { time: '2026-4-27', value: 25 },
])

const monthlyTrendData = ref({
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  browse: [890, 1200, 1560, 2100, 1890, 2340, 2780, 2560, 3120, 2890, 3200, 3450],
  visitor: [340, 460, 590, 810, 720, 900, 1050, 970, 1180, 1090, 1210, 1310],
})

const categoryData = ref([
  { name: '技术文章', value: 42 },
  { name: '生活随笔', value: 18 },
  { name: '项目经验', value: 28 },
  { name: '学习笔记', value: 35 },
  { name: '资源分享', value: 15 },
])

const commentCountData = ref([
  { time: '2026-4-1', value: 8 },
  { time: '2026-4-5', value: 12 },
  { time: '2026-4-10', value: 15 },
  { time: '2026-4-15', value: 10 },
  { time: '2026-4-20', value: 18 },
  { time: '2026-4-25', value: 22 },
  { time: '2026-4-27', value: 3 },
])

const userData = ref({ today: 5, monthly: 38 })

const getCurrentTimeStr = () => {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
}

const todayBrowseCount = computed(() => {
  const current = browseCountData.value.find(item => item.time === getCurrentTimeStr())
  return current ? current.value : 0
})

const totalBrowseCount = computed(() => {
  return browseCountData.value.reduce((acc, cur) => acc + cur.value, 0)
})

const visitorCount = computed(() => {
  const current = visitorData.value.find(item => item.time === getCurrentTimeStr())
  return current ? current.value : 0
})

const todayVisitorCount = computed(() => {
  return visitorData.value.reduce((acc, cur) => acc + cur.value, 0)
})

const commentCount = computed(() => {
  const current = commentCountData.value.find(item => item.time === getCurrentTimeStr())
  return current ? current.value : 0
})

const todayCommentCount = computed(() => {
  return commentCountData.value.reduce((acc, cur) => acc + cur.value, 0)
})

const userCount = computed(() => userData.value.today)
const todayUserCount = computed(() => userData.value.monthly)

const trendType = ref('daily')
const trendChartRef = ref(null)
const pieChartRef = ref(null)
let trendChart = null
let pieChart = null

const fetchTrendData = () => {
  if (!trendChart) return
  if (trendType.value === 'daily') {
    const dates = browseCountData.value.map(item => item.time.slice(5))
    const browseValues = browseCountData.value.map(item => item.value)
    const visitorValues = visitorData.value.map(item => item.value)
    trendChart.setOption({
      xAxis: { data: dates },
      series: [
        { data: browseValues },
        { data: visitorValues },
      ],
    })
  } else {
    trendChart.setOption({
      xAxis: { data: monthlyTrendData.value.months },
      series: [
        { data: monthlyTrendData.value.browse },
        { data: monthlyTrendData.value.visitor },
      ],
    })
  }
}

const initTrendChart = () => {
  if (!trendChartRef.value) return
  trendChart = echarts.init(trendChartRef.value)
  const dates = browseCountData.value.map(item => item.time.slice(5))
  const browseValues = browseCountData.value.map(item => item.value)
  const visitorValues = visitorData.value.map(item => item.value)

  trendChart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#334155' },
    },
    legend: {
      data: ['浏览量', '访客量'],
      top: 0,
      right: 0,
      textStyle: { color: '#64748b' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#64748b' },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b' },
    },
    series: [
      {
        name: '浏览量',
        type: 'line',
        smooth: true,
        data: browseValues,
        lineStyle: { width: 2.5, color: '#8b5cf6' },
        itemStyle: { color: '#8b5cf6' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(139,92,246,0.25)' },
            { offset: 1, color: 'rgba(139,92,246,0.02)' },
          ]),
        },
      },
      {
        name: '访客量',
        type: 'line',
        smooth: true,
        data: visitorValues,
        lineStyle: { width: 2.5, color: '#3b82f6' },
        itemStyle: { color: '#3b82f6' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59,130,246,0.25)' },
            { offset: 1, color: 'rgba(59,130,246,0.02)' },
          ]),
        },
      },
    ],
  })
}

const initPieChart = () => {
  if (!pieChartRef.value) return
  pieChart = echarts.init(pieChartRef.value)

  pieChart.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#334155' },
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { color: '#64748b' },
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          color: '#475569',
          fontSize: 12,
        },
        emphasis: {
          label: { show: true, fontWeight: 'bold', fontSize: 14 },
        },
        data: categoryData.value.map((item, index) => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index],
          },
        })),
      },
    ],
  })
}

const handleResize = () => {
  trendChart?.resize()
  pieChart?.resize()
}

onMounted(async () => {
  await nextTick()
  initTrendChart()
  initPieChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  trendChart?.dispose()
  pieChart?.dispose()
})
</script>

<style scoped lang="less">
.home {
    margin: 16px;
    display: grid;
    gap: 18px;
    color: #334155;
}

.home > .el-row {
    width: 100%;
    min-width: 0;
}

.home > .el-row:first-of-type {
    width: 100%;
}

.home > .el-row:first-of-type .el-card {
    width: 100%;
}

.home .user {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 18px;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 10px 28px rgba(16, 40, 77, 0.05);
    gap: 16px;
}

.home .user img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    background: #eef5ff;
    border: 2px solid rgba(64, 158, 255, 0.16);
}

.home .user-info {
    flex: 1;
}

.home .user-info p {
    margin: 0;
}

.home .user-info .name {
    color: #1f2937;
    font-size: 20px;
    font-weight: 700;
}

.home .user-info .access {
    color: #64748b;
    margin-top: 6px;
}

.home .login-info {
    margin-top: 14px;
    padding: 18px;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 10px 28px rgba(16, 40, 77, 0.05);
}

.home .login-info p {
    line-height: 32px;
    font-size: 14px;
    color: #475569;
    margin: 0;
    display: flex;
    justify-content: space-between;
}

.home .login-info span {
    color: #0f172a;
    font-weight: 600;
}

.overview-cards {
  .overview-card {
    border-radius: 16px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 40px rgba(16, 40, 77, 0.1);
    }

    :deep(.el-card__body) {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      gap: 16px;
    }
  }

  .card-left {
    flex-shrink: 0;

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #ffffff;

      &.icon-purple {
        background: linear-gradient(135deg, #8b5cf6, #a78bfa);
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
      }

      &.icon-blue {
        background: linear-gradient(135deg, #3b82f6, #60a5fa);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
      }

      &.icon-green {
        background: linear-gradient(135deg, #10b981, #34d399);
        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
      }

      &.icon-orange {
        background: linear-gradient(135deg, #f59e0b, #fbbf24);
        box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
      }
    }
  }

  .card-right {
    flex: 1;
    min-width: 0;

    .card-title {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 4px;
    }

    .card-stats {
      .today-value {
        font-size: 13px;
        color: #94a3b8;
      }
    }
  }
}

.charts-section {
  .el-card {
    border-radius: 16px;

    :deep(.el-card__header) {
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
    }
  }

  .chart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }
  }

  .chart-container {
    width: 100%;
    height: 320px;
  }
}

@media (max-width: 992px) {
    .home {
        margin: 16px;
    }

    .home .user,
    .home .login-info {
        border-radius: 14px;
    }

    .overview-cards .overview-card {
      border-radius: 14px;
    }

    .charts-section .chart-container {
      height: 260px;
    }
}

@media (max-width: 768px) {
    .home {
        gap: 16px;
    }

    .home .user {
        flex-direction: column;
        align-items: flex-start;
    }

    .charts-section .chart-container {
      height: 220px;
    }
}
</style>
