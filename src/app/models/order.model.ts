export class Order {

  id!: String

  image!: {
    data: String,
    type: Number
  }

  constructor(
    public title: String,
    public price: Number,
    public description: String,
    public uploadedImage?: File
  ) { }

}
