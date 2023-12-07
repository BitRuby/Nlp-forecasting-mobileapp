import React from 'react';
import Container from '../../ui/Container';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';

type StackParamList = {
  ['Dataset']: { id: string; name: string };
};

type ContentTransformationsScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Dataset'
>;

export default function NewDataset({}) {
  const route = useRoute();
  const navigation =
    useNavigation<ContentTransformationsScreenNavigationProp>();
  return <Container />;
}
