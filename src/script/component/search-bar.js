class SearchBar extends HTMLElement{
    constructor(){
        super();
        this.shadowDOM=this.attachShadow({mode: "open"});
    }
    connectedCallback(){
        this.render();
    }
    set clickEvent(event){
        this._clickEvent=event;
        this.render();
    }
    get value(){
        return this.shadowDOM.querySelector("#searchElement").value;
    }
    render(){
        this.shadowDOM.innerHTML=`
        <style>
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
            .search-container {
                max-width: 500px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                padding: 16px;
                border-radius: 15px;
                margin: auto;
                display: flex;
                z-index: 99;
                background-color: rgba(0, 0, 0, 0.800);
            }
            
            .search-container > input {
                background-color: transparent;
                color: white;
                width: 80%;
                padding: 16px;
                border: 0;
                border-bottom: 3px solid green;
                font-size: 20px;
                font-weight: bold;
                transition: 0.3s;
            }
            
            .search-container > input:focus {
                outline: 0;
                border-bottom: 5px solid darkgreen;
            }
            
            .search-container > input:focus::placeholder {
                font-weight: bold;
            }
            
            .search-container >  input::placeholder {
                color: white;
                font-weight: normal;
            }
            
            .search-container > button {
                width: 20%;
                cursor: pointer;
                margin-left: auto;
                padding: 16px;
                background-color: green;
                color: white;
                border: 0;
                text-transform: uppercase;
                border-radius: 30px;
            }
            
            @media screen and (max-width: 550px){
                .search-container {
                    width: 90%;
                }
            
                .search-container > input {
                    width: 80%;
                }
            
                .search-container > button {
                    width: 20%;
                }
            }
        </style>
        <div id="search-container" class="search-container">
            <input placeholder="Cari Masakan" id="searchElement" type="search" autocomplete="off">
            <button id="searchButtonElement" type="submit"><i class="large material-icons">search</i></button>
        </div>
        `;
        this.shadowDOM.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
    }
}
customElements.define("search-bar", SearchBar);