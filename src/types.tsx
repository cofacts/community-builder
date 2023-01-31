/* eslint-disable */
/* AUTO-GENERATED. WILL BE OVERWRITTEN BY `npm run codegen`. */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Analytics = Node & {
  readonly __typename?: 'Analytics';
  /** The day this analytic datapoint is represented, in YYYY-MM-DD format */
  readonly date: Scalars['String'];
  /** Authoring app ID of the document that this analytic datapoint measures. */
  readonly docAppId?: Maybe<Scalars['ID']>;
  /** The id for the document that this analytic datapoint is for. */
  readonly docId: Scalars['ID'];
  /** Author of the document that this analytic datapoint measures. */
  readonly docUserId?: Maybe<Scalars['ID']>;
  readonly id: Scalars['ID'];
  readonly liff: ReadonlyArray<AnalyticsLiffEntry>;
  /** Sum of LIFF visitor count from all sources */
  readonly liffUser: Scalars['Int'];
  /** Sum of LIFF view count from all sources */
  readonly liffVisit: Scalars['Int'];
  readonly lineUser?: Maybe<Scalars['Int']>;
  readonly lineVisit?: Maybe<Scalars['Int']>;
  /** Type of document that this analytic datapoint is for. */
  readonly type: AnalyticsDocTypeEnum;
  readonly webUser?: Maybe<Scalars['Int']>;
  readonly webVisit?: Maybe<Scalars['Int']>;
};

export type AnalyticsConnection = Connection & {
  readonly __typename?: 'AnalyticsConnection';
  readonly edges: ReadonlyArray<AnalyticsConnectionEdge>;
  readonly pageInfo: AnalyticsConnectionPageInfo;
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
};

export type AnalyticsConnectionEdge = Edge & {
  readonly __typename?: 'AnalyticsConnectionEdge';
  readonly cursor: Scalars['String'];
  readonly highlight?: Maybe<Highlights>;
  readonly node: Analytics;
  readonly score?: Maybe<Scalars['Float']>;
};

export type AnalyticsConnectionPageInfo = PageInfo & {
  readonly __typename?: 'AnalyticsConnectionPageInfo';
  readonly firstCursor?: Maybe<Scalars['String']>;
  readonly lastCursor?: Maybe<Scalars['String']>;
};

export enum AnalyticsDocTypeEnum {
  Article = 'ARTICLE',
  Reply = 'REPLY'
}

export type AnalyticsLiffEntry = {
  readonly __typename?: 'AnalyticsLiffEntry';
  /** utm_source for this LIFF stat entry. Empty string if not set. */
  readonly source: Scalars['String'];
  readonly user: Scalars['Int'];
  readonly visit: Scalars['Int'];
};

export type Article = Node & {
  readonly __typename?: 'Article';
  readonly articleCategories?: Maybe<ReadonlyArray<Maybe<ArticleCategory>>>;
  /** Connections between this article and replies. Sorted by the logic described in https://github.com/cofacts/rumors-line-bot/issues/78. */
  readonly articleReplies?: Maybe<ReadonlyArray<Maybe<ArticleReply>>>;
  /** Message event type */
  readonly articleType: ArticleTypeEnum;
  /** Attachment hash to search or identify files */
  readonly attachmentHash?: Maybe<Scalars['String']>;
  /** Attachment URL for this article. */
  readonly attachmentUrl?: Maybe<Scalars['String']>;
  /** Number of normal article categories */
  readonly categoryCount?: Maybe<Scalars['Int']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  /** Hyperlinks in article text */
  readonly hyperlinks?: Maybe<ReadonlyArray<Maybe<Hyperlink>>>;
  readonly id: Scalars['ID'];
  readonly lastRequestedAt?: Maybe<Scalars['String']>;
  readonly references?: Maybe<ReadonlyArray<Maybe<ArticleReference>>>;
  readonly relatedArticles?: Maybe<ArticleConnection>;
  /** Number of normal article replies */
  readonly replyCount?: Maybe<Scalars['Int']>;
  readonly replyRequestCount?: Maybe<Scalars['Int']>;
  readonly replyRequests?: Maybe<ReadonlyArray<Maybe<ReplyRequest>>>;
  /** If the current user has requested for reply for this article. Null if not logged in. */
  readonly requestedForReply?: Maybe<Scalars['Boolean']>;
  /** Activities analytics for the given article */
  readonly stats?: Maybe<ReadonlyArray<Maybe<Analytics>>>;
  readonly status: ReplyRequestStatusEnum;
  readonly text?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  /** The user submitted this article */
  readonly user?: Maybe<User>;
};


export type ArticleArticleCategoriesArgs = {
  status?: InputMaybe<ArticleCategoryStatusEnum>;
  statuses?: InputMaybe<ReadonlyArray<ArticleCategoryStatusEnum>>;
};


export type ArticleArticleRepliesArgs = {
  appId?: InputMaybe<Scalars['String']>;
  selfOnly?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<ArticleReplyStatusEnum>;
  statuses?: InputMaybe<ReadonlyArray<ArticleReplyStatusEnum>>;
  userId?: InputMaybe<Scalars['String']>;
};


export type ArticleAttachmentUrlArgs = {
  variant?: InputMaybe<AttachmentVariantEnum>;
};


export type ArticleRelatedArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<RelatedArticleFilter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<RelatedArticleOrderBy>>>;
};


export type ArticleReplyRequestsArgs = {
  statuses?: InputMaybe<ReadonlyArray<ReplyRequestStatusEnum>>;
};


export type ArticleStatsArgs = {
  dateRange?: InputMaybe<TimeRangeInput>;
};

/** The linkage between an Article and a Category */
export type ArticleCategory = Node & {
  readonly __typename?: 'ArticleCategory';
  readonly aiConfidence?: Maybe<Scalars['Float']>;
  readonly aiModel?: Maybe<Scalars['String']>;
  readonly appId: Scalars['String'];
  readonly article?: Maybe<Article>;
  readonly articleId?: Maybe<Scalars['String']>;
  readonly canUpdateStatus?: Maybe<Scalars['Boolean']>;
  readonly category?: Maybe<Category>;
  readonly categoryId?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly feedbackCount?: Maybe<Scalars['Int']>;
  readonly feedbacks?: Maybe<ReadonlyArray<Maybe<ArticleCategoryFeedback>>>;
  readonly id: Scalars['ID'];
  readonly negativeFeedbackCount?: Maybe<Scalars['Int']>;
  /** The feedback of current user. null when not logged in or not voted yet. */
  readonly ownVote?: Maybe<FeedbackVote>;
  readonly positiveFeedbackCount?: Maybe<Scalars['Int']>;
  readonly status?: Maybe<ArticleCategoryStatusEnum>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  /** The user who updated this category with this article. */
  readonly user?: Maybe<User>;
  readonly userId: Scalars['String'];
};

export type ArticleCategoryConnection = Connection & {
  readonly __typename?: 'ArticleCategoryConnection';
  readonly edges: ReadonlyArray<ArticleCategoryConnectionEdge>;
  readonly pageInfo: ArticleCategoryConnectionPageInfo;
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
};

export type ArticleCategoryConnectionEdge = Edge & {
  readonly __typename?: 'ArticleCategoryConnectionEdge';
  readonly cursor: Scalars['String'];
  readonly highlight?: Maybe<Highlights>;
  readonly node: ArticleCategory;
  readonly score?: Maybe<Scalars['Float']>;
};

export type ArticleCategoryConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ArticleCategoryConnectionPageInfo';
  readonly firstCursor?: Maybe<Scalars['String']>;
  readonly lastCursor?: Maybe<Scalars['String']>;
};

/** User feedback to an ArticleCategory */
export type ArticleCategoryFeedback = {
  readonly __typename?: 'ArticleCategoryFeedback';
  readonly comment?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  readonly user?: Maybe<User>;
  /** User's vote on the articleCategory */
  readonly vote?: Maybe<FeedbackVote>;
};

export enum ArticleCategoryStatusEnum {
  /** Created by a blocked user violating terms of use. */
  Blocked = 'BLOCKED',
  Deleted = 'DELETED',
  Normal = 'NORMAL'
}

export type ArticleConnection = Connection & {
  readonly __typename?: 'ArticleConnection';
  readonly edges: ReadonlyArray<ArticleConnectionEdge>;
  readonly pageInfo: ArticleConnectionPageInfo;
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
};

export type ArticleConnectionEdge = Edge & {
  readonly __typename?: 'ArticleConnectionEdge';
  readonly cursor: Scalars['String'];
  readonly highlight?: Maybe<Highlights>;
  readonly node: Article;
  readonly score?: Maybe<Scalars['Float']>;
};

