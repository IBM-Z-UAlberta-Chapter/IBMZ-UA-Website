/**
 * Central chapter configuration for the IBM Z UAlberta Chapter web app.
 *
 * Non-developers & incoming execs: update official links and contact addresses
 * in this single file—all navigation buttons, footers, and cards pull from here.
 * Any remaining unconfirmed placeholders are clearly marked with `TODO`.
 */

/** Official IBM Z UAlberta Chapter Google Form for new student memberships. */
export const JOIN_FORM_URL = 'https://forms.gle/CdvncDrEwxqctv4V7';

/** Official student chapter contact email addresses listed across footer and sponsor pages. */
export const CLUB_EMAILS = ['rsethi3@ualberta.ca', 'yzhou44@ualberta.ca'] as const;

/** Primary chapter contact email used as default fallback when a single string is required. */
export const CLUB_EMAIL = CLUB_EMAILS[0];

/** Official chapter Discord server invite URL for lab updates, Q&A, and community chat. */
export const DISCORD_URL = 'https://discord.gg/nvnH6vgTY';

/** Official IBM Z UAlberta Chapter LinkedIn company page. */
export const LINKEDIN_URL = 'https://www.linkedin.com/company/ibm-z-ualberta-chapter/';

// TODO: Replace with the official chapter GitHub organization URL once finalized
export const GITHUB_URL = 'https://github.com/TODO-ibmz-ualberta';

// TODO: Replace with the official chapter Instagram profile URL once finalized
export const INSTAGRAM_URL = 'https://instagram.com/TODO-ibmz-ualberta';

/** Local static path to the official chapter logo asset. */
export const CLUB_LOGO_PATH = '/assets/aistudio/IMG-20261113-WA0012_c6b3c3a9.jpg';
