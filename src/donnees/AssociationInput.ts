import { ApiProperty } from "@nestjs/swagger";

export class AssociationInput {

    @ApiProperty({
        description: 'The name of the association',
        example: "Assoc1",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The id of the users in the association',
        example: [1],
        type: [Number],
    })
    public idUsers: number[];
}