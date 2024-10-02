document.addEventListener("DOMContentLoaded", () => {
    let currentQuestion = 0;
    let answers = {};

    const questions = [
            {
                question: "Question 1: What subjects do you enjoy the most?",
                options: {
                    "ABM": "Business and Math",
                    "STEM": "Science and Technology",
                    "HUMSS": "Social Studies and Humanities",
                    "HE": "Home Economics",
                    "ICT": "Information Technology"
                }
            },
            {
                question: "Question 2: What are your long-term career goals?",
                options: {
                    "ABM": "Business and Management",
                    "STEM": "Engineering or IT",
                    "HUMSS": "Public Service or Teaching",
                    "HE": "Food, Fashion, or Hospitality",
                    "ICT": "Software Development or Networking"
                }
            },
            {
                question: "Question 3: Which activity do you find more engaging?",
                options: {
                    "ABM": "Managing finances or a business",
                    "STEM": "Conducting experiments or coding",
                    "HUMSS": "Debating social issues or writing essays",
                    "HE": "Baking or sewing",
                    "ICT": "Programming or troubleshooting technology"
                }
            },
            {
                question: "Question 4: Which school project do you enjoy the most?",
                options: {
                    "ABM": "Creating a business plan",
                    "STEM": "Building a robot or solving a math problem",
                    "HUMSS": "Writing a story or analyzing history",
                    "HE": "Planning a meal or designing clothes",
                    "ICT": "Creating a website or setting up a network"
                }
            },
            {
                question: "Question 5: What is your preferred learning environment?",
                options: {
                    "ABM": "Working in groups to solve real-world problems",
                    "STEM": "Hands-on labs or computer work",
                    "HUMSS": "Discussing ideas and collaborating on projects",
                    "HE": "Cooking, sewing, or designing",
                    "ICT": "Tech workshops or computer-based learning"
                }
            },
            {
                question: "Question 6: What kind of tasks do you enjoy outside of school?",
                options: {
                    "ABM": "Planning events or managing small projects",
                    "STEM": "Experimenting with new technology",
                    "HUMSS": "Volunteering or helping people",
                    "HE": "Cooking for family or crafting",
                    "ICT": "Building websites or fixing tech issues"
                }
            },
            {
                question: "Question 7: Which of these career paths appeals to you the most?",
                options: {
                    "ABM": "Entrepreneurship or accounting",
                    "STEM": "Engineer or scientist",
                    "HUMSS": "Lawyer or social worker",
                    "HE": "Chef or fashion designer",
                    "ICT": "Software developer or IT specialist"
                }
            }
        ];

        function selectAnswer(strand) {
            answers[currentQuestion] = strand;
            nextQuestion();
        }
    
        function nextQuestion() {
            const quizContainer = document.getElementById('quiz-container');
            
            // Add fade-out class
            quizContainer.classList.add('fade-out');
            
            // Wait for the fade-out animation to complete before updating
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    updateQuiz();
                } else {
                    showResults();
                }
                // Remove fade-out and add fade-in for the next question
                quizContainer.classList.remove('fade-out');
                quizContainer.classList.add('fade-in');
                
                // Remove the fade-in class after the transition
                setTimeout(() => {
                    quizContainer.classList.remove('fade-in');
                }, 300); // This should match the CSS animation duration
            }, 300); // Delay to allow fade-out transition
        }
    
        function updateQuiz() {
            const questionElement = document.querySelector('.question');
            const optionsElement = document.querySelector('.options');
    
            questionElement.textContent = questions[currentQuestion].question;
            optionsElement.innerHTML = '';
    
            const options = questions[currentQuestion].options;
            for (let strand in options) {
                const button = document.createElement('button');
                button.className = 'btn btn-primary ansBtn';
                button.textContent = options[strand];
                button.onclick = () => selectAnswer(strand);
                optionsElement.appendChild(button);
            }
    
            document.getElementById('back-btn').style.display = 'none';
        }
    
        function showResults() {
            const resultPercentages = calculateStrandPercentages();
            const quizContainer = document.getElementById('quiz');
            
            // Style the result display with Bootstrap
            quizContainer.innerHTML = `
                <h2>Your Results:</h2>
                <div class="result-container">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${resultPercentages[0].percentage}%;" aria-valuenow="${resultPercentages[0].percentage}" aria-valuemin="0" aria-valuemax="100">
                            ${resultPercentages[0].strand}: ${resultPercentages[0].percentage}%
                        </div>
                    </div>
                    <div class="progress mt-2">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${resultPercentages[1].percentage}%;" aria-valuenow="${resultPercentages[1].percentage}" aria-valuemin="0" aria-valuemax="100">
                            ${resultPercentages[1].strand}: ${resultPercentages[1].percentage}%
                        </div>
                    </div>
                    <div class="progress mt-2">
                        <div class="progress-bar bg-info" role="progressbar" style="width: ${resultPercentages[2].percentage}%;" aria-valuenow="${resultPercentages[2].percentage}" aria-valuemin="0" aria-valuemax="100">
                            ${resultPercentages[2].strand}: ${resultPercentages[2].percentage}%
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('back-btn').style.display = 'block';
        }
    
        function calculateStrandPercentages() {
            const strandCount = {
                "ABM": 0,
                "STEM": 0,
                "HUMSS": 0,
                "HE": 0,
                "ICT": 0
            };
    
            // Count the answers for each strand
            for (let answer of Object.values(answers)) {
                strandCount[answer]++;
            }
    
            // Calculate total answers
            const totalAnswers = Object.values(answers).length;
    
            // Create an array with percentages of each strand
            let strandPercentages = [];
            for (let strand in strandCount) {
                let percentage = (strandCount[strand] / totalAnswers) * 100;
                strandPercentages.push({
                    strand: strand,
                    percentage: percentage.toFixed(2)
                });
            }
    
            // Sort strands by highest percentage and return the top 3
            strandPercentages.sort((a, b) => b.percentage - a.percentage);
            return strandPercentages.slice(0, 3);
        }
    
        window.reloadPage = function () {
            location.reload();
        };
    
        updateQuiz();

    });