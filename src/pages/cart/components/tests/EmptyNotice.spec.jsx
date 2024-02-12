import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');

  return { ...origin, useNavigate: () => navigateFn };
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  const LinkButton = screen.getByRole('link');

  await user.click(LinkButton);

  expect(navigateFn).toBeCalledWith('/');
});
