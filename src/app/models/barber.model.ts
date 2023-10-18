import { Person } from "./person.model"

export class Barber {

    // id?: String
    // profilePicture?: {
    //   data: String
    //   type: Number
    // }
    // about: String
    // userType: Number
    // person: Person
    // rating: Number
    // image: File
    id!: String
    profilePicture!: {
        data: String
        type: Number
    }
    userType: Number = 1


    constructor(
        // public name: String,
        public about: String,
        public image: File,
        public rating: number,
        public person: {
            name: String,
            phone: String,
            email: String,
            address?: String
        }
    ) { }

}
