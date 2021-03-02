package com.airnavigation.tradeunion.utilities;

import com.airnavigation.tradeunion.Repositories.QuestionnaireRepository;
import com.airnavigation.tradeunion.domain.Gender;
import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.security.Cryptographer;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Iterator;
import java.util.Map;

/**
 * @author Andrii Hubarenko
 * The utility for processing of .xml and .xmlx files
 */
@Component
@SuppressWarnings("Duplicates")
public class Reporter {

    private final QuestionnaireRepository questionnaireRepository;
    private final Cryptographer cryptographer;

    @Autowired
    public Reporter (QuestionnaireRepository questionnaireRepository,
                     Cryptographer cryptographer) {
        this.questionnaireRepository = questionnaireRepository;
        this.cryptographer = cryptographer;
    }

    @Transactional
    public byte[] createFullReportFromQuestionnaires() throws IOException {

        Workbook book = new XSSFWorkbook();
        Sheet sheet = book.createSheet("Анкета");

        DataFormat format = book.createDataFormat();
        CellStyle dateStyle = book.createCellStyle();
        CellStyle firstRowStyle = book.createCellStyle();
        dateStyle.setDataFormat(format.getFormat("dd.mm.yyyy"));

        firstRowStyle.setBorderBottom(BorderStyle.MEDIUM);
        firstRowStyle.setBorderLeft(BorderStyle.MEDIUM);

        Row titleRow = sheet.createRow(0);

        Cell ukrainianNameTitle = titleRow.createCell(0);
        ukrainianNameTitle.setCellValue("Прізвище, ім'я, по-батькові");

        Cell englishNameTitle = titleRow.createCell(1);
        englishNameTitle.setCellValue("Name, Surname");

        Cell placePositionShiftTitle = titleRow.createCell(2);
        placePositionShiftTitle.setCellValue("Об'єкт, посада, зміна");

        Cell passportNumberTitle = titleRow.createCell(3);
        passportNumberTitle.setCellValue("Паспортні дані");

        Cell passportIssueTitle = titleRow.createCell(4);
        passportIssueTitle.setCellValue("Ким виданий");

        Cell passportDateIssueTitle = titleRow.createCell(5);
        passportDateIssueTitle.setCellValue("Дата видачі");

        Cell doesHaveInternationalPassportTitle = titleRow.createCell(6);
        doesHaveInternationalPassportTitle.setCellValue("Наявність закордонного паспорту");
        Cell termInternationalPassportTitle = titleRow.createCell(7);
        termInternationalPassportTitle.setCellValue("Терпін дії ЗП");

        Cell identNumberTitle = titleRow.createCell(8);
        identNumberTitle.setCellValue("Ідентифікаційний номер");

        Cell educationTitle = titleRow.createCell(9);
        educationTitle.setCellValue("Освіта");

        Cell educationTermTitle = titleRow.createCell(10);
        educationTermTitle.setCellValue("Дата закінчення ВНЗ");

        Cell emailTitle = titleRow.createCell(11);
        emailTitle.setCellValue("eMail");

        Cell homePhoneTitle = titleRow.createCell(12);
        homePhoneTitle.setCellValue("Домашній телефон");

        Cell mobilePhoneTitle = titleRow.createCell(13);
        mobilePhoneTitle.setCellValue("Мобільний телефон");

        Cell placeOfBirht = titleRow.createCell(14);
        placeOfBirht.setCellValue("Місце народження");

        Cell birthDateTitle = titleRow.createCell(15);
        birthDateTitle.setCellValue("Дата народження");

        Cell passportAddressTitle = titleRow.createCell(16);
        passportAddressTitle.setCellValue("Адреса проживання за пропискою");

        Cell actualAddressTitle = titleRow.createCell(17);
        actualAddressTitle.setCellValue("Фактична адреса проживання");

        Cell employmentDateTitle = titleRow.createCell(18);
        employmentDateTitle.setCellValue("Дата працевлаштування в РСП");

        Cell seniorityTitle = titleRow.createCell(19);
        seniorityTitle.setCellValue("Загальний трудовий стаж");

        Cell isMarriedTitle = titleRow.createCell(20);
        isMarriedTitle.setCellValue("Сімейний стан");

        Cell familyCompositionTitle = titleRow.createCell(21);
        familyCompositionTitle.setCellValue("Склад сім'ї");

        Cell childrenTitle = titleRow.createCell(22);
        childrenTitle.setCellValue("Діти");

        Cell additionalInformationTitle = titleRow.createCell(23);
        additionalInformationTitle.setCellValue("Додаткова інформація");

        Iterator<Cell> cellIterator = titleRow.cellIterator();
        while (cellIterator.hasNext()) {
            Cell cell = cellIterator.next();
            cell.setCellStyle(firstRowStyle);
            int columnIndex = cell.getColumnIndex();
            sheet.autoSizeColumn(columnIndex);
        }

        int rowNumber = 1;
        Iterable<Questionnaire> iterOfQuest = questionnaireRepository.findAll();
        Iterator<Questionnaire> iterator = iterOfQuest.iterator();
        while(iterator.hasNext()) {
            Questionnaire questionnaire = iterator.next();
            Row row = sheet.createRow(rowNumber);
            Cell ukrainianName = row.createCell(0);
            ukrainianName.setCellValue(cryptographer.decode(questionnaire.getNameUkrainian()));

            Cell englishName = row.createCell(1);
            englishName.setCellValue(cryptographer.decode(questionnaire.getNameEnglish()));

            Cell placePositionShift = row.createCell(2);
            placePositionShift.setCellValue(cryptographer.decode(questionnaire.getFacility())
                    + ", " + cryptographer.decode(questionnaire.getPosition())
                    + ", " + cryptographer.decode(questionnaire.getShift()));

            Cell passportNumber = row.createCell(3);
            passportNumber.setCellValue(cryptographer.decode(questionnaire.getPassportNumber()));

            Cell passportIssue = row.createCell(4);
            passportIssue.setCellValue(cryptographer.decode(questionnaire.getPassportIssue()));

            Cell passportDateIssue = row.createCell(5);
            passportDateIssue.setCellStyle(dateStyle);
            passportDateIssue.setCellValue((questionnaire.getPassportDateIssue()));

            Cell doesHaveInternationalPassport = row.createCell(6);
            Cell termInternationalPassport = row.createCell(7);
            if(cryptographer.decode(questionnaire.getDoesHaveInternationalPassport()).equals("true")) {
                doesHaveInternationalPassport.setCellValue("Маю");
                termInternationalPassport.setCellStyle(dateStyle);
                termInternationalPassport.setCellValue(cryptographer.decode(questionnaire.getTermInternationalPassport()));
            } else {
                doesHaveInternationalPassport.setCellValue("Не маю");
                termInternationalPassport.setCellValue("");
            }

            Cell identNumber = row.createCell(8);
            identNumber.setCellValue(cryptographer.decode(questionnaire.getIdentNumber()));

            Cell education = row.createCell(9);
            education.setCellValue(cryptographer.decode(questionnaire.getEducation()));

            Cell educationTerm = row.createCell(10);
            educationTerm.setCellStyle(dateStyle);
            educationTerm.setCellValue(cryptographer.decode(questionnaire.getEducationTerm()));

            Cell email = row.createCell(11);
            email.setCellValue(questionnaire.getUser().getUsername());

            Cell homePhone = row.createCell(12);
            homePhone.setCellValue(cryptographer.decode(questionnaire.getHomePhone()));

            Cell mobilePhone = row.createCell(13);
            mobilePhone.setCellValue(cryptographer.decode(questionnaire.getMobilePhone()));

            Cell placeOfBirth = row.createCell(14);
            placeOfBirth.setCellValue(cryptographer.decode(questionnaire.getMobilePhone()));

            Cell birthDate = row.createCell(15);
            birthDate.setCellStyle(dateStyle);
            birthDate.setCellValue(cryptographer.decode(questionnaire.getBirthDate()));

            Cell passportAddress = row.createCell(16);
            passportAddress.setCellValue(cryptographer.decode(questionnaire.getPassportAddress()));

            Cell actualAddress = row.createCell(17);
            actualAddress.setCellValue(cryptographer.decode(questionnaire.getActualAddress()));

            Cell employmentDate = row.createCell(18);
            employmentDate.setCellStyle(dateStyle);
            employmentDate.setCellValue(cryptographer.decode(questionnaire.getEmploymentDate()));

            Cell seniority = row.createCell(19);
            seniority.setCellValue(cryptographer.decode(questionnaire.getSeniority()));

            Cell isMarried = row.createCell(20);
            if(cryptographer.decode(questionnaire.getIsMarried()).equals("true")) {
                isMarried.setCellValue(questionnaire.getUser().getGender().equals(Gender.MALE) ? "Одружений" : "Заміжня");
            } else {
                isMarried.setCellValue(questionnaire.getUser().getGender().equals(Gender.MALE) ? "Неодружений" : "Незаміжня");
            }

            Cell familyComposition = row.createCell(21);
            familyComposition.setCellValue(cryptographer.decode(questionnaire.getFamilyComposition()));

            Cell children = row.createCell(22);
            StringBuilder childrenCell = new StringBuilder();
            questionnaire.getChildren().forEach((childName, childDate) -> {
                childrenCell.append(cryptographer.decode(childName))
                            .append(": ")
                            .append(cryptographer.decode(childDate))
                            .append("; ");
            });
            children.setCellValue(childrenCell.toString());

            Cell additionalInformation = row.createCell(23);
            additionalInformation.setCellValue(cryptographer.decode(questionnaire.getAdditionalInformation()));

            Iterator<Cell> dataСellIterator = row.cellIterator();
            while (dataСellIterator.hasNext()) {
                Cell cell = dataСellIterator.next();
                cell.setCellStyle(firstRowStyle);
                sheet.autoSizeColumn(cell.getColumnIndex());
            }

            rowNumber++;
        }

        sheet.autoSizeColumn(1);

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        book.write(stream);
        byte[] encoded = Base64.getEncoder().encode(stream.toByteArray());
        book.close();

        return encoded;
    }

