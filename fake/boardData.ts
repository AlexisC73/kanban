export const fakeBoardData = [
  {
    id: 'board-1',
    name: 'Board 1',
    columns: [
      {
        id: 'column-1',
        name: 'Todo',
        tasks: [
          {
            id: 'task-1',
            title: 'Continuer le projet',
            subtasks: [
              {
                id: 'subtask-1',
                title: 'Faire le header',
                completed: false
              },
              {
                id: 'subtask-2',
                title: 'Faire le footer',
                completed: true
              }
            ]
          },
          {
            id: 'task-4',
            title: 'Faire à manger',
            subtasks: []
          }
        ]
      },
      {
        id: 'column-2',
        name: 'In progress',
        tasks: [
          {
            id: 'task-2',
            title: 'Formation Craft Academy',
            subtasks: []
          }
        ]
      }
    ]
  },
  {
    id: 'board-2',
    name: 'Board 2',
    columns: [
      {
        id: 'column-3',
        name: 'Todo',
        tasks: [
          {
            id: 'task-3',
            title: 'task 3',
            subtasks: []
          }
        ]
      }
    ]
  }
]

export const allBoards = fakeBoardData.map(b => ({ id: b.id, name: b.name }))
