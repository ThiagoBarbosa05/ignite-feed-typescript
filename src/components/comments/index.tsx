import { Avatar } from "../avatar";
import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./comments.module.css";
import { useState } from "react";


interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comments({content, onDeleteComment}: CommentProps) {

  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComent() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount(like => {
      return like + 1
    })
  }
  return (
    <section className={styles.CommentsWrapper}>
      <Avatar hasBorder={false} src="https://github.com/ThiagoBarbosa05.png" />

      <div className={styles.commentsBox}>
        <div className={styles.content}>
          <header>
            <div className={styles.infoUser}>
              <strong>Thiago Barbosa</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">
                Cerca de 1h atrás
              </time>
            </div>
            <button title="Deletar comentario" onClick={handleDeleteComent}>
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </section>
  );
}
