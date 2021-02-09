import $ from "jquery";
import {putHistory, renderHistory} from "./rencana-list.js";
class FoodItem extends HTMLElement{
    constructor(){
        super();
    }
    set food(food){
        this._food=food;
        this.render();
    }
    render(){
        this.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            :host{
                width: 100%;
                border-radius: 10px;
                overflow: hidden;
                display: block;
            }
            .food-info {
                border-radius: 5px;
                box-shadow: 1px 1px 5px black;
                width: 90%;
                margin: 5px auto;
                padding: 24px;
            }
            .food-photo {
                padding: 2px;
                background-color: grey;
                border-radius: 5px;
                width: 100%;
                max-height: 300px;
                object-fit: cover;
                object-position: center;
            }
            .food-info > h2 {
                font-size: 35px;
                display: inline;
            }
            
            .food-info > p {
                margin-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 10; /* number of lines to show */
            }
        </style>
        <div class="food-info">
            <h5><i class="tiny material-icons">gps_fixed</i>${this._food.strArea}</h5>
            <h2>${this._food.strMeal}</h2>
            <i style="font-size: 35px; color: green; cursor: pointer;" class="material-icons">add_circle</i>
            <img class="food-photo" src="${this._food.strMealThumb}" alt="Photo">
            <p>${this._food.strInstructions}</p>
        </div>`;


        // Tambah ke Local Storage
        const addButtons=this.querySelectorAll('.material-icons');
        for (let addButton of addButtons) {
            addButton.addEventListener('click',event => {
                addButton.style.color="lightgreen";
                const menu=this.querySelector('.food-info');
                const name=menu.querySelector('h2');
                const pic=menu.querySelector('img');
                const des=menu.querySelector('p');
                const onCart={
                    theName:name.innerText,
                    thePic:pic.getAttribute('src'),
                    theDes:des.innerText
                }
                console.log(onCart.thePic);
                console.log(onCart);
                putHistory(onCart);
                renderHistory();
                alert("Berhasil Ditambahkan ke Rencana Anda");
            });
        }        
    }
}
customElements.define("food-item", FoodItem);