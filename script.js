const tapeElement = document.getElementById('tape');
const stateElement = document.getElementById('state');

let tape = [];
let headPosition = 0;
let currentState = 'q0';
let number = 0;
let isRunning = false;
let intervalId;

// Fungsi untuk menggambar tape
function initializeTape() {
  tapeElement.innerHTML = '';
  tape.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.className = 'cell';
    if (index === headPosition) cellElement.classList.add('active');
    cellElement.textContent = cell;
    tapeElement.appendChild(cellElement);
  });
}

// Fungsi untuk memperbarui status pada UI
function updateStateDisplay() {
  stateElement.textContent = `State: ${currentState}`;
}

// Fungsi untuk memulai simulasi
function startSimulation() {
  number = parseInt(document.getElementById('inputNumber').value);
  if (isNaN(number) || number < 1) {
    alert('Masukkan angka valid (>= 1)!');
    return;
  }

  // Inisialisasi ulang tape dan variabel
  tape = Array(number).fill('1');
  headPosition = 0;
  currentState = 'q0';
  isRunning = true;

  initializeTape();
  updateStateDisplay();

  intervalId = setInterval(() => {
    if (isRunning) {
      nextStep();
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

// Fungsi untuk mereset simulasi
function resetSimulation() {
  tape = [];
  headPosition = 0;
  currentState = 'q0';
  isRunning = false;
  tapeElement.innerHTML = '';
  updateStateDisplay();
  clearInterval(intervalId);
}

// Fungsi untuk melanjutkan langkah simulasi
function nextStep() {
  if (!isRunning) {
    alert('Mulai simulasi terlebih dahulu!');
    return;
  }

  switch (currentState) {
    case 'q0':
      if (number === 1) {
        currentState = 'q3'; // 1 bukan bilangan prima
      } else {
        currentState = 'q1'; // Lanjut ke pemeriksaan
      }
      break;

    case 'q1':
      if (headPosition < tape.length) {
        tape[headPosition] = 'X'; // Tandai angka yang diperiksa
        headPosition++; // Pindah ke kanan
      } else {
        currentState = 'q2'; // Setelah selesai menandai, pindah state
      }
      break;

    case 'q2':
      let isPrime = true;
      for (let i = 2; i < number; i++) {
        if (number % i === 0) {
          currentState = 'q3'; // Tidak prima
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        currentState = 'q4'; // Prima
      }
      break;

    case 'q4':
      alert(`${number} adalah bilangan prima!`);
      isRunning = false;
      break;

    case 'q3':
      alert(`${number} bukan bilangan prima.`);
      isRunning = false;
      break;

    default:
      alert('Simulasi selesai.');
      isRunning = false;
  }

  initializeTape();
  updateStateDisplay();
}
