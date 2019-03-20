import { Db, MongoClientOptions, MongoClient } from 'mongodb';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class DataSource {
    protected db: Db;

    async connect() {
        if (!this.db) {
            try {
                const options: MongoClientOptions = this.getDatasourceOptions();
                Logger.log('datasource: ', process.env.DATASOURCE);
                const client = await MongoClient.connect(process.env.DATASOURCE, options);
                this.db = client.db();
                Logger.log('DB CONNECTED!');
            } catch (error) {
                Logger.error('CONNECTION ERROR...');
            }
        }
    }

    async getDb(): Promise<Db> {
        await this.connect();
        return this.db;
    }

    getDatasourceOptions(): MongoClientOptions {
        return {
            useNewUrlParser: true,
            poolSize: 10,
        };
    }
}