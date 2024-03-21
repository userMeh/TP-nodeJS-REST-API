import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'collection'})
export class Collection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'int'})
    number_tomes: number;

    @Column({type: 'text'})
    author: string;

    @Column({type: 'int'})
    price: number;

    @Column({type: 'int'})
    rating: number;

    constructor(
        id: number,
        name: string,
        number_tomes: number,
        author: string,
        price: number,
        rating: number
    ) {
        this.id = id;
        this.name = name;
        this.number_tomes = number_tomes;
        this.author = author;
        this.price = price;
        this.rating = rating;
    }
}
