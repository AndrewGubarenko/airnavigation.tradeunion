package com.airnavigation.tradeunion.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author Andrii Hubarenko
 * The entity of File
 */
@Entity
@Getter
@Setter
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    long id;

    @Column(name = "NAME", nullable = false)
    String name;

    @Column(name = "PATH", nullable = false)
    String path;

/*    @SuppressWarnings("SpellCheckingInspection")
    @Column(name = "IS_ADOP", nullable = false)
    Boolean isAdop;*/
}
