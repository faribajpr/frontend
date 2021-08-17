import { gql } from "graphql-tag";

const ARTICLES_QUERY = gql`
    query Articles($limit: Int, $start: Int,) {
        articles(limit: $limit, start: $start, ) {
            id
            title
            category {
                id
                name
            }
            image {
                url
            }
        }
    }
`;

export default ARTICLES_QUERY;