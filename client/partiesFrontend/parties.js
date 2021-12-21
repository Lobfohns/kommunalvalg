const partyDiv = document.getElementById("party-votes-list-tbody")
let totalPartyVotes;

fetch(localURL + "/partiesVotes")
    .then(response => response.json())
    .then(partiesVotes => {
        console.log("Party Votes", partiesVotes);
        totalPartyVotes = partiesVotes;
        fetch(localURL + "/parties")
            .then(response => response.json())
            .then(parties => {
                console.log("Parties", parties);
                parties.map(addPartyToDivList);
            })
    })
function addPartyToDivList(party){
    const selectPartyToDiv = document.createElement("tr");
    selectPartyToDiv.id = party.id;
    partyDiv.appendChild(selectPartyToDiv);
    createPartyTableRow(selectPartyToDiv, party)
}

function createPartyTableRow(divElement, party){
    divElement.innerHTML = `
            <td>
                <p class="row-party-name">${(party.partyName)}</p>
            </td>
            <td>
                <p class="row-party-votes">${(party.partyVotes)}</p>
            </td>
            <td>
                <p class="row-party-votes-percentage">${((party.partyVotes/totalPartyVotes)*100)}</p>
            </td>
        `;
}