export type ArticleConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ArticleConnectionPageInfo';
  readonly firstCursor?: Maybe<Scalars['String']>;
  readonly lastCursor?: Maybe<Scalars['String']>;
};

export type ArticleReference = {
  readonly __typename?: 'ArticleReference';
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly permalink?: Maybe<Scalars['String']>;
  readonly type?: Maybe<ArticleReferenceTypeEnum>;
};

export type ArticleReferenceInput = {
  readonly permalink?: InputMaybe<Scalars['String']>;
  readonly type: ArticleReferenceTypeEnum;
};

/** Where this article is collected from. */
export enum ArticleReferenceTypeEnum {
  /** The article is collected from conversations in LINE messengers. */
  Line = 'LINE',
  /** The article is collected from the Internet, with a link to the article available. */
  Url = 'URL'
}

/** The linkage between an Article and a Reply */
export type ArticleReply = {
  readonly __typename?: 'ArticleReply';
  readonly appId: Scalars['String'];
  readonly article?: Maybe<Article>;
  readonly articleId?: Maybe<Scalars['String']>;
  readonly canUpdateStatus?: Maybe<Scalars['Boolean']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly feedbackCount?: Maybe<Scalars['Int']>;
  readonly feedbacks?: Maybe<ReadonlyArray<Maybe<ArticleReplyFeedback>>>;
  readonly negativeFeedbackCount?: Maybe<Scalars['Int']>;
  /** The feedback of current user. null when not logged in or not voted yet. */
  readonly ownVote?: Maybe<FeedbackVote>;
  readonly positiveFeedbackCount?: Maybe<Scalars['Int']>;
  readonly reply?: Maybe<Reply>;
  readonly replyId?: Maybe<Scalars['String']>;
  /** Cached reply type value stored in ArticleReply */
  readonly replyType?: Maybe<ReplyTypeEnum>;
  readonly status?: Maybe<ArticleReplyStatusEnum>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  /** The user who conencted this reply and this article. */
  readonly user?: Maybe<User>;
  readonly userId: Scalars['String'];
};


/** The linkage between an Article and a Reply */
export type ArticleReplyFeedbacksArgs = {
  statuses?: InputMaybe<ReadonlyArray<ArticleReplyFeedbackStatusEnum>>;
};

/** User feedback to an ArticleReply */
export type ArticleReplyFeedback = Node & {
  readonly __typename?: 'ArticleReplyFeedback';
  readonly appId?: Maybe<Scalars['String']>;
  /** The scored article-reply's article */
  readonly article?: Maybe<Article>;
  /** The scored article-reply */
  readonly articleReply?: Maybe<ArticleReply>;
  /** User ID of the article-reply's author */
  readonly articleReplyUserId: Scalars['String'];
  readonly comment?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The scored article-reply's reply */
  readonly reply?: Maybe<Reply>;
  /** User ID of the reply's author */
  readonly replyUserId: Scalars['String'];
  /**
   * One of 1, 0 and -1. Representing upvote, neutral and downvote, respectively
   * @deprecated Use vote instead
   */
  readonly score?: Maybe<Scalars['Int']>;
  readonly status: ArticleReplyFeedbackStatusEnum;
  readonly updatedAt?: Maybe<Scalars['String']>;
  readonly user?: Maybe<User>;
  readonly userId?: Maybe<Scalars['String']>;
  /** User's vote on the articleReply */
  readonly vote?: Maybe<FeedbackVote>;
};

export enum ArticleReplyFeedbackStatusEnum {
  /** Created by a blocked user violating terms of use. */
  Blocked = 'BLOCKED',
  Normal = 'NORMAL'
}

export type ArticleReplyFilterInput = {
  /** Show only articleReplies created by a specific app. */
  readonly appId?: InputMaybe<Scalars['String']>;
  /** List only the articleReplies that were created between the specific time range. */
  readonly createdAt?: InputMaybe<TimeRangeInput>;
  readonly replyTypes?: InputMaybe<ReadonlyArray<InputMaybe<ReplyTypeEnum>>>;
  /** Only list the articleReplies created by the currently logged in user */
  readonly selfOnly?: InputMaybe<Scalars['Boolean']>;
  readonly statuses?: InputMaybe<ReadonlyArray<ArticleReplyStatusEnum>>;
  /** Show only articleReplies created by the specific user. */
  readonly userId?: InputMaybe<Scalars['String']>;
};

export enum ArticleReplyStatusEnum {
  /** Created by a blocked user violating terms of use. */
  Blocked = 'BLOCKED',
  Deleted = 'DELETED',
  Normal = 'NORMAL'
}

export enum ArticleStatusEnum {
  /** Created by a blocked user violating terms of use. */
  Blocked = 'BLOCKED',
  Normal = 'NORMAL'
}

