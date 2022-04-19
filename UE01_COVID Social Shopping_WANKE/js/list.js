export default class List {
    #id;
    #title;
    #name;
    #description;
    #dueDate;
    #date;
    #articleNr;
    #article;

    constructor({id, title, name, description, date, dueDate, articleNr}) {
        this.#id = id;
        this.#title = title;
        this.#name = name;
        this.#description = description;
        this.#date = date;
        this.#dueDate = dueDate;
        this.#articleNr = articleNr;
        this.#article = [];
    }

    //Get ID of List
    get id(){
        return this.#id;
    }

    //Get title of List
    get title(){
        return this.#title;
    }

    //Get name of List
    get name() {
        return this.#name;
    }

    //Get description of List
    get description() {
        return this.#description;
    }

    //Get date of List
    get date() {
        return this.#dueDate;
    }

    //Get numbers of Articles in List
    get articleNr() {
        return this.#articleNr;
    }

    //Add an Article to the list
    addArticle(a) {
        this.#article.push(a);
    }

    //Get the numbers of articles from a newly added list
    useArticles(articleMap){
        this.#article = articleMap;
        this.#articleNr = articleMap.size;
    }

    //Print a list with an overview (important characteristics, buttons and description)
    printList() {

        let id = this.#id;
        let title = this.#title;
        let name = this.#name;
        let desc = this.#description;
        let dueDate = this.#dueDate;
        let anum = this.#articleNr;


        let listElement = $(`
        <div id="${id}">
            <h2>${title}</h2>
            <p class="left">${desc}</p>
            <p class="left_small"><b>Erfüllungsdatum: </b>${dueDate}</p>
            <p class="hide article">${anum}</p>
            <p><button class="detail">${anum} Artikel</button></p>
            <button class="take-list">übernehmen</button> 
            <button class="edit">bearbeiten</button> 
            <button class="delete">löschen</button>
            <p class="left_small">Liste von: ${name}</p>
            <p class="input">Gesamtpreis: <input type="text" id="input" size="5">€</p>
            <button class="confirm">Bestätigen</button>
        </div>`);

        //Append list after the div with the class: list
        $(".list").append(listElement);
    }

    //Go through all articles in a list and print one after the other,
    //in the end all articles are printed
    printAllArticles(){
        for (let a of this.#article){
            a.printArticle();
        }
    }

    //Prints the details of thr list into the detailview
    printDetails(){
        let name = this.#name;
        let date = this.#date;
        let desc = this.#description;
        let dueDate = this.#dueDate;
        let anum = this.#articleNr;

        $("#detail").addClass(this.#id);

        let detail = $(`
        <h2>Einkaufsliste von ${name}</h2>
        <p>${anum} Artikel</p>
        <p>Erstellt am: ${date}</p>
        <p>Zu erfüllen am: ${dueDate}</p>
        <p>${desc}</p>
        `);

        $("#details").prepend(detail);
    }
}