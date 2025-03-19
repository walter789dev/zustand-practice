import { useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import styles from "./ListTareas.module.css";
import CardList from "../cardList/CardList";
import Modal from "../modal/Modal";
import { ITarea } from "../../../types/ITarea";
import useTareas from "../../../hooks/useTareas";

const ListTareas = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const [openModalTarea, setOpenModalTarea] = useState(false);
  const { tareas, getTareas } = useTareas();
  
  const handlerOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };
  
  const handlerCloseModal = () => {
    setOpenModalTarea(false);
  };
  
  useEffect(() => {
    getTareas();
  }, []);

  return (
    <>
      <div className={styles.containerPrincipalTareas}>
        <div className={styles.containerSecundarioTareas}>
          <h2>Lista de Tareas</h2>
          <button 
            onClick={() => {
              setOpenModalTarea(true)
              setTareaActiva(null)
            }}>
            Agregar tarea
          </button>
        </div>
        <div className={styles.containerTareas}>
          {tareas.length > 0 ? (
            tareas.map((tarea) => (
              <CardList
                key={tarea.id}
                tarea={tarea}
                handlerOpenModalEdit={handlerOpenModalEdit}
              />
            ))
          ) : (
            <div>
              <h3>No hay Tareas</h3>
            </div>
          )}
        </div>
      </div>
      {openModalTarea && <Modal handlerCloseModal={handlerCloseModal} />}
    </>
  );
};

export default ListTareas;
