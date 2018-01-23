import * as fs from 'fs';
import * as path from 'path';
import {IStorage} from './IStorage';

export class FsStorage implements IStorage {
    root: string;
    constructor(options: any) {
        this.root = options.root;
    }

    save(stream, options) {
        return new Promise((resolve, reject) => {
            const file = path.resolve(this.root, options.name);
            stream
                .pipe(fs.createWriteStream(file))
                .on('close', () => resolve(file))
                .on('error', (err) => reject(err));
        });
    }
}
