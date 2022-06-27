export const sidebarItems = [
  {
    title: 'Tus Proyectos',
    icon: 'bx bxs-briefcase',
    links: [
      { title: 'Lista de Proyectos', to: '/dashboard/projects/list', icon: 'bx bx-list-ul' },
      { title: 'Crear un Proyecto', to: '/dashboard/projects', icon: 'bx bx-folder-plus' },
    ],
  },
  {
    title: 'Estimaciones',
    icon: 'bx bxs-hard-hat',
    links: [
      { title: 'Lista de estimaciones', to: '/dashboard/estimations/list', icon: 'bx bx-list-ul' },
      { title: 'Nueva estimación', to: '/dashboard/estimations', icon: 'bx bx-stopwatch' },
      // { title: 'Tipos de Estimaciones', to: '/dashboard/estimations-types', icon: 'bx bx-category' } ,
    ],
  },
  {
    title: 'Tags - Etiquetas',
    icon: 'bx bxs-purchase-tag-alt',
    links: [
      { title: 'Crear nueva etiqueta', to: '/dashboard/tags', icon: 'bx bx-bookmark-alt-plus' },
    ],
  },
  {
    title: 'Resultados',
    icon: 'bx bxs-folder',
    links: [
      { title: 'Ver Resultados', to: '', icon: 'bx bxs-folder-open' },
      { title: 'Lista de Resultados', to: '', icon: 'bx bx-list-ul' },
    ],
  },
  {
    title: 'Conceptos y Teoría',
    icon: 'bx bxs-graduation',
    links: [
      { title: 'Reseña Historica', to: '', icon: 'bx bx-book-reader' },
      { title: 'Métrica', to: '', icon: 'bx bx-package' },
      { title: 'Modelos', to: '', icon: 'bx bx-border-none' },
    ],
  },
  {
    title: 'Documentación',
    icon: 'bx bxs-file-doc',
    links: [
      { title: 'Ir a documentación', to: '', icon: 'bx bx-link-alt' },
    ],
  },
]
