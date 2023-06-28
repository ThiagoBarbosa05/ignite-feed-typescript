import { Avatar } from "../avatar";
import styles from "./sidebar.module.css";
import {PencilLine} from 'phosphor-react'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=50" />
      <div className={styles.profile}>
        <Avatar src="https://github.com/ThiagoBarbosa05.png" />
        <strong>Thiago Barbosa</strong>
        <span>web developer</span>
      </div>

      <a  href="#">
        <PencilLine size={20} />
        Editar seu perfil
      </a>
    </aside>
  );
}
