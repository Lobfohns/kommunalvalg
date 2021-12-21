package dk.kommunalvalg.repositories;

import dk.kommunalvalg.models.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PartyRepository extends JpaRepository<Party, Long> {

    @Query(value = "SELECT SUM(party_votes) FROM parties;", nativeQuery = true)
    double totalVotes();
}
