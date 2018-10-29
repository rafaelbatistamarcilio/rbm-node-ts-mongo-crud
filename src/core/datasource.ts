import { Db, MongoClientOptions, MongoClient } from 'mongodb';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class DataSource {
    protected db: Db;

    async connect() {
        if (!this.db) {
            try {
                Logger.log('CONNECTING DB...');
                const options: MongoClientOptions = { useNewUrlParser: true, poolSize: 10 };
                const client = await MongoClient.connect( process.env.DATASOURCE , options);
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
}