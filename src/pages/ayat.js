async function createButtons() {
  const buttonContainer = document.querySelector('.button-container');
  const spinnerContainer = document.querySelector('.spinner-container');
  try {
     document.querySelector('.spinner-border').style.display = "flex";
    const response = await fetch('https://quran-api.santrikoding.com/api/surah');
    const data = await response.json();
    console.log(data);

    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    data.forEach((surah, index) => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-sm-6', 'mb-3', 'mb-sm-0');

      colDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${surah.nama_latin}</h5>
                        <p class="card-text">${surah.nama_latin} yang berarti ${surah.arti} surah ini di turunkan di ${surah.tempat_turun} dan memiliki jumlah ayat ${surah.jumlah_ayat}</p>
                        <a href="#" class="btn" data-number="${surah.nomor} ayat">Read</a>
                    </div>
                </div>
            `;

      rowDiv.appendChild(colDiv);

      // Add a new row after every two columns
      if ((index + 1) % 2 === 0) {
        buttonContainer.appendChild(rowDiv);
        rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
      }
    });

    // Append the last row if it has elements
    if (rowDiv.hasChildNodes()) {
      buttonContainer.appendChild(rowDiv);
    }

    // Add event listeners to the buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        const surahNumber = button.getAttribute('data-number');
        window.location.href = `surah.html?number=${surahNumber}`;
      });
    });

  } catch (error) {
    console.error('Error fetching surah data:', error);
  }finally {
                // Hide the spinner
                document.querySelector('.spinner-border').style.display = "none";
            }
}

createButtons();