export enum ArticleTypeEnum {
  Audio = 'AUDIO',
  Image = 'IMAGE',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export enum AttachmentVariantEnum {
  /** The original file. Only available to logged-in users. */
  Original = 'ORIGINAL',
  /** Downsized file. Fixed-width webp for images; other type TBD. */
  Preview = 'PREVIEW',
  /** Tiny, static image representing the attachment. Fixed-height jpeg for images; other types TBD. */
  Thumbnail = 'THUMBNAIL'
}

export enum AvatarTypeEnum {
  Facebook = 'Facebook',
  Github = 'Github',
  Gravatar = 'Gravatar',
  OpenPeeps = 'OpenPeeps'
}

/** Category label for specific topic */
export type Category = Node & {
  readonly __typename?: 'Category';
  readonly articleCategories?: Maybe<ArticleCategoryConnection>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly title?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
};


/** Category label for specific topic */
export type CategoryArticleCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<CategoryArticleCategoriesOrderBy>>>;
  status?: InputMaybe<ArticleCategoryStatusEnum>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type CategoryArticleCategoriesOrderBy = {
  readonly createdAt?: InputMaybe<SortOrderEnum>;
};

/** Connection model for a list of nodes. Modeled after Relay's GraphQL Server Specification. */
export type Connection = {
  readonly edges: ReadonlyArray<Edge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

export type Contribution = {
  readonly __typename?: 'Contribution';
  readonly count?: Maybe<Scalars['Int']>;
  readonly date?: Maybe<Scalars['String']>;
};

/** Edge in Connection. Modeled after GraphQL connection model. */
export type Edge = {
  readonly cursor: Scalars['String'];
  readonly node: Node;
};

export enum FeedbackVote {
  Downvote = 'DOWNVOTE',
  Neutral = 'NEUTRAL',
  Upvote = 'UPVOTE'
}

export type Highlights = {
  readonly __typename?: 'Highlights';
  /** Article or Reply hyperlinks */
  readonly hyperlinks?: Maybe<ReadonlyArray<Maybe<Hyperlink>>>;
  /** Reply reference */
  readonly reference?: Maybe<Scalars['String']>;
  /** Article or Reply text */
  readonly text?: Maybe<Scalars['String']>;
};

/** Data behind a hyperlink */
export type Hyperlink = {
  readonly __typename?: 'Hyperlink';
  readonly error?: Maybe<Scalars['String']>;
  readonly fetchedAt?: Maybe<Scalars['String']>;
  /** URL normalized by scrapUrl */
  readonly normalizedUrl?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly summary?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly topImageUrl?: Maybe<Scalars['String']>;
  /** URL in text */
  readonly url?: Maybe<Scalars['String']>;
};

export type ListAnalyticsFilter = {
  /** List only the activities between the specific time range. */
  readonly date?: InputMaybe<TimeRangeInput>;
  readonly docAppId?: InputMaybe<Scalars['ID']>;
  readonly docId?: InputMaybe<Scalars['ID']>;
  readonly docUserId?: InputMaybe<Scalars['ID']>;
  readonly type?: InputMaybe<AnalyticsDocTypeEnum>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListAnalyticsOrderBy = {
  readonly date?: InputMaybe<SortOrderEnum>;
};

export type ListArticleFilter = {
  /** Show only articles created by a specific app. */
  readonly appId?: InputMaybe<Scalars['String']>;
  /** Show only articles with(out) article replies created by specified user */
  readonly articleRepliesFrom?: InputMaybe<UserAndExistInput>;
  /** Show articles with article replies matching this criteria */
  readonly articleReply?: InputMaybe<ArticleReplyFilterInput>;
  /** List the articles with certain types */
  readonly articleTypes?: InputMaybe<ReadonlyArray<InputMaybe<ArticleTypeEnum>>>;
  /** List only the articles whose number of categories match the criteria. */
  readonly categoryCount?: InputMaybe<RangeInput>;
  /** List only articles that match any of the specified categories.ArticleCategories that are deleted or has more negative feedbacks than positive ones are not taken into account. */
  readonly categoryIds?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** List only the articles that were created between the specific time range. */
  readonly createdAt?: InputMaybe<TimeRangeInput>;
  /** Specify an articleId here to show only articles from the sender of that specified article. */
  readonly fromUserOfArticleId?: InputMaybe<Scalars['String']>;
  /**
   *
   *             When true, return only articles with any article replies that has more positive feedback than negative.
   *             When false, return articles with none of its article replies that has more positive feedback, including those with no replies yet.
   *             In both scenario, deleted article replies are not taken into account.
   *
   */
  readonly hasArticleReplyWithMorePositiveFeedback?: InputMaybe<Scalars['Boolean']>;
  /** If given, only list out articles with specific IDs */
  readonly ids?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  /** Show the media article similar to the input url */
  readonly mediaUrl?: InputMaybe<Scalars['String']>;
  /** List all articles related to a given string. */
  readonly moreLikeThis?: InputMaybe<MoreLikeThisInput>;
  /** [Deprecated] use articleReply filter instead. List only the articles that were replied between the specific time range. */
  readonly repliedAt?: InputMaybe<TimeRangeInput>;
  /** List only the articles whose number of replies matches the criteria. */
  readonly replyCount?: InputMaybe<RangeInput>;
  /** List only the articles whose number of replies matches the criteria. */
  readonly replyRequestCount?: InputMaybe<RangeInput>;
  /** [Deprecated] use articleReply filter instead. List the articles with replies of certain types */
  readonly replyTypes?: InputMaybe<ReadonlyArray<InputMaybe<ReplyTypeEnum>>>;
  /** Only list the articles created by the currently logged in user */
  readonly selfOnly?: InputMaybe<Scalars['Boolean']>;
  /** Returns only articles with the specified statuses */
  readonly statuses?: InputMaybe<ReadonlyArray<ArticleStatusEnum>>;
  /** Show only articles created by the specific user. */
  readonly userId?: InputMaybe<Scalars['String']>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListArticleOrderBy = {
  readonly _score?: InputMaybe<SortOrderEnum>;
  readonly createdAt?: InputMaybe<SortOrderEnum>;
  readonly lastMatchingArticleReplyCreatedAt?: InputMaybe<SortOrderEnum>;
  readonly lastRepliedAt?: InputMaybe<SortOrderEnum>;
  readonly lastRequestedAt?: InputMaybe<SortOrderEnum>;
  readonly replyCount?: InputMaybe<SortOrderEnum>;
  readonly replyRequestCount?: InputMaybe<SortOrderEnum>;
  readonly updatedAt?: InputMaybe<SortOrderEnum>;
};

export type ListArticleReplyFeedbackConnection = Connection & {
  readonly __typename?: 'ListArticleReplyFeedbackConnection';
  readonly edges: ReadonlyArray<ListArticleReplyFeedbackConnectionEdge>;
  readonly pageInfo: ListArticleReplyFeedbackConnectionPageInfo;
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
};

export type ListArticleReplyFeedbackConnectionEdge = Edge & {
  readonly __typename?: 'ListArticleReplyFeedbackConnectionEdge';
  readonly cursor: Scalars['String'];
  readonly highlight?: Maybe<Highlights>;
  readonly node: ArticleReplyFeedback;
  readonly score?: Maybe<Scalars['Float']>;
};

export type ListArticleReplyFeedbackConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ListArticleReplyFeedbackConnectionPageInfo';
  readonly firstCursor?: Maybe<Scalars['String']>;
  readonly lastCursor?: Maybe<Scalars['String']>;
};

export type ListArticleReplyFeedbackFilter = {
  /** Show only article reply feedbacks created by a specific app. */
  readonly appId?: InputMaybe<Scalars['String']>;
  readonly articleId?: InputMaybe<Scalars['String']>;
  /** List only the feedbacks to the article-replies created by this user ID */
  readonly articleReplyUserId?: InputMaybe<Scalars['String']>;
  /** List only the feedbacks whose `replyUserId` *or* `articleReplyUserId` is this user ID */
  readonly authorId?: InputMaybe<Scalars['String']>;
  /** List only the article reply feedbacks that were created between the specific time range. */
  readonly createdAt?: InputMaybe<TimeRangeInput>;
  /** If given, only list out article reply feedbacks with specific IDs */
  readonly ids?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  /** Search for comment field using more_like_this query */
  readonly moreLikeThis?: InputMaybe<MoreLikeThisInput>;
  readonly replyId?: InputMaybe<Scalars['String']>;
  /** List only the feedbacks to the replies created by this user ID */
  readonly replyUserId?: InputMaybe<Scalars['String']>;
  /** Only list the article reply feedbacks created by the currently logged in user */
  readonly selfOnly?: InputMaybe<Scalars['Boolean']>;
  /** List only the article reply feedbacks with the selected statuses */
  readonly statuses?: InputMaybe<ReadonlyArray<ArticleReplyFeedbackStatusEnum>>;
  /** List only the article reply feedbacks that were last updated within the specific time range. */
  readonly updatedAt?: InputMaybe<TimeRangeInput>;
  /** Show only article reply feedbacks created by the specific user. */
  readonly userId?: InputMaybe<Scalars['String']>;
  /** When specified, list only article reply feedbacks with specified vote */
  readonly vote?: InputMaybe<ReadonlyArray<InputMaybe<FeedbackVote>>>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListArticleReplyFeedbackOrderBy = {
  /** Full text relevance for comment field queries */
  readonly _score?: InputMaybe<SortOrderEnum>;
  readonly createdAt?: InputMaybe<SortOrderEnum>;
  readonly updatedAt?: InputMaybe<SortOrderEnum>;
  readonly vote?: InputMaybe<SortOrderEnum>;
};

export type ListBlockedUsersFilter = {
  /** List only the blocked users that were registered between the specific time range. */
  readonly createdAt?: InputMaybe<TimeRangeInput>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListBlockedUsersOrderBy = {
  readonly createdAt?: InputMaybe<SortOrderEnum>;
};

export type ListCategoryConnection = Connection & {
  readonly __typename?: 'ListCategoryConnection';
  readonly edges: ReadonlyArray<ListCategoryConnectionEdge>;
  readonly pageInfo: ListCategoryConnectionPageInfo;
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
};

export type ListCategoryConnectionEdge = Edge & {
  readonly __typename?: 'ListCategoryConnectionEdge';
  readonly cursor: Scalars['String'];
  readonly highlight?: Maybe<Highlights>;
  readonly node: Category;
  readonly score?: Maybe<Scalars['Float']>;
};

export type ListCategoryConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ListCategoryConnectionPageInfo';
  readonly firstCursor?: Maybe<Scalars['String']>;
  readonly lastCursor?: Maybe<Scalars['String']>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListCategoryOrderBy = {
  readonly createdAt?: InputMaybe<SortOrderEnum>;
};

export type ListReplyFilter = {
  /** Show only replies created by a specific app. */
  readonly appId?: InputMaybe<Scalars['String']>;
  /** List only the replies that were created between the specific time range. */
  readonly createdAt?: InputMaybe<TimeRangeInput>;
  /** If given, only list out replies with specific IDs */
  readonly ids?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly moreLikeThis?: InputMaybe<MoreLikeThisInput>;
  /** Only list the replies created by the currently logged in user */
  readonly selfOnly?: InputMaybe<Scalars['Boolean']>;
  /** [Deprecated] use types instead. */
  readonly type?: InputMaybe<ReplyTypeEnum>;
  /** List the replies of certain types */
  readonly types?: InputMaybe<ReadonlyArray<InputMaybe<ReplyTypeEnum>>>;
  /** Show only replies created by the specific user. */
  readonly userId?: InputMaybe<Scalars['String']>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListReplyOrderBy = {
  readonly _score?: InputMaybe<SortOrderEnum>;
  readonly createdAt?: InputMaybe<SortOrderEnum>;
};

export type ListReplyRequestConnection = Connection & {
  readonly __typename?: 'ListReplyRequestConnection';
  readonly edges: ReadonlyArray<ListReplyRequestConnectionEdge>;
  readonly pageInfo: ListReplyRequestConnectionPageInfo;
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
};

export type ListReplyRequestConnectionEdge = Edge & {
  readonly __typename?: 'ListReplyRequestConnectionEdge';
  readonly cursor: Scalars['String'];
  readonly highlight?: Maybe<Highlights>;
  readonly node: ReplyRequest;
  readonly score?: Maybe<Scalars['Float']>;
};

export type ListReplyRequestConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ListReplyRequestConnectionPageInfo';
  readonly firstCursor?: Maybe<Scalars['String']>;
  readonly lastCursor?: Maybe<Scalars['String']>;
};

export type ListReplyRequestFilter = {
  /** Show only reply requests created by a specific app. */
  readonly appId?: InputMaybe<Scalars['String']>;
  readonly articleId?: InputMaybe<Scalars['String']>;
  /** List only the reply requests that were created between the specific time range. */
  readonly createdAt?: InputMaybe<TimeRangeInput>;
  /** If given, only list out reply requests with specific IDs */
  readonly ids?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  /** Only list the reply requests created by the currently logged in user */
  readonly selfOnly?: InputMaybe<Scalars['Boolean']>;
  /** List only reply requests with specified statuses */
  readonly statuses?: InputMaybe<ReadonlyArray<ReplyRequestStatusEnum>>;
  /** Show only reply requests created by the specific user. */
  readonly userId?: InputMaybe<Scalars['String']>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListReplyRequestOrderBy = {
  readonly createdAt?: InputMaybe<SortOrderEnum>;
  readonly vote?: InputMaybe<SortOrderEnum>;
};

/**
 * Parameters for Elasticsearch more_like_this query.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-mlt-query.html
 */
export type MoreLikeThisInput = {
  /** The text string to search for. */
  readonly like?: InputMaybe<Scalars['String']>;
  /**
   * more_like_this query's "minimum_should_match" query param.
   * See https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html for possible values.
   */
  readonly minimumShouldMatch?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  /** Create an article and/or a replyRequest */
  readonly CreateArticle?: Maybe<MutationResult>;
  /** Adds specified category to specified article. */
  readonly CreateArticleCategory?: Maybe<ReadonlyArray<Maybe<ArticleCategory>>>;
  /** Connects specified reply and specified article. */
  readonly CreateArticleReply?: Maybe<ReadonlyArray<Maybe<ArticleReply>>>;
  /** Create a category */
  readonly CreateCategory?: Maybe<MutationResult>;
  /** Create a media article and/or a replyRequest */
  readonly CreateMediaArticle?: Maybe<MutationResult>;
  /** Create or update a feedback on an article-category connection */
  readonly CreateOrUpdateArticleCategoryFeedback?: Maybe<ArticleCategory>;
  /** Create or update a feedback on an article-reply connection */
  readonly CreateOrUpdateArticleReplyFeedback?: Maybe<ArticleReply>;
  /** Create or update a reply request for the given article */
  readonly CreateOrUpdateReplyRequest?: Maybe<Article>;
  /** Create or update a feedback on a reply request reason */
  readonly CreateOrUpdateReplyRequestFeedback?: Maybe<ReplyRequest>;
  /** Create a reply that replies to the specified article. */
  readonly CreateReply?: Maybe<MutationResult>;
  /**
   * Create or update a reply request for the given article
   * @deprecated Use CreateOrUpdateReplyRequest instead
   */
  readonly CreateReplyRequest?: Maybe<Article>;
  /** Change status of specified articleCategory */
  readonly UpdateArticleCategoryStatus?: Maybe<ReadonlyArray<Maybe<ArticleCategory>>>;
  /** Change status of specified articleReplies */
  readonly UpdateArticleReplyStatus?: Maybe<ReadonlyArray<Maybe<ArticleReply>>>;
  /** Change attribute of a user */
  readonly UpdateUser?: Maybe<User>;
};


export type MutationCreateArticleArgs = {
  reason?: InputMaybe<Scalars['String']>;
  reference: ArticleReferenceInput;
  text: Scalars['String'];
};


export type MutationCreateArticleCategoryArgs = {
  aiConfidence?: InputMaybe<Scalars['Float']>;
  aiModel?: InputMaybe<Scalars['String']>;
  articleId: Scalars['String'];
  categoryId: Scalars['String'];
};


export type MutationCreateArticleReplyArgs = {
  articleId: Scalars['String'];
  replyId: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  description: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateMediaArticleArgs = {
  articleType: ArticleTypeEnum;
  mediaUrl: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
  reference: ArticleReferenceInput;
};


export type MutationCreateOrUpdateArticleCategoryFeedbackArgs = {
  articleId: Scalars['String'];
  categoryId: Scalars['String'];
  comment?: InputMaybe<Scalars['String']>;
  vote: FeedbackVote;
};


export type MutationCreateOrUpdateArticleReplyFeedbackArgs = {
  articleId: Scalars['String'];
  comment?: InputMaybe<Scalars['String']>;
  replyId: Scalars['String'];
  vote: FeedbackVote;
};


export type MutationCreateOrUpdateReplyRequestArgs = {
  articleId: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationCreateOrUpdateReplyRequestFeedbackArgs = {
  replyRequestId: Scalars['String'];
  vote: FeedbackVote;
};


export type MutationCreateReplyArgs = {
  articleId: Scalars['String'];
  reference?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  type: ReplyTypeEnum;
  waitForHyperlinks?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateReplyRequestArgs = {
  articleId: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateArticleCategoryStatusArgs = {
  articleId: Scalars['String'];
  categoryId: Scalars['String'];
  status: ArticleCategoryStatusEnum;
};


export type MutationUpdateArticleReplyStatusArgs = {
  articleId: Scalars['String'];
  replyId: Scalars['String'];
  status: ArticleReplyStatusEnum;
};


export type MutationUpdateUserArgs = {
  avatarData?: InputMaybe<Scalars['String']>;
  avatarType?: InputMaybe<AvatarTypeEnum>;
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type MutationResult = {
  readonly __typename?: 'MutationResult';
  readonly id?: Maybe<Scalars['String']>;
};

/** Basic entity. Modeled after Relay's GraphQL Server Specification. */
export type Node = {
  readonly id: Scalars['ID'];
};

/** PageInfo in Connection. Modeled after GraphQL connection model. */
export type PageInfo = {
  /** The cursor pointing to the first node of the entire collection, regardless of "before" and "after". Can be used to determine if is in the last page. Null when the collection is empty. */
  readonly firstCursor?: Maybe<Scalars['String']>;
  /** The cursor pointing to the last node of the entire collection, regardless of "before" and "after". Can be used to determine if is in the last page. Null when the collection is empty. */
  readonly lastCursor?: Maybe<Scalars['String']>;
};

/** Information of a user's point. Only available for current user. */
export type PointInfo = {
  readonly __typename?: 'PointInfo';
  /** Points required for current level */
  readonly currentLevel: Scalars['Int'];
  /** Points required for next level. null when there is no next level. */
  readonly nextLevel: Scalars['Int'];
  /** Points earned by the current user */
  readonly total: Scalars['Int'];
};

export type Query = {
  readonly __typename?: 'Query';
  readonly GetArticle?: Maybe<Article>;
  readonly GetCategory?: Maybe<Category>;
  readonly GetReply?: Maybe<Reply>;
  /**
   *
   *     Gets specified user. If id is not given, returns the currently logged-in user.
   *     Note that some fields like email is not visible to other users.
   *
   */
  readonly GetUser?: Maybe<User>;
  readonly ListAnalytics: AnalyticsConnection;
  readonly ListArticleReplyFeedbacks?: Maybe<ListArticleReplyFeedbackConnection>;
  readonly ListArticles?: Maybe<ArticleConnection>;
  readonly ListBlockedUsers: UserConnection;
  readonly ListCategories?: Maybe<ListCategoryConnection>;
  readonly ListReplies?: Maybe<ReplyConnection>;
  readonly ListReplyRequests?: Maybe<ListReplyRequestConnection>;
  readonly ValidateSlug?: Maybe<ValidationResult>;
};


export type QueryGetArticleArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetCategoryArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetReplyArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryListAnalyticsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ListAnalyticsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<ListAnalyticsOrderBy>>>;
};


export type QueryListArticleReplyFeedbacksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ListArticleReplyFeedbackFilter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<ListArticleReplyFeedbackOrderBy>>>;
};


export type QueryListArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ListArticleFilter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<ListArticleOrderBy>>>;
};


export type QueryListBlockedUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ListBlockedUsersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<ListBlockedUsersOrderBy>>>;
};


export type QueryListCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<ListCategoryOrderBy>>>;
};


export type QueryListRepliesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ListReplyFilter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<ListReplyOrderBy>>>;
};


export type QueryListReplyRequestsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ListReplyRequestFilter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<ListReplyRequestOrderBy>>>;
};


export type QueryValidateSlugArgs = {
  slug: Scalars['String'];
};

/** List only the entries whose field match the criteria. */
export type RangeInput = {
  readonly EQ?: InputMaybe<Scalars['Int']>;
  readonly GT?: InputMaybe<Scalars['Int']>;
  readonly GTE?: InputMaybe<Scalars['Int']>;
  readonly LT?: InputMaybe<Scalars['Int']>;
  readonly LTE?: InputMaybe<Scalars['Int']>;
};

export type RelatedArticleFilter = {
  readonly replyCount?: InputMaybe<RangeInput>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type RelatedArticleOrderBy = {
  readonly _score?: InputMaybe<SortOrderEnum>;
  readonly updatedAt?: InputMaybe<SortOrderEnum>;
};

export type Reply = Node & {
  readonly __typename?: 'Reply';
  readonly articleReplies?: Maybe<ReadonlyArray<Maybe<ArticleReply>>>;
  readonly createdAt?: Maybe<Scalars['String']>;
  /** Hyperlinks in reply text or reference. May be empty array if no URLs are included. `null` when hyperlinks are still fetching. */
  readonly hyperlinks?: Maybe<ReadonlyArray<Maybe<Hyperlink>>>;
  readonly id: Scalars['ID'];
  readonly reference?: Maybe<Scalars['String']>;
  /** Replies that has similar text or references of this current reply */
  readonly similarReplies?: Maybe<ReplyConnection>;
  readonly text?: Maybe<Scalars['String']>;
  readonly type?: Maybe<ReplyTypeEnum>;
  /** The user submitted this reply version */
  readonly user?: Maybe<User>;
};


export type ReplyArticleRepliesArgs = {
  status?: InputMaybe<ArticleReplyStatusEnum>;
  statuses?: InputMaybe<ReadonlyArray<ArticleReplyStatusEnum>>;
};


export type ReplySimilarRepliesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReadonlyArray<InputMaybe<SimilarReplyOrderBy>>>;
};

export type ReplyConnection = Connection & {
  readonly __typename?: 'ReplyConnection';
  readonly edges: ReadonlyArray<ReplyConnectionEdge>;
  readonly pageInfo: ReplyConnectionPageInfo;
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
};

export type ReplyConnectionEdge = Edge & {
  readonly __typename?: 'ReplyConnectionEdge';
  readonly cursor: Scalars['String'];
  readonly highlight?: Maybe<Highlights>;
  readonly node: Reply;
  readonly score?: Maybe<Scalars['Float']>;
};

export type ReplyConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ReplyConnectionPageInfo';
  readonly firstCursor?: Maybe<Scalars['String']>;
  readonly lastCursor?: Maybe<Scalars['String']>;
};

export type ReplyRequest = Node & {
  readonly __typename?: 'ReplyRequest';
  readonly appId?: Maybe<Scalars['String']>;
  readonly article: Article;
  readonly articleId: Scalars['ID'];
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly feedbackCount?: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  readonly negativeFeedbackCount?: Maybe<Scalars['Int']>;
  /** The feedback of current user. null when not logged in or not voted yet. */
  readonly ownVote?: Maybe<FeedbackVote>;
  readonly positiveFeedbackCount?: Maybe<Scalars['Int']>;
  readonly reason?: Maybe<Scalars['String']>;
  readonly status: ReplyRequestStatusEnum;
  readonly updatedAt?: Maybe<Scalars['String']>;
  /** The author of reply request. */
  readonly user?: Maybe<User>;
  readonly userId?: Maybe<Scalars['String']>;
};

export enum ReplyRequestStatusEnum {
  /** Created by a blocked user violating terms of use. */
  Blocked = 'BLOCKED',
  Normal = 'NORMAL'
}

/** Reflects how the replier categories the replied article. */
export enum ReplyTypeEnum {
  /** The replier thinks that the article is actually not a complete article on the internet or passed around in messengers. */
  NotArticle = 'NOT_ARTICLE',
  /** The replier thinks that the articles contains no false information. */
  NotRumor = 'NOT_RUMOR',
  /** The replier thinks that the article contains personal viewpoint and is not objective. */
  Opinionated = 'OPINIONATED',
  /** The replier thinks that the article contains false information. */
  Rumor = 'RUMOR'
}

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type SimilarReplyOrderBy = {
  readonly _score?: InputMaybe<SortOrderEnum>;
  readonly createdAt?: InputMaybe<SortOrderEnum>;
};

/** Slug of canot */
export enum SlugErrorEnum {
  /** Slug is empty */
  Empty = 'EMPTY',
  /** Slug has URI component inside, which can be misleading to browsers */
  HasUriComponent = 'HAS_URI_COMPONENT',
  /** Slug have leading or trailing spaces or line ends */
  NotTrimmed = 'NOT_TRIMMED',
  /** Slug has already been taken by someone else */
  Taken = 'TAKEN'
}

export enum SortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** List only the entries that were created between the specific time range. The time range value is in elasticsearch date format (https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html) */
export type TimeRangeInput = {
  readonly EQ?: InputMaybe<Scalars['String']>;
  readonly GT?: InputMaybe<Scalars['String']>;
  readonly GTE?: InputMaybe<Scalars['String']>;
  readonly LT?: InputMaybe<Scalars['String']>;
  readonly LTE?: InputMaybe<Scalars['String']>;
};

export type User = Node & {
  readonly __typename?: 'User';
  readonly appId?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly appUserId?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly availableAvatarTypes?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  /** return avatar data as JSON string, currently only used when avatarType is OpenPeeps */
  readonly avatarData?: Maybe<Scalars['String']>;
  readonly avatarType?: Maybe<AvatarTypeEnum>;
  /** returns avatar url from facebook, github or gravatar */
  readonly avatarUrl?: Maybe<Scalars['String']>;
  readonly bio?: Maybe<Scalars['String']>;
  /** If not null, the user is blocked with the announcement in this string. */
  readonly blockedReason?: Maybe<Scalars['String']>;
  /** List of contributions made by the user */
  readonly contributions?: Maybe<ReadonlyArray<Maybe<Contribution>>>;
  readonly createdAt?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly email?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly facebookId?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly githubId?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly lastActiveAt?: Maybe<Scalars['String']>;
  readonly level: Scalars['Int'];
  readonly name?: Maybe<Scalars['String']>;
  readonly points: PointInfo;
  /** Number of articles this user has replied to */
  readonly repliedArticleCount: Scalars['Int'];
  readonly slug?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly twitterId?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  /** Number of article replies this user has given feedbacks */
  readonly votedArticleReplyCount: Scalars['Int'];
};


export type UserContributionsArgs = {
  dateRange?: InputMaybe<TimeRangeInput>;
};

export type UserAndExistInput = {
  /**
   *
   *                   When true (or not specified), return only entries with the specified user's involvement.
   *                   When false, return only entries that the specified user did not involve.
   *
   */
  readonly exists?: InputMaybe<Scalars['Boolean']>;
  readonly userId: Scalars['String'];
};

export type UserConnection = Connection & {
  readonly __typename?: 'UserConnection';
  readonly edges: ReadonlyArray<UserConnectionEdge>;
  readonly pageInfo: UserConnectionPageInfo;
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
};

export type UserConnectionEdge = Edge & {
  readonly __typename?: 'UserConnectionEdge';
  readonly cursor: Scalars['String'];
  readonly highlight?: Maybe<Highlights>;
  readonly node: User;
  readonly score?: Maybe<Scalars['Float']>;
};

export type UserConnectionPageInfo = PageInfo & {
  readonly __typename?: 'UserConnectionPageInfo';
  readonly firstCursor?: Maybe<Scalars['String']>;
  readonly lastCursor?: Maybe<Scalars['String']>;
};

export type ValidationResult = {
  readonly __typename?: 'ValidationResult';
  readonly error?: Maybe<SlugErrorEnum>;
  readonly success: Scalars['Boolean'];
};

export type LoadApiStatsQueryVariables = Exact<{
  isRepliedOnly: Scalars['Boolean'];
  allArticleFilter?: InputMaybe<ListArticleFilter>;
  allRepliedArticlesFilter: ListArticleFilter;
  articlesHasUsefulRepliesFilter: ListArticleFilter;
}>;


export type LoadApiStatsQuery = { readonly __typename?: 'Query', readonly allArticles?: { readonly __typename?: 'ArticleConnection', readonly totalCount: number } | null, readonly allRepliedArticles?: { readonly __typename?: 'ArticleConnection', readonly totalCount: number } | null, readonly articlesHasUsefulReplies?: { readonly __typename?: 'ArticleConnection', readonly totalCount: number } | null };

export type ListAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllCategoriesQuery = { readonly __typename?: 'Query', readonly ListCategories?: { readonly __typename?: 'ListCategoryConnection', readonly edges: ReadonlyArray<{ readonly __typename?: 'ListCategoryConnectionEdge', readonly node: { readonly __typename?: 'Category', readonly id: string, readonly title?: string | null } }> } | null };

export type BigNumOfRepliedQueryVariables = Exact<{
  startTime?: InputMaybe<Scalars['String']>;
}>;


export type BigNumOfRepliedQuery = { readonly __typename?: 'Query', readonly query?: { readonly __typename?: 'ArticleConnection', readonly totalCount: number } | null };

export type BigNumOfFeedbacksQueryVariables = Exact<{
  startTime?: InputMaybe<Scalars['String']>;
}>;


export type BigNumOfFeedbacksQuery = { readonly __typename?: 'Query', readonly query?: { readonly __typename?: 'ListArticleReplyFeedbackConnection', readonly totalCount: number } | null };

export type BigNumOfCommentsQueryVariables = Exact<{
  startTime?: InputMaybe<Scalars['String']>;
}>;


export type BigNumOfCommentsQuery = { readonly __typename?: 'Query', readonly query?: { readonly __typename?: 'ListReplyRequestConnection', readonly totalCount: number } | null };

export type FeedbackListStatInFeedbackTableQueryVariables = Exact<{
  createdAt?: InputMaybe<TimeRangeInput>;
  userId?: InputMaybe<Scalars['String']>;
  articleReplyUserId?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<ReadonlyArray<ArticleReplyFeedbackStatusEnum> | ArticleReplyFeedbackStatusEnum>;
}>;


export type FeedbackListStatInFeedbackTableQuery = { readonly __typename?: 'Query', readonly ListArticleReplyFeedbacks?: { readonly __typename?: 'ListArticleReplyFeedbackConnection', readonly totalCount: number, readonly pageInfo: { readonly __typename?: 'ListArticleReplyFeedbackConnectionPageInfo', readonly firstCursor?: string | null, readonly lastCursor?: string | null } } | null };

export type FeedbackListInFeedbackTableQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<TimeRangeInput>;
  userId?: InputMaybe<Scalars['String']>;
  articleReplyUserId?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<ReadonlyArray<ArticleReplyFeedbackStatusEnum> | ArticleReplyFeedbackStatusEnum>;
}>;


export type FeedbackListInFeedbackTableQuery = { readonly __typename?: 'Query', readonly ListArticleReplyFeedbacks?: { readonly __typename?: 'ListArticleReplyFeedbackConnection', readonly edges: ReadonlyArray<{ readonly __typename?: 'ListArticleReplyFeedbackConnectionEdge', readonly cursor: string, readonly node: { readonly __typename?: 'ArticleReplyFeedback', readonly id: string, readonly comment?: string | null, readonly vote?: FeedbackVote | null, readonly createdAt?: string | null, readonly article?: { readonly __typename?: 'Article', readonly id: string, readonly text?: string | null, readonly articleType: ArticleTypeEnum, readonly attachmentUrl?: string | null, readonly articleCategories?: ReadonlyArray<{ readonly __typename?: 'ArticleCategory', readonly positiveFeedbackCount?: number | null, readonly negativeFeedbackCount?: number | null, readonly category?: { readonly __typename?: 'Category', readonly title?: string | null } | null } | null> | null } | null, readonly reply?: { readonly __typename?: 'Reply', readonly id: string, readonly text?: string | null } | null, readonly user?: { readonly __typename?: 'User', readonly id: string, readonly name?: string | null } | null } }> } | null };

export type ReplyRequestListStatInReplyRequestTableQueryVariables = Exact<{
  createdAt?: InputMaybe<TimeRangeInput>;
  userId?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<ReadonlyArray<ReplyRequestStatusEnum> | ReplyRequestStatusEnum>;
}>;


export type ReplyRequestListStatInReplyRequestTableQuery = { readonly __typename?: 'Query', readonly ListReplyRequests?: { readonly __typename?: 'ListReplyRequestConnection', readonly totalCount: number, readonly pageInfo: { readonly __typename?: 'ListReplyRequestConnectionPageInfo', readonly firstCursor?: string | null, readonly lastCursor?: string | null } } | null };

export type ReplyRequestListInReplyRequestTableQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<TimeRangeInput>;
  userId?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<ReadonlyArray<ReplyRequestStatusEnum> | ReplyRequestStatusEnum>;
}>;


export type ReplyRequestListInReplyRequestTableQuery = { readonly __typename?: 'Query', readonly ListReplyRequests?: { readonly __typename?: 'ListReplyRequestConnection', readonly edges: ReadonlyArray<{ readonly __typename?: 'ListReplyRequestConnectionEdge', readonly cursor: string, readonly node: { readonly __typename?: 'ReplyRequest', readonly id: string, readonly reason?: string | null, readonly updatedAt?: string | null, readonly user?: { readonly __typename?: 'User', readonly id: string, readonly name?: string | null } | null, readonly article: { readonly __typename?: 'Article', readonly id: string, readonly text?: string | null, readonly articleType: ArticleTypeEnum, readonly attachmentUrl?: string | null } } }> } | null };

export type ReplyListStatInReplyTableQueryVariables = Exact<{
  createdAt?: InputMaybe<TimeRangeInput>;
  userId?: InputMaybe<Scalars['String']>;
}>;


export type ReplyListStatInReplyTableQuery = { readonly __typename?: 'Query', readonly ListReplies?: { readonly __typename?: 'ReplyConnection', readonly totalCount: number, readonly pageInfo: { readonly __typename?: 'ReplyConnectionPageInfo', readonly firstCursor?: string | null, readonly lastCursor?: string | null } } | null };

export type ReplyListInReplyTableQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<TimeRangeInput>;
  userId?: InputMaybe<Scalars['String']>;
}>;


