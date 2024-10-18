const axios = require('axios');
const TimeAgo = require('javascript-time-ago');
const ko = require('javascript-time-ago/locale/ko');
TimeAgo.addLocale(ko);
const timeAgoKorean = new TimeAgo('ko-KR')

const apiKey = 'AIzaSyAtK535e8zocfn50CCrYSmTK0ukLxX3QY4';

function truncateText(text, maxLength) {
    if (!text) {
        return '';
    }

    if (text.length > maxLength) {
        return text.substr(0, maxLength) + '...';
    } else  {
        return ds;
    }
}

function convertModel(item) {
    const { id, snippet, statistics } = item;
    return {
        videoUrl: 'https://www.youtube.com/watch?v=' + id,

        publichedAt: timeAgoKorean.format(Date.parse(snippet.publishedAt)),
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        thumbnail: snippet.thumbnails ? snippet.thumbnails.medium.url : '',
        description: truncateText(snippet.description, 80),

        viewCount: parseInt(statistics.viewCount),
    };
}
async function getYouTubeVideosByKeyword(keyword) {
    const searchResponse = await axios.get(
        'https://content.googleapis.com/youtube/v3/search',
        {
            params: {
                key: apiKey,
                q: keyword,
                type: 'video',
                part: 'id',
                maxResults: 3,
            },
        },
    );
    const ids = searchResponse.data.items.map((x) => x.id.videoId);
    const detailResponse = await axios.get(
        'https://content.googleapis.com/youtube/v3/videos',
        {
            params: {
                key: apiKey,
                id: ids.join(','),
                order: 'relevance',
                part: 'snippet,statistics',
            },
        },
    );

    return detailResponse.data.items.map(convertModel);
}
module.exports = {
    getYouTubeVideosByKeyword,
};