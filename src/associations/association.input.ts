import { ApiProperty } from "@nestjs/swagger";

export class AssociationInput {

    @ApiProperty({
        description: 'The name of the association',
        example: "Assoc1",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The description of the association',
        example: "This association began in 2011 to help children have free books",
        type: String,
    })
    public description: string;

    @ApiProperty({
        description: 'The id of the users in the association',
        example: [1],
        type: [Number],
    })
    public idUsers: number[];

    
    
}