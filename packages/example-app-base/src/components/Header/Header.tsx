import * as React from 'react';
import { getRTL, setRTL } from 'office-ui-fabric-react/lib/Utilities';
import {
  ContextualMenu,
  DirectionalHint,
  IContextualMenuItem
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { withResponsiveMode, ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './Header.scss';
import { fontClassNames } from '@uifabric/styling';

export interface IHeaderProps {
  title: string;
  sideLinks: { name: string, url: string }[];

  isMenuVisible: boolean;
  onIsMenuVisibleChanged?: (isMenuVisible: boolean) => void;

  responsiveMode?: ResponsiveMode;
}

export interface IHeaderState {
  contextMenu?: {
    target: HTMLElement,
    items: IContextualMenuItem[]
  };
  isRTLEnabled?: boolean;
}

@withResponsiveMode
export class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);

    this._onGearClick = this._onGearClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
    this._onRTLToggled = this._onRTLToggled.bind(this);
    this._onMenuClick = this._onMenuClick.bind(this);

    this.state = {
      contextMenu: null,
      isRTLEnabled: getRTL()
    };
  }

  public render() {
    let { title, sideLinks, responsiveMode } = this.props;
    let { contextMenu } = this.state;

    // In medium and below scenarios, hide the side links.
    if (responsiveMode <= ResponsiveMode.large) {
      sideLinks = [];
    }

    return (
      <div>
        <div className='Header'>
          { (responsiveMode <= ResponsiveMode.large) && (
            <button className='Header-button' onClick={ this._onMenuClick }>
              <Icon iconName='GlobalNavButton' />
            </button>
          ) }
          <div className={ 'Header-title ' + fontClassNames.large }>
            <Icon iconName='Org' />
            { title }
          </div>
          <div className='Header-buttons'>
            <FocusZone direction={ FocusZoneDirection.horizontal }>
              { sideLinks.map((link, linkIndex) => (
                <a key={ linkIndex } className='Header-button' href={ link.url }>{ link.name }</a>
              )).concat([
                <button key='headerButton' className='Header-button' onClick={ this._onGearClick }>
                  <Icon iconName='Settings' />
                </button>
              ]) }
            </FocusZone>
          </div>
        </div>
        { contextMenu ? (
          <ContextualMenu
            items={ contextMenu.items }
            isBeakVisible={ true }
            targetElement={ contextMenu.target }
            directionalHint={ DirectionalHint.bottomAutoEdge }
            gapSpace={ 5 }
            onDismiss={ this._onDismiss } />
        ) : (null) }
      </div>
    );
  }

  private _onMenuClick(ev: React.MouseEvent<HTMLElement>) {
    let { onIsMenuVisibleChanged, isMenuVisible } = this.props;

    if (onIsMenuVisibleChanged) {
      onIsMenuVisibleChanged(!isMenuVisible);
    }
  }

  private _onGearClick(ev: React.MouseEvent<HTMLElement>) {
    let { contextMenu } = this.state;

    this.setState({
      contextMenu: contextMenu ? null : {
        target: ev.currentTarget as HTMLElement,
        items: this._getOptionMenuItems()
      }
    });
  }

  private _getOptionMenuItems(): IContextualMenuItem[] {
    return [{
      key: 'isRTL',
      name: `Render in ${this.state.isRTLEnabled ? 'LTR' : 'RTL'}`,
      icon: 'Settings',
      onClick: this._onRTLToggled
    }];
  }

  private _onRTLToggled(ev: React.MouseEvent<HTMLElement>) {
    let { isRTLEnabled } = this.state;

    setRTL(!isRTLEnabled);

    this.setState({
      isRTLEnabled: !isRTLEnabled,
      contextMenu: null
    });
  }

  private _onDismiss() {
    this.setState({
      contextMenu: null
    });
  }
}
