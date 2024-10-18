/*
const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio');

class DomesticCrawler {
    async crawlStat() {
    // 공식 사이트 '발생동향 > 국내 발생 현황' 페이지의 주소
    // http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=
    // 클론 사이트 주소
        const url = 'https://yjiq150.github.io/coronaboard-crawling-sample/clone/ncov/';
        const resp = await this.client.get(url);
        const $ = cheerio.load(resp.data);

        return {
          basicStats: this._extractBasicStats($),
          byAge: this._extractByAge($),
          bySex: this._extractBySex($),
        };
    console.log("good day")
    console.log(resp)
    };
}
module.exports = DomesticCrawler;
console.log(DomesticCrawler)
console.log("good day");*/
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { format, utcToZonedTime } = require('date-fns-tz');
const DomesticCrawler = require('./domestic-crawler');

async function crawlAndUpdateDomestic(outputPath, apiClient) {
  let prevData = {};
  const domesticStatPath = path.join(outputPath, 'domestic-stat.json');
  try {
    // 기존 크롤링한 값이 있다면 불러오기
    prevData = JSON.parse(fs.readFileSync(domesticStatPath, 'utf-8'));
  } catch (e) {
    console.log('previous domesticStat not found');
  }

  const domesticCrawler = new DomesticCrawler();