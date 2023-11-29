import React from 'react';
import Container from '../ui/Container';
import List from '../ui/List';

export default function DatasetsScreen() {
  return (
    <Container>
      <List
        data={[
          { id: 'a1', data: { name: 'Bitcoin Dataset' }, icon: 'faDatabase' },
        ]}
      />
    </Container>
  );
}
