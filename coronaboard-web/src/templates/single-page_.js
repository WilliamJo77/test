import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { css } from '@emotion/react';
//import { Slide } from '../components/slide';
import { Dashboard } from '../components.dashboard';

export default function SinglePage({ pageContext }) {
    // 1 pageContext를 통해 전달된 데이터를 추출해서 사용
    const { dataSource } = pageContext;
    const { lastUpdated, globalStats } = dataSource;
    // 2 사용자의 언어.지역 설정에 맞는 날짜 형태로 표시
    const lastUpdatedFormatted = new Date(lastUpdated).toLocaleString();
    //const { thirdSlideTitle } = dataSource;
     //데이터 소스에서 원하는 필드 추출  1 
    //const { countryByCc, globalStats } = dataSource;  
    //각 필드를 로그로 출력  2
    //console.log(countryByCc);
    //console.log(globalStats);


    return (
        <div id="top">
            {/* 3 상단 검은색 배경 만들기 */}
            <div
                css={css`
                    position: absolute;
                    background-color: black;
                    width: 100%
                    height: 300px;
                    z-index: -99;
                `}
            />
            {/* 4 제목 표시 */}
            <h1
                css={css`
                    padding-top: 48px;
                    padding-bottom: 24px;
                    color: white;
                    text-align: center;
                    font-size: 28px;
                `}
            >
                코로나19(COVID-19)
                <br />
                실시간 상황판
            </h1>
            {/* 5 마지막 업데이트 정보 표시 */}
            <p className="text-center text-white">
                마지막 업데이트: {lastUpdatedFormatted}
            </p>
            <Dashboard globalStats={globalStats} />
        </div>
    );
}