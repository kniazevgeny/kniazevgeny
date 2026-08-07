export const publishActiveProject = (
  currentId: string,
  nextId: string,
  publish: (projectId: string) => void
) => {
  if (currentId === nextId) return false
  publish(nextId)
  return true
}
