import $ from "jquery";

const CACHE_KEY="food-list";
const checkForStorage = () => typeof(Storage)!=="undefined";
const putHistory = (data) => {
    if (checkForStorage()) {
        let historyData=null;
        if (localStorage.getItem(CACHE_KEY)===null) {
             historyData=[];
            }
        else{
            historyData=JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        historyData.unshift(data);
            if (historyData.length>5) {
                historyData.pop();
            }
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
};
const showHistory = () => {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY))||[];
    }
    else{
        return[];
    }
};

// Untuk menampilkan ke Tabel Rencana
const renderHistory = () => {
    const historyData=showHistory();
    let historyList=document.querySelector("#rencana");
    // Agar Masakan tidak double pada tabel
    historyList.innerHTML="";
    for (let history of historyData) {
        let row=document.createElement('div');
        row.setAttribute('class', 'thelist');
        row.innerHTML=`
            <h2>${history.theName}</h2>
            <p class="toggle-des">Klik untuk Cara Membuat</p>
            <div class="pic-rencana"><img src="${history.thePic}" style="display: inline;"></div>
            <p class="des-msk" style="display: none;">${history.theDes}</p>
        `;
        historyList.appendChild(row);
    }
    $(".thelist").click(function(){
        $(".des-msk").toggle(500);
    });
}
renderHistory();
// Untuk hapus tabel
const hapus=document.querySelector('#hapus');
hapus.addEventListener('click', event => {
    localStorage.removeItem(CACHE_KEY);
    renderHistory();
});

export {putHistory, renderHistory};