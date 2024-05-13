import React, { memo } from "react";
import { useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import Author from "./Author";
import Like from "./Like";
import Tags from "./Tags";
import Recommend from "./Recommend";
import { BOARD_QUERY_KEYS } from "../../../../constants/queryKeys";
import { checkDisLike, checkLike } from "../../../../apis/board";
import { BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES } from "../../../../constants/category";
import Loader from "../../../Common/Loader";
import { isLoggedInState } from "../../../../recoil/atoms/auth";

const PostInfo = ({
  postId,
  author: { imageUrl, name },
  likeCount,
  dislikeCount,
  tags,
}) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isProjectOrStudy = !BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES.includes(type);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [
    { data: likedData, isLoading: isLikedLoading },
    { data: dislikedData, isLoading: isDisLikedLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: BOARD_QUERY_KEYS.checkLike(postId),
        queryFn: () => checkLike({ postId, category: type.toUpperCase() }),
        enabled: isLoggedIn,
      },
      {
        queryKey: BOARD_QUERY_KEYS.checkDisLike(postId),
        queryFn: () => checkDisLike({ postId, category: type.toUpperCase() }),
        enabled:
          isLoggedIn && BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES.includes(type),
      },
    ],
  });

  if (isLikedLoading || isDisLikedLoading) {
    return <Loader />;
  }
  return (
    <aside className="md:sticky md:top-20 flex flex-col gap-4 p-4 w-full md:w-80 md:h-[calc(100vh-5rem)] md:border-l border-blue-gray-800 overflow-y-auto shrink-0">
      <Tags tags={tags} />
      <div className="flex md:flex-col gap-4 justify-evenly">
        {isProjectOrStudy ? (
          <Recommend
            postId={postId}
            category={type.toUpperCase()}
            likeCount={likeCount}
            isLiked={likedData?.liked}
          />
        ) : (
          <Like
            postId={postId}
            category={type.toUpperCase()}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            isLiked={likedData?.liked}
            isDisLiked={dislikedData?.disliked}
          />
        )}
        <Author imageUrl={imageUrl} name={name} />
      </div>
    </aside>
  );
};

export default memo(PostInfo);
