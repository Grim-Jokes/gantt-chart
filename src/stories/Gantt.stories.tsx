import type { Meta, StoryObj } from '@storybook/react';
import { Gantt } from '../components';

const meta: Meta<typeof Gantt> = {
  title: 'Components/Gantt',
  component: Gantt,
};

export default meta;

export const Default: StoryObj<typeof Gantt> = {
  render: () => <Gantt />,
};
