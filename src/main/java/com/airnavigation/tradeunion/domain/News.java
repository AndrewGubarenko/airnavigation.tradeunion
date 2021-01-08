package com.airnavigation.tradeunion.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author Andrii Hubarenko
 * The entity of News
 */
@Entity
@Getter
@Setter
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    long id;

    @Column(name = "TITLE")
    String title;

    @Column(name = "TEXT", columnDefinition = "TEXT")
    String text;

}
