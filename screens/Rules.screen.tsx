import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import List, { ItemProps } from '../ui/List';
import LoadingOverlay from '../ui/Loading';
import { getRules } from '../data/associationRuleMining';

export default function RulesScreen() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );

  useEffect(() => {
    (async () => {
      setLoadingStates({ getRules: true });
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
      setLoadingStates({ getRules: false });
    })();
  }, []);

  return (
    <Container>
      <List data={list} />
      <LoadingOverlay loadingStates={loadingStates} />
    </Container>
  );
}
