const candidateDiv = document.getElementById("candidate-names-list-tbody")

fetch(localURL + "/candidates")
    .then(response => response.json())
    .then(candidates => {
        console.log("Candidates", candidates);
        candidates.map(addCandidateToDivList);
    })

function addCandidateToDivList(candidate){
    const selectCandidateToDiv = document.createElement("tr");
    selectCandidateToDiv.id = candidate.id;
    candidateDiv.appendChild(selectCandidateToDiv);
    createCandidateTableRow(selectCandidateToDiv, candidate)
}

function createCandidateTableRow(divElement, candidate){
    divElement.innerHTML = `
     <td>
                <p class="row-candidate-name">${escapeHTML(candidate.name)}</p>
     </td>
            <td>
                <p class="row-candidate-party">${escapeHTML(candidate.party.partyName)}</p>
            </td>
             <td>
                <button id="update-button-${candidate.id}">Update</button>            
            </td>          
             <td>
                <button onclick="deleteCandidate(${candidate.id})">❌</button>            
            </td>
        `;
    document.getElementById(`update-button-${candidate.id}`)
        .addEventListener("click", () => updateCandidate(candidate));
}

function deleteCandidate(candidateId) {
    fetch(localURL + "/candidates/" + candidateId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(candidateId).remove();
        } else {
            console.log(response.status);
        }
    });
}


