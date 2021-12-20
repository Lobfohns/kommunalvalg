package dk.kommunalvalg.controllers;


import dk.kommunalvalg.models.Candidate;
import dk.kommunalvalg.models.Party;
import dk.kommunalvalg.repositories.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Parties {

    @Autowired
    PartyRepository parties;

    @GetMapping("/parties")
    public Iterable<Party> getParties(){
        return parties.findAll();
    }

    @GetMapping("/parties/{id}")
    public Party getParties(@PathVariable Long id) {
        return parties.findById(id).get();
    }

    @PostMapping("/parties")
    public Party addParty(@RequestBody Party newParties) {
        newParties.setId(null);
        return parties.save(newParties);
    }

}