    @Transactional
    public byte[] createChildrenReportFromQuestionnaires() throws IOException {
        Workbook book = new XSSFWorkbook();
        Sheet sheet = book.createSheet("Анкета");

        DataFormat format = book.createDataFormat();
        CellStyle dateStyle = book.createCellStyle();
        CellStyle firstRowStyle = book.createCellStyle();
        dateStyle.setDataFormat(format.getFormat("dd.mm.yyyy"));

        firstRowStyle.setBorderBottom(BorderStyle.MEDIUM);
        firstRowStyle.setBorderLeft(BorderStyle.MEDIUM);

        Row approveRow = sheet.createRow(0);
        Cell approveRowCell = approveRow.createCell(3);
        approveRowCell.setCellValue("ЗАТВЕРДЖУЮ");
        Row headRow = sheet.createRow(1);
        Cell headRowCell = headRow.createCell(3);
        headRowCell.setCellValue("голова ради профспілки \"Аеронавігація\"");
        Row signatureRow = sheet.createRow(2);
        Cell signatureRowCell = signatureRow.createCell(3);
        signatureRowCell.setCellValue("________________________");
        Row nameRow = sheet.createRow(3);
        Cell nameRowCell = nameRow.createCell(3);
        nameRowCell.setCellValue("Аксьонов Д.М.");
        Row titleRow = sheet.createRow(5);
        Cell titleRowCell = titleRow.createCell(1);
        titleRowCell.setCellValue(new StringBuilder().append("Список дітей членів Профспілки \"Аеронавігація\" в ")
                                                    .append(LocalDate.now().minus(1, ChronoUnit.YEARS).getYear())
                                                    .append("-")
                                                    .append(LocalDate.now().getYear())
                                                    .append("р.")
                                                    .toString());
        Row tableHeadRow = sheet.createRow(6);
        Cell tableHeadRowCellNum = tableHeadRow.createCell(0);
        tableHeadRowCellNum.setCellValue("№п/п");
        Cell tableHeadRowCellName = tableHeadRow.createCell(1);
        tableHeadRowCellName.setCellValue("Прізвище, ім'я, по-батькові");
        Cell tableHeadRowCellChildName = tableHeadRow.createCell(2);
        tableHeadRowCellChildName.setCellValue("Ім`я дитини");
        Cell tableHeadRowCellSignature = tableHeadRow.createCell(3);
        tableHeadRowCellSignature.setCellValue("Підпис");

        CellStyle tableStyle = book.createCellStyle();
        tableStyle.setBorderRight(BorderStyle.MEDIUM);
        tableStyle.setBorderBottom(BorderStyle.MEDIUM);
        tableStyle.setBorderLeft(BorderStyle.MEDIUM);
        tableStyle.setBorderTop(BorderStyle.MEDIUM);

        Iterator<Cell> dataСellIterator = tableHeadRow.cellIterator();
        while (dataСellIterator.hasNext()) {
            Cell cell = dataСellIterator.next();
            cell.setCellStyle(firstRowStyle);
            sheet.autoSizeColumn(cell.getColumnIndex());
        }

        int rowNumber = 7;
        int count = 1;
        Iterable<Questionnaire> iterOfQuest = questionnaireRepository.findAll();
        Iterator<Questionnaire> iterator = iterOfQuest.iterator();
        while(iterator.hasNext()) {
            Questionnaire questionnaire = iterator.next();
            Row row = sheet.createRow(rowNumber);
            Cell num = row.createCell(0);
            num.setCellValue(count++);

            Cell parentName = row.createCell(1);
            parentName.setCellValue(cryptographer.decode(questionnaire.getNameUkrainian()));

            Iterator<Map.Entry<String, String>> entries = questionnaire.getChildren().entrySet().iterator();
            while (entries.hasNext()) {
                Map.Entry<String, String> entry = entries.next();

                Cell childName = row.createCell(2);
                childName.setCellValue(new StringBuilder().append(cryptographer.decode(entry.getKey()))
                                                          .append(": ")
                                                          .append(cryptographer.decode(entry.getValue()))
                                                          .append("; ")
                                                          .toString());

                if (entries.hasNext()) {
                    Cell signature = row.createCell(4);
                    signature.setCellValue("");
                    rowNumber++;
                    row = sheet.createRow(rowNumber);
                }
            }

            Cell signature = row.createCell(4);
            signature.setCellValue("");

            rowNumber++;
        }


        sheet.autoSizeColumn(1);
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        book.write(stream);
        byte[] encoded = Base64.getEncoder().encode(stream.toByteArray());
        book.close();

        return encoded;
    }
}
