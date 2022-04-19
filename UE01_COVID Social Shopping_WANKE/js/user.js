export default class User {
    #id;
    #firstName;
    #lastName;
    #username;

    constructor(id, firstName, lastName, username) {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#username = username;
    }


}