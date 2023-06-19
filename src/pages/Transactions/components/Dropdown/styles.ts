import { DotsThreeOutlineVertical } from "phosphor-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import styled from "styled-components";

export const Dots = styled(DotsThreeOutlineVertical).attrs(() => ({
  size: 32,
  weight: "fill",
}))`
  cursor: pointer;
`;

export const DropdownContent = styled(DropdownMenu.Content)`
  background: ${(props) => props.theme["gray-600"]};
`;

export const DropdownItem = styled(DropdownMenu.Item)`
  padding: 0.8rem 2rem;

  display: flex;
  gap: 0.6rem;
  align-items: center;

  &:not(:nth-last-child(1)) {
    border-bottom: 1px solid ${(props) => props.theme["gray-700"]};
  }
`;
