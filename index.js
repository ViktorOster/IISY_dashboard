//example department ID: 4debaffa-6a95-431a-ac8c-d1f738f5217f
//example entity ID: 352f34c8-a9dd-4195-9535-f4f3f2c33298

const baseUrl = "http://utu.iisy.test:4000/"

const getTicketsBtn = document.querySelector("#getTickets")
const getEntitiesBtn = document.querySelector("#getEntities")

const addTicketBtn = document.querySelector("#addTicket")
const entityIdInput = document.querySelector("#entityId")

const addEntityBtn = document.querySelector("#addEntity")
const entityNameInput = document.querySelector("#entityName")
const departmentIdInput2 = document.querySelector("#departmentId2")

const changeTicketStatusBtn = document.querySelector("#changeTicketStatus")
const ticketIdInput = document.querySelector("#ticketId")
const newStatusInput = document.querySelector("#newStatus")

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
    addTicket(name)
})

addEntityBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const name = entityNameInput.value
    const department = departmentIdInput2.value
    addEntity(name, department)
})

changeTicketStatusBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const ticketId = ticketIdInput.value
    const status = newStatusInput.value
    changeTicketStatus(ticketId, status)
})

function getTickets() {
    fetch(baseUrl + "v1/api/ticket/")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            const container = document.querySelector(".container")
            //remove old table
            const oldTable = document.querySelector("table")
            if (oldTable) oldTable.parentNode.removeChild(oldTable)

            const table = document.createElement("table")
            const tr = document.createElement("tr")
            const th1 = document.createElement("th")
            th1.textContent = "Object"
            const th2 = document.createElement("th")
            th2.textContent = "Location"
            const th3 = document.createElement("th")
            th3.textContent = "Status"
            const th4 = document.createElement("th")
            th4.textContent = "Update Status"
            const th5 = document.createElement("th")
            th5.textContent = "Date"
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            tr.appendChild(th5)
            table.appendChild(tr)

            showTicketsByStatus(data)
            data.forEach(ticket => {
                console.log(ticket)
                createEditableTicketRow(ticket, table)

            })
            container.appendChild(table)
        })
        .catch(function (error) {
            console.log(error)
            // If there is any error you will catch them here
        });
}

function getEntities() {
    fetch(baseUrl + "v1/api/entity/")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {

            data.forEach(entity => {
                console.log(entity)
            })
            ticketsByEntities(data)
        })
        .catch(function (error) {
            console.log(error)
            // If there is any error you will catch them here
        });
}

function addTicket(entityId) {
    fetch(baseUrl + "v1/api/ticket/", {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            "entity": entityId
        })
    })
}

function addEntity(entityName, departmentId) {
    fetch(baseUrl + "v1/api/entity/", {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            "name": entityName,
            "department": departmentId,
        })
    })
}

function changeTicketStatus(ticketId, status) {
    fetch(baseUrl + "v1/api/ticket/" + ticketId, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
            "ticket": ticketId,
            "status": status,
        })
    })
}

function getEntity(id) {
    fetch(baseUrl + "v1/api/entity/" + id)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            console.log(data)
            return data
        })
        .catch(function (error) {
            console.log(error)
            // If there is any error you will catch them here
        });
}

function getDepartment(id) {
    fetch(baseUrl + "v1/api/department/" + id)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            console.log(data)
            return data
        })
        .catch(function (error) {
            console.log(error)
            // If there is any error you will catch them here
        });
}

