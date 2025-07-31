import type { Meta, StoryObj } from '@storybook/react';
import { Gantt } from '../components';

const meta: Meta<typeof Gantt> = {
  title: 'Components/Gantt',
  component: Gantt,
  args: {
    entries: [
      {
        content: "test",
        id: "b7e6c2e2-1f3a-4c8e-9e2a-7c2e4b8d9f1a",
      },
      {
        content: "test 1" ,
        id: "b7e6c2e2-1f3a-4c8e-9e2a-7c2e4b8d9f1a",
      }
    ],
    headers: {
      "Title": "content",
      "Start Date": "startDate",
      "End Date": "endDate"
    }
  }
};

export default meta;

export const Default: StoryObj<typeof Gantt> = {
};
