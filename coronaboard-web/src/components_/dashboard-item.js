import React from 'react';
import { css } from '@emotion/react';
// 1 증감량을 표현하는 함수, 숫자에 천단위 구분 기호를 추가하여 표현하는 함수
import { formatDiff, numberWithCommas } from '../utils/formatter';

export function DashboardItem(props) {
    const { text, current, prev, diffColor, unit } = props;
    // 2 diffColor 속성이 존재하면 해당 값을 사용하고, 없다면 red값을 사용
    const finalDiffColor = diffColor ? diffColor : 'red';
    // 3 unit 속성이 percent일 때는 소수점 두자릿수까지 표기
    const formattedNumber = 
        unit === 'percent' ? `${current.toFixed(2)}%` : numberWithCommas(current);

    return (
        <div
            css={css`
                font-size: 15px;
                position: relative;
            `}
        >
            <p
                css={css`
                    font-size: 22px;
                    font-weight:500;
                    @media (max-width: 576px) {
                        font-size:20px;
                }
                `}
            >
                {formattedNumber}
            </p>
            {/* 5 prev 속성의 존재 여부에 따라 증감을 보여주는 엘리먼트를 보여줄지를 결정 */}
            {prev ? (
                <p
                    css={css`
                        position: absolute;
                        top: 24px;
                        width: 100%;
                        color: ${finalDiffColor};
                    `}
                >
                    {formatDiff(current, prev)}
                </p>
            ) : null}
            <p>{text}</p>
        </div>        
    );
}