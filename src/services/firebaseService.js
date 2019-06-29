import firebase from "firebase";

export default class firebaseService {
  uidUser;
  constructor() {
    this.uidUser = JSON.parse(localStorage.getItem("session")).id;
  }

  getAll() {
    return firebase
      .database()
      .ref(this.uidUser)
      .once("value");
  }

  add(model) {
    let ref = firebase.database().ref(this.uidUser);
    return ref.push(model);
  }

  async findById(id) {
    return await firebase
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

  edit(model) {
    let ref = firebase.database().ref(`${this.uidUser}`).child(`${model.key}`);
    return ref.update(model)
  }
}
