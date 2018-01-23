import * as HP from 'hemera-plugin';

import {TOPIC_PDF, CMD_CREATE_PDF} from "./constants";
import {IStorage} from "./storage/IStorage";
import {convert} from "./convert";

export * from './storage';
export * from './constants';
export * from './templaters';
export * from './templaters/renderers';

export const options = { name: 'hemera-pdf' };
export const plugin = HP((hemera, options: any, next: Function) => {
    const storage: IStorage = options.storage;
    const renderer = options.provider;

    hemera.add({
        topic: TOPIC_PDF,
        cmd: CMD_CREATE_PDF,
    }, (request: any, cb) =>
            renderer
                .html(request.template, request.variables)
                .then(html => convert(html, request))
                .then(stream => storage.save(stream, request))
                .then(info => cb(null, info))
                .catch(err => cb(err, null))
    );

    next();
}, '>=2');
