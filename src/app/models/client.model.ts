import { Person } from "./person.model";

export class Client {

    id!: String
    image!: {
        data: "",
        type: 0
    }
    // person1: Person = {
    //     name: "",
    //     phone: "",
    //     email: "",
    //     address: ""
    // }

    constructor(
        public userType: Number = 3,
        public person: Person
    ) { }

}
