import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import List, { ItemProps } from '../ui/List';
import LoadingOverlay from '../ui/Loading';
import { getRules } from '../data/associationRuleMining';

export default function RulesScreen() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getRules();
      if (data) {
        setList(
          data.map((e: any) => ({
            id: e.name,
            data: {
              name: e.name,
            },
            icon: 'faMagnifyingGlassChart',
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
