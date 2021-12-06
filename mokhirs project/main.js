let elList = document.querySelector('.list')
let elForm = document.querySelector('.form')
let elInput = document.querySelector('.number-input')
let pageNumber = document.querySelector('.page-numbers')

function Render(Arr, element, quontity) {
    element.innerHTML = null
    if (quontity == 0) {
        quontity = 5
    }else if(quontity>Arr.length){
        quontity = Arr.length
    }
    for (let i = 0; i < quontity; i++) {
        let newLi = document.createElement('li')
        let newNo = document.createElement('span')
        let newName = document.createElement('span')
        let newId = document.createElement('span')
        let newSalary = document.createElement('span')

        newLi.setAttribute('class', 'list-items')

        newNo.textContent = i + 1
        newName.textContent = Arr[i].employee_name
        newId.textContent = Arr[i].employee_id
        newSalary.textContent = "$" + Arr[i].employee_salary

        newLi.appendChild(newNo)
        newLi.appendChild(newName)
        newLi.appendChild(newId)
        newLi.appendChild(newSalary)
        element.appendChild(newLi)

    };
}

fetch("http://192.168.1.9:4000/salary")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not reach website.");
        }
        return response.json();
    })
    .then(json => {

        Render(json, elList, 5)
        for (let i = 1; i <= 4; i++) {
            let elInputvalue = 5
                let newLi2 = document.createElement('li')
                newLi2.setAttribute('class', 'page-number-items')
                newLi2.addEventListener('click', (evt) => {
                    let pagevelue = newLi2.textContent
                    let newPage = {
                        beginner: pagevelue,
                        employees: elInputvalue
                    }
                    fetch('http://192.168.1.9:4000/salary', {
                            method: 'POST',
                            body: JSON.stringify(newPage),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        })
                        .then(response => response.json())
                        .then(json2 => {
                            Render(json2, elList, elInputvalue)
                        });
                })
                newLi2.textContent = i
                pageNumber.appendChild(newLi2)
            }

        elForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            let elInputvalue = elInput.value
            if (elInputvalue == 0) {
                elInputvalue = 5
                elInput.style.border = '1px  solid red'
            } else {
                elInput.style.border = '1px  solid rgb(96, 211, 211)'
            }
            let pages = json.length / elInputvalue
            Render(json, elList, elInputvalue)
            pages = Math.ceil(pages)
            pageNumber.innerHTML = null
            for (let i = 1; i <= pages; i++) {
                let newLi2 = document.createElement('li')
                newLi2.setAttribute('class', 'page-number-items')
                newLi2.addEventListener('click', (evt) => {
                    let pagevelue = newLi2.textContent
                    let newPage = {
                        beginner: pagevelue,
                        employees: elInputvalue
                    }
                    fetch('http://192.168.1.9:4000/salary', {
                            method: 'POST',
                            body: JSON.stringify(newPage),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        })
                        .then(response => response.json())
                        .then(json2 => {
                            Render(json2, elList, elInputvalue)
                        });
                })
                newLi2.textContent = i
                pageNumber.appendChild(newLi2)
            }
        })
    })
    .catch(err => console.error(err));