import { ChevronRight } from '@xsolla-zk/icons';
import type { CellProps } from '@xsolla-zk/react';
import { Cell, List, RichIcon } from '@xsolla-zk/react';

export function Card({ children, ...props }: CellProps) {
  return (
    <Cell withBoard pressable {...props}>
      <Cell.Content>
        <List>
          <List.Row>
            <List.Title>{children}</List.Title>
          </List.Row>
        </List>
      </Cell.Content>
      <Cell.Slot>
        <RichIcon shape={false} size="$200">
          <RichIcon.Icon icon={ChevronRight} color="$content.neutral-tertiary" />
        </RichIcon>
      </Cell.Slot>
    </Cell>
  );
}
