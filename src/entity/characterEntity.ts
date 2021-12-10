import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CharacterEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    species: string;
    
    @Column({
        nullable: true
    })
    image: string;

}