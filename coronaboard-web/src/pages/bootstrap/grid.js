import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { css } from '@emotion/react';

const borderedGrid = css`
    text-align: center;
    .row div {
    backgroung-color: rgba(39, 41, 43, 0.03);
    border: 1px solid rgba(39, 41, 43, 0.1);
    padding: 10px;
    margin-bottom: 20px;
    `;
export default function GridPage() {
    return (
        <div className="pt-3" css={borderedGrid}>
            <h2>그리드 시스템</h2>
            <Container>
                <Row>
                    <Col>.col 1/2</Col>
                    <Col>.col 2/2</Col>
                </Row>
                <Row>
                    <Col>.col 1/3</Col>
                    <Col>.col 2/3</Col>
                    <Col>.col 3/3</Col>
                </Row>
                <Row>
                    <Col>.col-lg 1/3</Col>
                    <Col>.col-lg 2/3</Col>
                    <Col>.col-lg 3/3</Col>
                </Row>
                <Row>
                    <Col>.col-sm 1/3</Col>
                    <Col>.col-sm 2/3</Col>
                    <Col>.col-sm 3/3</Col>
                </Row>
                <Row>
                    <Col xs={3}>.col-3 1/3</Col>
                    <Col xs={6}>.col-6 2/3</Col>
                    <Col xs={3}>.col-3 3/3</Col>
                </Row>
                <Row>
                    <Col xs={3} sm={2}>1/3</Col>
                    <Col xs={6} sm={8}>2/3</Col>
                    <Col xs={3} sm={2}>3/3</Col>
                </Row>
            </Container>
        </div>
    );
}