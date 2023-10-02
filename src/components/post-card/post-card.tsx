import style from "./post-card.module.scss";
import { PostInfo } from "types/index";
import { ProfilePictureMap } from "utils/get-unicorn-profile-pic-map";
import { Chip } from "components/index";
import date from "src/icons/date.svg?raw";
import authors from "src/icons/authors.svg?raw";
import { getHrefContainerProps } from "utils/href-container-script";
import { buildSearchQuery } from "utils/search";

interface PostCardProps {
	post: PostInfo;
	class?: string;
	unicornProfilePicMap: ProfilePictureMap;
}

function PostCardMeta({ post, unicornProfilePicMap }: PostCardProps) {
	return (
		<>
			<div className={style.postDataContainer}>
				<div className={style.authorListContainer}>
					<div
						aria-hidden
						className={style.cardIcon}
						dangerouslySetInnerHTML={{ __html: authors }}
					/>
					<ul className={style.authorList} role="list" aria-label="Post authors">
						{post.authorsMeta.map((author, i, arr) => (
							<li class="text-style-body-small-bold">
								<a
									className={`${style.authorName}`}
									href={`/unicorns/${author.id}`}
								>
									{author.name}
									{i !== arr.length - 1 && <span aria-hidden="true">, </span>}
								</a>
							</li>
						))}
					</ul>
				</div>
				<p className={style.dateAndWordCount}>
					<span
						aria-hidden
						className={style.cardIcon}
						dangerouslySetInnerHTML={{ __html: date }}
					/>
					<span>
						<span className={`text-style-body-small-bold ${style.publishedDate}`}>
							{post.publishedMeta}
						</span>
						<span className={`text-style-body-small ${style.separatorDot}`}>
							•
						</span>
						<span className={`text-style-body-small ${style.wordCount}`}>
							{post.wordCount} words
						</span>
					</span>
				</p>
			</div>
			<p
				className={`text-style-body-medium ${style.description}`}
				dangerouslySetInnerHTML={{ __html: post.description }}
			></p>
			<div className={style.spacer}></div>
			<ul className={style.cardList} aria-label={"Post tags"} role="list">
				{post.tags.map((tag) => (
					<li>
						<Chip href={`/search?${buildSearchQuery({ filterTags: [tag] })}`}>
							{tag}
						</Chip>
					</li>
				))}
			</ul>
		</>
	);
}

export const PostCardExpanded = ({
	post,
	class: className = "",
	unicornProfilePicMap,
	imageLoading = "lazy",
}: PostCardProps & { imageLoading?: "eager" | "lazy" }) => {
	return (
		<li
			{...getHrefContainerProps(`/posts/${post.slug}`)}
			className={`${className} ${style.postBase} ${style.extendedPostContainer}`}
		>
			<div className={style.extendedPostImageContainer}>
				<img
					loading={imageLoading}
					className={style.extendedPostImage}
					src={post.bannerImg}
					alt=""
				/>
			</div>
			<div className={style.postContainer}>
				<a href={`/posts/${post.slug}`} className={`${style.postHeaderBase}`}>
					<h2 className={`text-style-headline-2`}>{post.title}</h2>
				</a>
				<PostCardMeta post={post} unicornProfilePicMap={unicornProfilePicMap} />
			</div>
		</li>
	);
};

export const PostCard = ({
	post,
	class: className = "",
	unicornProfilePicMap,
}: PostCardProps) => {
	return (
		<li
			{...getHrefContainerProps(`/posts/${post.slug}`)}
			className={`${className} ${style.postContainer} ${style.postBase} ${style.regularPostContainer}`}
		>
			<a href={`/posts/${post.slug}`} className={`${style.postHeaderBase}`}>
				<h2 className={`text-style-headline-5`}>{post.title}</h2>
			</a>
			<PostCardMeta post={post} unicornProfilePicMap={unicornProfilePicMap} />
		</li>
	);
};
