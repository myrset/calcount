const translations = {
  no: {
    pageTitle: "Kalorikalkulator",
    title: "Kalorikalkulator",
    subtitle: "Beregn ditt daglige kaloribehov",
    age: "Alder",
    gender: "Kjønn",
    male: "Mann",
    female: "Kvinne",
    weight: "Vekt (kg)",
    height: "Høyde (cm)",
    activity: "Aktivitetsnivå",
    activity1: "Lite aktiv",
    activity2: "Litt aktiv",
    activity3: "Moderat aktiv",
    activity4: "Veldig aktiv",
    calculate: "Beregn kalorier",
    resultTitle: "Ditt estimerte kaloribehov",
    bmr: "Hvileforbrenning (BMR)",
    maintenance: "Vedlikehold",
    weightLoss: "Forslag for moderat vektnedgang",
    weightGain: "Forslag for lett vektøkning",
    perDay: "per dag",
    error: "Vennligst fyll inn alle feltene med gyldige tall.",
    note: "Resultatet er et estimat basert på Mifflin–St Jeor-formelen og valgt aktivitetsnivå. Faktisk kaloribehov kan variere fra person til person.",
    seoTitle: "Hvordan fungerer kalorikalkulatoren?",
    seoParagraph1:
      "Denne kalorikalkulatoren estimerer ditt daglige kaloribehov basert på alder, kjønn, høyde, vekt og aktivitetsnivå. Beregningen er basert på Mifflin–St Jeor-formelen.",
    seoParagraph2:
      "Når hvileforbrenningen er beregnet justeres resultatet etter aktivitetsnivå for å estimere ditt daglige energibehov.",
    seoParagraph3:
      "Resultatet er kun et estimat. Faktisk kaloribehov kan variere fra person til person.",
    disclaimer:
      "Ansvarsfraskrivelse: Resultatene er kun veiledende og ikke medisinsk rådgivning.",
    privacy: "Personvern",
    cookieText:
      "Denne siden bruker informasjonskapsler for analyse og forbedring av tjenesten.",
    cookieButton: "OK"
  },
  en: {
    pageTitle: "Calorie Calculator",
    title: "Calorie Calculator",
    subtitle: "Calculate your daily calorie needs",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    weight: "Weight (kg)",
    height: "Height (cm)",
    activity: "Activity level",
    activity1: "Sedentary",
    activity2: "Lightly active",
    activity3: "Moderately active",
    activity4: "Very active",
    calculate: "Calculate calories",
    resultTitle: "Your estimated calorie needs",
    bmr: "Basal Metabolic Rate (BMR)",
    maintenance: "Maintenance",
    weightLoss: "Suggested for moderate weight loss",
    weightGain: "Suggested for light weight gain",
    perDay: "per day",
    error: "Please fill in all fields with valid numbers.",
    note: "The result is an estimate based on the Mifflin–St Jeor equation and your selected activity level. Actual calorie needs may vary from person to person.",
    seoTitle: "How does the calorie calculator work?",
    seoParagraph1:
      "This calorie calculator estimates your daily calorie needs based on age, sex, height, weight, and activity level. The calculation is based on the Mifflin–St Jeor equation.",
    seoParagraph2:
      "Once basal metabolic rate has been calculated, the result is adjusted by activity level to estimate your daily energy needs.",
    seoParagraph3:
      "The result is only an estimate. Actual calorie needs can vary from person to person.",
    disclaimer:
      "Disclaimer: The results are estimates only and not medical advice.",
    privacy: "Privacy",
    cookieText:
      "This site uses cookies for analytics and service improvement.",
    cookieButton: "OK"
  }
};

let currentLanguage = "no";
let lastCalculation = null;

const form = document.getElementById("calorieForm");
const result = document.getElementById("result");
const langButtons = document.querySelectorAll(".lang-btn");