export type ReplyListInReplyTableQuery = { readonly __typename?: 'Query', readonly ListReplies?: { readonly __typename?: 'ReplyConnection', readonly edges: ReadonlyArray<{ readonly __typename?: 'ReplyConnectionEdge', readonly cursor: string, readonly node: { readonly __typename?: 'Reply', readonly id: string, readonly text?: string | null, readonly createdAt?: string | null, readonly user?: { readonly __typename?: 'User', readonly id: string, readonly name?: string | null } | null } }> } | null };


export const LoadApiStatsDocument = gql`
    query LoadAPIStats($isRepliedOnly: Boolean!, $allArticleFilter: ListArticleFilter, $allRepliedArticlesFilter: ListArticleFilter!, $articlesHasUsefulRepliesFilter: ListArticleFilter!) {
  allArticles: ListArticles(filter: $allArticleFilter) @skip(if: $isRepliedOnly) {
    totalCount
  }
  allRepliedArticles: ListArticles(filter: $allRepliedArticlesFilter) {
    totalCount
  }
  articlesHasUsefulReplies: ListArticles(filter: $articlesHasUsefulRepliesFilter) {
    totalCount
  }
}
    `;

/**
 * __useLoadApiStatsQuery__
 *
 * To run a query within a React component, call `useLoadApiStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadApiStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadApiStatsQuery({
 *   variables: {
 *      isRepliedOnly: // value for 'isRepliedOnly'
 *      allArticleFilter: // value for 'allArticleFilter'
 *      allRepliedArticlesFilter: // value for 'allRepliedArticlesFilter'
 *      articlesHasUsefulRepliesFilter: // value for 'articlesHasUsefulRepliesFilter'
 *   },
 * });
 */
