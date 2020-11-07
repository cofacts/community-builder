import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  useListRepliesQuery,
  ListRepliesQuery,
  ReplyConnectionPageInfo,
} from '../types';
import { stringify } from 'querystring';

function Pagination({
  pageInfo = {},
  edges = [],
}: {
  pageInfo: ReplyConnectionPageInfo;
  edges: NonNullable<ListRepliesQuery['ListReplies']>['edges'];
}) {
  const { firstCursor, lastCursor } = pageInfo;
  if (!firstCursor || !lastCursor) {
    return null;
  }

  const firstCursorOfPage = edges.length && edges[0] && edges[0].cursor;
  const lastCursorOfPage =
    edges.length && edges[edges.length - 1] && edges[edges.length - 1].cursor;

  return (
    <p>
      {firstCursor && firstCursor !== firstCursorOfPage && (
        <Link
          to={{
            pathname: '/editorworks',
            search: stringify({ before: firstCursorOfPage, after: undefined }),
          }}
        >
          Prev
        </Link>
      )}
      {lastCursor && lastCursor !== lastCursorOfPage && (
        <Link
          to={{
            pathname: '/editorworks',
            search: stringify({ after: lastCursorOfPage, before: undefined }),
          }}
        >
          Next
        </Link>
      )}
    </p>
  );
}

const EditorWorks: React.FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const beforeParam = searchParams.get('before');
  const afterParam = searchParams.get('after');
  const { data, loading, error } = useListRepliesQuery({
    variables: {
      before: beforeParam,
      after: afterParam,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data || !data.ListReplies || !data.ListReplies.edges) {
    return <p>No data</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Text</th>
          <th>Author</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {data.ListReplies.edges.map(({ node }) => (
          <tr key={node.id}>
            <td>
              <a href={`https://cofacts.hacktabl.org/reply/${node.id}`}>
                {node.text}
              </a>
            </td>
            <td>{node?.user?.name}</td>
            <td>
              <a href={`https://cofacts.hacktabl.org/reply/${node.id}`}>
                {node.createdAt}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>
            <Pagination
              pageInfo={data.ListReplies.pageInfo}
              edges={data.ListReplies.edges}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default EditorWorks;
