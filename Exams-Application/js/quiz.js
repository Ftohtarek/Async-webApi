import { Finish } from "./finish.js"
import { PopUp } from "./pop-up.js"
import { Queue } from "./queue.js"
import { Service } from "./service.js"

export class Quiz {
    constructor() {
        /* template element */
        this.quiz = document.getElementById('quiz')
        this.questionElement = document.getElementById("question")
        this.btnSubmit = document.getElementById("btnSubmitAnswer")
        this.showAnswerButton = document.getElementById('show-answer')
        this.showRightAnswerContainer = document.getElementById('answer-container');
        /* template event  */
        this.btnSubmit.addEventListener("click", (e) => { this.detectSubmitFunctionalty(e) })
        this.showAnswerButton.addEventListener('click', () => { this.showAnswer() })
        /* system varible  */
        this.queue = new Queue()
        this.popUp = new PopUp()
        this.totalCorrectAnswer = 0;
        this.currentQ = 1;
        this.totalQ = undefined;
    }

    start(data) {
        /* set data to queue structure */
        this.queue.items = data;
        /* show template */
        new Service(this.quiz).show(600)
        /* total Q assign to lenght of array */
        this.totalQ = this.queue.items.length
        this.setupPrograssNav()
        /* show questions */
        this.showQ()
    }

    showQ = () => {
        this.clearPreviousQ()
        const data = this.queue.front();
        /* Set answer and render it  */
        let answers = [...data.incorrect_answers, data.correct_answer]
        // shuffle array
        answers = answers.sort((a, b) => 0.5 - Math.random())
        this.renderAnswer(answers)
        /* Render Question */
        this.questionElement.innerHTML = data.question;
    }

    detectSubmitFunctionalty(e) {
        if (e.target.innerText == 'check') return this.checkA()
        if (e.target.innerText == 'finish') return this.finish()
        return this.nextQ()
    }

    checkA() {
        /*  Select checked Radio button  */
        const answerElements = document.getElementsByName("answer")
        const selectedElement = [...answerElements].filter(el => el.checked)[0];
        this.testAnswer(selectedElement)
    }

    nextQ() {
        this.currentQ += 1;
        this.queue.dequeue()
        this.setupPrograssNav()
        this.showQ()
    }

    setupPrograssNav() {
        const prograss = document.getElementById('prograssNav')
        prograss.value = this.currentQ
        prograss.max = this.totalQ
        document.getElementById('prograssNavLabel').innerHTML = this.totalQ + " - " + this.currentQ
    }

    renderAnswer(answers) {
        /* loop throw answers array and render this item  */
        let container = '';
        answers.forEach((ele, index) => {
            container += `
            <div class="form-check rounded">
            <input type="radio" class="form-check-input p-2" name="answer" id="a${index}" value="${ele}">
            <label for="a${index}" class="form-check-label">${ele}</label>
            </div>
            `
        });
        document.getElementById("row-answer").innerHTML = container
    }

    testAnswer(selectedElement) {
        /* compare answer if it right increment right answer else show button of show answer button in both case show next button*/
        if (selectedElement == undefined) return this.popUp.execute('Please Select Answer', 'danger')

        if (selectedElement.value == this.queue.front().correct_answer) {
            this.totalCorrectAnswer += 1
            selectedElement.parentElement.style.backgroundColor = '#c3e6cb'
        }
        else {
            selectedElement.parentElement.style.backgroundColor = '#f5c6cb'
            this.showAnswerButton.classList.remove('d-none')
        }
        this.queue.hasOne() ? this.btnSubmit.innerHTML = 'finish' : this.btnSubmit.innerHTML = 'next'
    }

    showAnswer() {
        this.showRightAnswerContainer.innerHTML = this.queue.front().correct_answer
        this.showRightAnswerContainer.classList.toggle('d-none');
    }

    clearPreviousQ() {
        /* change next button to be check button remove show answer button and container */
        this.btnSubmit.innerText = 'check';
        this.showAnswerButton?.classList.add('d-none')
        this.showRightAnswerContainer?.classList.add('d-none')
    }

    finish() {
        new Finish().start({ correctAnswer: this.totalCorrectAnswer, totalQ: this.totalQ })
        new Service(this.quiz).hide(500)
    }
}