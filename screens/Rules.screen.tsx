import React from 'react';
import Container from '../ui/Container';
import List from '../ui/List';

export default function RulesScreen() {
  return (
    <Container>
      <List
        data={[
          {
            id: 'a1',
            data: { name: 'Bitcoin Mining Rules' },
            icon: 'faMagnifyingGlassChart',
          },
        ]}
      />
    </Container>
  );
}
