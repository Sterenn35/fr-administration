import { ApiProperty } from "@nestjs/swagger";

export class UserInput {

    @ApiProperty({
        description: 'The firstname of the user',
        example: "John",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'The lastname of the user',
        example: "Doe",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        example:25,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'The passworf of the user',
        example:'mot2P@sse',
        type: String,
    })
    public password: string;
}