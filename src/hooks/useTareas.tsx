import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";
import {
  editarTarea,
  eliminarTarea,
  getAllTareas,
  postNuevaTarea,
} from "../http/tarea";

const useTareas = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    editarUnaTarea,
    eliminarUnaTarea,
  } = tareaStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      editarUnaTarea: state.editarUnaTarea,
      eliminarUnaTarea: state.eliminarUnaTarea,
    }))
  );

  const getTareas = async () => {
    const result = await getAllTareas();
    if (result) setArrayTareas(result);
  };

  const createTarea = async (nuevaTarea: ITarea) => {
    agregarNuevaTarea(nuevaTarea);
    try {
      await postNuevaTarea(nuevaTarea);
      Swal.fire("Exito", "Tarea creada correctamente", "success");
    } catch (error) {
      eliminarTarea(nuevaTarea.id!);
      console.log("Error al crear tarea", error);
    }
  };

  const putTarea = async (nuevaTarea: ITarea) => {
    const estadoPrevio = tareas.find((tarea) => tarea.id === nuevaTarea.id);
    editarUnaTarea(nuevaTarea);
    try {
      await editarTarea(nuevaTarea);
      Swal.fire("Exito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) editarUnaTarea(estadoPrevio);
      console.log("Error al editar tarea", error);
    }
  };

  const deleteTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((tarea) => tarea.id === idTarea);
    const confirm = await Swal.fire({
      title: "¿Estas seguro de eliminar la tarea?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;
    eliminarUnaTarea(idTarea);

    try {
      await eliminarTarea(idTarea);
      Swal.fire("Eliminado", "Tarea eliminada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log("Error al eliminar tarea", error);
    }
  };

  return {
    tareas,
    getTareas,
    createTarea,
    putTarea,
    deleteTarea,
  };
};

export default useTareas;
