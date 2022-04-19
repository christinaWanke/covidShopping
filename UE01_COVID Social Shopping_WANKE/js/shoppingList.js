export default class ShoppingList {
    #shoppingList;

    constructor() {
        this.#shoppingList = new Map();
    }

    //adds a list
    addList(list){
        this.#shoppingList.set(list.id, list);
    }

    //Get a list by its ID
    getListById(listID){
        return this.#shoppingList.get(listID);
    }

    //prints all lists
    printShoppingList(){
        for (let list of this.#shoppingList.values()){
            list.printList();
        }
    }

    //deletes the lists from the map
    deleteList(listID){
        this.#shoppingList.delete(listID);
    }
}

