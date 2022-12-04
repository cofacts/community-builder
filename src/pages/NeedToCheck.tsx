/* eslint-disable */
// @ts-nocheck

import React from 'react';
import { useLocation } from 'react-router-dom';

const BATCH_SIZE = 25;

export enum SortOrder {
  desc = 'desc',
  asc = 'asc',
}

type Setup = {
  notRepliedCount: number;
  notRepliedSortBy: string;
  notRepliedSortOrder: SortOrder;
  noUsefulCount: number;
  noUsefulSortBy: string;
  noUsefulSortOrder: SortOrder;
};

const NeedToCheck = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const notRepliedCount = +searchParams.get(
    'notRepliedCount'
  ) as Setup['notRepliedCount'];
  const notRepliedSortBy = searchParams.get(
    'notRepliedSortBy'
  ) as Setup['notRepliedSortBy'];
  const notRepliedSortOrder = searchParams.get(
    'notRepliedSortOrder'
  ) as Setup['notRepliedSortOrder'];
  const noUsefulCount = +searchParams.get(
    'noUsefulCount'
  ) as Setup['noUsefulCount'];
  const noUsefulSortBy = searchParams.get(
    'noUsefulSortBy'
  ) as Setup['noUsefulSortBy'];
  const noUsefulSortOrder = searchParams.get(
    'noUsefulSortOrder'
  ) as Setup['noUsefulSortOrder'];

  return <div>Need-to-check table</div>;
};

export default NeedToCheck;
