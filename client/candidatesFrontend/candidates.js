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
                <p class="row-candidate-party">${escapeHTML(candidate.party.partyName)}</p>
            </td>
             <td>
                <p class="row-candidate-name">${escapeHTML(candidate.name)}</p>
            </td>
             <td>
                <button class="button" id="update-button-${candidate.id}">Update</button>            
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
/*
    Denne metode er genbrug fra en metode min gruppe lavede i 2. semester.
    Jeg menes at vi originalt har den fra https://www.w3schools.com/howto/howto_js_filter_table.asp
    også har jeg ændret i den så den passer til mit projekt.
 */
function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("party-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("candidate-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

