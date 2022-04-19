export default class Article {
    #quantity;
    #name;
    #cost;

    constructor({quantity, name, cost}) {
        this.#quantity = quantity;
        this.#name = name;
        this.#cost = cost;
    }

    //Get name of article
    get name(){
        return this.#name;
    }

    //Set a new name for article
    set name(newName) {
        this.#name = newName;
    }

    //Get quantity of article
    get quantity(){
        return this.#quantity;
    }

    //Set a new quantity for article
    set quantity(newQuantity) {
        this.#quantity = newQuantity;
    }

    //Get cost of article
    get cost(){
        return this.#cost;
    }

    //Set a new cost for article
    set cost(newCost) {
        this.#cost = newCost;
    }


    //print an article into the table from the detailview
    printArticle() {

        let name = this.#name;
        let quant = this.#quantity;
        let cost = this.#cost;

        let articles = $(`
            <tr class="article">
                <td>${quant}</td>
                <td>${name}</td>
                <td>${cost}</td>
            </tr>`);


        //append the article to the table body
        $(".tablebody").append(articles);

    }
}