import { Member } from "./association.member"

export class AssociationDTO {
    constructor(public name:string, public members:Member[], public description:string){}
}