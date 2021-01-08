package com.airnavigation.tradeunion.utilities;

import com.airnavigation.tradeunion.domain.Gender;
import com.airnavigation.tradeunion.domain.User;
import org.apache.poi.hssf.record.crypto.Biff8EncryptionKey;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

/**
 * @author Andrii Hubarenko
 * The utility for processing of .xml and .xmlx files
 */
@Component
public class FileProcessor {

    public List<String[]> readFileForCountChange(byte[] file, String fileExtension) throws IOException{
        String filePassword = "aero777";
        List<String[]> result = new ArrayList<>();
        ByteArrayInputStream byteArray = new ByteArrayInputStream(file);
        Biff8EncryptionKey.setCurrentUserPassword("aero777");
        if(fileExtension.equals("xlsx")) {
            Workbook workbook = WorkbookFactory.create(byteArray, filePassword);
            Sheet sheet = workbook.getSheet("Список");
            Iterator rowIter = sheet.rowIterator();
            while (rowIter.hasNext()) {
                XSSFRow row = (XSSFRow) rowIter.next();

                if(row.getRowNum() < 7 || row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                    continue;
                }

                String[] firstAndLastName = row.getCell(1).toString().split(" ");
                String firstName = createFirstName(firstAndLastName);
                String[] container = {firstName, firstAndLastName[0], round(row.getCell(10).getNumericCellValue())};
                result.add(container);
            }
        } else if (fileExtension.equals("xls")) {
            HSSFWorkbook workBook = new HSSFWorkbook(byteArray);
            HSSFSheet sheet= workBook.getSheet("Список");
            Iterator rowIter = sheet.rowIterator();
            while (rowIter.hasNext()) {
                HSSFRow row = (HSSFRow) rowIter.next();
                if(row.getRowNum() < 7 || row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                    continue;
                }
                String[] firstAndLastName = row.getCell(1).toString().split(" ");
                String firstName = createFirstName(firstAndLastName);
                String[] container = {firstName, firstAndLastName[0], round(row.getCell(10).getNumericCellValue())};
                result.add(container);
            }
        }

        byteArray.close();
        return result;
    }

    public Set<User> readFileForDBCreation(byte[] file, String fileExtension) throws IOException{
        String filePassword = "aero777";
        Set<User> result = new LinkedHashSet<>();
        ByteArrayInputStream byteArray = new ByteArrayInputStream(file);
        if(fileExtension.equals("xlsx")) {
            Workbook workbook = WorkbookFactory.create(byteArray, filePassword);
            Sheet sheet = workbook.getSheet("Список");
            if(sheet == null) {
                throw new NullPointerException("The sheet with name 'Список' has been not found");
            }
            Iterator rowIter = sheet.rowIterator();
            while (rowIter.hasNext()) {
                XSSFRow row = (XSSFRow) rowIter.next();

                if(row.getRowNum() < 7 || row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                    continue;
                }

                String[] firstAndLastName = row.getCell(1).toString().split(" ");
                String firstName = createFirstName(firstAndLastName);
                result.add(User.builder()
                        .username(Double.toString(row.getCell(0).getNumericCellValue()))
                        .firstName(firstName)
                        .lastName(firstAndLastName[0].trim())
                        .gender(Gender.MALE)
                        .build());
            }
        } else if (fileExtension.equals("xls")) {
            Biff8EncryptionKey.setCurrentUserPassword(filePassword);
            HSSFWorkbook workBook = new HSSFWorkbook(byteArray);
            HSSFSheet sheet= workBook.getSheet("Список");
            Iterator rowIter = sheet.rowIterator();
            while (rowIter.hasNext()) {
                HSSFRow row = (HSSFRow) rowIter.next();

                if(row.getRowNum() < 7 || row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                    continue;
                }

                String[] firstAndLastName = row.getCell(1).toString().split(" ");
                String firstName = createFirstName(firstAndLastName);
                result.add(User.builder()
                        .username(row.getCell(0).toString())
                        .firstName(firstName)
                        .lastName(firstAndLastName[0].trim())
                        .gender(Gender.MALE)
                        .build());
            }
        }
        byteArray.close();
        return result;
    }

    private String createFirstName(String[] firstAndLastName) {
        StringBuilder firstName = new StringBuilder();
        if(firstAndLastName.length > 2 && !firstAndLastName[2].equalsIgnoreCase("з")) {
            firstName.append(firstAndLastName[1]).append(" ").append(firstAndLastName[2]);
        } else {
            firstName.append(firstAndLastName[1]);
        }
        return firstName.toString().trim();
    }

    private String round(double value) {
        BigDecimal bd = new BigDecimal(Double.toString(value));
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return Double.toString(bd.doubleValue());
    }
}
