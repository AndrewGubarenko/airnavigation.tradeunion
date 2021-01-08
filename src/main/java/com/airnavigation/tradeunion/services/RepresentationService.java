package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.domain.PlainDomain.RepresentationContainer;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RepresentationService {

    private static final Logger LOGGER = Logger.getLogger(RepresentationService.class);

    private final FileService fileService;
    private final NewsService newsService;

    @Autowired
    public RepresentationService(FileService fileService,
                                    NewsService newsService) {
        this.fileService = fileService;
        this.newsService = newsService;
    }

    @Transactional
    public RepresentationContainer createRepresentation () {
        RepresentationContainer representation = new RepresentationContainer();
        representation.setFileList(fileService.getFiles());
        representation.setNewsList(newsService.getListOfNews());
        return representation;
    }
}
