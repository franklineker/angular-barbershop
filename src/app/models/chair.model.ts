import { Barber } from "./barber.model";

export class Chair {
  id!: number
  // barber: Barber
  // startDate: string
  // endDate: string

  constructor(
    public barberID: String,
    public barberName: String,
    public startDate: Date,
    public endDate: Date
  ){}

}
