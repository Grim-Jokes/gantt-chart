import type { Meta, StoryObj } from '@storybook/react';
import { Gantt } from '../components';
import { v4 } from 'uuid';

const today = new Date();


const meta: Meta<typeof Gantt> = {
  title: 'Components/Gantt',
  component: Gantt,
  args: {
    entries: Array.from({ length: 150 }).map((_, index) => {
      const offset = Math.floor(Math.random() * 11);

      return {
        id: v4(),
        content: "test " + index,
        data: {
          name: "test " + index,
          startDate: new Date(new Date(today).setDate(today.getDate() - offset)),
          endDate: new Date(new Date(today).setDate(today.getDate() - offset))
        }
       }
    }),
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
