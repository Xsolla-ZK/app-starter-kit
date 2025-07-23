import { type TamaguiElement, useTheme } from '@app/ui';
import { Canvas, Group, Path, Skia } from '@shopify/react-native-skia';
import { getSvgPath } from 'figma-squircle';
import type { ForwardedRef } from 'react';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  interpolate,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BoardFrame } from './board.styled';
import type { BoardProps } from './board.types';

export const Board = BoardFrame.styleable<BoardProps>(
  forwardRef(({ children, backgroundColor, ...props }, ref: ForwardedRef<TamaguiElement>) => {
    const [layout, setLayout] = useState<{ width: number; height: number } | null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLayout = (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;
      if (width > 0 && height > 0) {
        setLayout({ width, height });
      }
    };

    const handlePressIn = () => {
      setIsPressed(true);
    };
    const handlePressOut = () => setIsPressed(false);
    const handleHoverIn = () => setIsHovered(true);
    const handleHoverOut = () => setIsHovered(false);

    return (
      <BoardFrame
        group={props.pressable}
        tag={props.pressable ? 'button' : undefined}
        onLayout={handleLayout}
        onPressIn={props.pressable ? handlePressIn : undefined}
        onPressOut={props.pressable ? handlePressOut : undefined}
        onHoverIn={props.pressable ? handleHoverIn : undefined}
        onHoverOut={props.pressable ? handleHoverOut : undefined}
        {...props}
        ref={ref}
      >
        {props.pressable && layout && (
          <SquircleBackground
            width={layout.width}
            height={layout.height}
            // backgroundColor={props.backgroundColor}
            borderRadius={props.borderRadius}
            borderTopLeftRadius={props.borderTopLeftRadius}
            borderTopRightRadius={props.borderTopRightRadius}
            borderBottomLeftRadius={props.borderBottomLeftRadius}
            borderBottomRightRadius={props.borderBottomRightRadius}
            isPressed={isPressed}
            isHovered={isHovered}
          />
        )}
        {children}
      </BoardFrame>
    );
  }),
);

type SquircleBackgroundProps = {
  width: number;
  height: number;
  backgroundColor?: string;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  isPressed?: boolean;
  isHovered?: boolean;
};

function SquircleBackground({
  width,
  height,
  backgroundColor,
  borderRadius = 24,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  isPressed,
  isHovered,
}: SquircleBackgroundProps) {
  const theme = useTheme();
  const path = useMemo(() => {
    const svgPath = getSvgPath({
      width: width,
      height: height,
      cornerRadius: borderRadius,
      topLeftCornerRadius: borderTopLeftRadius ?? borderRadius,
      topRightCornerRadius: borderTopRightRadius ?? borderRadius,
      bottomLeftCornerRadius: borderBottomLeftRadius ?? borderRadius,
      bottomRightCornerRadius: borderBottomRightRadius ?? borderRadius,
      cornerSmoothing: 0.6,
      preserveSmoothing: true,
    });
    return svgPath;
  }, [
    width,
    height,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  ]);

  const foregroundColor = theme['$background.brand-high']?.val;

  const overlayColor =
    theme[isPressed ? '$background.static-dark-high' : '$overlay.static-light']?.val;

  const opacity = isPressed ? 0.3 : isHovered ? 0.5 : 0;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isPressed ? 1 : 0, {
      duration: 200,
      // easing: Easing.inOut(Easing.ease),
    });
  }, [isPressed]);

  const animatedColor = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 1], ['#00C853', '#FF4081']),
  );

  const animatedOvelayOpacity = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, 0.3]),
  );

  const borderPath = Skia.Path.MakeFromSVGString(path)
    ?.copy()
    .transform(Skia.Matrix().scale(0.985, 0.985)); // "внутрь"

  // console.log({ foregroundColor, overlayColor, opacity, progress: progress.value });

  return (
    <Canvas style={{ width: width, height: height, position: 'absolute' }}>
      <Path path={path} color={foregroundColor} />
      <Group opacity={opacity} blendMode="overlay">
        <Path path={path} color={overlayColor} />
        <Path
          path={path}
          style="stroke"
          strokeWidth={1}
          color={theme['$border.neutral-primary']?.val}
        />
      </Group>
      {/* <Path
        path={borderPath}
        style="stroke"
        strokeWidth={1}
        strokeJoin="round"
        color={theme['$border.neutral-primary']?.val}
      /> */}
    </Canvas>
  );
}
