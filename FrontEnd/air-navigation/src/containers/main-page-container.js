import React from 'react';
import MainPage from '../components/main-page';
import NewsContainer from './news-container';
import FileContainer from './file-container';
import UserDataContainer from './user-data-container';
import AuthenticationContainer from './authentication-container';
import {connect} from 'react-redux';
import {setNews} from './../reducers/actions/newsAction';
import {setFiles} from './../reducers/actions/fileAction';
import {representationService} from './../app-context/context';
import {setToMainDisplayMode} from './../reducers/actions/OnMainPageAction';
import {setSpinnerVisibility} from './../reducers/actions/spinnerAction';

class MainPageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrowNewsClassName: "arrow-4",
      arrowFilesClassName: "arrow-4",
      newsArray: [],
      filesArray: []
    };
  }

  componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("none"));
    representationService.get().then((data) =>  data.json()).then(representation => {
      this.props.dispatch(setNews(representation.newsList));
      this.props.dispatch(setFiles(representation.fileList));
    }).then(() => {
      this.setNews();
      this.setFiles();
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  setNews = () => {
    let shortNewsArray = [];
    if (!!this.props.news.listOfNews.length) {
      for (let i = 0; i < this.props.news.listOfNews.length && i < 4; i++) {
        shortNewsArray[i] = <NewsContainer
          key={this.props.news.listOfNews[i].id}
          singleNew={this.props.news.listOfNews[i]}
           />
      }
    } else {
      shortNewsArray[0] = <p>Покищо немає новин..</p>
    }
    this.setState({newsArray: shortNewsArray});
  }

  expandNews = () => {
    let longNewsArray = [];
    if (!!this.props.news.listOfNews.length) {
      this.props.news.listOfNews.forEach((singleNew, i) => {
        longNewsArray[i] = <NewsContainer
          key={singleNew.id}
          singleNew={singleNew}
           />
      });
    } else {
      longNewsArray[0] = <p>Покищо немає новин..</p>
    }
    this.setState({newsArray: longNewsArray});
  }

  setFiles = () => {
    let shortFilesArray = [];
    if (!!this.props.files.listOfFiles.length) {
      for (let i = 0; i < this.props.files.listOfFiles.length && i < 4; i++) {
        shortFilesArray[i] = <FileContainer
          key={this.props.files.listOfFiles[i].id}
          name={this.props.files.listOfFiles[i].name}
          path={this.props.files.listOfFiles[i].path}
           />
      }
    } else {
      shortFilesArray[0] = <p>Покищо немає файлів..</p>
    }
    this.setState({filesArray: shortFilesArray});
  }

  expandFiles = () => {
    let longFilesArray = [];
    if (!!this.props.files.listOfFiles.length) {
      this.props.files.listOfFiles.forEach((file, i) => {
        longFilesArray[i] = <FileContainer
          key={file.id}
          name={file.name}
          path={file.path}
           />
      });
    } else {
      longFilesArray[0] = <p>Покищо немає файлів..</p>
    }
    this.setState({filesArray: longFilesArray});
  }

  setUserData = () => {
    if(this.props.isAuthenticated) {
      return(
        <UserDataContainer
          firstName={this.props.user.firstName}
          lastName={this.props.user.lastName}
          count={this.props.user.count}
          gender={this.props.user.gender}
          />
        );
    }
    if(!this.props.isAuthenticated) {
      return(
        <AuthenticationContainer />
        );
    }
  }

  onClickExpandArrowNews = () => {
    if (this.state.arrowNewsClassName === "arrow-4") {
      this.expandNews();
      this.setState({arrowNewsClassName: "arrow-4 open"});
    } else if (this.state.arrowNewsClassName === "arrow-4 open") {
      this.setNews();
      this.setState({arrowNewsClassName: "arrow-4"});
    }
  }

  onClickExpandArrowFiles = () => {
    if (this.state.arrowFilesClassName === "arrow-4") {
      this.setState({arrowFilesClassName: "arrow-4 open"});
      this.expandFiles();
    } else if (this.state.arrowFilesClassName === "arrow-4 open") {
      this.setState({arrowFilesClassName: "arrow-4"});
      this.setFiles();
    }
  }

  render() {
    return(
      <MainPage
        news={this.state.newsArray}
        files={this.state.filesArray}
        user={this.setUserData()}
        onClickExpandArrowNews={this.onClickExpandArrowNews}
        onClickExpandArrowFiles={this.onClickExpandArrowFiles}
        arrowNewsClassName={this.state.arrowNewsClassName}
        arrowFilesClassName={this.state.arrowFilesClassName}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    news: state.news,
    files: state.files,
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(MainPageContainer);