export function useLoadApiStatsQuery(baseOptions: Apollo.QueryHookOptions<LoadApiStatsQuery, LoadApiStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadApiStatsQuery, LoadApiStatsQueryVariables>(LoadApiStatsDocument, options);
      }
export function useLoadApiStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadApiStatsQuery, LoadApiStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadApiStatsQuery, LoadApiStatsQueryVariables>(LoadApiStatsDocument, options);
        }
export type LoadApiStatsQueryHookResult = ReturnType<typeof useLoadApiStatsQuery>;
export type LoadApiStatsLazyQueryHookResult = ReturnType<typeof useLoadApiStatsLazyQuery>;
export type LoadApiStatsQueryResult = Apollo.QueryResult<LoadApiStatsQuery, LoadApiStatsQueryVariables>;
export const ListAllCategoriesDocument = gql`
    query ListAllCategories {
  ListCategories(first: 50) {
    edges {
      node {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useListAllCategoriesQuery__
 *
 * To run a query within a React component, call `useListAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<ListAllCategoriesQuery, ListAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListAllCategoriesQuery, ListAllCategoriesQueryVariables>(ListAllCategoriesDocument, options);
      }
export function useListAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListAllCategoriesQuery, ListAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListAllCategoriesQuery, ListAllCategoriesQueryVariables>(ListAllCategoriesDocument, options);
        }
