import { defaultQuestion } from ".storybook/default";
import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { QuestionType } from "src/app/core/stores/site-document/site-document.store";
import { RadioGroupComponent } from "./radio-group.component";

export default {
  title: "Pages/Document-Builder/Question-Types/02-Radio-Group",
  component: RadioGroupComponent,
  argTypes: {
    question: { control: "object" },
    section: { control: "object" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<RadioGroupComponent> = (args: RadioGroupComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    ...defaultQuestion,
    QuestionText: "Radio Group Question",
  },
  section: {
    SectionID: 1,
    SectionNo: 1,
    SectionQuestiontype: QuestionType.RadioGroup,
    SectionTitle: "",
    IsRepeatable: false,
    Questions: [],
    TableTitles: ["Yes", "No", "N/A"]
  }
}