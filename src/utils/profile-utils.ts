/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Calculates job seeker profile completion percentage based on filled fields.
 * This is the single source of truth for both Sidebar, Dashboard, and Profile views.
 *
 * @param data - The user data or profile object
 * @returns Completion percentage (0-100)
 */
export const calculateJobSeekerProfileCompletion = (data: any): number => {
  if (!data) return 20; // Base: Account Created

  // If a raw user object is passed (has a 'profile' object), extract its nested profile
  const profile = data.profile ? data.profile : data;

  let progress = 20; // Base: Account Created
  if (profile.avatarUrl) progress += 5;
  if (profile.bio) progress += 5;
  if (profile.location) progress += 5;
  if (profile.headline) progress += 5;

  if (profile.skills && profile.skills.length > 0) progress += 10;
  if (profile.education && profile.education.length > 0) progress += 10;
  if (profile.workExperiences && profile.workExperiences.length > 0) progress += 10;

  if (profile.projects && profile.projects.length > 0) progress += 5;
  if (profile.volunteers && profile.volunteers.length > 0) progress += 5;
  if (profile.awards && profile.awards.length > 0) progress += 5;
  if (profile.publications && profile.publications.length > 0) progress += 5;
  if (profile.references && profile.references.length > 0) progress += 5;
  if (profile.languages && profile.languages.length > 0) progress += 5;

  if (profile.address) progress += 5;
  if (profile.preference) progress += 5;

  return Math.min(progress, 100);
};
