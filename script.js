
// script.js

// استخدام البيانات مباشرة من surahs_full.js
document.addEventListener("DOMContentLoaded", () => {
  const surahInput = document.querySelector("#surah-input");
  const displayBtn = document.querySelector("#display-btn");
  const resultDiv = document.querySelector("#result");

  if (!surahInput || !displayBtn || !resultDiv) {
    console.error("⚠️ تأكد من وجود العناصر المطلوبة في HTML (surah-input, display-btn, result)");
    return;
  }

  function displaySurah() {
    const value = surahInput.value.trim();
    if (!value) return;

    let surahNumber = null;

    if (!isNaN(value)) {
      surahNumber = parseInt(value);
    } else {
      const match = allSurahsData.find(entry => entry.surah_name_ar.includes(value));
      if (match) {
        surahNumber = match.surah;
      }
    }

    if (!surahNumber) {
      resultDiv.innerHTML = "<p style='color:red;'>❌ لم يتم العثور على السورة</p>";
      return;
    }

    const verses = allSurahsData
      .filter(entry => entry.surah === surahNumber)
      .map(entry => `<li>${entry.text}</li>`)
      .join("");

    const surahName = allSurahsData.find(entry => entry.surah === surahNumber)?.surah_name_ar || "سورة غير معروفة";

    resultDiv.innerHTML = \`
      <h2 class="text-xl font-bold my-4">${surahNumber} - ${surahName}</h2>
      <ol class="text-right">${verses}</ol>
    \`;
  }

  displayBtn.addEventListener("click", displaySurah);
});
