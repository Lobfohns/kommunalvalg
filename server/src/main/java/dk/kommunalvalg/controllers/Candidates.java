package dk.kommunalvalg.controllers;

import dk.kommunalvalg.DTO.response.CandidateCreateDTO;
import dk.kommunalvalg.models.Candidate;
import dk.kommunalvalg.repositories.CandidateRepository;
import dk.kommunalvalg.repositories.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Candidates {

    @Autowired
    CandidateRepository candidates;

    @Autowired
    PartyRepository parties;

    @GetMapping("/candidates")
    public Iterable<Candidate> getCandidates(){
        return candidates.findAll();
    }

    @GetMapping("/candidates/{id}")
    public Candidate getCandidate(@PathVariable Long id) {
        return candidates.findById(id).get();
    }

    @GetMapping("/candidates/party/{partyId}")
    public List<Candidate> getCandidatesByPartyId(@PathVariable Long partyId) {
        return candidates.findCandidatesByParty(partyId);
    }

    @PostMapping("/candidates/{partyId}")
    public CandidateCreateDTO createCandidate(@PathVariable Long partyId, @RequestBody Candidate candidateToCreate) {
        return parties.findById(partyId).map(party -> {
                    candidateToCreate.setId(null);
                    candidateToCreate.setParty(party);
                    Candidate createdCandidate = candidates.save(candidateToCreate);
                    return new CandidateCreateDTO(createdCandidate);
                }
        ).orElse(new CandidateCreateDTO("Did not find the candidate by candidateId"));
    }

    @PatchMapping("/candidates/{id}")
    public String patchCandidateById(@PathVariable Long id, @RequestBody Candidate candidateToUpdate) {
        return candidates.findById(id).map( foundCandidate -> {
            if(candidateToUpdate.getName() != null) foundCandidate.setName(candidateToUpdate.getName());
            if(candidateToUpdate.getParty() != null) foundCandidate.setParty(candidateToUpdate.getParty());
            candidates.save(foundCandidate);
            return "Candidate updated";
        }).orElse("Candidate not found");
    }

    @DeleteMapping("/candidates/{id}")
    public void deleteCandidatesById(@PathVariable Long id) {
        candidates.deleteById(id);
    }
}
