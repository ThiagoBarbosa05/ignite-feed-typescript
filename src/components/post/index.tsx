import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "../avatar";
import { Comments } from "../comments";
import styles from "./post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  post: PostType
}

export function Post({post }: PostProps) {
  const [comments, setComments] = useState(['Post muito bacana, hein?!']);
  const [newComment, setNewComment] = useState("");

  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewComment(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handlePublicComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newComment]);
    setNewComment("");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(
      (comment) => comment !== commentToDelete
    );

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newComment.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.profile}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.profileInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <div>
          <time
            title={publishedDateFormatted}
            dateTime={post.publishedAt.toISOString()}
          >
            {publishedDateRelativeToNow}
          </time>
        </div>
      </header>
      <section className={styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </section>
      <form onSubmit={handlePublicComment} className={styles.commentForm}>
        <p>Deixe seu feedback</p>
        <textarea
          name="comment"
          onChange={handleNewCommentChange}
          value={newComment}
          placeholder="Deixe um comentário"
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      {comments.map((comment) => (
        <Comments
          key={comment}
          content={comment}
          onDeleteComment={deleteComment}
        />
      ))}
    </article>
  );
}
