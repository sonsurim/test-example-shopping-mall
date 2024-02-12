import { screen } from '@testing-library/react';
import React from 'react';

import NotFoundPage from '@/pages/error/components/NotFoundPage';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');

  return { ...origin, useNavigate: () => navigateFn };
});

it('Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  const { user } = await render(<NotFoundPage />);

  const HomeButton = screen.getByRole('button', { name: 'Home으로 이동' });

  await user.click(HomeButton);

  expect(navigateFn).toBeCalledWith('/', { replace: true });
});
