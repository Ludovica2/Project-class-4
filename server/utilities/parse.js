const parsePostContent = (content) => {
    const mentionsRegExp = /(\@)([a-z0-9\_]){1,}/igm;
    const mentions = content.match(mentionsRegExp);
    
    const tagsRegExp = /(\#)([a-z0-9\_]){1,}/igm;
    const tags = content.match(tagsRegExp);
    
    const urlsRegExp = /(https:\/\/)([a-z0-9\_\-\.\=\?\&\/]){1,}/igm;
    let urls = content.match(urlsRegExp);

    const images = urls ? urls.filter((url) => {
        const ext = /(\.jpeg)|(\.jpg)|(\.png)|(\.svg)|(\.raw)|(\.webp)/igm;
        return url.match(ext);
    }) : null;
    
    const videos = urls ? urls.filter((url) => {
        const ext = /(\.mp4)|(\.avi)|(\.mov)/igm;
        return url.match(ext);
    }) : null;

    urls = urls ? urls.filter((url) => !images.includes(url) && !videos.includes(url)) : null;

    urls = urls ? urls.map(u => {
        if ([".", ",", ":", ";"].includes(u.charAt(u.length - 1))) {
            return u.substring(0, u.length - 1); 
        }

        return u;
    }) : null;

    let html = content;

    if (images) {
        images.forEach(m => {
            html = html.replace(m, `<a href="${m}">${m}</a>`);
        });
    }

    if (mentions) {
        mentions.forEach(m => {
            html = html.replace(new RegExp(m, "g"), `<a href="${process.env.CLIENT_HOST}/app/profile/${m.replace("@", "")}">${m}</a>`);
        });
    }
    
    if (tags) {
        tags.forEach(m => {
            html = html.replace(new RegExp(m, "g"), `<a href="${process.env.CLIENT_HOST}/app/feed?tag=${m.replace("#", "")}">${m}</a>`);
        });
    }

    if (urls) {
        urls.forEach(m => {
            html = html.replace(new RegExp(m, "g"), `<a href="${m}">${m}</a>`)
        });
    }

    return {
        content, 
        mentions, 
        tags, 
        urls, 
        images, 
        videos, 
        html
    }
}

module.exports = {
    parsePostContent,
}