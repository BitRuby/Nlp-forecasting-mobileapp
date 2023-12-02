import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
  View,
} from 'react-native';
import { COLORS, FONT_SIZE } from './utils';
import Icons, { IconTypes } from './Icons';

export type ItemProps = {
  id: string;
  data: any;
  icon?: IconTypes;
  showKeys?: boolean;
};

const Item = ({ data, icon, showKeys }: ItemProps) =>
  Object.keys(data).map((key: string) =>
    icon ? (
      <View key={key} style={styles.itemWithIcon}>
        <Icons style={styles.icon} color={COLORS.white} icon={icon} size={20} />
        <Text key={data[key]} style={styles.itemText}>
          {data[key]}
        </Text>
      </View>
    ) : showKeys ? (
      <View style={styles.keyValueContainer} key={key}>
        <Text style={styles.itemText}>{`${key}: `}</Text>
        <Text style={styles.itemTextValue}>{data[key]}</Text>
      </View>
    ) : (
      <Text key={key} style={styles.itemText}>
        {data[key]}
      </Text>
    ),
  );

interface IList {
  data: Array<ItemProps>;
  onSelect?: (id: string) => void;
  selected?: Array<string>;
  style?: ViewStyle;
  selectedStyles?: ViewStyle;
  showKeys?: boolean;
}

export default function List({
  data,
  selected,
  onSelect,
  style,
  selectedStyles,
  showKeys,
}: IList) {
  const selectedStyle = selectedStyles || { borderColor: COLORS.green };

  const renderItem = ({ item }: any) => (
    <TouchableHighlight
      onPress={() => onSelect && onSelect(item.id.toString())}
      underlayColor={COLORS.gray2}
      style={
        selected?.find((e: any) => e === item.id.toString())
          ? { ...styles.itemCointainer, ...selectedStyle, ...style }
          : { ...styles.itemCointainer, ...style }
      }>
      <Item
        id={item.id}
        key={item.id}
        data={item.data}
        icon={item.icon}
        showKeys={showKeys}
      />
    </TouchableHighlight>
  );

  return (
    <FlatList
      renderItem={renderItem}
      data={data}
      keyExtractor={(item: ItemProps) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  itemCointainer: {
    borderColor: COLORS.gray1,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 10,
    marginVertical: 8,
  },
  itemWithIcon: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 2,
    marginRight: 8,
  },
  keyValueContainer: {
    flexDirection: 'row',
  },
  itemText: {
    color: COLORS.white,
    fontFamily: 'Poppins-Light',
    fontSize: FONT_SIZE,
  },
  itemTextValue: {
    color: COLORS.white,
    fontFamily: 'Poppins-Bold',
    fontSize: FONT_SIZE,
  },
});
