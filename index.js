const express = require('express');
const cors = require('cors');
const { CozeAPI } = require('@coze/api');

const app = express();
app.use(cors()); // ✅ 允许所有来源的跨域访问
app.use(express.json());

const apiClient = new CozeAPI({
  token: 'process.env.COZE_API_TOKEN',
  baseURL: 'https://api.coze.cn'
});

app.post('/proxy', async (req, res) => {
  try {
    const result = await apiClient.workflows.runs.create({
      workflow_id: req.body.workflow_id,
      parameters: req.body.parameters
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: '代理请求失败',
      details: err.message
    });
  }
});

app.listen(3000, () => {
  console.log('🚀 Proxy 服务已启动：http://localhost:3000');
});
