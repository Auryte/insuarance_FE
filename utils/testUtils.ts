import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { screen } from '@/test-utils/testing-library-utils';

export const mockAlert = async (user: UserEvent, message: string) => {
  const alert = await screen.findByRole<HTMLInputElement>('alert');
  const buttonClose = await screen.findByRole<HTMLInputElement>('button', { name: 'Close' });
  expect(alert).toBeInTheDocument();
  expect(screen.getByText(message)).toBeVisible();
  expect(buttonClose).toBeInTheDocument();

  await user.click(buttonClose);

  expect(alert).not.toBeVisible();
};
