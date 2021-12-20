package dk.kommunalvalg.repositories;

import dk.kommunalvalg.models.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    @Query(value = "SELECT * FROM candidates WHERE party_id = ?;", nativeQuery = true)
    List<Candidate> findCandidatesByParty(Long party);
}
