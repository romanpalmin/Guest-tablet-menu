import md5 from 'md5';

function md5hash(str) {
    let md5hashString = md5(str);
    return md5hashString;
}

export default function (str) {
    return ((md5hash(str).split('')).map(function (item, index, arr) {
        return ((index + 1) % 2 === 0 && index > 0 && index < arr.length - 1) ? item + '$' : item
    }))
        .join('');
}