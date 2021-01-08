package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.Repositories.FilesRepository;
import com.airnavigation.tradeunion.domain.File;
import com.airnavigation.tradeunion.exceptions.IllegalAccessAttemtException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class FileService {

    private static final Logger LOGGER = Logger.getLogger(FileService.class);

    private final FilesRepository filesRepository;

    @Autowired
    public FileService(FilesRepository filesRepository) {
        this.filesRepository = filesRepository;
    }

    @Transactional
    public File addFile(File file) {
        return filesRepository.save(file);
    }

    @Transactional
    public File getSingleFile(long id) {
        Optional<File> foundFileOpt = filesRepository.findById(id);
        if (foundFileOpt.isPresent()) {
            return foundFileOpt.get();
        } else {
            throw new NoSuchElementException("Файл з ID=" + id + " не знайдено");
        }
    }

    @Transactional
    public List<File> getFiles() {
        return filesRepository.findAll();
    }

    @Transactional
    public File changeFile(File updatedFile, long id) {
        Optional<File> fileForUpdateOpt = filesRepository.findById(id);
        if (fileForUpdateOpt.isPresent()) {
            File fileForUpdate = fileForUpdateOpt.get();
            if(fileForUpdate.getId() != id) {
                LOGGER.warn("METHOD CHANGE_FILE: Unauthorized access attemption! HTTP request was changed! The id in path variable and file id does not match!");
                throw new IllegalAccessAttemtException("The attemption of illegal access to data!");
            }
            fileForUpdate.setName(updatedFile.getName());
            fileForUpdate.setPath(updatedFile.getPath());
            filesRepository.save(fileForUpdate);
            return updatedFile;
        } else {
            LOGGER.warn("METHOD CHANGE_FILE: File with id=" + id + " has been not found");
            throw new NoSuchElementException("Файл з ID=" + id + " не знайдений");
        }
    }

    @Transactional
    public String deleteFile(long id) {
        filesRepository.deleteById(id);
        return "Deleted";
    }
}
