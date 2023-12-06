import React, { useCallback, useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { Transformations, applySentimentAnalyze } from '../../data/keyword';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';

interface ContentTransformationsRouteParams {
  id: string;
  name: string;
}

export default function ContentTransformations() {
  const route = useRoute();
  const { id, name } = route.params as ContentTransformationsRouteParams;
  const navigation = useNavigation();
  const [checkboxes, setCheckboxes] = useState<{ [k: string]: boolean }>({});
  const [inputs, setInputs] = useState<{ [k: string]: string }>({
    'Dictionary Length': '10000',
  });
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const setTitle = useCallback(
    (title: string) => {
      navigation.setOptions({
        title: `${title} Tweets Transformations`,
      });
    },
    [navigation],
  );

  useEffect(() => {
    setTitle(name);
  }, [name, setTitle]);

  function handleChangeCheckboxValue(inputName: string, value: boolean) {
    setCheckboxes(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  function handleChangeValue(inputName: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  async function applyTransformations() {
    try {
      setLoadingStates(prev => ({
        ...prev,
        ['applyTransformations']: true,
      }));
      const selectedTransformations = [];
      if (checkboxes['Remove Usernames']) {
        selectedTransformations.push('REMOVE_USERNAMES');
      }
      if (checkboxes['Remove Urls']) {
        selectedTransformations.push('REMOVE_URLS');
      }
      if (checkboxes['Remove Punctuation Marks']) {
        selectedTransformations.push('REMOVE_PUNCTUATION_MARKS');
      }
      if (checkboxes['Text to lowercase']) {
        selectedTransformations.push('TEXT_TO_LOWERCASE');
      }
      if (checkboxes['Remove short words']) {
        selectedTransformations.push('REMOVE_SHORT_WORDS');
      }
      await applySentimentAnalyze({
        keywordId: id,
        dictionaryLength: Number(inputs['Dictionary Length']),
        transformations: selectedTransformations as Transformations,
      });
      navigation.goBack();
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        ['applyTransformations']: false,
      }));
    }
  }

  return (
    <Container>
      <Loading loadingStates={loadingStates} />
      <Input
        name={'Dictionary Length'}
        placeholder="Dictionary Length"
        setValue={handleChangeValue}
        value={inputs['Dictionary Length']}
        number
      />
      <Checkbox
        name={'Remove Usernames'}
        setValue={handleChangeCheckboxValue}
        value={checkboxes['Remove Usernames']}
      />
      <Checkbox
        name={'Remove Urls'}
        setValue={handleChangeCheckboxValue}
        value={checkboxes['Remove Urls']}
      />
      <Checkbox
        name={'Remove Punctuation Marks'}
        setValue={handleChangeCheckboxValue}
        value={checkboxes['Remove Punctuation Marks']}
      />
      <Checkbox
        name={'Text to lowercase'}
        setValue={handleChangeCheckboxValue}
        value={checkboxes['Text to lowercase']}
      />
      <Checkbox
        name={'Remove short words'}
        setValue={handleChangeCheckboxValue}
        value={checkboxes['Remove short words']}
      />
      <Button onClick={applyTransformations} title={'Apply Transformations'} />
    </Container>
  );
}
