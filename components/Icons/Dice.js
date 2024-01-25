import React from 'react';
import { View } from 'react-native';
import Svg, { G, Rect, Defs, ClipPath } from 'react-native-svg';

const DiceSVG = ({ width, color }) => {
  return (
    <View>
      <Svg width={width} height={width} viewBox="0 0 62 61" fill="none">
        <G clipPath="url(#clip0_1052_2295)">
          <Rect width="5" height="5" rx="2.5" transform="matrix(0.701517 -0.712653 0.701517 0.712653 27 46.5635)" fill={color}/>
          <Rect width="5" height="5" rx="2.5" transform="matrix(0.701517 -0.712653 0.701517 0.712653 27 30.5635)" fill={color}/>
          <Rect width="5" height="5" rx="2.5" transform="matrix(0.701517 -0.712653 0.701517 0.712653 9.84086 30.1787)" fill={color}/>
          <Rect width="5" height="5" rx="2.5" transform="matrix(0.701517 -0.712653 0.701517 0.712653 44 30.5635)" fill={color}/>
          <Rect width="5" height="5" rx="2.5" transform="matrix(0.701517 -0.712653 0.701517 0.712653 27 14.5635)" fill={color}/>
        </G>
        <Rect x="3.23246" y="30.7983" width="39.3778" height="38.4538" rx="1.96023" transform="rotate(-45 3.23246 30.7983)" stroke={color} strokeWidth="4.5"/>
        <Defs>
          <ClipPath id="clip0_1052_2295">
            <Rect x="0.460278" y="30.7983" width="43.2983" height="42.3742" rx="3.92045" transform="rotate(-45 0.460278 30.7983)" fill="white"/>
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default DiceSVG;
