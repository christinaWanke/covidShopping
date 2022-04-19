import List from "./list.js";
import ShoppingList from "./shoppingList.js";
import Article from "./article.js";
import User from "./user.js";


let addEventHandler = Symbol();
let loadFromJSON = Symbol();
let addArticleToList = Symbol();

export default class SocialShopping {
    #shoppingList;
    #listID;
    #user;

    constructor() {
        this.#shoppingList = new ShoppingList();
    }

    //initialise the loadFromJSON and addEventHandler functions, to use it in main.js
    init(){
        this[loadFromJSON]();
        this[addEventHandler]();
    }

    //add event handlers
    [addEventHandler](){

        //HELPER VIEW
        //Show functions the helper has and hide functions he does not have
        $("#btn-help").on("click", "#helper", function () {
            $(".delete").hide();
            $(".edit").hide();
            $(".take-list").show();
            $(".confirm").show();
            $(".input").show();
            $("#newList").hide();
        });

        //SEEKING HELP VIEW
        //Show functions the person has who is looking for help, hide other functions
        $("#btn-help").on("click", "#help", function () {
            $(".delete").show();
            $(".edit").show();
            $(".take-list").hide();
            $(".confirm").hide();
            $(".input").hide();
            $("#newList").show();
        });

        //GO BACK
        //Go back to list view
        $("#back").on("click", "#goBack",  function () {
            $("#detailview").addClass("hide");
            $(".list").removeClass("hide");
            $("#details").empty();
            $(".tablebody").empty();
        });


        let newArticleList;
        let creationDate;
        let that = this;

        //NEW LIST
        //Make a new list by clicking on "Neue Liste hinzufügen"
        //Showing of pop-up form where user can enter list details and articles
        //creation date is already given (today's date)
        $("#newList").on("click", "#addList", function () {
            creationDate = new Date().toLocaleDateString();
            newArticleList = new Map();

            $("#dateCreationAdd").html(creationDate);
        });

        //Add articles by clicking on "Artikel hinzufügen"
        //articles are added to the map and also shown at the bottom
        $("form").on("click", "#addArticleToList", function () {
            let name = $("#ArticleAdd").val();
            let quantity = $("#ArticleAddQuantity").val();
            let cost = $("#ArticleAddPrice").val();

            let article = new Article({name, quantity, cost});
            newArticleList.set(name, article);

            $("#forArticles").append(`<div>
                <div>Artikel: ${name}</div>
                <div>Menge: ${quantity}</div>
                <div>max. Kosten: ${cost}</div>
            </div>`);

            $("#ArticleAdd").val("");
            $("#ArticleAddQuantity").val("");
            $("#ArticleAddPrice").val("");

        });

        //Make a new list by clicking on "Liste hinzufügen"
        //Shows list with the input
        $(".modal-footer").on("click", "#listAdd", function () {
           let length = $(".list").length + 1;
           let listId = "list" + length;
           let name = $("#nameCreatorAdd").val();
           let description = $("#descriptionAdd").val();
           let title = $("#titleListAdd").val();
           let dueDate = $("#dueDateAdd").val();

           let list = new List({name, listId, title, description, creationDate, dueDate});

           list.useArticles(newArticleList);
           that.#shoppingList.addList(list);

           list.printList();
           $("form input").val('');
           $("#forArticles").empty();

        });



        //TAKE LIST
        //Sets the status to open, because the list is taken and has to be finished
        $(".list").on("click", ".take-list",  function () {
            $(this).parent().addClass("offen");
        });



        //DETAIL VIEW
        //Shows the articles in the detail view
        $(".list").on("click", ".detail",  function () {

            $("#detailview").removeClass("hide");
            $(".list").addClass("hide");

            let id = $(this.parentElement.parentElement).attr("id");
            let a = that.#shoppingList.getListById(Number(id));
            a.printAllArticles();
            a.printDetails();
        });


        //DELETE
        //Deletes lists, also from map after confirming that the list should be deleted
        $(".list").on("click", ".delete", function () {
            let list = $(this).parent();
            if (confirm('Willst du diese Liste wirklich löschen?')){
                let id = $(this.parentElement).attr("id");
                let listId = that.#shoppingList.getListById(Number(id));
                that.#shoppingList.deleteList(listId);
                list.remove();

            }
        });

        //EDIT LIST
        $(".list").on("click", ".edit", function () {
            if (confirm('Willst du diese Liste wirklich bearbeiten?')){
                // make the span editable and focus it
                $(this).closest("div").find("p").prop("contenteditable", true).focus();
                return false;

            }
        });


        //SET DONE THROUGH PRICE
        //After a total price is added list is set to the status: done and disabled
        $(".list").on("click", ".confirm",  function () {
            $(this).parent().addClass("geschlossen");
            $(this).siblings('button').remove();
            $(this).siblings().children('button').remove();
            $(this).siblings().children('input').prop('disabled', true);
            $(this).remove();
        });
    }

    //loads the map from JSON to be able to show the entered values for the various lists
    [loadFromJSON](){

        $.getJSON("json/lists.json").then((data)=> {
            console.log(data);

            this.#listID = data.listId;

            for(let lists of data.lists){

                let l = new List(lists);
                this.#shoppingList.addList(l);
                console.log(this.#shoppingList);
                this[addArticleToList](l, lists);


            }

            this.#shoppingList.printShoppingList();


        });
    }

    //adds the articles to the list
    [addArticleToList](list, jsonList) {
        for (let a of jsonList.article){
            let article = new Article(a);
            list.addArticle(article);
        }
    }
}




