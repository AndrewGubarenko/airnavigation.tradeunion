package com.airnavigation.tradeunion.domain.PlainDomain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlainQuestionnaire {

    long id;
    String nameUkrainian;
    String nameEnglish;
    String passportNumber;
    String passportIssue;
    LocalDate passportDateIssue;
    boolean doesHaveInternationalPassport;
    LocalDate termInternationalPassport;
    String identNumber;
    String education;
    LocalDate educationTerm;
    String email;
    String homePhone;
    String mobilePhone;
    LocalDate birthDate;
    String passportAddress;
    String actualAddress;
    LocalDate employmentDate;
    int seniority;
    boolean isMarried;
    String familyComposition;

    Map<String, LocalDate> children;
    String additionalInformation;
    private long userId;
}
