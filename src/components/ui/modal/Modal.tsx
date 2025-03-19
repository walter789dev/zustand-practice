import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import { ITarea } from "../../../types/ITarea";
import styles from "./Modal.module.css";
import useTareas from "../../../hooks/useTareas";

type PropsModal = {
  handlerCloseModal: () => void;
};

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
};

const Modal: FC<PropsModal> = ({ handlerCloseModal }) => {
   const tareaActiva = tareaStore((state) => state.tareaActiva);
   const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  const [formValue, setFormValue] = useState<ITarea>(initialState);
  const { createTarea, putTarea } = useTareas();

  const handlerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [`${name}`]: value,
    }));
  };

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tareaActiva) {
      putTarea(formValue);
    } else {
      createTarea({ ...formValue, id: new Date().toDateString() });
     }
     setTareaActiva(null)
     handlerCloseModal()
  };

  useEffect(() => {
    if (tareaActiva) setFormValue(tareaActiva);
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.popUp}>
        <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
      <form className={styles.form} onSubmit={handlerSubmit}>
        <div>
          <input
            name="titulo"
            placeholder="Ingrese un titulo"
            type="text"
            value={formValue.titulo}
            onChange={handlerChange}
            required
            autoComplete="off"
          />
          <textarea
            name="descripcion"
            placeholder="Ingrese una descripcion"
            value={formValue.descripcion}
            onChange={handlerChange}
            required
          />
          <input
            name="fechaLimite"
            type="date"
            value={formValue.fechaLimite}
            onChange={handlerChange}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.botones}>
          <button onClick={handlerCloseModal}>Cancelar</button>
          <button type="submit">
            {tareaActiva ? "Editar Tarea" : "Crear Tarea"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Modal;
