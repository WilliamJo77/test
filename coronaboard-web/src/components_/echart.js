import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import {
    convertToMonthDay,
    numberWithUnitFormatter
} from '../../utils/formatter,';
import { colors } from '../config';

export function Echart(props){
    const { wrapperCss, option } = props;
    // 1 차트가 그려질 DOM 엘리먼트를 참조할 레퍼런스 생성
    const chartRef = useRef(null);

    // 2 의존하는 상태 변수 (props 포함)가 변경될 떄마다 호출됨
    useEffect(() => {
        // 3 echarts를 초기화(5에서 정의한 DOM 엘리먼트에 차트를 그리도록 설정)
        const chartInstance = echarts.init(chartRef.current);
        chartInstance.setOption(option);

        // 4 의존하는 상태 변수가 바뀌거나 현재 컴포넌트가 DOM에서 제거될 때 (UNMOUNT)
        // 사용 중인 리소스를 정리하기 위한 클린업 함수를 정의하여 변환
        return () => {
            chartInstance.dispose();
        };
    }, [option]);

    //5 실제 차트가 그려질 리액트 엘리먼트
    return <div css={wrapperCss} ref={chartRef} />;
}
export function generateChartOption(data, dataType) {
    const seriesAccList = [
        {
            name: '누적확진',
            type: 'Line',
            data: data.confirmedAcc,
            color: colors.confirmed,
        },
        {
            name: '누적사망',
            type: 'line',
            data: data.deathAcc,
            color: colors.death,
        },
        {
            name: '누적격리해제',
            type: 'line',
            data: data.releasedAcc,
            color: colors.released,
        },
    ];

    const seriesDailyList = [
        {
            name: '확진',
            type: 'bar',
            data: data.confirmed,
            color: colors.confirmed,
        },
        {
            name: '사망',
            type: 'bar',
            data: data.death,
            color: colors.death,
        },
        {
            name: '격리해제',
            type: 'bar',
            data: data.released,
            color: colors.released,
        },
    ];

    let legendData;
    let series;
    let dataZoomStart;

    if (dataType === 'acc') {
        legendData = seriesAccList.map((x) => x.name);
        series = seriesAccList;
        dataZoomStart = 30;
    } else if (dataType === 'daily') {
        legendData = seriesDailyList.map((x) => x.name);
        series = seriesDailyList;
        dataZoomStart = 85;
    } else {
        throw new Error(`Not supported dataType: ${dataType}`);
    }

    return {
        animation: false,
        title: {
            text: '전 세계 코로나(COVID-19) 추이',
            left: 'center',
        },
        tooltop: {
            trigger: 'axis',
        },
        legend: {
            data: legendData,
            bottom: 50,
        },

        grid: {
            top: 70,
            left: 40,
            right: 10,
            bottom: 100,
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                start: dataZoomStart,
                end: 100,
            },
        ],
        xAxis: {
            data: data.date.map(convertToMonthDay),
        },
        yAxis: {
            axisLabel: {
                rotate: 50,
                formatter: numberWithUnitFormatter,
            },
        },
        series,
    };
}