export type ListAllCategoriesQueryHookResult = ReturnType<typeof useListAllCategoriesQuery>;
export type ListAllCategoriesLazyQueryHookResult = ReturnType<typeof useListAllCategoriesLazyQuery>;
export type ListAllCategoriesQueryResult = Apollo.QueryResult<ListAllCategoriesQuery, ListAllCategoriesQueryVariables>;
export const BigNumOfRepliedDocument = gql`
    query BigNumOfReplied($startTime: String) {
  query: ListArticles(filter: {repliedAt: {GTE: $startTime}}) {
    totalCount
  }
}
    `;

/**
 * __useBigNumOfRepliedQuery__
 *
 * To run a query within a React component, call `useBigNumOfRepliedQuery` and pass it any options that fit your needs.
 * When your component renders, `useBigNumOfRepliedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBigNumOfRepliedQuery({
 *   variables: {
 *      startTime: // value for 'startTime'
 *   },
 * });
 */
export function useBigNumOfRepliedQuery(baseOptions?: Apollo.QueryHookOptions<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>(BigNumOfRepliedDocument, options);
      }
export function useBigNumOfRepliedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>(BigNumOfRepliedDocument, options);
        }
export type BigNumOfRepliedQueryHookResult = ReturnType<typeof useBigNumOfRepliedQuery>;
export type BigNumOfRepliedLazyQueryHookResult = ReturnType<typeof useBigNumOfRepliedLazyQuery>;
export type BigNumOfRepliedQueryResult = Apollo.QueryResult<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>;
export const BigNumOfFeedbacksDocument = gql`
    query BigNumOfFeedbacks($startTime: String) {
  query: ListArticleReplyFeedbacks(
    filter: {createdAt: {GTE: $startTime}, appId: "WEBSITE"}
  ) {
    totalCount
  }
}
    `;

