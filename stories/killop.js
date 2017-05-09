import React from 'react';
import { storiesOf } from '@kadira/storybook';
import KillopComponent from '../src/components/killop';
import ConnectedKillopComponent from '../src/components/';

storiesOf('KillopComponent', module)
  .add('connected to store', () => <ConnectedKillopComponent />)
  .add('enabled', () => <KillopComponent status="enabled" />)
  .add('disabled', () => <KillopComponent status="disabled" />);
