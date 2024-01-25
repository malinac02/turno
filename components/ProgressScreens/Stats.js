import { View, StyleSheet, SafeAreaView, FlatList, Animated } from "react-native";
import StatsCard from "../StatsCard"
import { Themes } from "../../assets/Themes";
import { useRef } from "react";

export default function Stats() {
  const statsContent = [
    [
      Images.diceIcons.one, "fire", 10, "You're on Fire!", "Congrats on your 10 day streak"
    ],
    [
      Images.diceIcons.two, "dice", 34, "You've come a long way!", "You have rolled the dice 34 times"
    ],
    [
      Images.diceIcons.three, "cat", 5, "You're chillin'!", "So far, you've completed 5 activities labeled as 'Relax'"
    ],
    [
      Images.diceIcons.four, "star", 82, "You're a star!", "You have received 82 kudos"
    ],
    [
      Images.diceIcons.five, "kudos", 96, "You're so kind!", "You have given 96 kudos"
    ],
    [
      Images.diceIcons.six, "celeb", 100, "Okay, celeb!", "You have made 100 posts"
    ],
  ];

  const scrollHorizontal = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollHorizontal,
          },
        },
      },
    ],
    {
      useNativeDriver: false,
    }
  );

  const width = 310 + 20;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={statsContent}
        horizontal={true}
        showsHorizontalScrollIndicator={false} 
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={310 + 20} 
        onScroll={handleScroll}
        renderItem={({item, index}) => 
          <StatsCard style={styles.statsCard} index={index} statContent={statsContent[index]}/>
        }
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Adjust the width as needed
      />
      <View style={styles.dots}>
        {statsContent.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotWidth = scrollHorizontal.interpolate({
            inputRange, outputRange: [8, 25, 8], extrapolate: "clamp" 
          });
          return (
            <Animated.View 
              key={index.toString()} 
              style={[styles.dot, {width: dotWidth}]} 
            />
          )
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Themes.colors.mediumGray,
    marginHorizontal: 3,
  }
});
