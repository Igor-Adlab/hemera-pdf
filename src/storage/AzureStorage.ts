import * as azurestorage from 'azure-storage';
import {IStorage} from './IStorage';

import BlobService = azurestorage.services.blob.blobservice.BlobService;

export class AzureStorage implements IStorage {
    container: string;
    service: BlobService;
    constructor(options: any) {
        this.container = options.container;
        this.service = azurestorage.createBlobService(options.account, options.key);
    }

    save(stream, options) {
        console.log(stream.path);
        return new Promise((resolve, reject) => {
            this.service.createBlockBlobFromLocalFile(this.container, options.name, stream.path, (err, response) => {
                if(err) reject(err);
                else resolve(this.service.getUrl(this.container, options.name));
            })
        });
    }
}
