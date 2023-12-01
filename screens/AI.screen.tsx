import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import List, { ItemProps } from '../ui/List';
import LoadingOverlay from '../ui/Loading';
import { getProcessedDatasets } from '../data/processedDataset';

export default function AIScreen() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getProcessedDatasets();
      console.log(JSON.stringify(data[0].datasetId, null, 2));
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
