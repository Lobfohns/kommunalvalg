let currentParty;
function updateCandidate(candidate) {
    const tableRowToUpdate = document.getElementById(candidate.id);

    tableRowToUpdate.innerHTML = `
        <td>
            <input id="update-candidate-name-${candidate.id}" value="${escapeHTML(candidate.name)}">
        </td>
        <td class="dropdown">
        <select id="update-party-dropdown">
            <option value=1>A</option>
            <option value=2>C</option>
            <option value=3>F</option>
            <option value=4>O</option>
            <option value=5>V</option>
            <option value=6>Ø</option>
        </select> 
        </td>
       <td>
            <button class="button" id="cancel-update-${candidate.id}">Cancel</button>
            <button class="button" onclick="updateCandidateInBackend(${candidate.id})">✅</button>
       </td>
       <td>
            <button onclick="deleteCandidate(${candidate.id})">❌</button>
       </td>
    `;
    const partyID = document.getElementById("update-party-dropdown").value;
    fetch(localURL + "/parties/" + partyID)
        .then(response => response.json())
        .then (party => {
            currentParty = party;
        });
    document.getElementById(`cancel-update-${candidate.id}`)
        .addEventListener("click", () => undoUpdateTableRow(candidate));
}

function undoUpdateTableRow(candidate) {
    const candidateTableRow = document.getElementById(candidate.id);
    createCandidateTableRow(candidateTableRow, candidate);
}

function updateCandidateInBackend(candidateId) {
    console.log("hej")
    const tableRowToUpdate = document.getElementById(candidateId);
    console.log("hej2")
    console.log(candidateId)
    console.log(currentParty)
    const newPartyID = document.getElementById("update-party-dropdown").value;
    console.log(newPartyID)
    const candidateToUpdate = {
        id: candidateId,
        name: document.getElementById(`update-candidate-name-${candidateId}`).value,
        party: currentParty
    };

    fetch(localURL + "/candidates/" + candidateId, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(candidateToUpdate)
    }).then(response => {
        if (response.status === 200) {
            createCandidateTableRow(tableRowToUpdate, candidateToUpdate);
        }
    });
}