/**
 * Wraps Material-UI data grid to make a server-paginated uncontrolled data table.
 */

import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export const PAGE_SIZE = 50;

type DataGridProps = React.ComponentPropsWithoutRef<typeof DataGrid>;

type Props = {
  /**
   * All rows that are currently loaded, starting from first row to the last row currently loaded.
   */
  currentlyLoadedRows: DataGridProps['rows'];

  /**
   * Invoked when the table should load new rows.
   */
  onNewPageRequest: (page: number) => void;
} & Omit<
  // Remove fields that may confuse user if given
  DataGridProps,
  | 'rows'
  | 'rowsPerPageOptions'
  | 'onPageChange'
  | 'hideFooterPagination'
  | 'pagination'
>;

const DataTable = ({
  currentlyLoadedRows,
  onNewPageRequest,
  loading,
  ...otherDataGridProps
}: Props) => {
  const [page, setPage] = useState<number>(0);
  // Determine already loaded page idx according to data already in cache
  const [loadedPageIdx, setLoadedPageIdx] = useState<number>(
    () => Math.floor(currentlyLoadedRows.length / PAGE_SIZE) - 1
  );

  const handlePageChange: DataGridProps['onPageChange'] = (page) => {
    setPage(page);

    // Nothing is required when paginating between already loaded pages
    if (page <= loadedPageIdx) return;

    onNewPageRequest(page);
    setLoadedPageIdx(page);
  };

  return (
    <DataGrid
      {...otherDataGridProps}
      rows={currentlyLoadedRows.slice(page * PAGE_SIZE)}
      pagination
      disableSelectionOnClick
      page={page}
      pageSize={PAGE_SIZE}
      paginationMode="server"
      rowsPerPageOptions={[PAGE_SIZE]}
      onPageChange={handlePageChange}
      loading={loading}
      hideFooterPagination={loading}
    />
  );
};

export default DataTable;
