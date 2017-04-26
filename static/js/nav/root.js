import React from 'react';

class Root extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <a href="/" data-activates="nav-mobile" className="button-collapse top-nav waves-effect waves-light circle hide-on-large-only">
            <i className="material-icons">
              menu
            </i>
          </a>
        </div>
        <ul id="nav-mobile" className="side-nav fixed">
          <li className="logo">
            <a id="logo-container" href="/" className="brand-logo">
              <object id="front-page-logo" data="/img/penguin.svg" type="image/svg+xml"></object>
            </a>
          </li>
          <li className="search">
            <div className="search-wrapper card">
              <input type="text" id="search" />
              <i className="material-icons">search</i>
              <div className="search-results"></div>
            </div>
          </li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              {this.props.tabs.map(function(row, i) {
                return(
                  <li class="bold">
                    <a class="collapsible-header waves-effect waves-teal">
                      { row.text }
                    </a>
                    <div class="collapsible-body">
                      <ul>
                        {row.a.map(function(col, j) {
                          return(
                            <li>
                              <a href={col.href}>{col.text}</a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default Root;
