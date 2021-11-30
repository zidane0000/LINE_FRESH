const axios = require('axios'); // 記得要 npm install axios

const client = axios.create({
  baseURL: 'https://api.coinranking.com/v1/public/',
});

module.exports = {
  async getCoin(coinId) {
    const response = await client.get(`/coin/${coinId}`, {
      params: {
        base: 'TWD',
      },
    });
    
    return response.data;
  },
};