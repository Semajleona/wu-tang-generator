//user inputs the answers  to 5 questions
//the answers are saved
//  2  answers are choosen  at random
// the answers are put together to create a name
// that name is displayed


document.querySelector("button").addEventListener('click', createName)

function createName() {
    let ego = document.querySelector('.ego').value
    let color = document.querySelector('.color').value
    let presence = document.querySelector('.presence').value
    let persona = document.querySelector('.persona').value
    let animal = document.querySelector('.animal').value



    let theAnswers = [ego, color, presence, persona, animal]

    let firstName = theAnswers[Math.floor(Math.random() * 5)]
    let lastName = theAnswers[Math.floor(Math.random() * 5)]

    let wuTangName = firstName + '' + lastName

    document.querySelector('h2').innerText = wuTangName

    fetch(`/api?ego=${ego}&&color=${color}&&presence=${presence}&&persona=${persona}&&animal=${animal}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

        })







}