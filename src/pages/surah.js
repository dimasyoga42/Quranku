function getSurahNumberFromURL() {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get('number');
}

function fetchSurahAndDisplay(surahNumber) {
   const au = document.querySelector('.audio');
   const cont = document.querySelector('.surah-container');

   cont.innerHTML = ''; // Clear previous surah content
   au.innerHTML = ''; // Clear previous audio content

   fetch(`https://quran-api.santrikoding.com/api/surah/${surahNumber}`)
      .then(response => response.json())
      .then(data => {
         const surah = data.ayat;
         const audio = data.audio;
         const name = data.nama_latin;

         for (let i = 0; i < surah.length; i++) {
            const ayatDiv = document.createElement('div');
            const ayat = surah[i].ar;
            const arti = surah[i].idn;
            const latin = surah[i].tr;
            const no = surah[i].nomor;
            ayatDiv.className = 'surah';
            ayatDiv.innerHTML = `
<div class="card w-100 mb-3 bg-light-subtle">
  <div class="card-body">
    <h5 class="card-title">${ayat}</h5>
    <p class="card-text lh-sm">${no}. ${arti}</p>
  </div>
  <div class="icon d-flex">
  <small class=" smal text-body-secondary">${name} no ${no}</small>
  </div>
</div>
                        `;
            cont.appendChild(ayatDiv);
         }
      })
      .catch(error => console.error('Error:', error));


}

const surahNumber = getSurahNumberFromURL();
if (surahNumber) {
   fetchSurahAndDisplay(surahNumber);
} else {
   console.error('No surah number specified in URL');
}