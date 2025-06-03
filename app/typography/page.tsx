'use client';

import {
  Markdown,
  SegmentedControl,
  SemanticText,
  Stack,
  Text,
  Typography,
} from '@xsolla-zk/react';
import { useState } from 'react';
import { ContentStack } from '~/components/stacks/content-stack';

const typographyContent = {
  typography: {
    title: 'Typography',
    content: <TypographyContent />,
  },
  'semantic-text': {
    title: 'Semantic Text',
    content: <SemanticTextContent />,
  },
  markdown: {
    title: 'Markdown',
    content: <MarkdownContent />,
  },
};

type TypographyContentKeys = keyof typeof typographyContent;

export default function TypographyScreen() {
  const [activeTab, setActiveTab] = useState<TypographyContentKeys>('typography');

  return (
    <Stack gap="$350">
      <SegmentedControl
        size="$400"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as TypographyContentKeys);
        }}
      >
        {Object.keys(typographyContent).map((key) => (
          <SegmentedControl.Item key={key} value={key}>
            <SegmentedControl.Item.Text>
              {typographyContent[key as TypographyContentKeys].title}
            </SegmentedControl.Item.Text>
          </SegmentedControl.Item>
        ))}
      </SegmentedControl>
      <ContentStack>{typographyContent[activeTab].content}</ContentStack>
    </Stack>
  );
}

function TypographyContent() {
  return (
    <>
      <Typography preset="display.400.accent">Typography</Typography>
      <Typography paddingTop="$200" preset="text.300.default">
        The Typography component centralizes every available font style and size in one
        place—letting you switch freely between <Text fontWeight="$accent">weights</Text> and
        numeric variants for ultimate flexibility and precision in your text styling
      </Typography>
    </>
  );
}
function SemanticTextContent() {
  return (
    <>
      <SemanticText variant="headerM">Semantic Text</SemanticText>
      <SemanticText variant="paragraphM">
        This component delivers ready-made heading and paragraph styles with built-in spacing for
        seamless stacking—no manual margin math required.
      </SemanticText>
      <SemanticText variant="paragraphM">
        It’s fully responsive, automatically adjusting text sizes across breakpoints, and still lets
        you tweak font weights and numeric variants for precise control.
      </SemanticText>
    </>
  );
}

function MarkdownContent() {
  return (
    <>
      <Markdown variant="h3">Markdown Component</Markdown>
      <Markdown variant="h5">Ready for Rich Content</Markdown>
      <Markdown variant="p">
        The Markdown component is a plug-and-play solution for rendering large volumes of text. It
        preserves consistent vertical rhythm across multiple paragraphs, ensuring clear separation
        and comfortable reading flow without manual spacing adjustments.
      </Markdown>
      <Markdown variant="p">
        Use it to display long-form articles, documentation, or any richly formatted content.
      </Markdown>
    </>
  );
}
