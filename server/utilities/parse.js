const parsePostContent = (content) => {
    const mentionsRegExp = /(\@)([a-z0-9\_]){1,}/igm;
    const mentions = content.match(mentionsRegExp);
    
    const tagsRegExp = /(\#)([a-z0-9\_]){1,}/igm;
    const tags = content.match(tagsRegExp);
    
    const urlsRegExp = /(https:\/\/)([a-z0-9\_\-\.\=\?\&\/]){1,}/igm;
    let urls = content.match(urlsRegExp);

    const images = urls.filter((url) => {
        const ext = /(\.jpeg)|(\.jpg)|(\.png)|(\.svg)|(\.raw)|(\.webp)/igm;
        return url.match(ext);
    });
    
    const videos = urls.filter((url) => {
        const ext = /(\.mp4)|(\.avi)|(\.mov)/igm;
        return url.match(ext);
    });

    urls = urls.filter((url) => !images.includes(url) && !videos.includes(url));

    let html = content;

    mentions.forEach(m => {
        html = html.replace(m, `<a href="http://localhost:5173/app/mentions/${m}">${m}</a>`)
    });
    
    tags.forEach(m => {
        html = html.replace(m, `<a href="http://localhost:5173/app/feed?tag=${m}">${m}</a>`)
    });

    urls.forEach(m => {
        html = html.replace(m, `<a href="${m}">${m}</a>`)
    });

    images.forEach(m => {
        console.log(m);
        html = html.replace(m, `<img src="${m}" alt="..." />`)
    });

    videos.forEach(m => {
        html = html.replace(m, `<video src="${m}"></video>`)
    });

    return {
        content, mentions, tags, urls, images, videos, html
    }
}

module.exports = {
    parsePostContent,
}