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
                    <p>上次登入时间: <span>1999</span></p>
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
            <div class="card-title">浏览量</div>
            <div class="card-value">{{  }}</div>
            <div class="card-stats">
              <span class="today-value">今日: {{  }}</span>
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
            <div class="card-title">访客量</div>
            <div class="card-value">{{ }}</div>
            <div class="card-stats">
              <span class="today-value">今日: {{ }}</span>
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
            <div class="card-title">评论数</div>
            <div class="card-value">{{  }}</div>
            <div class="card-stats">
              <span class="today-value">今日: {{  }}</span>
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
            <div class="card-title">用户数</div>
            <div class="card-value">{{  }}</div>
            <div class="card-stats">
              <span class="today-value">今日: {{ }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

        <!-- 统计-->
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
        <el-row :gutter="20" class="charts-section">
      <el-col :xs="24" :sm="24" :md="8" :lg="9" :xl="9">
        <el-card shadow="hover">
          <template #header>
            <div class="chart-header">
              <span>标签统计</span>
            </div>
          </template>
          <div ref="tagCloudRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
    </el-col>
</template>


<script setup>
import { User, ChatDotRound, UserFilled, View} from '@element-plus/icons-vue'

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

.home .userCount {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
}

.home .userCount .el-card,
.home .countD .el-card {
    border-radius: 18px;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    background: #ffffff;
    box-shadow: 0 14px 40px rgba(16, 40, 77, 0.06);
}

.home .userCount .el-card:hover,
.home .countD .el-card:hover {
    transform: translateY(-3px);
}

.home .userCount .el-card {
    display: flex;
    align-items: center;
    padding: 12px 14px;
    min-height: 100px;
}

.home .userCount .el-card > .el-card__body {
    padding: 0 !important;
}

.home .userCount .el-card > .el-card__body,
.home .userCount .el-card > div {
    width: 100%;
}

.home .userCount .el-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: #ffffff;
    margin-right: 12px;
    flex: none;
    box-shadow: 0 12px 24px rgba(64, 158, 255, 0.14);
}

.home .userCount .el-icon svg {
    width: 22px;
    height: 22px;
}

.home .userCount p {
    font-size: 18px;
    color: #0f1720;
    margin: 0;
}

.home .userCount .el-card > div {
    flex: 1;
}

.home .countD {
    display: grid;
    gap: 20px;
}

.home .countD .el-card {
    padding: 26px;
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
}

.home .countD p {
    margin: 0;
    color: #475569;
    font-size: 18px;
}

@media (max-width: 992px) {
    .home {
        margin: 16px;
    }

    .home .user,
    .home .login-info,
    .home .userCount .el-card,
    .home .countD .el-card {
        border-radius: 14px;
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

    .home .userCount {
        grid-template-columns: 1fr;
    }
}
</style>
