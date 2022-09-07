import React, { ChangeEvent, FC, memo, useState } from 'react';

import { ArticleNineCode } from '../../types/enums';
import { Legality } from '../../types';

import { localization } from '../../utils/language/localization';

import Checkbox from '../checkbox';
import TextField from '../field-text';

import SC from './styled';

interface ExternalProps {
  index: number;
  isReadOnlyUser: boolean;
  fieldValues?: Legality;
  checkBoxName: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface Props extends ExternalProps {}

export const articleNineLabels = {
  [ArticleNineCode.A]: {
    label: localization.articleNineCodes.labels.a,
    description: localization.articleNineCodes.description.a
  },
  [ArticleNineCode.B]: {
    label: localization.articleNineCodes.labels.b,
    description: localization.articleNineCodes.description.b
  },
  [ArticleNineCode.C]: {
    label: localization.articleNineCodes.labels.c,
    description: localization.articleNineCodes.description.c
  },
  [ArticleNineCode.D]: {
    label: localization.articleNineCodes.labels.d,
    description: localization.articleNineCodes.description.d
  },
  [ArticleNineCode.E]: {
    label: localization.articleNineCodes.labels.e,
    description: localization.articleNineCodes.description.e
  },
  [ArticleNineCode.F]: {
    label: localization.articleNineCodes.labels.f,
    description: localization.articleNineCodes.description.f
  },
  [ArticleNineCode.G]: {
    label: localization.articleNineCodes.labels.g,
    description: localization.articleNineCodes.description.g
  },
  [ArticleNineCode.H]: {
    label: localization.articleNineCodes.labels.h,
    description: localization.articleNineCodes.description.h
  },
  [ArticleNineCode.I]: {
    label: localization.articleNineCodes.labels.i,
    description: localization.articleNineCodes.description.i
  },
  [ArticleNineCode.J]: {
    label: localization.articleNineCodes.labels.j,
    description: localization.articleNineCodes.description.j
  }
};

const ArticleNine: FC<Props> = ({
  index,
  isReadOnlyUser,
  fieldValues: { legality = '', checked = false, referenceUrl } = {},
  checkBoxName,
  handleChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <SC.ArticleNine>
      <SC.CheckboxAndLabel>
        <Checkbox
          disabled={isReadOnlyUser}
          name={checkBoxName}
          checked={checked}
          labelText={articleNineLabels[legality].label ?? legality}
          onChange={handleChange}
        />
        {articleNineLabels[legality].description && (
          <SC.Expand title='Toggle beskrivelse' onClick={toggleExpansion}>
            {isExpanded ? (
              <>
                <SC.ExpandAllUp />
                <span>{localization.hideDetails}</span>
              </>
            ) : (
              <>
                <SC.ExpandAllDown />
                <span>{localization.showDetails}</span>
              </>
            )}
          </SC.Expand>
        )}
      </SC.CheckboxAndLabel>
      <SC.ExtraInformation>
        {isExpanded && (
          <SC.Description>
            {articleNineLabels[legality].description}
          </SC.Description>
        )}
        {checked &&
          [
            ArticleNineCode.B,
            ArticleNineCode.C,
            ArticleNineCode.D,
            ArticleNineCode.E,
            ArticleNineCode.F,
            ArticleNineCode.G,
            ArticleNineCode.H,
            ArticleNineCode.I,
            ArticleNineCode.J
          ].includes(legality as ArticleNineCode) && (
            <SC.TextField>
              <TextField
                isReadOnly={isReadOnlyUser}
                name={`otherArticles.articleNine.legalities[${index}].referenceUrl`}
                value={referenceUrl}
                labelText={localization.referenceToOtherLegalBasis}
                onChange={handleChange}
              />
            </SC.TextField>
          )}
      </SC.ExtraInformation>
    </SC.ArticleNine>
  );
};

export default memo(ArticleNine);
