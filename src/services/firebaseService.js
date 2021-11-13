import firebase from "firebase";

export default class FirebaseService {
  uidUser;
  constructor() {
    this.uidUser = JSON.parse(localStorage.getItem("session")).id;
  }

  async getAll() {
    return firebase
      .database()
      .ref(this.uidUser)
      .once("value");
  }

  async add(model) {
    let ref = firebase.database().ref(this.uidUser);
    return ref.push(model);
  }

  async findById(id) {
    return firebase
      .database()
      .ref(`${this.uidUser}/${id}`)
      .once("value");
  }

  remove(id) {
    return firebase
      .database()
      .ref(`${this.uidUser}/${id}`)
      .remove();
  }

  async edit(model) {
    let ref = firebase
      .database()
      .ref(`${this.uidUser}`)
      .child(`${model.key}`);
    return ref.update(model);
  }
}
