import { create } from 'zustand'
import { ITarea } from '../types/ITarea'

interface ITareaStore {
   tareas: ITarea[]
   tareaActiva: ITarea | null
   setTareaActiva: (tarea: ITarea | null) => void
   setArrayTareas: (tareas: ITarea[]) => void
   agregarNuevaTarea: (tarea: ITarea) => void
   editarUnaTarea: (tarea: ITarea) => void
   eliminarUnaTarea: (idTarea: string) => void
}

export const tareaStore = create<ITareaStore>((set) => ({
   tareas: [],
   tareaActiva: null,
   setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn })),
   setArrayTareas: (tareasIn) => set(() => ({ tareas: tareasIn })),
   agregarNuevaTarea: (tareaIn) => set(({ tareas }) => ({ tareas: [...tareas, tareaIn] })),
   editarUnaTarea: (tareaIn) => set(({ tareas }) => ({ tareas: tareas.map(tarea => tarea.id === tareaIn.id ? tareaIn : tarea) })),
   eliminarUnaTarea: (idTarea) => set(({ tareas }) => ({ tareas: tareas.filter(tarea => tarea.id !== idTarea) }))
}))