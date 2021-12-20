package dk.kommunalvalg.repositories;

import dk.kommunalvalg.models.Party;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyRepository extends JpaRepository<Party, Long> {
}
