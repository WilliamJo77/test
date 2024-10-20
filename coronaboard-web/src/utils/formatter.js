import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

// 1 Intl 네임스페이스의 NumberFormat을 이용하여 한국에서 사용하는 숫자 포매터 생성
const numberFormatter = new Intl.NumberFormat('ko-KR');

export function numberWithCommas(x) {
    return numberFormatter.format(x);
}

export function formatDiff(cur, prev) {
    const diff = cur - prev;
    // 2 prev가 존재하지 않을때 발생할 수 있는 다양한 경우 처리
    if (diff === undefined || isNaN(diff) || diff === 0) {
        return '(-)';
    }

    if (diff > 0 ) {
        return `(+${numberWithCommas(diff)})`;
    } else {
        return `(${numberWithCommas(diff)})`;
    }
}

// 3 formatterDiff() 함수와 거의 비슷하지만 증감량이 0일때 빈 문자열 반환
export function formatDiffForTable(cur, prevOptional) {
    const prev = prevOptional || 0;
    const diff = cur - prev;

    if (diff === 0) {
        return '';
    }
    return formatDiff(cur, prev);
}

// 4 yyyy-MM-dd 형식을 간결하게 M.d로 반환
export function convertToMonthDay(dateString) {
    return format(parseISO(dateString), 'M.d');
}

// 5 
export function numberWithUnitFormatter(value) {
    if ( value >= 100000000) {
        return (value / 100000000).toFixed(1) + '억';
    }   else if (value >= 10000) {
        return (value / 10000).toFixed(0) + '만';
    }   else if (value >= 1000) {
        return (value / 1000).toFixed(0) + '천';
    }   else if (value >= 100){
        return (value / 100).toFixed(0) + '백';
    }   else {
        return value;
    }
}