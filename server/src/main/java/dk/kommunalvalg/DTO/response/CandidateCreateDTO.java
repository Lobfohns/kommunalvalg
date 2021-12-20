package dk.kommunalvalg.DTO.response;

import dk.kommunalvalg.models.Candidate;

public class CandidateCreateDTO {
    public Candidate candidate;
    public boolean failed;
    public String errorMessage;

    // success case
    public CandidateCreateDTO(Candidate candidate) {
        this.candidate = candidate;
    }

    // failure case
    public CandidateCreateDTO(String errorMessage) {
        this.errorMessage = errorMessage;
        this.failed = true;
    }
}
