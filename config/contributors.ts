import { IContributor } from '@/types/Contributors';

export const Contributor: IContributor[] = [
  {
    name: 'Debangan Paul Chowdhury',
    role: 'Full Stack Developer',
    contributions: [
      {
        title:
          'Added an icon with text instead of the Login to Create Projects text',
        description:
          'Added an icon with text instead of the Login to Create Projects text',
        issueNumber: 14,
        prNumber: 16,
        ScopeofChange: 'UI/UX',
      },
    ],
    githubUsername: 'Debangan202Ok',
    rewviewWords: 'hola! Happy Hacking 2023',
  },
  {
    name: 'Pratyush Singha',
    role: 'Frontend Developer',
    contributions: [
      {
        title: 'docs: include local setup instructions in readme ',
        description: 'Added Documentation for local setup',
        issueNumber: 23,
        prNumber: 26,
        ScopeofChange: 'Documentation',
      },
      {
        title: 'Enhance Password Strength Validation',
        description:
          'Implemented a visual experience that shown user that resembles the password strength,Like a long strip which turns red,yellow,blue,green as user password is more secured',
        issueNumber: 29,
        prNumber: 30,
        ScopeofChange: 'UI/UX',
      },
    ],
    githubUsername: 'pratyushsingha',
    rewviewWords: 'hola! Happy Hacking 2023',
  },
];
