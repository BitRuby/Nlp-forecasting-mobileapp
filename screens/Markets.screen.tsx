import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Container from '../ui/Container';
import List, { ItemProps } from '../ui/List';
import { getAllMarkets } from '../data/markets';
import { icons } from '../ui/Icons';
import LoadingOverlay from '../ui/Loading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IPrice } from './types';

interface Data {
  name: string;
  prices: IPrice[];
}

const iconKeys = Object.keys(icons);

type StackParamList = {
  'Markets/MarketScreen': { prices: IPrice[] };
};

type MarketScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Markets/MarketScreen'
>;

export default function MarketsScreen() {
  const navigation = useNavigation<MarketScreenNavigationProp>();
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(false);
      const markets = await getAllMarkets();
      if (markets) {
        setData(markets);
      }
      setIsLoading(false);
    })();
  }, []);

  const list = useMemo(() => {
    return data.map((e: any) => ({
      id: e.name,
      data: {
        name: e.name,
      },
      icon: iconKeys.includes(`fa${e.name}`) ? `fa${e.name}` : 'faChartSimple',
    })) as ItemProps[];
  }, [data]);

  const handleSelectElement = useCallback(
    (name: string) => {
      const selectElement = data.find(e => e.name === name);
      if (selectElement) {
        return navigation.navigate('Markets/MarketScreen', {
          prices: selectElement.prices,
        });
      }
    },
    [data, navigation],
  );

  return (
    <Container>
      <List data={list} onSelect={handleSelectElement} />
      <LoadingOverlay isVisible={isLoading} />
    </Container>
  );
}
