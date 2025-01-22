import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HeartIcon, MessageSquare, Send, Trash2, Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname, useRouter } from "next/navigation";

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  matchId: number;
  parentId: string | null;
  likesCount: number;
  repliesCount: number;
  author: {
    id: string;
    name: string;
    image: string | null;
    email: string;
    role: string;
  };
};

interface CommentCardProps {
  comment: Comment;
  onDelete: (commentId: string) => Promise<void>;
  onReply: (parentId: string, content: string) => Promise<void>;
  deleting: string | null;
  matchId: number;
}

const CommentCard = ({
  comment,
  onDelete,
  onReply,
  deleting,
  matchId,
}: CommentCardProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [postingReply, setPostingReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<Comment[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleShowReplies = async () => {
    if (!showReplies && comment.repliesCount > 0) {
      setLoadingReplies(true);
      try {
        const response = await fetch(
          `/api/football/comments?matchId=${matchId}&parentId=${comment.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setReplies(data);
        }
      } catch (error) {
        console.error("Failed to fetch replies:", error);
      }
      setLoadingReplies(false);
    }
    setShowReplies(!showReplies);
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !user?.id) {
      if (!user?.id) {
        router.push(`/auth/sign-in?redirect=${pathname}`);
      }
      return;
    }
    if (postingReply) return;
    try {
      setPostingReply(true);
      await onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
      // Refresh replies if they're currently shown
      if (showReplies) {
        const response = await fetch(
          `/api/football/comments?matchId=${matchId}&parentId=${comment.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setReplies(data);
        }
      }
    } catch (error) {
      console.error("Failed to post reply:", error);
    } finally {
      setPostingReply(false);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow bg-white dark:bg-gray-800 text-black dark:text-white">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={comment.author.image || ""} />
            <AvatarFallback>
              {comment.author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{comment.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {comment.author.role === "admin" && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Admin
                  </span>
                )}
                {user?.id === comment.author.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(comment.id)}
                    disabled={deleting === comment.id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            <p className="mt-2">{comment.content}</p>
            <div className="flex gap-4 mt-4">
              <Button variant="ghost" size="sm" className="flex gap-2">
                <HeartIcon className="w-4 h-4" />
                {comment.likesCount}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex gap-2"
                onClick={() => setIsReplying(!isReplying)}
              >
                <Reply className="w-4 h-4" />
                Reply
              </Button>
              {comment.repliesCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex gap-2"
                  onClick={handleShowReplies}
                >
                  <MessageSquare className="w-4 h-4" />
                  {showReplies ? "Hide" : "Show"} {comment.repliesCount} Replies
                </Button>
              )}
            </div>

            {/* Reply Form */}
            {isReplying && (
              <div className="mt-4">
                <form onSubmit={handleSubmitReply} className="space-y-4">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    disabled={postingReply}
                    className="min-h-20 disabled:cursor-not-allowed dark:bg-gray-400"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      disabled={postingReply}
                      variant="ghost"
                      onClick={() => setIsReplying(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex gap-2">
                      <Send className="w-4 h-4" />
                      Reply
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Replies Section */}
            {showReplies && (
              <div className="mt-4 space-y-4 pl-8 border-l-2">
                {loadingReplies ? (
                  <p className="text-muted-foreground">Loading replies...</p>
                ) : (
                  replies.map((reply) => (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      onDelete={onDelete}
                      onReply={onReply}
                      deleting={deleting}
                      matchId={matchId}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CommentSection = ({ matchId }: { matchId?: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchComments = async () => {
      if (!matchId) return;
      try {
        const response = await fetch(
          `/api/football/comments?matchId=${matchId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError("Failed to Load Comments");
        console.error("Failed to fetch comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [matchId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (commenting) return;
    if (!user?.id) {
      return router.push(`/auth/sign-in?redirect=${pathname}`);
    }
    try {
      setCommenting(true);
      const response = await fetch("/api/football/comments", {
        method: "POST",
        body: JSON.stringify({
          content: newComment,
          matchId,
          authorId: user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments((prev) => [data, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      setError("Failed to post comment");
      console.error("Failed to post comment:", error);
    } finally {
      setCommenting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user?.id || deleting) return;
    try {
      setDeleting(commentId);
      const response = await fetch(`/api/football/comments/${commentId}`, {
        method: "DELETE",
        body: JSON.stringify({
          authorId: user?.id,
        }),
      });

      if (response.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      } else {
        setError("Failed to delete comment");
      }
    } catch (error) {
      setError("Failed to delete comment");
      console.error("Failed to delete comment:", error);
    } finally {
      setDeleting(null);
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    if (!user?.id || !matchId) return;

    try {
      const response = await fetch("/api/football/comments", {
        method: "POST",
        body: JSON.stringify({
          content,
          matchId,
          authorId: user.id,
          parentId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the replies count for the parent comment
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === parentId
              ? { ...comment, repliesCount: comment.repliesCount + 1 }
              : comment
          )
        );
        return data;
      }
    } catch (error) {
      console.error("Failed to post reply:", error);
      throw error;
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Comment Form */}
      <Card className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24 disabled:cursor-not-allowed dark:bg-gray-400"
              disabled={commenting}
            />
            <div className="flex justify-end">
              {user?.id ? (
                <Button
                  disabled={commenting}
                  type="submit"
                  className="flex gap-2 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    router.push(`/auth/sign-in?callbackUrl=${pathname}`)
                  }
                  className="flex gap-2"
                >
                  <Send className="w-4 h-4" />
                  Login to Comment
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={handleDeleteComment}
              onReply={handleReply}
              deleting={deleting}
              matchId={matchId || 0}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
