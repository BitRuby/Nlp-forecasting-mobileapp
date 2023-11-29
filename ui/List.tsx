import React from 'react';
import { Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { COLORS, FONT_SIZE } from './utils';

type ItemProps = { id: number; data: any };

const Item = ({ data }: ItemProps) =>
  Object.keys(data).map((key: string) => (
    <Text key={data[key]} style={styles.itemText}>
      {data[key]}
    </Text>
  ));

interface IList {
  data: Array<{ id: number; data: any }>;
  onSelect?: (id: string) => void;
  selected?: Array<string>;
}

export default function List({ data, selected, onSelect }: IList) {
  const renderItem = ({ item }: any) => (
    <TouchableHighlight
      onPress={() => onSelect && onSelect(item.id.toString())}
      underlayColor={COLORS.gray2}
      style={
        selected?.find((e: any) => e === item.id.toString())
          ? { ...styles.itemCointainer, borderColor: COLORS.green }
          : { ...styles.itemCointainer }
      }>
      <Item id={item.id} data={item.data} />
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
    borderColor: COLORS.white,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 8,
    marginVertical: 5,
  },
  itemText: {
    color: COLORS.white,
    fontFamily: 'Poppins-Light',
    fontSize: FONT_SIZE,
  },
});
