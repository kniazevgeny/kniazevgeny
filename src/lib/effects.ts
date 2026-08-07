export type MajorEffect =
  | 'incision'
  | 'anamorphic'
  | 'organic-matte'
  | 'iris-gate'

export type EffectAccent =
  | 'chromatic'
  | 'prism'
  | 'type-squeeze'
  | 'halation'

export type EffectProfile = {
  major: MajorEffect
  accent: EffectAccent
}

export const revealDurationMs = 1300

const majors: readonly MajorEffect[] = [
  'incision',
  'anamorphic',
  'organic-matte',
  'iris-gate',
]

const accents: readonly EffectAccent[] = [
  'chromatic',
  'prism',
  'type-squeeze',
  'halation',
]

const stableHash = (value: string) => {
  let hash = 0x811c9dc5

  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0
    hash = Math.imul(hash, 0x01000193)
  }

  return hash >>> 0
}

export const getEffectProfile = (
  projectId: string,
  override: Partial<EffectProfile> = {}
): EffectProfile => {
  const hash = stableHash(projectId)

  return {
    major: override.major ?? majors[hash % majors.length],
    accent: override.accent ?? accents[(hash >>> 8) % accents.length],
  }
}
