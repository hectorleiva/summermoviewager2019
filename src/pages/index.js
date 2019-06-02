import React from "react"
import { graphql } from 'gatsby';

import Layout from "../components/layout"
import SEO from "../components/seo"
import SummerMovieTable from "../components/summermovietable"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`, `summermoviewager2019`]} />
    <h1>Hi people</h1>
    <p>Welcome to the {data.site.siteMetadata.title}</p>
    <SummerMovieTable />
  </Layout>
)

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default IndexPage
