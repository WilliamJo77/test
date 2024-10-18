import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { css } from '@emotion/react';

//컨테이너가 눈에 잘 보이도록 배경색, 테두리 스타일 지정
const borderedGrid = css`
    text-align: center ;
    div {
    backgrond-color: rgba(39,41,43,0.03);
    border: 1px solid rgba(39, 41, 43, 0.1);
    padding: 10x;
    margin-bottom:20px;
`;

export default function ContainerPage(){
    return (
        <div className="pt-3" css={borderedGrid}>
            <h2>화면 너비에 따른 컨테이너 너비 비교</h2>
            <Container fluid="sm">.container-sm</Container>
            <Container fluid="md">.container-md</Container>
            <Container fluid="lg">.container-lg</Container>
            <Container fluid="xl">.container-xl</Container>
            <Container fluid="fluid">.container-fluid</Container>
        </div>
    );
}