/**
 * __useBigNumOfFeedbacksQuery__
 *
 * To run a query within a React component, call `useBigNumOfFeedbacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBigNumOfFeedbacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBigNumOfFeedbacksQuery({
 *   variables: {
 *      startTime: // value for 'startTime'
 *   },
 * });
 */
export function useBigNumOfFeedbacksQuery(baseOptions?: Apollo.QueryHookOptions<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>(BigNumOfFeedbacksDocument, options);
      }
export function useBigNumOfFeedbacksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>(BigNumOfFeedbacksDocument, options);
        }
export type BigNumOfFeedbacksQueryHookResult = ReturnType<typeof useBigNumOfFeedbacksQuery>;
export type BigNumOfFeedbacksLazyQueryHookResult = ReturnType<typeof useBigNumOfFeedbacksLazyQuery>;
export type BigNumOfFeedbacksQueryResult = Apollo.QueryResult<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>;
export const BigNumOfCommentsDocument = gql`
    query BigNumOfComments($startTime: String) {
  query: ListReplyRequests(
    filter: {createdAt: {GTE: $startTime}, appId: "WEBSITE"}
  ) {
    totalCount
  }
}
    `;

/**
 * __useBigNumOfCommentsQuery__
 *
 * To run a query within a React component, call `useBigNumOfCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBigNumOfCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBigNumOfCommentsQuery({
 *   variables: {
 *      startTime: // value for 'startTime'
 *   },
 * });
 */
export function useBigNumOfCommentsQuery(baseOptions?: Apollo.QueryHookOptions<BigNumOfCommentsQuery, BigNumOfCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BigNumOfCommentsQuery, BigNumOfCommentsQueryVariables>(BigNumOfCommentsDocument, options);
      }
export function useBigNumOfCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BigNumOfCommentsQuery, BigNumOfCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BigNumOfCommentsQuery, BigNumOfCommentsQueryVariables>(BigNumOfCommentsDocument, options);
        }
export type BigNumOfCommentsQueryHookResult = ReturnType<typeof useBigNumOfCommentsQuery>;
export type BigNumOfCommentsLazyQueryHookResult = ReturnType<typeof useBigNumOfCommentsLazyQuery>;
export type BigNumOfCommentsQueryResult = Apollo.QueryResult<BigNumOfCommentsQuery, BigNumOfCommentsQueryVariables>;
export const FeedbackListStatInFeedbackTableDocument = gql`
    query FeedbackListStatInFeedbackTable($createdAt: TimeRangeInput, $userId: String, $articleReplyUserId: String, $statuses: [ArticleReplyFeedbackStatusEnum!]) {
  ListArticleReplyFeedbacks(
    filter: {createdAt: $createdAt, userId: $userId, articleReplyUserId: $articleReplyUserId, statuses: $statuses}
  ) {
    totalCount
    pageInfo {
      firstCursor
      lastCursor
    }
  }
}
    `;

/**
 * __useFeedbackListStatInFeedbackTableQuery__
 *
 * To run a query within a React component, call `useFeedbackListStatInFeedbackTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedbackListStatInFeedbackTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedbackListStatInFeedbackTableQuery({
 *   variables: {
 *      createdAt: // value for 'createdAt'
 *      userId: // value for 'userId'
 *      articleReplyUserId: // value for 'articleReplyUserId'
 *      statuses: // value for 'statuses'
 *   },
 * });
 */
export function useFeedbackListStatInFeedbackTableQuery(baseOptions?: Apollo.QueryHookOptions<FeedbackListStatInFeedbackTableQuery, FeedbackListStatInFeedbackTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedbackListStatInFeedbackTableQuery, FeedbackListStatInFeedbackTableQueryVariables>(FeedbackListStatInFeedbackTableDocument, options);
      }
export function useFeedbackListStatInFeedbackTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedbackListStatInFeedbackTableQuery, FeedbackListStatInFeedbackTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedbackListStatInFeedbackTableQuery, FeedbackListStatInFeedbackTableQueryVariables>(FeedbackListStatInFeedbackTableDocument, options);
        }
export type FeedbackListStatInFeedbackTableQueryHookResult = ReturnType<typeof useFeedbackListStatInFeedbackTableQuery>;
export type FeedbackListStatInFeedbackTableLazyQueryHookResult = ReturnType<typeof useFeedbackListStatInFeedbackTableLazyQuery>;
export type FeedbackListStatInFeedbackTableQueryResult = Apollo.QueryResult<FeedbackListStatInFeedbackTableQuery, FeedbackListStatInFeedbackTableQueryVariables>;
export const FeedbackListInFeedbackTableDocument = gql`
    query FeedbackListInFeedbackTable($after: String, $pageSize: Int, $createdAt: TimeRangeInput, $userId: String, $articleReplyUserId: String, $statuses: [ArticleReplyFeedbackStatusEnum!]) {
  ListArticleReplyFeedbacks(
    filter: {createdAt: $createdAt, userId: $userId, articleReplyUserId: $articleReplyUserId, statuses: $statuses}
    orderBy: [{createdAt: DESC}]
    after: $after
    first: $pageSize
  ) {
    edges {
      cursor
      node {
        id
        comment
        vote
        article {
          id
          text
          articleCategories(statuses: [NORMAL]) {
            category {
              title
            }
            positiveFeedbackCount
            negativeFeedbackCount
          }
          articleType
          attachmentUrl(variant: THUMBNAIL)
        }
        reply {
          id
          text
        }
        user {
          id
          name
        }
        createdAt
      }
    }
  }
}
    `;

/**
 * __useFeedbackListInFeedbackTableQuery__
 *
 * To run a query within a React component, call `useFeedbackListInFeedbackTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedbackListInFeedbackTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedbackListInFeedbackTableQuery({
 *   variables: {
 *      after: // value for 'after'
 *      pageSize: // value for 'pageSize'
 *      createdAt: // value for 'createdAt'
 *      userId: // value for 'userId'
 *      articleReplyUserId: // value for 'articleReplyUserId'
 *      statuses: // value for 'statuses'
 *   },
 * });
 */
export function useFeedbackListInFeedbackTableQuery(baseOptions?: Apollo.QueryHookOptions<FeedbackListInFeedbackTableQuery, FeedbackListInFeedbackTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedbackListInFeedbackTableQuery, FeedbackListInFeedbackTableQueryVariables>(FeedbackListInFeedbackTableDocument, options);
      }
export function useFeedbackListInFeedbackTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedbackListInFeedbackTableQuery, FeedbackListInFeedbackTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedbackListInFeedbackTableQuery, FeedbackListInFeedbackTableQueryVariables>(FeedbackListInFeedbackTableDocument, options);
        }
