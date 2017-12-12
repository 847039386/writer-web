import Mock from 'mockjs'

Mock.setup({
  timeout: '1500' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})

require('./models/mock')