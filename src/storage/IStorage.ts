export interface IStorage {
    save(stream: any, variables: any): Promise<string>;
}