export type FeedbackListInFeedbackTableQueryHookResult = ReturnType<typeof useFeedbackListInFeedbackTableQuery>;
export type FeedbackListInFeedbackTableLazyQueryHookResult = ReturnType<typeof useFeedbackListInFeedbackTableLazyQuery>;
export type FeedbackListInFeedbackTableQueryResult = Apollo.QueryResult<FeedbackListInFeedbackTableQuery, FeedbackListInFeedbackTableQueryVariables>;
export const ReplyRequestListStatInReplyRequestTableDocument = gql`
    query ReplyRequestListStatInReplyRequestTable($createdAt: TimeRangeInput, $userId: String, $statuses: [ReplyRequestStatusEnum!]) {
  ListReplyRequests(
    filter: {createdAt: $createdAt, userId: $userId, statuses: $statuses}
  ) {
    totalCount
    pageInfo {
      firstCursor
      lastCursor
    }
  }
}
    `;

/**
 * __useReplyRequestListStatInReplyRequestTableQuery__
 *
 * To run a query within a React component, call `useReplyRequestListStatInReplyRequestTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useReplyRequestListStatInReplyRequestTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReplyRequestListStatInReplyRequestTableQuery({
 *   variables: {
 *      createdAt: // value for 'createdAt'
 *      userId: // value for 'userId'
 *      statuses: // value for 'statuses'
 *   },
 * });
 */
export function useReplyRequestListStatInReplyRequestTableQuery(baseOptions?: Apollo.QueryHookOptions<ReplyRequestListStatInReplyRequestTableQuery, ReplyRequestListStatInReplyRequestTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReplyRequestListStatInReplyRequestTableQuery, ReplyRequestListStatInReplyRequestTableQueryVariables>(ReplyRequestListStatInReplyRequestTableDocument, options);
      }
export function useReplyRequestListStatInReplyRequestTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReplyRequestListStatInReplyRequestTableQuery, ReplyRequestListStatInReplyRequestTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReplyRequestListStatInReplyRequestTableQuery, ReplyRequestListStatInReplyRequestTableQueryVariables>(ReplyRequestListStatInReplyRequestTableDocument, options);
        }
export type ReplyRequestListStatInReplyRequestTableQueryHookResult = ReturnType<typeof useReplyRequestListStatInReplyRequestTableQuery>;
export type ReplyRequestListStatInReplyRequestTableLazyQueryHookResult = ReturnType<typeof useReplyRequestListStatInReplyRequestTableLazyQuery>;
export type ReplyRequestListStatInReplyRequestTableQueryResult = Apollo.QueryResult<ReplyRequestListStatInReplyRequestTableQuery, ReplyRequestListStatInReplyRequestTableQueryVariables>;
export const ReplyRequestListInReplyRequestTableDocument = gql`
    query ReplyRequestListInReplyRequestTable($after: String, $pageSize: Int, $createdAt: TimeRangeInput, $userId: String, $statuses: [ReplyRequestStatusEnum!]) {
  ListReplyRequests(
    filter: {createdAt: $createdAt, userId: $userId, statuses: $statuses}
    orderBy: [{createdAt: DESC}]
    after: $after
    first: $pageSize
  ) {
    edges {
      cursor
      node {
        id
        reason
        updatedAt
        user {
          id
          name
        }
        article {
          id
          text
          articleType
          attachmentUrl(variant: THUMBNAIL)
        }
      }
    }
  }
}
    `;

/**
 * __useReplyRequestListInReplyRequestTableQuery__
 *
 * To run a query within a React component, call `useReplyRequestListInReplyRequestTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useReplyRequestListInReplyRequestTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReplyRequestListInReplyRequestTableQuery({
 *   variables: {
 *      after: // value for 'after'
 *      pageSize: // value for 'pageSize'
 *      createdAt: // value for 'createdAt'
 *      userId: // value for 'userId'
 *      statuses: // value for 'statuses'
 *   },
 * });
 */
export function useReplyRequestListInReplyRequestTableQuery(baseOptions?: Apollo.QueryHookOptions<ReplyRequestListInReplyRequestTableQuery, ReplyRequestListInReplyRequestTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReplyRequestListInReplyRequestTableQuery, ReplyRequestListInReplyRequestTableQueryVariables>(ReplyRequestListInReplyRequestTableDocument, options);
      }
export function useReplyRequestListInReplyRequestTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReplyRequestListInReplyRequestTableQuery, ReplyRequestListInReplyRequestTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReplyRequestListInReplyRequestTableQuery, ReplyRequestListInReplyRequestTableQueryVariables>(ReplyRequestListInReplyRequestTableDocument, options);
        }
export type ReplyRequestListInReplyRequestTableQueryHookResult = ReturnType<typeof useReplyRequestListInReplyRequestTableQuery>;
export type ReplyRequestListInReplyRequestTableLazyQueryHookResult = ReturnType<typeof useReplyRequestListInReplyRequestTableLazyQuery>;
export type ReplyRequestListInReplyRequestTableQueryResult = Apollo.QueryResult<ReplyRequestListInReplyRequestTableQuery, ReplyRequestListInReplyRequestTableQueryVariables>;
export const ReplyListStatInReplyTableDocument = gql`
    query ReplyListStatInReplyTable($createdAt: TimeRangeInput, $userId: String) {
  ListReplies(filter: {createdAt: $createdAt, userId: $userId}) {
    totalCount
    pageInfo {
      firstCursor
      lastCursor
    }
  }
}
    `;

/**
 * __useReplyListStatInReplyTableQuery__
 *
 * To run a query within a React component, call `useReplyListStatInReplyTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useReplyListStatInReplyTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReplyListStatInReplyTableQuery({
 *   variables: {
 *      createdAt: // value for 'createdAt'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useReplyListStatInReplyTableQuery(baseOptions?: Apollo.QueryHookOptions<ReplyListStatInReplyTableQuery, ReplyListStatInReplyTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReplyListStatInReplyTableQuery, ReplyListStatInReplyTableQueryVariables>(ReplyListStatInReplyTableDocument, options);
      }
export function useReplyListStatInReplyTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReplyListStatInReplyTableQuery, ReplyListStatInReplyTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReplyListStatInReplyTableQuery, ReplyListStatInReplyTableQueryVariables>(ReplyListStatInReplyTableDocument, options);
        }
export type ReplyListStatInReplyTableQueryHookResult = ReturnType<typeof useReplyListStatInReplyTableQuery>;
export type ReplyListStatInReplyTableLazyQueryHookResult = ReturnType<typeof useReplyListStatInReplyTableLazyQuery>;
export type ReplyListStatInReplyTableQueryResult = Apollo.QueryResult<ReplyListStatInReplyTableQuery, ReplyListStatInReplyTableQueryVariables>;
export const ReplyListInReplyTableDocument = gql`
    query ReplyListInReplyTable($after: String, $pageSize: Int, $createdAt: TimeRangeInput, $userId: String) {
  ListReplies(
    filter: {createdAt: $createdAt, userId: $userId}
    orderBy: [{createdAt: DESC}]
    after: $after
    first: $pageSize
  ) {
    edges {
      cursor
      node {
        id
        text
        user {
          id
          name
        }
        createdAt
      }
    }
  }
}
    `;

/**
 * __useReplyListInReplyTableQuery__
 *
 * To run a query within a React component, call `useReplyListInReplyTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useReplyListInReplyTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReplyListInReplyTableQuery({
 *   variables: {
 *      after: // value for 'after'
 *      pageSize: // value for 'pageSize'
 *      createdAt: // value for 'createdAt'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useReplyListInReplyTableQuery(baseOptions?: Apollo.QueryHookOptions<ReplyListInReplyTableQuery, ReplyListInReplyTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReplyListInReplyTableQuery, ReplyListInReplyTableQueryVariables>(ReplyListInReplyTableDocument, options);
      }
export function useReplyListInReplyTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReplyListInReplyTableQuery, ReplyListInReplyTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReplyListInReplyTableQuery, ReplyListInReplyTableQueryVariables>(ReplyListInReplyTableDocument, options);
        }
export type ReplyListInReplyTableQueryHookResult = ReturnType<typeof useReplyListInReplyTableQuery>;
export type ReplyListInReplyTableLazyQueryHookResult = ReturnType<typeof useReplyListInReplyTableLazyQuery>;
export type ReplyListInReplyTableQueryResult = Apollo.QueryResult<ReplyListInReplyTableQuery, ReplyListInReplyTableQueryVariables>;