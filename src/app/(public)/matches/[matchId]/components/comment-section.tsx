import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HeartIcon, MessageSquare, Send, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname, useRouter } from "next/navigation";

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string | null;
  parentId: string | null;
  likesCount: number;
  repliesCount: number;
  author: {
    image: string | null;
    name: string;
    id: string;
    role: string;
    email: string;
  };
};

const CommentSection = ({ matchId }: { matchId?: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchComments = async () => {
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

    if (matchId) {
      fetchComments();
    }
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

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Comment Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24 disabled:cursor-not-allowed"
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
          comments?.map((comment) => (
            <Card
              key={comment.id}
              className="hover:shadow-md transition-shadow"
            >
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
                            onClick={() => handleDeleteComment(comment.id)}
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
                      <Button variant="ghost" size="sm" className="flex gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {comment.repliesCount}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
