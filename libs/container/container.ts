export interface Lifecycle {
  onCreate(): Promise<void>
  onDestroy(): Promise<void>
}

export const runOnCreate = async <T>(
  instance: Partial<Lifecycle> & T,
): Promise<T> => {
  if (instance?.onCreate) {
    await instance.onCreate?.()
  }
  return instance
}
export const runOnDestroy = async <T>(
  instance: Partial<Lifecycle> & T,
): Promise<T> => {
  if (instance?.onDestroy) {
    await instance.onDestroy?.()
  }
  return instance
}
