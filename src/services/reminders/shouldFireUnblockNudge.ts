/** True exactly on the blocked -> available transition of the English separation status. */
export function shouldFireUnblockNudge(wasBlocked: boolean, isBlocked: boolean): boolean {
  return wasBlocked && !isBlocked
}
