package com.airnavigation.tradeunion.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Map;
import java.util.Objects;

/**
 * @author Andrii Hubarenko
 * The entity of Questionnaire for User
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Questionnaire {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    long id;
    @Column(name = "name_ukrainian")
    String nameUkrainian;
    @Column(name = "name_english")
    String nameEnglish;
    @Column(name = "passport_number")
    String passportNumber;
    @Column(name = "passport_issue")
    String passportIssue;
    @Column(name = "passport_date_issue")
    LocalDate passportDateIssue;
    @Column(name = "does_have_international_passport")
    boolean doesHaveInternationalPassport;
    @Column(name = "term_international_passport")
    LocalDate termInternationalPassport;
    @Column(name = "ident_number")
    String identNumber;
    @Column(name = "education")
    String education;
    @Column(name = "education_term")
    LocalDate educationTerm;
    @Column(name = "email")
    String email;
    @Column(name = "home_phone")
    String homePhone;
    @Column(name = "mobile_phone")
    String mobilePhone;
    @Column(name = "birth_date")
    LocalDate birthDate;
    @Column(name = "passport_address")
    String passportAddress;
    @Column(name = "actual_address")
    String actualAddress;
    @Column(name = "employment_date")
    LocalDate employmentDate;
    @Column(name = "seniority")
    int seniority;
    @Column(name = "is_married")
    boolean isMarried;
    @Column(name = "family_composition")
    String familyComposition;

    @ElementCollection
    @CollectionTable(name = "children", joinColumns = {@JoinColumn(name = "questionnaire_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "child_name")
    @Column(name = "child_date")
    Map<String, LocalDate> children;
    @Column(name = "additional_information")
    String additionalInformation;

    @OneToOne
    @JoinColumn(name = "USER_ID")
    @JsonIgnore
    private User user;

    public void addUser(User user) {
        addUser(user, false);
    }

    protected void addUser(User user, boolean otherSideHasBeenAlreadySet) {
        this.setUser(user);
        if(otherSideHasBeenAlreadySet) {
            return;
        }
        user.addQuestionnaire(this, true);
    }

    protected void removeUser(boolean otherSideHasBeenSet) {
        this.setUser(null);
        if(otherSideHasBeenSet) {
            return;
        }
        user.removeQuestionnaire(this, true);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Questionnaire)) return false;
        Questionnaire that = (Questionnaire) o;
        return id == that.id &&
                doesHaveInternationalPassport == that.doesHaveInternationalPassport &&
                seniority == that.seniority &&
                isMarried == that.isMarried &&
                Objects.equals(nameUkrainian, that.nameUkrainian) &&
                Objects.equals(nameEnglish, that.nameEnglish) &&
                Objects.equals(passportNumber, that.passportNumber) &&
                Objects.equals(passportIssue, that.passportIssue) &&
                Objects.equals(passportDateIssue, that.passportDateIssue) &&
                Objects.equals(termInternationalPassport, that.termInternationalPassport) &&
                Objects.equals(identNumber, that.identNumber) &&
                Objects.equals(education, that.education) &&
                Objects.equals(educationTerm, that.educationTerm) &&
                Objects.equals(email, that.email) &&
                Objects.equals(homePhone, that.homePhone) &&
                Objects.equals(mobilePhone, that.mobilePhone) &&
                Objects.equals(birthDate, that.birthDate) &&
                Objects.equals(passportAddress, that.passportAddress) &&
                Objects.equals(actualAddress, that.actualAddress) &&
                Objects.equals(employmentDate, that.employmentDate) &&
                Objects.equals(familyComposition, that.familyComposition) &&
                Objects.equals(children, that.children) &&
                Objects.equals(additionalInformation, that.additionalInformation) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nameUkrainian, nameEnglish, passportNumber, passportIssue, passportDateIssue, doesHaveInternationalPassport, termInternationalPassport, identNumber, education, educationTerm, email, homePhone, mobilePhone, birthDate, passportAddress, actualAddress, employmentDate, seniority, isMarried, familyComposition, children, additionalInformation, user);
    }

    @Override
    public String toString() {
        return "Questionnaire{" +
                "id=" + id +
                ", nameUkrainian='" + nameUkrainian + '\'' +
                ", nameEnglish='" + nameEnglish + '\'' +
                ", passportNumber='" + passportNumber + '\'' +
                ", passportIssue='" + passportIssue + '\'' +
                ", passportDateIssue=" + passportDateIssue +
                ", doesHaveInternationalPassport=" + doesHaveInternationalPassport +
                ", termInternationalPassport=" + termInternationalPassport +
                ", identNumber='" + identNumber + '\'' +
                ", education='" + education + '\'' +
                ", educationTerm=" + educationTerm +
                ", email='" + email + '\'' +
                ", homePhone='" + homePhone + '\'' +
                ", mobilePhone='" + mobilePhone + '\'' +
                ", birthDate=" + birthDate +
                ", passportAddress='" + passportAddress + '\'' +
                ", actualAddress='" + actualAddress + '\'' +
                ", employmentDate=" + employmentDate +
                ", seniority=" + seniority +
                ", isMarried=" + isMarried +
                ", familyComposition='" + familyComposition + '\'' +
                ", children=" + children +
                ", additionalInformation='" + additionalInformation + '\'' +
                ", user=" + user +
                '}';
    }
}
