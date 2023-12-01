import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import List, { ItemProps } from '../ui/List';
import { icons } from '../ui/Icons';
import LoadingOverlay from '../ui/Loading';
import { getAllKeywords } from '../data/keyword';

export default function TweetsScreen() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const iconKeys = Object.keys(icons);
      const data = await getAllKeywords();
      if (data) {
        setList(
          data.map((e: any) => ({
            id: e.name,
            data: {
              name: e.name,
            },
            icon: iconKeys.includes(`fa${e.name}`)
              ? `fa${e.name}`
              : 'faChartSimple',
          })),
        );
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Container>
      <List data={list} />
      <LoadingOverlay isVisible={isLoading} />
    </Container>
  );
}