function createEditableTicketRow(ticket, table) {

    const tr = document.createElement("tr")
    table.appendChild(tr)

    const statusSelect = document.createElement("select")
    for (let i = 0; i < 4; i++) {
        const statusOption = document.createElement("option")
        statusOption.text = getStatusName(i + 1)
        statusOption.value = i + 1
        if (i + 1 === parseInt(ticket.status)) statusOption.selected = true
        statusSelect.appendChild(statusOption)
    }
    statusSelect.addEventListener("change", (e) => {
        console.log("changed")
        console.log(e.target.value)
        changeTicketStatus(ticket.id, e.target.value)
        //wait for server to update, then update ticket table
        setTimeout(() => {
            getTickets()
        }, 200);

    })


    //get ticket entity name
    fetch(baseUrl + "v1/api/entity/" + ticket.entity)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            const entityName = document.createElement("td")
            entityName.textContent = data.name
            tr.appendChild(entityName)
            // entityId = document.createElement("span")
            // entityId.textContent = data.id
            // wrapper.appendChild(entityId)
            //get ticket location
            const location = document.createElement("td")
            fetch(baseUrl + "v1/api/department/" + ticket.location)
                .then((resp) => resp.json()) // Transform the data into json
                .then(function (data) {
                    location.textContent = data.name
                })
                .catch(function (error) {
                    console.log(error)
                    // If there is any error you will catch them here
                });
            tr.appendChild(location)

            const status = document.createElement("td")
            status.textContent = getStatusName(ticket.status)
            switch (parseInt(ticket.status)) {
                case (1):
                    status.classList = "is-unresolved"
                    break
                case (2):
                    status.classList = "is-ongoing"
                    break
                case (3):
                    status.classList = "is-dismissed"
                    break
                case (4):
                    status.classList = "is-done"
                    break
                default:
                    status.classList = "is-unresolved"

            }
            tr.appendChild(status)
            tr.appendChild(statusSelect)
            const dateElem = document.createElement("td")
            d = new Date(ticket.created)
            let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

            dateElem.textContent = datestring
            tr.appendChild(dateElem)

        })
        .catch(function (error) {
            console.log(error)
            // If there is any error you will catch them here
        });


}
function getStatusName(id) {
    let ticketStatuses = {
        1: "Unresolved",
        2: "Ongoing",
        3: "Dismissed",
        4: "Done"
    }
    return ticketStatuses[id]
}
getTickets()

//barchart showing tickets for entities

function showTicketsByStatus(tickets) {
    const container = document.querySelector(".container")
    //remove old statusbar
    const oldStatusBar = document.querySelector(".ticket-status-bar")
    if (oldStatusBar) oldStatusBar.parentNode.removeChild(oldStatusBar)

    let ticketStatuses = {
        1: { name: "Unresolved", count: 0 },
        2: { name: "Ongoing", count: 0 },
        3: { name: "Dismissed", count: 0 },
        4: { name: "Done", count: 0 },
    }

    tickets.forEach(ticket => {
        ticketStatuses[ticket.status].count++
    })
    const ticketStatusBar = document.createElement("div")
    ticketStatusBar.classList = "ticket-status-bar"
    container.appendChild(ticketStatusBar)
    for (obj in ticketStatuses) {
        const status = ticketStatuses[obj]
        const wrapper = document.createElement("div")
        const header = document.createElement("h2")
        header.textContent = status.name
        const counter = document.createElement("p")
        counter.textContent = status.count
        wrapper.appendChild(header)
        wrapper.appendChild(counter)
        ticketStatusBar.appendChild(wrapper)
    }
}

function ticketsByEntities(data) {
    data.sort((a, b) => (a.numberOfOngoingTickets < b.numberOfOngoingTickets) ? 1 : -1)
    data.forEach(function (d) {
        d.name = d.name;
        d.id = d.id;
        d.numberOfOngoingTickets = d.numberOfOngoingTickets < 0 ? 0 : d.numberOfOngoingTickets;
        console.log(d.name, d.numberOfOngoingTickets)
    });


    var margin = { top: 20, right: 20, bottom: 150, left: 40 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(function (d) { return data[d - 1].name; })

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(".container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d.id; }));
    y.domain([0, d3.max(data, function (d) { return d.numberOfOngoingTickets; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)")

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Tickets");

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function (d) { return x(d.id); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.numberOfOngoingTickets); })
        .attr("height", function (d) { return height - y(d.numberOfOngoingTickets); });


}



// barchart from ticket data
function ticketsByDate(data) {
    var margin = { top: 20, right: 20, bottom: 70, left: 40 },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m").parse;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(".container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function (d) {
        d.date = new Date(d.created);
        d.value = +d.value;
    });

    x.domain(data.map(function (d) { return d.date; }));
    y.domain([0, d3.max(data, function (d) { return d.value; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function (d) { return x(d.date); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); });


}
