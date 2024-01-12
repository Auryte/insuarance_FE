import { NextRouter } from 'next/router';

export type NavigationLinkProps = {
  href: string;
  text: string;
  router: NextRouter;
};
