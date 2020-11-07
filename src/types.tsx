/* eslint-disable */
/* AUTO-GENERATED. WILL BE OVERWRITTEN BY `npm run codegen`. */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly GetArticle?: Maybe<Article>;
  readonly GetReply?: Maybe<Reply>;
  /**
   * Gets specified user. If id is not given, returns the currently logged-in user.
   * Note that some fields like email is not visible to other users.
   */
  readonly GetUser?: Maybe<User>;
  readonly GetCategory?: Maybe<Category>;
  readonly ListArticles?: Maybe<ArticleConnection>;
  readonly ListReplies?: Maybe<ReplyConnection>;
  readonly ListCategories?: Maybe<ListCategoryConnection>;
  readonly ListArticleReplyFeedbacks?: Maybe<ListArticleReplyFeedbackConnection>;
};


export type QueryGetArticleArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetReplyArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetCategoryArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryListArticlesArgs = {
  filter?: Maybe<ListArticleFilter>;
  orderBy?: Maybe<ReadonlyArray<Maybe<ListArticleOrderBy>>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryListRepliesArgs = {
  filter?: Maybe<ListReplyFilter>;
  orderBy?: Maybe<ReadonlyArray<Maybe<ListReplyOrderBy>>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryListCategoriesArgs = {
  orderBy?: Maybe<ReadonlyArray<Maybe<ListCategoryOrderBy>>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryListArticleReplyFeedbacksArgs = {
  filter?: Maybe<ListArticleReplyFeedbackFilter>;
  orderBy?: Maybe<ReadonlyArray<Maybe<ListArticleReplyFeedbackOrderBy>>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type Article = Node & {
  readonly __typename?: 'Article';
  readonly id: Scalars['ID'];
  readonly text?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  readonly references?: Maybe<ReadonlyArray<Maybe<ArticleReference>>>;
  /** Number of normal article replies */
  readonly replyCount?: Maybe<Scalars['Int']>;
  /** Connections between this article and replies. Sorted by the logic described in https://github.com/cofacts/rumors-line-bot/issues/78. */
  readonly articleReplies?: Maybe<ReadonlyArray<Maybe<ArticleReply>>>;
  readonly articleCategories?: Maybe<ReadonlyArray<Maybe<ArticleCategory>>>;
  /** Number of normal article categories */
  readonly categoryCount?: Maybe<Scalars['Int']>;
  readonly replyRequests?: Maybe<ReadonlyArray<Maybe<ReplyRequest>>>;
  readonly replyRequestCount?: Maybe<Scalars['Int']>;
  readonly lastRequestedAt?: Maybe<Scalars['String']>;
  /** If the current user has requested for reply for this article. Null if not logged in. */
  readonly requestedForReply?: Maybe<Scalars['Boolean']>;
  /** The user submitted this article */
  readonly user?: Maybe<User>;
  readonly relatedArticles?: Maybe<ArticleConnection>;
  /** Hyperlinks in article text */
  readonly hyperlinks?: Maybe<ReadonlyArray<Maybe<Hyperlink>>>;
  /** Activities analytics for the given article */
  readonly stats?: Maybe<ReadonlyArray<Maybe<Analytics>>>;
};


export type ArticleArticleRepliesArgs = {
  status?: Maybe<ArticleReplyStatusEnum>;
};


export type ArticleArticleCategoriesArgs = {
  status?: Maybe<ArticleCategoryStatusEnum>;
};


export type ArticleRelatedArticlesArgs = {
  filter?: Maybe<RelatedArticleFilter>;
  orderBy?: Maybe<ReadonlyArray<Maybe<RelatedArticleOrderBy>>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};


export type ArticleStatsArgs = {
  dateRange?: Maybe<TimeRangeInput>;
};

/** Basic entity. Modeled after Relay's GraphQL Server Specification. */
export type Node = {
  readonly id: Scalars['ID'];
};

export type ArticleReference = {
  readonly __typename?: 'ArticleReference';
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly type?: Maybe<ArticleReferenceTypeEnum>;
  readonly permalink?: Maybe<Scalars['String']>;
};

/** Where this article is collected from. */
export enum ArticleReferenceTypeEnum {
  /** The article is collected from the Internet, with a link to the article available. */
  Url = 'URL',
  /** The article is collected from conversations in LINE messengers. */
  Line = 'LINE'
}

/** The linkage between an Article and a Reply */
export type ArticleReply = {
  readonly __typename?: 'ArticleReply';
  readonly replyId?: Maybe<Scalars['String']>;
  readonly reply?: Maybe<Reply>;
  /** Cached reply type value stored in ArticleReply */
  readonly replyType?: Maybe<ReplyTypeEnum>;
  readonly articleId?: Maybe<Scalars['String']>;
  readonly article?: Maybe<Article>;
  /** The user who conencted this reply and this article. */
  readonly user?: Maybe<User>;
  readonly canUpdateStatus?: Maybe<Scalars['Boolean']>;
  readonly feedbackCount?: Maybe<Scalars['Int']>;
  readonly positiveFeedbackCount?: Maybe<Scalars['Int']>;
  readonly negativeFeedbackCount?: Maybe<Scalars['Int']>;
  readonly feedbacks?: Maybe<ReadonlyArray<Maybe<ArticleReplyFeedback>>>;
  /** The feedback of current user. null when not logged in or not voted yet. */
  readonly ownVote?: Maybe<FeedbackVote>;
  readonly status?: Maybe<ArticleReplyStatusEnum>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
};

export type Reply = Node & {
  readonly __typename?: 'Reply';
  readonly id: Scalars['ID'];
  /** The user submitted this reply version */
  readonly user?: Maybe<User>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly text?: Maybe<Scalars['String']>;
  readonly type?: Maybe<ReplyTypeEnum>;
  readonly reference?: Maybe<Scalars['String']>;
  readonly articleReplies?: Maybe<ReadonlyArray<Maybe<ArticleReply>>>;
  /** Hyperlinks in reply text or reference. May be empty array if no URLs are included. `null` when hyperlinks are still fetching. */
  readonly hyperlinks?: Maybe<ReadonlyArray<Maybe<Hyperlink>>>;
  /** Replies that has similar text or references of this current reply */
  readonly similarReplies?: Maybe<ReplyConnection>;
};


export type ReplyArticleRepliesArgs = {
  status?: Maybe<ArticleReplyStatusEnum>;
};


export type ReplySimilarRepliesArgs = {
  orderBy?: Maybe<ReadonlyArray<Maybe<SimilarReplyOrderBy>>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type User = {
  readonly __typename?: 'User';
  readonly id?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly email?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  /** return hash based on user email for gravatar url */
  readonly avatarUrl?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly facebookId?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly githubId?: Maybe<Scalars['String']>;
  /** Returns only for current user. Returns `null` otherwise. */
  readonly twitterId?: Maybe<Scalars['String']>;
  /** Number of articles this user has replied to */
  readonly repliedArticleCount: Scalars['Int'];
  /** Number of article replies this user has given feedbacks */
  readonly votedArticleReplyCount: Scalars['Int'];
  readonly level: Scalars['Int'];
  readonly points: PointInfo;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
};

/** Information of a user's point. Only available for current user. */
export type PointInfo = {
  readonly __typename?: 'PointInfo';
  /** Points earned by the current user */
  readonly total: Scalars['Int'];
  /** Points required for current level */
  readonly currentLevel: Scalars['Int'];
  /** Points required for next level. null when there is no next level. */
  readonly nextLevel: Scalars['Int'];
};

/** Reflects how the replier categories the replied article. */
export enum ReplyTypeEnum {
  /** The replier thinks that the article contains false information. */
  Rumor = 'RUMOR',
  /** The replier thinks that the articles contains no false information. */
  NotRumor = 'NOT_RUMOR',
  /** The replier thinks that the article is actually not a complete article on the internet or passed around in messengers. */
  NotArticle = 'NOT_ARTICLE',
  /** The replier thinks that the article contains personal viewpoint and is not objective. */
  Opinionated = 'OPINIONATED'
}

export enum ArticleReplyStatusEnum {
  Normal = 'NORMAL',
  Deleted = 'DELETED'
}

/** Data behind a hyperlink */
export type Hyperlink = {
  readonly __typename?: 'Hyperlink';
  /** URL in text */
  readonly url?: Maybe<Scalars['String']>;
  /** URL normalized by scrapUrl */
  readonly normalizedUrl?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly summary?: Maybe<Scalars['String']>;
  readonly topImageUrl?: Maybe<Scalars['String']>;
  readonly fetchedAt?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly error?: Maybe<Scalars['String']>;
};

export type ReplyConnection = Connection & {
  readonly __typename?: 'ReplyConnection';
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<ReplyConnectionEdge>;
  readonly pageInfo: ReplyConnectionPageInfo;
};

/** Connection model for a list of nodes. Modeled after Relay's GraphQL Server Specification. */
export type Connection = {
  readonly edges: ReadonlyArray<Edge>;
  readonly totalCount: Scalars['Int'];
  readonly pageInfo: PageInfo;
};

/** Edge in Connection. Modeled after GraphQL connection model. */
export type Edge = {
  readonly node: Node;
  readonly cursor: Scalars['String'];
};

/** PageInfo in Connection. Modeled after GraphQL connection model. */
export type PageInfo = {
  /** The cursor pointing to the first node of the entire collection, regardless of "before" and "after". Can be used to determine if is in the last page. Null when the collection is empty. */
  readonly firstCursor?: Maybe<Scalars['String']>;
  /** The cursor pointing to the last node of the entire collection, regardless of "before" and "after". Can be used to determine if is in the last page. Null when the collection is empty. */
  readonly lastCursor?: Maybe<Scalars['String']>;
};

export type ReplyConnectionEdge = Edge & {
  readonly __typename?: 'ReplyConnectionEdge';
  readonly node: Reply;
  readonly cursor: Scalars['String'];
  readonly score?: Maybe<Scalars['Float']>;
  readonly highlight?: Maybe<Highlights>;
};

export type Highlights = {
  readonly __typename?: 'Highlights';
  /** Article or Reply text */
  readonly text?: Maybe<Scalars['String']>;
  /** Reply reference */
  readonly reference?: Maybe<Scalars['String']>;
  /** Article or Reply hyperlinks */
  readonly hyperlinks?: Maybe<ReadonlyArray<Maybe<Hyperlink>>>;
};

export type ReplyConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ReplyConnectionPageInfo';
  readonly lastCursor?: Maybe<Scalars['String']>;
  readonly firstCursor?: Maybe<Scalars['String']>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type SimilarReplyOrderBy = {
  readonly _score?: Maybe<SortOrderEnum>;
  readonly createdAt?: Maybe<SortOrderEnum>;
};

export enum SortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** User feedback to an ArticleReply */
export type ArticleReplyFeedback = Node & {
  readonly __typename?: 'ArticleReplyFeedback';
  readonly id: Scalars['ID'];
  readonly user?: Maybe<User>;
  readonly userId?: Maybe<Scalars['String']>;
  readonly appId?: Maybe<Scalars['String']>;
  readonly comment?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  /** User's vote on the articleReply */
  readonly vote?: Maybe<FeedbackVote>;
  /**
   * One of 1, 0 and -1. Representing upvote, neutral and downvote, respectively
   * @deprecated Use vote instead
   */
  readonly score?: Maybe<Scalars['Int']>;
  /** The scored article-reply's article */
  readonly article?: Maybe<Article>;
  /** The scored article-reply's reply */
  readonly reply?: Maybe<Reply>;
  /** The scored article-reply */
  readonly articleReply?: Maybe<ArticleReply>;
};

export enum FeedbackVote {
  Upvote = 'UPVOTE',
  Neutral = 'NEUTRAL',
  Downvote = 'DOWNVOTE'
}

/** The linkage between an Article and a Category */
export type ArticleCategory = Node & {
  readonly __typename?: 'ArticleCategory';
  readonly id: Scalars['ID'];
  readonly categoryId?: Maybe<Scalars['String']>;
  readonly category?: Maybe<Category>;
  readonly articleId?: Maybe<Scalars['String']>;
  readonly article?: Maybe<Article>;
  /** The user who updated this category with this article. */
  readonly user?: Maybe<User>;
  readonly canUpdateStatus?: Maybe<Scalars['Boolean']>;
  readonly feedbackCount?: Maybe<Scalars['Int']>;
  readonly positiveFeedbackCount?: Maybe<Scalars['Int']>;
  readonly negativeFeedbackCount?: Maybe<Scalars['Int']>;
  readonly feedbacks?: Maybe<ReadonlyArray<Maybe<ArticleCategoryFeedback>>>;
  /** The feedback of current user. null when not logged in or not voted yet. */
  readonly ownVote?: Maybe<FeedbackVote>;
  readonly status?: Maybe<ArticleCategoryStatusEnum>;
  readonly aiModel?: Maybe<Scalars['String']>;
  readonly aiConfidence?: Maybe<Scalars['Float']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
};

/** Category label for specific topic */
export type Category = Node & {
  readonly __typename?: 'Category';
  readonly id: Scalars['ID'];
  readonly title?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  readonly articleCategories?: Maybe<ArticleCategoryConnection>;
};


/** Category label for specific topic */
export type CategoryArticleCategoriesArgs = {
  status?: Maybe<ArticleCategoryStatusEnum>;
  orderBy?: Maybe<ReadonlyArray<Maybe<CategoryArticleCategoriesOrderBy>>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type ArticleCategoryConnection = Connection & {
  readonly __typename?: 'ArticleCategoryConnection';
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<ArticleCategoryConnectionEdge>;
  readonly pageInfo: ArticleCategoryConnectionPageInfo;
};

export type ArticleCategoryConnectionEdge = Edge & {
  readonly __typename?: 'ArticleCategoryConnectionEdge';
  readonly node: ArticleCategory;
  readonly cursor: Scalars['String'];
  readonly score?: Maybe<Scalars['Float']>;
  readonly highlight?: Maybe<Highlights>;
};

export type ArticleCategoryConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ArticleCategoryConnectionPageInfo';
  readonly lastCursor?: Maybe<Scalars['String']>;
  readonly firstCursor?: Maybe<Scalars['String']>;
};

export enum ArticleCategoryStatusEnum {
  Normal = 'NORMAL',
  Deleted = 'DELETED'
}

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type CategoryArticleCategoriesOrderBy = {
  readonly createdAt?: Maybe<SortOrderEnum>;
};

/** User feedback to an ArticleCategory */
export type ArticleCategoryFeedback = {
  readonly __typename?: 'ArticleCategoryFeedback';
  readonly id?: Maybe<Scalars['String']>;
  readonly user?: Maybe<User>;
  readonly comment?: Maybe<Scalars['String']>;
  /** User's vote on the articleCategory */
  readonly vote?: Maybe<FeedbackVote>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
};

export type ReplyRequest = {
  readonly __typename?: 'ReplyRequest';
  readonly id?: Maybe<Scalars['String']>;
  readonly userId?: Maybe<Scalars['String']>;
  readonly appId?: Maybe<Scalars['String']>;
  readonly reason?: Maybe<Scalars['String']>;
  readonly feedbackCount?: Maybe<Scalars['Int']>;
  readonly positiveFeedbackCount?: Maybe<Scalars['Int']>;
  readonly negativeFeedbackCount?: Maybe<Scalars['Int']>;
  readonly createdAt?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['String']>;
  /** The feedback of current user. null when not logged in or not voted yet. */
  readonly ownVote?: Maybe<FeedbackVote>;
};

export type ArticleConnection = Connection & {
  readonly __typename?: 'ArticleConnection';
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<ArticleConnectionEdge>;
  readonly pageInfo: ArticleConnectionPageInfo;
};

export type ArticleConnectionEdge = Edge & {
  readonly __typename?: 'ArticleConnectionEdge';
  readonly node: Article;
  readonly cursor: Scalars['String'];
  readonly score?: Maybe<Scalars['Float']>;
  readonly highlight?: Maybe<Highlights>;
};

export type ArticleConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ArticleConnectionPageInfo';
  readonly lastCursor?: Maybe<Scalars['String']>;
  readonly firstCursor?: Maybe<Scalars['String']>;
};

export type RelatedArticleFilter = {
  readonly replyCount?: Maybe<RangeInput>;
};

/** List only the entries whose field match the criteria. */
export type RangeInput = {
  readonly LT?: Maybe<Scalars['Int']>;
  readonly LTE?: Maybe<Scalars['Int']>;
  readonly GT?: Maybe<Scalars['Int']>;
  readonly GTE?: Maybe<Scalars['Int']>;
  readonly EQ?: Maybe<Scalars['Int']>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type RelatedArticleOrderBy = {
  readonly _score?: Maybe<SortOrderEnum>;
  readonly updatedAt?: Maybe<SortOrderEnum>;
};

export type Analytics = {
  readonly __typename?: 'Analytics';
  readonly date?: Maybe<Scalars['String']>;
  readonly lineUser?: Maybe<Scalars['Int']>;
  readonly lineVisit?: Maybe<Scalars['Int']>;
  readonly webUser?: Maybe<Scalars['Int']>;
  readonly webVisit?: Maybe<Scalars['Int']>;
};

/** List only the entries that were created between the specific time range. The time range value is in elasticsearch date format (https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html) */
export type TimeRangeInput = {
  readonly LT?: Maybe<Scalars['String']>;
  readonly LTE?: Maybe<Scalars['String']>;
  readonly GT?: Maybe<Scalars['String']>;
  readonly GTE?: Maybe<Scalars['String']>;
  readonly EQ?: Maybe<Scalars['String']>;
};

export type ListArticleFilter = {
  /** List only the articles whose number of replies matches the criteria. */
  readonly replyCount?: Maybe<RangeInput>;
  /** List only the articles whose number of categories match the criteria. */
  readonly categoryCount?: Maybe<RangeInput>;
  /** List only articles that match any of the specified categories.ArticleCategories that are deleted or has more negative feedbacks than positive ones are not taken into account. */
  readonly categoryIds?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  /** List all articles related to a given string. */
  readonly moreLikeThis?: Maybe<MoreLikeThisInput>;
  /** List only the articles whose number of replies matches the criteria. */
  readonly replyRequestCount?: Maybe<RangeInput>;
  /** List only the articles that were created between the specific time range. */
  readonly createdAt?: Maybe<TimeRangeInput>;
  /** List only the articles that were replied between the specific time range. */
  readonly repliedAt?: Maybe<TimeRangeInput>;
  /** Show only articles from a specific user. */
  readonly appId?: Maybe<Scalars['String']>;
  /** Show only articles from a specific user. */
  readonly userId?: Maybe<Scalars['String']>;
  /**
   * Specify an articleId here to show only articles from the sender of that specified article.
   * When specified, it overrides the settings of appId and userId.
   */
  readonly fromUserOfArticleId?: Maybe<Scalars['String']>;
  /** Show only articles with(out) article replies created by specified user */
  readonly articleRepliesFrom?: Maybe<UserAndExistInput>;
  /**
   * When true, return only articles with any article replies that has more positive feedback than negative.
   * When false, return articles with none of its article replies that has more positive feedback, including those with no replies yet.
   * In both scenario, deleted article replies are not taken into account.
   */
  readonly hasArticleReplyWithMorePositiveFeedback?: Maybe<Scalars['Boolean']>;
  /** List the articles with replies of certain types */
  readonly replyTypes?: Maybe<ReadonlyArray<Maybe<ReplyTypeEnum>>>;
};

/**
 * Parameters for Elasticsearch more_like_this query.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-mlt-query.html
 */
export type MoreLikeThisInput = {
  /** The text string to search for. */
  readonly like?: Maybe<Scalars['String']>;
  /**
   * more_like_this query's "minimum_should_match" query param.
   * See https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html for possible values.
   */
  readonly minimumShouldMatch?: Maybe<Scalars['String']>;
};

export type UserAndExistInput = {
  readonly userId: Scalars['String'];
  /**
   * When true (or not specified), return only entries with the specified user's involvement.
   * When false, return only entries that the specified user did not involve.
   */
  readonly exists?: Maybe<Scalars['Boolean']>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListArticleOrderBy = {
  readonly _score?: Maybe<SortOrderEnum>;
  readonly updatedAt?: Maybe<SortOrderEnum>;
  readonly createdAt?: Maybe<SortOrderEnum>;
  readonly replyRequestCount?: Maybe<SortOrderEnum>;
  readonly replyCount?: Maybe<SortOrderEnum>;
  readonly lastRequestedAt?: Maybe<SortOrderEnum>;
  readonly lastRepliedAt?: Maybe<SortOrderEnum>;
};

export type ListReplyFilter = {
  readonly userId?: Maybe<Scalars['String']>;
  readonly appId?: Maybe<Scalars['String']>;
  readonly moreLikeThis?: Maybe<MoreLikeThisInput>;
  /** List the replies created by the requester themselves */
  readonly selfOnly?: Maybe<Scalars['Boolean']>;
  /** [Deprecated] use types instead. */
  readonly type?: Maybe<ReplyTypeEnum>;
  /** List the replies of certain types */
  readonly types?: Maybe<ReadonlyArray<Maybe<ReplyTypeEnum>>>;
  /** List only the replies that were created between the specific time range. */
  readonly createdAt?: Maybe<TimeRangeInput>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListReplyOrderBy = {
  readonly _score?: Maybe<SortOrderEnum>;
  readonly createdAt?: Maybe<SortOrderEnum>;
};

export type ListCategoryConnection = Connection & {
  readonly __typename?: 'ListCategoryConnection';
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<ListCategoryConnectionEdge>;
  readonly pageInfo: ListCategoryConnectionPageInfo;
};

export type ListCategoryConnectionEdge = Edge & {
  readonly __typename?: 'ListCategoryConnectionEdge';
  readonly node: Category;
  readonly cursor: Scalars['String'];
  readonly score?: Maybe<Scalars['Float']>;
  readonly highlight?: Maybe<Highlights>;
};

export type ListCategoryConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ListCategoryConnectionPageInfo';
  readonly lastCursor?: Maybe<Scalars['String']>;
  readonly firstCursor?: Maybe<Scalars['String']>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListCategoryOrderBy = {
  readonly createdAt?: Maybe<SortOrderEnum>;
};

export type ListArticleReplyFeedbackConnection = Connection & {
  readonly __typename?: 'ListArticleReplyFeedbackConnection';
  /** The total count of the entire collection, regardless of "before", "after". */
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<ListArticleReplyFeedbackConnectionEdge>;
  readonly pageInfo: ListArticleReplyFeedbackConnectionPageInfo;
};

export type ListArticleReplyFeedbackConnectionEdge = Edge & {
  readonly __typename?: 'ListArticleReplyFeedbackConnectionEdge';
  readonly node: ArticleReplyFeedback;
  readonly cursor: Scalars['String'];
  readonly score?: Maybe<Scalars['Float']>;
  readonly highlight?: Maybe<Highlights>;
};

export type ListArticleReplyFeedbackConnectionPageInfo = PageInfo & {
  readonly __typename?: 'ListArticleReplyFeedbackConnectionPageInfo';
  readonly lastCursor?: Maybe<Scalars['String']>;
  readonly firstCursor?: Maybe<Scalars['String']>;
};

export type ListArticleReplyFeedbackFilter = {
  readonly userId?: Maybe<Scalars['String']>;
  readonly appId?: Maybe<Scalars['String']>;
  readonly articleId?: Maybe<Scalars['String']>;
  readonly replyId?: Maybe<Scalars['String']>;
  /** Search for comment field using more_like_this query */
  readonly moreLikeThis?: Maybe<MoreLikeThisInput>;
  /** When specified, list only article reply feedbacks with specified vote */
  readonly vote?: Maybe<ReadonlyArray<Maybe<FeedbackVote>>>;
  /** List only the article reply feedbacks that were created within the specific time range. */
  readonly createdAt?: Maybe<TimeRangeInput>;
  /** List only the article reply feedbacks that were last updated within the specific time range. */
  readonly updatedAt?: Maybe<TimeRangeInput>;
};

/** An entry of orderBy argument. Specifies field name and the sort order. Only one field name is allowd per entry. */
export type ListArticleReplyFeedbackOrderBy = {
  readonly createdAt?: Maybe<SortOrderEnum>;
  readonly updatedAt?: Maybe<SortOrderEnum>;
  readonly vote?: Maybe<SortOrderEnum>;
  /** Full text relevance for comment field queries */
  readonly _score?: Maybe<SortOrderEnum>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  /** Create an article and/or a replyRequest */
  readonly CreateArticle?: Maybe<MutationResult>;
  /** Create a reply that replies to the specified article. */
  readonly CreateReply?: Maybe<MutationResult>;
  /** Connects specified reply and specified article. */
  readonly CreateArticleReply?: Maybe<ReadonlyArray<Maybe<ArticleReply>>>;
  /** Create a category */
  readonly CreateCategory?: Maybe<MutationResult>;
  /** Adds specified category to specified article. */
  readonly CreateArticleCategory?: Maybe<ReadonlyArray<Maybe<ArticleCategory>>>;
  /**
   * Create or update a reply request for the given article
   * @deprecated Use CreateOrUpdateReplyRequest instead
   */
  readonly CreateReplyRequest?: Maybe<Article>;
  /** Create or update a reply request for the given article */
  readonly CreateOrUpdateReplyRequest?: Maybe<Article>;
  /** Create or update a feedback on an article-reply connection */
  readonly CreateOrUpdateArticleReplyFeedback?: Maybe<ArticleReply>;
  /** Create or update a feedback on an article-category connection */
  readonly CreateOrUpdateArticleCategoryFeedback?: Maybe<ArticleCategory>;
  /** Create or update a feedback on a reply request reason */
  readonly CreateOrUpdateReplyRequestFeedback?: Maybe<ReplyRequest>;
  /** Change status of specified articleReplies */
  readonly UpdateArticleReplyStatus?: Maybe<ReadonlyArray<Maybe<ArticleReply>>>;
  /** Change status of specified articleCategory */
  readonly UpdateArticleCategoryStatus?: Maybe<ReadonlyArray<Maybe<ArticleCategory>>>;
  /** Change attribute of a user */
  readonly UpdateUser?: Maybe<User>;
};


export type MutationCreateArticleArgs = {
  text: Scalars['String'];
  reference: ArticleReferenceInput;
  reason?: Maybe<Scalars['String']>;
};


export type MutationCreateReplyArgs = {
  articleId: Scalars['String'];
  text: Scalars['String'];
  type: ReplyTypeEnum;
  reference?: Maybe<Scalars['String']>;
  waitForHyperlinks?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateArticleReplyArgs = {
  articleId: Scalars['String'];
  replyId: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
};


export type MutationCreateArticleCategoryArgs = {
  articleId: Scalars['String'];
  categoryId: Scalars['String'];
  aiModel?: Maybe<Scalars['String']>;
  aiConfidence?: Maybe<Scalars['Float']>;
};


export type MutationCreateReplyRequestArgs = {
  articleId: Scalars['String'];
  reason?: Maybe<Scalars['String']>;
};


export type MutationCreateOrUpdateReplyRequestArgs = {
  articleId: Scalars['String'];
  reason?: Maybe<Scalars['String']>;
};


export type MutationCreateOrUpdateArticleReplyFeedbackArgs = {
  articleId: Scalars['String'];
  replyId: Scalars['String'];
  vote: FeedbackVote;
  comment?: Maybe<Scalars['String']>;
};


export type MutationCreateOrUpdateArticleCategoryFeedbackArgs = {
  articleId: Scalars['String'];
  categoryId: Scalars['String'];
  vote: FeedbackVote;
  comment?: Maybe<Scalars['String']>;
};


export type MutationCreateOrUpdateReplyRequestFeedbackArgs = {
  replyRequestId: Scalars['String'];
  vote: FeedbackVote;
};


export type MutationUpdateArticleReplyStatusArgs = {
  articleId: Scalars['String'];
  replyId: Scalars['String'];
  status: ArticleReplyStatusEnum;
};


export type MutationUpdateArticleCategoryStatusArgs = {
  articleId: Scalars['String'];
  categoryId: Scalars['String'];
  status: ArticleCategoryStatusEnum;
};


export type MutationUpdateUserArgs = {
  name: Scalars['String'];
};

export type MutationResult = {
  readonly __typename?: 'MutationResult';
  readonly id?: Maybe<Scalars['String']>;
};

export type ArticleReferenceInput = {
  readonly type: ArticleReferenceTypeEnum;
  readonly permalink?: Maybe<Scalars['String']>;
};

export type LoadApiStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoadApiStatsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly allArticles?: Maybe<(
    { readonly __typename?: 'ArticleConnection' }
    & Pick<ArticleConnection, 'totalCount'>
  )>, readonly allRepliedArticles?: Maybe<(
    { readonly __typename?: 'ArticleConnection' }
    & Pick<ArticleConnection, 'totalCount'>
  )>, readonly articlesHasUsefulReplies?: Maybe<(
    { readonly __typename?: 'ArticleConnection' }
    & Pick<ArticleConnection, 'totalCount'>
  )> }
);

export type BigNumOfRepliedQueryVariables = Exact<{
  startTime?: Maybe<Scalars['String']>;
}>;


export type BigNumOfRepliedQuery = (
  { readonly __typename?: 'Query' }
  & { readonly query?: Maybe<(
    { readonly __typename?: 'ArticleConnection' }
    & Pick<ArticleConnection, 'totalCount'>
  )> }
);

export type BigNumOfFeedbacksQueryVariables = Exact<{
  startTime?: Maybe<Scalars['String']>;
}>;


export type BigNumOfFeedbacksQuery = (
  { readonly __typename?: 'Query' }
  & { readonly query?: Maybe<(
    { readonly __typename?: 'ListArticleReplyFeedbackConnection' }
    & Pick<ListArticleReplyFeedbackConnection, 'totalCount'>
  )> }
);

export type ListRepliesQueryVariables = Exact<{
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ListRepliesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly ListReplies?: Maybe<(
    { readonly __typename?: 'ReplyConnection' }
    & Pick<ReplyConnection, 'totalCount'>
    & { readonly pageInfo: (
      { readonly __typename?: 'ReplyConnectionPageInfo' }
      & Pick<ReplyConnectionPageInfo, 'firstCursor' | 'lastCursor'>
    ), readonly edges: ReadonlyArray<(
      { readonly __typename?: 'ReplyConnectionEdge' }
      & Pick<ReplyConnectionEdge, 'cursor'>
      & { readonly node: (
        { readonly __typename?: 'Reply' }
        & Pick<Reply, 'id' | 'text' | 'createdAt'>
        & { readonly user?: Maybe<(
          { readonly __typename?: 'User' }
          & Pick<User, 'name'>
        )> }
      ) }
    )> }
  )> }
);


export const LoadApiStatsDocument = gql`
    query LoadAPIStats {
  allArticles: ListArticles {
    totalCount
  }
  allRepliedArticles: ListArticles(filter: {replyCount: {GTE: 1}}) {
    totalCount
  }
  articlesHasUsefulReplies: ListArticles(filter: {hasArticleReplyWithMorePositiveFeedback: true}) {
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
 *   },
 * });
 */
export function useLoadApiStatsQuery(baseOptions?: Apollo.QueryHookOptions<LoadApiStatsQuery, LoadApiStatsQueryVariables>) {
        return Apollo.useQuery<LoadApiStatsQuery, LoadApiStatsQueryVariables>(LoadApiStatsDocument, baseOptions);
      }
export function useLoadApiStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadApiStatsQuery, LoadApiStatsQueryVariables>) {
          return Apollo.useLazyQuery<LoadApiStatsQuery, LoadApiStatsQueryVariables>(LoadApiStatsDocument, baseOptions);
        }
export type LoadApiStatsQueryHookResult = ReturnType<typeof useLoadApiStatsQuery>;
export type LoadApiStatsLazyQueryHookResult = ReturnType<typeof useLoadApiStatsLazyQuery>;
export type LoadApiStatsQueryResult = Apollo.QueryResult<LoadApiStatsQuery, LoadApiStatsQueryVariables>;
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
        return Apollo.useQuery<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>(BigNumOfRepliedDocument, baseOptions);
      }
export function useBigNumOfRepliedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>) {
          return Apollo.useLazyQuery<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>(BigNumOfRepliedDocument, baseOptions);
        }
export type BigNumOfRepliedQueryHookResult = ReturnType<typeof useBigNumOfRepliedQuery>;
export type BigNumOfRepliedLazyQueryHookResult = ReturnType<typeof useBigNumOfRepliedLazyQuery>;
export type BigNumOfRepliedQueryResult = Apollo.QueryResult<BigNumOfRepliedQuery, BigNumOfRepliedQueryVariables>;
export const BigNumOfFeedbacksDocument = gql`
    query BigNumOfFeedbacks($startTime: String) {
  query: ListArticleReplyFeedbacks(filter: {createdAt: {GTE: $startTime}}) {
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
        return Apollo.useQuery<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>(BigNumOfFeedbacksDocument, baseOptions);
      }
export function useBigNumOfFeedbacksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>) {
          return Apollo.useLazyQuery<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>(BigNumOfFeedbacksDocument, baseOptions);
        }
export type BigNumOfFeedbacksQueryHookResult = ReturnType<typeof useBigNumOfFeedbacksQuery>;
export type BigNumOfFeedbacksLazyQueryHookResult = ReturnType<typeof useBigNumOfFeedbacksLazyQuery>;
export type BigNumOfFeedbacksQueryResult = Apollo.QueryResult<BigNumOfFeedbacksQuery, BigNumOfFeedbacksQueryVariables>;
export const ListRepliesDocument = gql`
    query ListReplies($before: String, $after: String) {
  ListReplies(orderBy: [{createdAt: DESC}], before: $before, after: $after, first: 25) {
    totalCount
    pageInfo {
      firstCursor
      lastCursor
    }
    edges {
      cursor
      node {
        id
        text
        user {
          name
        }
        createdAt
      }
    }
  }
}
    `;

/**
 * __useListRepliesQuery__
 *
 * To run a query within a React component, call `useListRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRepliesQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useListRepliesQuery(baseOptions?: Apollo.QueryHookOptions<ListRepliesQuery, ListRepliesQueryVariables>) {
        return Apollo.useQuery<ListRepliesQuery, ListRepliesQueryVariables>(ListRepliesDocument, baseOptions);
      }
export function useListRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRepliesQuery, ListRepliesQueryVariables>) {
          return Apollo.useLazyQuery<ListRepliesQuery, ListRepliesQueryVariables>(ListRepliesDocument, baseOptions);
        }
export type ListRepliesQueryHookResult = ReturnType<typeof useListRepliesQuery>;
export type ListRepliesLazyQueryHookResult = ReturnType<typeof useListRepliesLazyQuery>;
export type ListRepliesQueryResult = Apollo.QueryResult<ListRepliesQuery, ListRepliesQueryVariables>;