function setLanguage(language) {
  currentLanguage = language;
  const t = translations[language];

  document.documentElement.lang = language;
  document.title = t.pageTitle;

  document.getElementById("title").textContent = t.title;
  document.getElementById("subtitle").textContent = t.subtitle;
  document.getElementById("label-age").textContent = t.age;
  document.getElementById("label-gender").textContent = t.gender;
  document.getElementById("option-male").textContent = t.male;
  document.getElementById("option-female").textContent = t.female;
  document.getElementById("label-weight").textContent = t.weight;
  document.getElementById("label-height").textContent = t.height;
  document.getElementById("label-activity").textContent = t.activity;
  document.getElementById("calculate-btn").textContent = t.calculate;

  const activity1 = document.getElementById("option-activity-1");
  const activity2 = document.getElementById("option-activity-2");
  const activity3 = document.getElementById("option-activity-3");
  const activity4 = document.getElementById("option-activity-4");

  if (activity1) activity1.textContent = t.activity1;
  if (activity2) activity2.textContent = t.activity2;
  if (activity3) activity3.textContent = t.activity3;
  if (activity4) activity4.textContent = t.activity4;

  const seoTitle = document.getElementById("seo-title");
  const seoParagraph1 = document.getElementById("seo-paragraph-1");
  const seoParagraph2 = document.getElementById("seo-paragraph-2");
  const seoParagraph3 = document.getElementById("seo-paragraph-3");
  const footerDisclaimer = document.getElementById("footer-disclaimer");
  const privacyLink = document.getElementById("privacy-link");
  const cookieText = document.getElementById("cookie-text");
  const cookieAccept = document.getElementById("cookie-accept");

  if (seoTitle) seoTitle.textContent = t.seoTitle;
  if (seoParagraph1) seoParagraph1.textContent = t.seoParagraph1;
  if (seoParagraph2) seoParagraph2.textContent = t.seoParagraph2;
  if (seoParagraph3) seoParagraph3.textContent = t.seoParagraph3;
  if (footerDisclaimer) footerDisclaimer.textContent = t.disclaimer;
  if (privacyLink) privacyLink.textContent = t.privacy;
  if (cookieText) cookieText.textContent = t.cookieText;
  if (cookieAccept) cookieAccept.textContent = t.cookieButton;

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });

  if (lastCalculation) {
    renderResult(
      lastCalculation.bmr,
      lastCalculation.maintenance,
      lastCalculation.weightLoss,
      lastCalculation.weightGain
    );
  }
}

function renderResult(bmr, maintenance, weightLoss, weightGain) {
  const t = translations[currentLanguage];

  result.innerHTML = `
    <h2>${t.resultTitle}</h2>
    <p><strong>${t.bmr}:</strong> ${bmr} kcal ${t.perDay}</p>
    <p><strong>${t.maintenance}:</strong> ${maintenance} kcal ${t.perDay}</p>
    <p><strong>${t.weightLoss}:</strong> ${weightLoss} kcal ${t.perDay}</p>
    <p><strong>${t.weightGain}:</strong> ${weightGain} kcal ${t.perDay}</p>
    <p class="result-note">${t.note}</p>
  `;

  result.classList.remove("hidden");
}

function renderError() {
  const t = translations[currentLanguage];
  result.innerHTML = `<p><strong>${t.error}</strong></p>`;
  result.classList.remove("hidden");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const age = Number(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value);
  const activity = Number(document.getElementById("activity").value);

  if (!age || !weight || !height || age <= 0 || weight <= 0 || height <= 0) {
    lastCalculation = null;
    renderError();
    return;
  }

  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const roundedBmr = Math.round(bmr);
  const maintenance = Math.round(bmr * activity);
  const weightLoss = Math.max(Math.round(maintenance - 500), 1200);
  const weightGain = Math.round(maintenance + 300);

  lastCalculation = {
    bmr: roundedBmr,
    maintenance,
    weightLoss,
    weightGain
  };

  renderResult(roundedBmr, maintenance, weightLoss, weightGain);
});

langButtons.forEach((button) => {
  button.addEventListener("click", function () {
    setLanguage(button.dataset.lang);
  });
});

const cookieBanner = document.getElementById("cookie-banner");
const cookieAcceptButton = document.getElementById("cookie-accept");

if (cookieBanner && !localStorage.getItem("cookieConsent")) {
  cookieBanner.classList.remove("hidden");
}

if (cookieAcceptButton) {
  cookieAcceptButton.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    cookieBanner.classList.add("hidden");
  });
}

setLanguage("no");