import React, { useState, useEffect } from 'react';
import Container from '../../ui/Container';
import List, { ItemProps } from '../../ui/List';
import LoadingOverlay from '../../ui/Loading';
import { getProcessedDatasets } from '../../data/processedDataset';

export default function AIScreen() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );

  useEffect(() => {
    (async () => {
      setLoadingStates({ getProcessedDatasets: true });
      const data = await getProcessedDatasets();
      if (data) {
        setList(
          data.map((e: any) => ({
            id: e.name,
            data: {
              name: e.name,
            },
            icon: 'faBrain',
          })),
        );
      }
      setLoadingStates({ getProcessedDatasets: false });
    })();
  }, []);

  return (
    <Container>
      <List data={list} />
      <LoadingOverlay loadingStates={loadingStates} />
    </Container>
  );
}
