import { IContributor } from '@/types/Contributors';

export const Contributor: IContributor[] = [
  {
    name: 'Debangan Paul Chowdhury',
    role: 'Full Stack Developer',
    contributions: [
      {
        title: 'Added an icon with text instead of the Login to Create Projects text',
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
        title: 'add show/hide password feature for sign-in and login page',
        description:
          'Implemented a show/hide password feature for the sign-in and login pages to enhance user experience.',
        issueNumber: 21,
        prNumber: 27,
        ScopeofChange: 'UI/UX',
      },
      {
        title: 'docs: include local setup instructions in readme ',
        description:
          'Added Documentation for local setup',
        issueNumber: 23,
        prNumber: 26,
        ScopeofChange: "Documentation",
      },
    ],
    githubUsername: 'pratyushsingha',
    rewviewWords: 'hola! Happy Hacking 2023',
  },
];
