const Base_URL="https://latest.currency-api.pages.dev/v1/currencies/";
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

const dropdowns=document.querySelectorAll("select");
for(let select of dropdowns){
    for(let curr in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=curr;
        newOption.value=curr;
        if(select.name=="from"&&curr=="USD") newOption.selected="selected";
        else if(select.name=="to"&&curr=="INR") newOption.selected="selected";
        select.append(newOption);


    }
    select.addEventListener("change",(evt)=>{
       updateflag(evt.target);

    })
}
const updateflag= (curren)=>{
    let countcode=countryList[curren.value];
    let nl=`https://flagsapi.com/${countcode}/flat/64.png`;
    let img=curren.parentElement.querySelector("img");
    img.src=nl;





};
async function updation(){
    let amount=document.querySelector(".amount input");
    let val=amount.value;
    if(val===""||val<0){
        val=1;
        
        amount.value="1";
    }
    const URL=`${Base_URL}${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    
   let ans=fromCurr.value.toLowerCase();
  
   let temp=data[ans];
   
   let temp2=toCurr.value.toLowerCase();
   let rate=temp[temp2];
   let final_amount=(val*rate).toFixed(3);
   msg.innerText=`${val} ${fromCurr.value} = ${final_amount} ${toCurr.value}`;
   
}
window.addEventListener("load",()=>{
    updation();
})
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updation();
    
});

