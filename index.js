// Example question banks
const OS_Quiz = [
  {
    question: "Which of the following is NOT an OS?",
    options: ["Linux", "Windows", "Oracle", "MacOS"],
    answer: "Oracle"
  },
  {
    question: "Which scheduling algorithm is preemptive?",
    options: ["FCFS", "SJF", "Round Robin", "Priority (non-preemptive)"],
    answer: "Round Robin"
  },
  {
    question: "What is the maximum number of processes in Ready Queue?",
    options: ["Infinite", "Limited by RAM", "1", "None of the above"],
    answer: "Limited by RAM"
  },
  {
    question: "Which of these is not a type of OS?",
    options: ["Batch", "Multitasking", "Real-time", "High-level"],
    answer: "High-level"
  }
];

const OOPS_Quiz = [
  {
    question: "Which of the following is NOT a feature of OOPS?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
    answer: "Compilation"
  },
  {
    question: "Which concept allows multiple functions with the same name but different parameters?",
    options: ["Encapsulation", "Overloading", "Abstraction", "Overriding"],
    answer: "Overloading"
  },
  {
    question: "Which principle of OOPS binds data and methods together?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    answer: "Encapsulation"
  },
  {
    question: "Which keyword is used in C++ to define a base class?",
    options: ["class", "struct", "extends", "inherits"],
    answer: "class"
  },
  {
    question: "Which of these allows an object to take many forms?",
    options: ["Polymorphism", "Inheritance", "Abstraction", "Encapsulation"],
    answer: "Polymorphism"
  }
];

// Global quiz variables
let quizData = [];
let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

const questionEl = document.querySelector(".question");
const option1El = document.querySelector(".option1");
const option2El = document.querySelector(".option2");
const option3El = document.querySelector(".option3");
const option4El = document.querySelector(".option4");
const nextBtn = document.querySelector(".next");
const clearBtn = document.querySelector(".clear");
const optionButtons = [option1El, option2El, option3El, option4El];

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  optionButtons.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.classList.remove("selected");
  });

  selectedAnswer = null;
}

// Option selection
optionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    optionButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedAnswer = btn.textContent;
  });
});

// Next button
nextBtn.addEventListener("click", () => {
  if (selectedAnswer) {
    const correctAnswer = quizData[currentQuestion].answer;
    if (selectedAnswer === correctAnswer) {
      score++;
    }
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.querySelector(".container").innerHTML =
      `<h2 class="text-center">Quiz Completed 🎉</h2>
       <h3 class="text-center">Your Score: ${score} / ${quizData.length}</h3>`;
  }
});

// Clear button
clearBtn.addEventListener("click", () => {
  optionButtons.forEach(b => b.classList.remove("selected"));
  selectedAnswer = null;
});

// 📌 Chatbot input
document.getElementById("chatInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let command = e.target.value.toLowerCase().trim();
    let parts = command.split(" ");
    let subject = parts[0];   // os or oops
    let num = parseInt(parts[1]) || 5;

    if (subject === "os") {
      quizData = OS_Quiz.sort(() => 0.5 - Math.random()).slice(0, num);
    } else if (subject === "oops") {
      quizData = OOPS_Quiz.sort(() => 0.5 - Math.random()).slice(0, num);
    } else {
      alert("❌ Unknown subject! Try: os 3 or oops 5");
      e.target.value = "";
      return;
    }

    currentQuestion = 0;
    score = 0;
    loadQuestion();
    e.target.value = "";
  }
});
