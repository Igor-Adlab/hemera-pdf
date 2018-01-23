import * as pdf from 'html-pdf';

export const convert = (html, options = null) => new Promise((resolve, reject) => {
    pdf.create(html, options).toStream((err, stream) => {
        if(err) reject(err);
        else resolve(stream);
    });
});
