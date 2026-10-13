import { profile } from '../data/profile';

/** Joins items as "a, b and c". */
export function joinWithAnd(items: readonly string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

/** "Hyderabad, India · open to remote or relocation · looking for ... roles, especially on ...." */
export function availabilityLine(): string {
  const roles = joinWithAnd(profile.targetRoles);
  return `${profile.location} · ${profile.availability} · looking for ${roles} roles, especially on ${profile.focus}.`;
}

/** "Granular AI · 2022 - Present · AI technical lead since 2024, ML engineer 2022-2023" */
export function employmentLine(): string {
  const { name, start, roles } = profile.employer;
  const roleText = roles
    .map((role) => ('end' in role ? `${role.title} ${role.start}-${role.end}` : `${role.title} since ${role.start}`))
    .join(', ');
  return `${name} · ${start} - Present · ${roleText}`;
}
