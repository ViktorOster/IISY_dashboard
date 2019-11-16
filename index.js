//example department ID: 4debaffa-6a95-431a-ac8c-d1f738f5217f
//example entity ID: 352f34c8-a9dd-4195-9535-f4f3f2c33298

const getTicketsBtn = document.querySelector("#getTickets")
const getEntitiesBtn = document.querySelector("#getEntities")

const addTicketBtn = document.querySelector("#addTicket")
const entityIdInput = document.querySelector("#entityId")
const departmentIdInput = document.querySelector("#departmentId")

const addEntityBtn = document.querySelector("#addEntity")
const entityNameInput = document.querySelector("#entityName")
const departmentIdInput2 = document.querySelector("#departmentId2")

getTicketsBtn.addEventListener("click", (e) => {
    e.preventDefault()
    getTickets()
})
getEntitiesBtn.addEventListener("click", (e) => {
    e.preventDefault()
    getEntities()
})

addTicketBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const name = entityIdInput.value
    const department = departmentIdInput.value
    addTicket(name, department)
})

addEntityBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const name = entityNameInput.value
    const department = departmentIdInput2.value
    addEntity(name, department)
})

function getTickets() {
    fetch("http://abo.iisy.test:4000/v1/api/ticket/")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            data.forEach(ticket => {
                console.log(ticket)
            })
        })
        .catch(function (error) {
            console.log(error)
            // If there is any error you will catch them here
        });
}

function getEntities() {
    fetch("http://abo.iisy.test:4000/v1/api/entity/")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            data.forEach(entity => {
                console.log(entity)
            })
        })
        .catch(function (error) {
            console.log(error)
            // If there is any error you will catch them here
        });
}

function addTicket(entityId, departmentId) {
    fetch('http://abo.iisy.test:4000/v1/api/ticket/', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            "entity": entityId,
            "department": departmentId,
        })
    })
}

function addEntity(entityName, departmentId) {
    fetch('http://abo.iisy.test:4000/v1/api/entity/', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            "name": entityName,
            "department": departmentId,
        })
    })
}