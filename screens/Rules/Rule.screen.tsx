import React, { useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Container from '../../ui/Container';
import { Card } from '../../ui/Card';
import { COLORS } from '../../ui/utils';
import List from '../../ui/List';
import { incrementDate } from './utils';
import Button from '../../ui/Button';
import { StackNavigationProp } from '@react-navigation/stack';

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

type AssociationRuleMiningStackParamList = {
  'Association Rule Mining': {
    id: string;
  };
};

type AssociationRuleMiningScreenNavigationProp = StackNavigationProp<
  AssociationRuleMiningStackParamList,
  'Association Rule Mining'
>;

export default function RuleScreen() {
  const navigation = useNavigation<AssociationRuleMiningScreenNavigationProp>();
  const route = useRoute();
  const { id, name, keywordId, marketId, startDate, endDate, rows } =
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

  const list = rows.map(({ _id, __v, ...rest }, index) => ({
    id: _id,
    data: {
      date: incrementDate(startDate, index),
      ...rest,
    },
  }));

  function handleOnARMClick() {
    navigation.navigate('Association Rule Mining', { id });
  }

  return (
    <Container>
      <Card
        backgroundColor={COLORS.gray2}
        content={{
          Keyword: keywordId.name,
          Market: marketId.name,
          'Start Date': startDate,
          'End Date': endDate,
        }}
      />
      <List data={list} />
      <Button onClick={handleOnARMClick} title={'Association Rule Mining'} />
    </Container>
  );
}
