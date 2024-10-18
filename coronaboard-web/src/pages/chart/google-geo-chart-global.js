import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

export default function GoogleGeochart() {
    const data =[
        ["Country", "Confirmed"], // 1 데이터의 첫번째 요소는 헤더 정보
        ["United States", 34321093],
        ["India", 29506328],
        ["Brazil", 17412996],
        ["France", 5740665],
        ["Turkey", 5330448]
    ];
    const options = {
        colorAxis: { colors: ['skyblue', 'purple'] }, // 2 시작 컬러와 끝 컬러
    }

    return (
        <Container>
            <Chart
                chartType="GeoChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
            />
        </Container>
    );
}