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
    id!: string
    profilePicture!: {
        data: string
        type: number
    }
    rating!: number

    constructor(
        public userType: number = 1,
        public about: String,
        public image: File,
        public person: {
            name: String,
            phone: String,
            email: String,
            address?: String
        }
    ) { }

}
