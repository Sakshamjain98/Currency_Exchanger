const base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const btn= document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const drop=document.querySelectorAll(".dropdown select");
const msg=document.querySelector(".msg");


for(let select of drop){
    for(currCode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText= currCode;
        newoption.value= currCode;
        if(select.name ==="FROM" && currCode ==="USD"){
            newoption.selected="selected";
        }
        else if(select.name ==="TO" && currCode ==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    })
}

const updateflag=(element)=>{
    let currCode= element.value;
    let cou=countryList[currCode];
    let newSrc= `https://flagsapi.com/${cou}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amt= document.querySelector(".amt input");
    let amount=amt.value;
    if(amount ==="" || amount<1){
        amount=1;
        amt.value="1";
    }
    const URL= `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let resp= await fetch(URL);
    let data= await resp.json();
    let rate= data[toCurr.value.toLowerCase()];
    let final= amount*rate;
    msg.innerText=`${amount} ${fromCurr.value} = ${final} ${toCurr.value}`;
})