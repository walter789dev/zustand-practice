import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./CardList.module.css";
import useTareas from "../../../hooks/useTareas";

type CardListProps = {
  tarea: ITarea;
  handlerOpenModalEdit: (tarea: ITarea) => void;
};

const CardList: FC<CardListProps> = ({ tarea, handlerOpenModalEdit }) => {
  const { deleteTarea } = useTareas();

  const eliminarTarea = () => {
    deleteTarea(tarea.id!);
  };

  const editarTarea = () => {
    handlerOpenModalEdit(tarea);
  };

  return (
    <div className={styles.card}>
      <span>📚</span>
      <div>
        <h3>{tarea.titulo}</h3>
        <p>
          <b>Descripción:</b> {tarea.descripcion}
        </p>
        <p>
          <b>Fecha Limite:</b> {tarea.fechaLimite}
        </p>
      </div>
      <div className={styles.cardActions}>
        <button onClick={editarTarea}>Editar</button>
        <button onClick={eliminarTarea}>Eliminar</button>
      </div>
    </div>
  );
};

export default CardList;
