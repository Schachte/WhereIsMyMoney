import React, {PropTypes, Component} from 'react';
import SideBar from './common/Sidebar';
class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <SideBar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
