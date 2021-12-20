
const candidateFormParentDiv = document.getElementById("create-candidate-form");
const candidateFormExpandButton = document.getElementById("expand-candidate-form");

const createCandidateForm = `<div>
    <label>Name</label>
    <input id="create-candidate-name" placeholder="name">
    <label>Party</label>
    <select id="party-dropdown">
        <option value=1>A</option>
        <option value=2>C</option>
        <option value=3>F</option>
        <option value=4>O</option>
        <option value=5>V</option>
        <option value=6>Ø</option>
        
    </select>   
    <button onclick="removeCandidateForm()">Cancel</button>
    <button onclick="createCandidate()">Create A New Candidate</button>
    
</div>`;

function showCandidateForm() {
    candidateFormExpandButton.style.display = "none";
    candidateFormParentDiv.innerHTML = createCandidateForm;
}

function removeCandidateForm() {
    candidateFormExpandButton.style.display = "block";
    candidateFormParentDiv.innerHTML = "";
}

function createCandidate() {
    const candidateToCreate = {
        name: document.getElementById("create-candidate-name").value,
    };
    const partyID = document.getElementById("party-dropdown").value;

    fetch(localURL + "/candidates/" + partyID, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(candidateToCreate)
    }).then(response => response.json())
        .then(candidate => {
            removeCandidateForm();
            createCandidateTableRow(candidate)
        }).catch(error => console.log(error));
}

document.getElementById("expand-candidate-form")
    .addEventListener("click", showCandidateForm);
