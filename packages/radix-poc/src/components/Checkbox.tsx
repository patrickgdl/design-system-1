import React, { FC, ComponentProps } from 'react';
import styled from 'styled-components';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import { space, SpaceProps, themeGet } from 'styled-system';

type CheckboxProps = SpaceProps & ComponentProps<'input'>;

// TODO: Styled System is missing some spacing props in `propTypes`
// https://github.com/styled-system/styled-system/issues/466
const spacePropNames = [
  ...Object.keys(space.propTypes || {}),
  'mx',
  'my',
  'px',
  'py',
];

export const Checkbox: FC<CheckboxProps> = ({ children, ...props }) => {
  const spaceProps = pick(props, spacePropNames);
  const inputProps = omit(props, spacePropNames);

  return (
    <CheckboxWrapper {...spaceProps}>
      <Input type="checkbox" {...inputProps} />
      <FakeCheckbox>
        <CheckedIcon
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
        >
          <path
            d="M11.5 3.5L6.5 11.5L3.5 8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </CheckedIcon>
      </FakeCheckbox>
      {children && <TextWrapper>{children}</TextWrapper>}
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled.label<SpaceProps>`
  position: relative;

  ${space}
`;

const Input = styled.input`
  appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  outline: none;
  margin: 0;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const TextWrapper = styled.span`
  line-height: ${themeGet('space.5')};
  font-family: ${themeGet('fonts.normal')};
  font-size: ${themeGet('fontSizes.2')};
  margin-left: ${themeGet('space.1')};
  margin-right: ${themeGet('space.3')};
  user-select: none;
  vertical-align: middle;
`;

const FakeCheckbox = styled.div`
  width: ${themeGet('space.3')};
  height: ${themeGet('space.3')};
  border-radius: ${themeGet('radii.1')};
  box-shadow: inset 0 0 0 1px ${themeGet('colors.grays.3')};
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${Input}:hover + & {
    box-shadow: inset 0 0 0 1px ${themeGet('colors.grays.4')};
  }

  ${Input}:focus + & {
    box-shadow: inset 0 0 0 1px ${themeGet('colors.blues.4')};
  }

  ${Input}:checked + & {
    background-color: ${themeGet('colors.blues.4')};
    box-shadow: inset 0 0 0 1px ${themeGet('colors.blues.4')};
    color: ${themeGet('colors.white')};
  }
`;

const CheckedIcon = styled.svg`
  display: block;
`;