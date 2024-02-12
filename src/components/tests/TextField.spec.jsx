import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  await render(<TextField className="my-class" />);

  const TextInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  expect(TextInput).toHaveClass('my-class');
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);

    const TextInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    expect(TextInput).toBeInTheDocument();
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const TextInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(TextInput).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다..', async () => {
  const handleChange = vi.fn();
  const { user } = await render(<TextField onChange={handleChange} />);

  const TextInput = screen.getByRole('textbox');

  await user.type(TextInput, 'test');

  expect(handleChange).toBeCalledWith('test');
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const handleEnter = vi.fn();
  const { user } = await render(<TextField onEnter={handleEnter} />);

  const TextInput = screen.getByRole('textbox');

  await user.type(TextInput, 'test{Enter}');

  expect(handleEnter).toBeCalled();
});

it('focus가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  const handleFocus = vi.fn();
  const { user } = await render(<TextField onFocus={handleFocus} />);

  const TextInput = screen.getByRole('textbox');

  await user.click(TextInput);

  expect(handleFocus).toBeCalled();
});

it('focus가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const TextInput = screen.getByRole('textbox');

  await user.click(TextInput);

  expect(TextInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25, 118, 210)',
  });
});
