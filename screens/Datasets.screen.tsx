import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import List, { ItemProps } from '../ui/List';
import LoadingOverlay from '../ui/Loading';
import { getAllDatasets } from '../data/dataset';

export default function DatasetsScreeb() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );

  useEffect(() => {
    (async () => {
      setLoadingStates({ getAllDatasets: true });
      const data = await getAllDatasets();
      if (data) {
        setList(
          data.map((e: any) => ({
            id: e.name,
            data: {
              name: e.name,
            },
            icon: 'faDatabase',
          })),
        );
      }
      setLoadingStates({ getAllDatasets: false });
    })();
  }, []);

  return (
    <Container>
      <List data={list} />
      <LoadingOverlay loadingStates={loadingStates} />
    </Container>
  );
}
