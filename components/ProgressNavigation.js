import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Themes } from "../assets/Themes";
import KudosIcon from "./Icons/Kudos";

const ProgressNavigation = ({ onData }) => {
  const [activeTab, setActiveTab] = useState("Stats"); // Default active tab

  const tabs = ["Posts", "Stats"];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => {
            onData(tab);
            setActiveTab(tab);
          }}
        >
          {activeTab === tab ? (
            <View style={styles.tabContent}>
              <KudosIcon size={20} color="black" notFilled={true} />
              <Text style={styles.tabText}>{tab}</Text>
            </View>
          ) : (
            <KudosIcon size={20} color="black" notFilled={true} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-around",
    padding: 5,
    backgroundColor: Themes.colors.mediumGray,
    borderRadius: 30,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    // Add additional styling to match the screenshot
  },
  activeTab: {
    backgroundColor: Themes.colors.background, // Active tab background color
  },
  tabContent: {
    display: "flex",
    flexDirection: "horizontal",

  },
  tabText: {
    // fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    // Add additional text styling
  },
});

export default ProgressNavigation;
