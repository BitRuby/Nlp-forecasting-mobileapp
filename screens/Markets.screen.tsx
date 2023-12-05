import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Container from '../ui/Container';
import List, { ItemProps } from '../ui/List';
import { getAllMarkets } from '../data/markets';
import { icons } from '../ui/Icons';
import LoadingOverlay from '../ui/Loading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Data {
  name: string;
  _id: string;
}

const iconKeys = Object.keys(icons);

type StackParamList = {
  Market: { id: string; name: string };
};

type MarketScreenNavigationProp = StackNavigationProp<StackParamList, 'Market'>;

export default function MarketsScreen() {
  const navigation = useNavigation<MarketScreenNavigationProp>();
  const [data, setData] = useState<Data[]>([]);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    (async () => {
      setLoadingStates({ getAllMarkets: true });
      const markets = await getAllMarkets();
      if (markets) {
        setData(markets);
      }
      setLoadingStates({ getAllMarkets: false });
    })();
  }, []);

  const list = useMemo(() => {
    return data.map((e: Data) => ({
      id: e._id,
      data: {
        name: e.name,
      },
      icon: iconKeys.includes(`fa${e.name}`) ? `fa${e.name}` : 'faChartSimple',
    })) as ItemProps[];
  }, [data]);

  const handleSelectElement = useCallback(
    (_id: string) => {
      const selectElement = data.find(e => e._id === _id);
      if (selectElement) {
        return navigation.navigate('Market', {
          id: selectElement._id,
          name: selectElement.name,
        });
      }
    },
    [data, navigation],
  );

  return (
    <Container>
      <List data={list} onSelect={handleSelectElement} />
      <LoadingOverlay loadingStates={loadingStates} />
    </Container>
  );
}
