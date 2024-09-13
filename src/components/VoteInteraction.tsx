import { useState } from "react";
import { Post, PostSnippetFragment, useMeQuery, useVoteMutation } from "../generated/graphql";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useErrorContext } from "../context/ErrorContext";
import { gql } from "@apollo/client";

interface VoteInteractionProps {
  post: PostSnippetFragment;
  variant?: "singlePost" | "postLayout"
}

const VoteInteraction: React.FC<VoteInteractionProps> = ({ post, variant = "postLayout" }) => {
  const {data} = useMeQuery();
  const [vote, _] = useVoteMutation({
    update: (cache, { data: mutationResult }) => {
      if (!mutationResult) return;
      const {vote} = mutationResult;
      const postFragmentRead = cache.readFragment<Post>({
        id: "Post:" + vote?.postId,
        fragment: gql`
          fragment PostFragmentRead on Post {
            points
          }
        `,
      });
      cache.writeFragment<Partial<Post>>({
        id: "Post:" + vote?.postId,
        fragment: gql`
          fragment PostFragmentWrite on Post {
            points,
            voteStatus
          }
        `,
        data: {
          points: postFragmentRead!.points + vote?.value!,
          voteStatus: vote?.status == "new" ? vote.value : vote?.status == "changed" ? vote.value / 2 : null
        }
      });
    },
  });
  const { setError } = useErrorContext();
  const [voteStatus, setVoteStatus] = useState<
    "upvote" | "downvote" | "novote"
  >("novote");

  return (
    <Flex
      borderRightWidth={variant == "postLayout" ? 1 : ''}
      borderRightColor={"gray.700"}
      p={variant == "postLayout" ? "1.25rem" : ""}
      direction={variant == "postLayout" ? "column" : "row"}
      justifyContent={variant == "postLayout" ? "space-between" : ""}
      alignItems={variant == "postLayout" ? "center" : ""}
    >
      <IconButton
        icon={<ChevronUpIcon boxSize={6} />}
        aria-label="Upvote post"
        isLoading={voteStatus === "upvote"}
        bg={post.voteStatus == 1 ? "green.400" : "gray.100"}
        isDisabled={data?.whoAmI?.id == post.user.id}
        onClick={async () => {
          setVoteStatus("upvote");
          try {
            await vote({ variables: { postId: post.id, value: 1 } });
          } catch (error) {
            setError({
              newError: true,
              type: error.graphQLErrors[0]?.extensions.code,
              message: error.graphQLErrors[0]?.message,
            });
          } finally {
            setVoteStatus("novote");
          }
        }}
      />
      <Text as={"span"} fontSize={"2xl"} mx={variant == "singlePost" ? 2 : 0}>
        {post.points}
      </Text>
      <IconButton
        icon={<ChevronDownIcon boxSize={6} />}
        aria-label="Downvote post"
        isLoading={voteStatus === "downvote"}
        bg={post.voteStatus == -1 ? "red.400" : "gray.100"}
        isDisabled={data?.whoAmI?.id == post.user.id}
        onClick={async () => {
          setVoteStatus("downvote");
          try {
            await vote({ variables: { postId: post.id, value: -1 } });
          } catch (error) {
            setError({
              newError: true,
              type: error.graphQLErrors[0]?.extensions.code,
              message: error.graphQLErrors[0]?.message,
            });
          } finally {
            setVoteStatus("novote");
          }
        }}
      />
    </Flex>
  );
};

export default VoteInteraction;