export interface TheorySegment {
  type: 'text' | 'formula'
  value: string
}

/** Splits a theory string on backtick-delimited spans, marking each as plain text or a formula/special-construction segment to render as a highlighted chip. */
export function parseFormulaMarkup(theory: string): TheorySegment[] {
  const parts = theory.split(/`([^`]+)`/g)

  return parts
    .map((value, index) => ({ type: index % 2 === 1 ? ('formula' as const) : ('text' as const), value }))
    .filter((segment) => segment.value !== '')
}
