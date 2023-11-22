export const boardBuilder = ({
  columns = [],
  name = 'Board name',
  id = 'board-id'
}: {
  columns?: string[]
  name?: string
  id?: string
} = {}) => {
  const props = { id, name, columns }
  return {
    withColumns: (...columns: string[]) => boardBuilder({ ...props, columns }),
    withName: (name: string) => boardBuilder({ ...props, name }),
    withId: (id: string) => boardBuilder({ ...props, id }),
    build: () => props
  }
}
