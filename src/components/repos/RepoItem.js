import React, { Fragment } from 'react';
import PropTypes from 'prop-types'


export const RepoItem = ({ repo }) => {
  return (
    <Fragment>
      <div className="card my-1">
        <a href={repo.html_url}>{repo.name}</a>
      </div>
    </Fragment>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
}

export default RepoItem;