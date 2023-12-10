import React, { useCallback, useState, useEffect, useMemo } from 'react';
import Container from '../../ui/Container';
import List, { ItemProps } from '../../ui/List';
import { icons } from '../../ui/Icons';
import LoadingOverlay from '../../ui/Loading';
import { getAllKeywords } from '../../data/keyword';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface Data {
  name: string;
  _id: string;
}

type TweetNavProp = StackNavigationProp<{
  Tweet: { id: string; name: string };
}>;

const iconKeys = Object.keys(icons);

export default function TweetsScreen() {
  const navigation = useNavigation<TweetNavProp>();
  const [data, setData] = useState<Data[]>([]);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    (async () => {
      try {
        setLoadingStates({ ['getAllKeywords']: true });
        const tweets = await getAllKeywords();
        if (tweets) {
          setData(tweets);
        }
      } finally {
        setLoadingStates({ ['getAllKeywords']: false });
      }
    })();
  }, []);

  const list = useMemo(() => {
    return data.map((e: any) => ({
      id: e._id,
      data: {
        name: e.name,
      },
      icon: iconKeys.includes(`fa${e.name}`) ? `fa${e.name}` : 'faTwitter',
    })) as ItemProps[];
  }, [data]);

  const handleSelectElement = useCallback(
    (_id: string) => {
      const selectElement = data.find(e => e._id === _id);
      if (selectElement) {
        return navigation.navigate('Tweet', {
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
