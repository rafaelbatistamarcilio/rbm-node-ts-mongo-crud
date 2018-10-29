import { IEntity } from './../core/i.entity';
import { ObjectID } from 'mongodb';
import { IsString, IsNumber } from 'class-validator';

export class Product implements IEntity {

    _id: ObjectID;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    photo: string;

    getId(): ObjectID {
        return new ObjectID(this._id);
    }

}