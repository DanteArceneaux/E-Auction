//firstName, lastName, address, city, state, pin, phone, email

export class Seller {
  constructor(
    id,
    firstName,
    lastName,
    address,
    city,
    state,
    pin,
    phone,
    email
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.pin = pin;
    this.phone = phone;
    this.email = email;
  }
}
