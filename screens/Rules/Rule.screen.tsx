import React, { useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Container from '../../ui/Container';
import { Card } from '../../ui/Card';

interface RuleScreenRouteParams {
  id: string;
  name: string;
  keywordId: {
    name: string;
  };
  marketId: {
    name: string;
  };
  startDate: string;
  endDate: string;
  rows: { [key: string]: string }[];
}

export default function RuleScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, keywordId, marketId, startDate, endDate, rows } =
    route.params as RuleScreenRouteParams;

  const setTitle = useCallback(
    (title: string) => {
      navigation.setOptions({
        title: `${title} Details`,
      });
    },
    [navigation],
  );

  useEffect(() => {
    setTitle(name);
  }, [name, setTitle]);

  return (
    <Container>
      <Card
        content={{
          Keyword: keywordId.name,
          Market: marketId.name,
          'Start Date': startDate,
          'End Date': endDate,
        }}
      />
    </Container>
  );
}
