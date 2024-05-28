new TypeIt("#title", {
   strings: "Qur'an Ku",
   speed: 85,
   loop: true,
   waitUntilVisible: true,
}).go();

function updateClock() {
   const now = new Date();
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const seconds = now.getSeconds().toString().padStart(2, '0');

   const timeString = `${hours}:${minutes}:${seconds}`;

   document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); // Initialize clock immediately