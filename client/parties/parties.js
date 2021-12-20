const partyDiv = document.getElementById("party-votes-list-tbody")

fetch(localURL + "/parties")
    .then(response => response.json())
    .then(parties => {
        console.log("Parties", parties);
        parties.map(addPartyToDivList);
    })

function addPartyToDivList(party){
    const selectPartyToDiv = document.createElement("tr");
    selectPartyToDiv.id = party.id;
    partyDiv.appendChild(selectPartyToDiv);
    createPartyTableRow(selectPartyToDiv, party)
}

function createPartyTableRow(divPartyElement, party){
    divPartyElement.innerHTML = `
     <td>
                <p class="row-party-name">${escapeHTML(party.partyName)}</p>
     </td>
            <td>
                <p class="row-party-votes">${escapeHTML(party.partyVotes)}</p>
            </td>
        `;
}