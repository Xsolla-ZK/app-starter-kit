import type { GetProps } from '@app/ui';
import type { BoardFrame } from './board.styled';

type BoardSharedProps = GetProps<typeof BoardFrame>;

export interface BoardProps extends BoardSharedProps {}
