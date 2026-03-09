let lastCalculation=null

const form=document.getElementById("calorieForm")
const result=document.getElementById("result")

form.addEventListener("submit",function(e){

e.preventDefault()

const age=Number(document.getElementById("age").value)
const gender=document.getElementById("gender").value
const weight=Number(document.getElementById("weight").value)
const height=Number(document.getElementById("height").value)
const activity=Number(document.getElementById("activity").value)

if(!age||!weight||!height){
result.innerHTML="<p>Vennligst fyll inn alle feltene.</p>"
result.classList.remove("hidden")
return
}

let bmr

if(gender==="male"){
bmr=10*weight+6.25*height-5*age+5
}else{
bmr=10*weight+6.25*height-5*age-161
}

const maintenance=Math.round(bmr*activity)
const weightLoss=Math.max(maintenance-500,1200)
const weightGain=maintenance+300

result.innerHTML=`
<h2>Resultat</h2>
<p><strong>Vedlikehold:</strong> ${maintenance} kcal</p>
<p><strong>Vektnedgang:</strong> ${weightLoss} kcal</p>
<p><strong>Vektøkning:</strong> ${weightGain} kcal</p>
<p class="result-note">Resultatet er et estimat.</p>
`

result.classList.remove("hidden")

})

const banner=document.getElementById("cookie-banner")
const accept=document.getElementById("cookie-accept")

if(!localStorage.getItem("cookieConsent")){
banner.classList.remove("hidden")
}

accept.addEventListener("click",()=>{
localStorage.setItem("cookieConsent","true")
banner.classList.add("hidden")
})