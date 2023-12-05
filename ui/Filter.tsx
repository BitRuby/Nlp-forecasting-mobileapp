import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icons from './Icons';
import { COLORS } from './utils';

interface IFilter {
  children: string | JSX.Element | JSX.Element[];
}

export default function Filter({ children }: IFilter) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand}>
        <View>
          <Icons style={styles.icon} color={COLORS.white} icon="faFilter" />
        </View>
      </TouchableOpacity>
      {isExpanded && <View>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginVertical: 4,
  },
});
