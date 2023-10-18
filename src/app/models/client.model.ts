import { Person } from "./person.model";

export class Client {

    id!: String
    image!: {
        data: string,
        type: number
    }
    googleSub?: String | null

    constructor(
        public userType: Number = 3,
        public person: Person
    ) { }

}
