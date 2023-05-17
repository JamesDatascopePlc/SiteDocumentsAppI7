import { StorybookMeta } from ".storybook/storybook.typings";
import { MultiCheckboxSectionComponent } from "./multi-checkbox-section.component";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion, defaultSection } from ".storybook/default";
import { faker } from "@faker-js/faker";

export default {
  title: "Pages/Document-Builder/Components/Document-Section/Multi-Checkbox-Section",
  component: MultiCheckboxSectionComponent,
  argTypes: {
    section: { name: "section", control: "object" },
    searchValue: { name: "searchValue", control: "text" }
  }
} as StorybookMeta<MultiCheckboxSectionComponent>;

const Template: StoryFn<MultiCheckboxSectionComponent> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  section: {
    ...defaultSection,
    TableTitles: [faker.lorem.words()],
    Questions: Array
      .from({ length: 100 })
      .map((val, idx) => ({
        ...defaultQuestion,
        QuestionID: idx,
        QuestionText: faker.lorem.words()
      }))
  }
}