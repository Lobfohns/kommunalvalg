package dk.kommunalvalg.models;


import com.sun.istack.Nullable;
import lombok.Data;

import javax.persistence.*;

@Data
@Table(name="candidates")
@Entity
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "party_id")
    @Nullable
    private Party party;


}
