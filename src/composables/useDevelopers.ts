// useDevelopers.ts
import { computed } from 'vue'
import type { User, Version } from '../types/Service'

export function useDevelopers(versions: Version[]) {
  // Function to extract unique developers
  const extractDevelopers = computed(() => {
    const developerSet = new Set<string>()
    const developers: User[] = []

    versions.forEach(version => {
      if (!developerSet.has(version?.developer?.id)) {
        developerSet.add(version?.developer?.id)
        developers.push(version?.developer)
      }
    })

    return developers
  })

  return {
    developers: extractDevelopers,
  }
}
