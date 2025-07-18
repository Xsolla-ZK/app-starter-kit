import { ContentStack, RichIcon, SemanticText, styled, Text } from '@app/ui';
import { TextLink } from 'solito/link';
import { LogoXSollaZK } from '../icons/logo-xsolla-zk';

const Link = styled(
  TextLink,
  {
    color: '$content.brand-primary',
  },
  {
    isText: true,
  },
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <ContentStack>
      <SemanticText variant="paragraphS" color="$content.neutral-tertiary" textAlign="center">
        By creating account, you agree to the Xsolla ZK’s <Link href="/terms">Terms</Link> and{' '}
        <Link href="/privacy">Privacy Policy</Link>
      </SemanticText>
      <SemanticText
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        variant="paragraphS"
        color="$content.neutral-tertiary"
        gap="$space.100"
      >
        {currentYear}
        <Text
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="$space.50"
        >
          <RichIcon size="$100" shape={false}>
            <RichIcon.Icon icon={LogoXSollaZK} />
          </RichIcon>
          Xsolla ZK LLC (USA), Inc.
        </Text>
      </SemanticText>
    </ContentStack>
  );
}
