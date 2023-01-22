import { Home } from "./home.js";
import { PopUp } from "./pop-up.js";
import { Quiz } from "./quiz.js";
import { Service } from "./service.js";
const home = new Home();
const quiz = new Quiz()
const popUp = new PopUp()


const startButton = document.getElementById("btnSubmit")

startButton.addEventListener("click", startExam)

async function startExam() {
    const data = await home.startQ()
    if (data.resbonceState) {
        popUp.execute('Quiz Start', 'success');
        new Service(home.home).hide(500)
        quiz.start(data.results)
    } else {
        popUp.execute(data.error, 'danger')
    }
}