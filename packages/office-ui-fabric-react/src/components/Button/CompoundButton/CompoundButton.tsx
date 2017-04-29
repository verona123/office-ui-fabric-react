import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent } from '../../../Utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';

import * as stylesImport from './CompoundButton.scss';
const styles: any = stylesImport;

const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--compound',
  description: styles.description,
  flexContainer: styles.flexContainer,
  icon: null,
  rootDisabled: styles.isDisabled,
  rootEnabled: styles.isEnabled,
  label: styles.label,
  root: styles.root
};

export class CompoundButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ CLASS_NAMES }
        { ...this.props }
      />
    );
  }
}
