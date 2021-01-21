package com.airnavigation.tradeunion.domain.PlainDomain;

import com.airnavigation.tradeunion.domain.File;
import com.airnavigation.tradeunion.domain.News;
import com.airnavigation.tradeunion.domain.User;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Andrii Hubarenko
 * The container for collection of all data, that are necessary for main page representation
 */
import java.util.List;

@Getter
@Setter
public class RepresentationContainer {
    User authorizedUser;
    List<File> fileList;
    List<News> newsList;
}
