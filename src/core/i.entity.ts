import { ObjectID } from 'mongodb';

export interface IEntity{
    _id;
    getId(): ObjectID;
}