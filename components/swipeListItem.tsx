import {
  ComponentProps,
  FunctionComponent,
  PropsWithChildren,
  useRef,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useWindowDimensions, View } from "react-native";
import { Button, ButtonIcon } from "@/components/ui/button";

interface SwipeableListItemProps extends PropsWithChildren {
  actionButtons: Array<{
    icon: ComponentProps<typeof ButtonIcon>["as"];
    onPress: () => void;
  }>;
}

const SwipeListItem: FunctionComponent<SwipeableListItemProps> = ({
  children,
  actionButtons,
}) => {
  const xOffset = useSharedValue<number>(0);
  const actionButtonsWidth = useSharedValue<number>(0);

  const dimensions = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xOffset.value }],
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX < 0) {
        xOffset.value = e.translationX;
      }
    })
    .onEnd((e) => {
      if (-1 * e.translationX > dimensions.width / 3) {
        xOffset.value = withTiming(-actionButtonsWidth.value);
      } else {
        xOffset.value = withTiming(0);
      }
    })
    .activeOffsetX([-10, 10]);

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ position: "relative" }}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[animatedStyle, { zIndex: 1 }]}>
            {children}
          </Animated.View>
        </GestureDetector>

        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            flexDirection: "row",
            zIndex: 0,
          }}
          onLayout={(evt) =>
            actionButtonsWidth.set(evt.nativeEvent.layout.width)
          }
        >
          {actionButtons.map((action, index) => (
            <Button
              onPress={() => {
                action.onPress();
                xOffset.value = withTiming(0);
              }}
              key={index}
              className="h-full border-0"
              variant="outline"
            >
              <ButtonIcon as={action.icon} size={"xl"} />
            </Button>
          ))}
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default SwipeListItem;
