import React, { useState } from 'react';
import Container from '../../ui/Container';
import Input from '../../ui/Input';
import { useRoute } from '@react-navigation/native';
import Button from '../../ui/Button';
import { Card } from '../../ui/Card';
import { COLORS } from '../../ui/utils';
import { apriori } from '../../data/associationRuleMining';
import Loading from '../../ui/Loading';
import Text from '../../ui/Text';
import List from '../../ui/List';
import Filter from '../../ui/Filter';

interface AssociationRuleMiningScreenRouteParams {
  id: string;
}

interface AssociationRules {
  confidence: number;
  lift: number;
  lhs: string[];
  rhs: string[];
}

interface FrequentItemsets {
  [key: string]: {
    count: number;
    support: number;
  };
}

interface Content {
  associationRules: AssociationRules[];
  frequentItemsets: FrequentItemsets;
}

export default function AssociationRuleMiningScreen() {
  const route = useRoute();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [content, setContent] = useState<Content>({} as Content);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const { id } = route.params as AssociationRuleMiningScreenRouteParams;

  function handleChangeValue(inputName: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  async function applyAssociations() {
    setLoadingStates({ apriori: true });
    const res = await apriori({
      assiociationRuleMiningId: id,
      minSupport: Number(inputs['Min Support']),
      minConfidence: Number(inputs['Min Confidence']),
    });
    setContent(res);
    setLoadingStates({ apriori: false });
  }

  return (
    <Container>
      <Filter>
        <Input
          placeholder="Enter Min Support"
          name={'Min Support'}
          setValue={handleChangeValue}
          value={inputs['Min Support']}
          number
        />
        <Input
          placeholder="Enter Min Confidence"
          name={'Min Confidence'}
          setValue={handleChangeValue}
          value={inputs['Min Confidence']}
          number
        />
        <Button
          disabled={!inputs['Min Confidence'] && !inputs['Min Support']}
          onClick={applyAssociations}
          title={'Apply Associations'}
        />
        {content.frequentItemsets && (
          <>
            <Text>Frequent Itemsets</Text>
            <Card
              backgroundColor={COLORS.gray2}
              content={Object.keys(content.frequentItemsets)
                .map(key => ({
                  [key]: `Count: ${content.frequentItemsets[key].count}, Support: ${content.frequentItemsets[key].support}`,
                }))
                .reduce((res, obj) => ({
                  ...res,
                  ...obj,
                }))}
            />
          </>
        )}
      </Filter>
      <Text>Association Rules</Text>
      <List
        showKeys
        data={content.associationRules.map((obj, index) => ({
          id: index.toString(),
          data: {
            confidence: obj.confidence.toString(),
            lift: obj.lift.toString(),
            lhs: obj.lhs.toString(),
            rhs: obj.rhs.toString(),
          },
        }))}
      />
      <Loading loadingStates={loadingStates} />
    </Container>
  );
}
