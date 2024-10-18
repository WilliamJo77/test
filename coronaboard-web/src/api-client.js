const axios = require('axios');
const { subDays } = require('date-fns');
const { format, utcToZonedTime } = require('date-fns-tz');
const { createGlobalStatWithPrevField } = require('./data-loader');

class ApiClient {
    constructor() {
        const client = axios.create({
            baseURL: process.env.CB_API_BASE_URL || 'http://localhost:8080',
        });
        client.interceptors.response.use((resp) => {
            return resp.data;
        });

        this.client = client;
    }

    async getAllGlobalStats(){
        const response = await this.client.get('global-stats');
        return response.result;
    }

    async getByAgeAndBySex() {
        const response = await this.client.get(`key-value/byAgeAndSex`);
        // byAgeAndSex 정보가 직렬화 된 JSON 형태로 되어있기 때문에 JSON.parse를 이용하여 객체형태로 변환
        return JSON.parse(response.result.value);
      }
}

module.exports = ApiClient;
function generateGlobalStats(groupedByDate) {
    // const now = new Date();
    const now = new Date('2021-06-05');
    const timeZone = 'Asia/Seoul';
    const today = format(utcToZonedTime(now, timeZone), 'yyyy-MM-dd');
    const yesterday = format(
        utcToZonedTime(subDays(now, 1), timeZone),
        'yyyy-MM-dd'
    );

    if (!groupedByDate[today]) {
        throw new Error('Data for today is missing');
    }

    return createGlobalStatWithPrevField(
        groupedByDate[today],
        groupedByDate[yesterday]
    );
}
exports.generateGlobalStats = generateGlobalStats;
