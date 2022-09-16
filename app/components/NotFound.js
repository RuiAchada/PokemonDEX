import React from "react"
import Page from "./Page"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <Page title="Not Found">
      <div className="text-center">
        <h2>Page not found.</h2>
        <p className="lead text-muted">
          Go to <Link to="/">homepage</Link>
        </p>
      </div>
    </Page>
  )
}

export default NotFound
