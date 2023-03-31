import { faker } from "@faker-js/faker";
import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { OperativeListComponent } from "./operative-list.component";

export default {
  title: "Pages/Document-Builder/Question-Types/10-Operative-List",
  component: OperativeListComponent,
  argTypes: {
    question: { control: "object" },
    isMobileApp: { control: "boolean" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<OperativeListComponent> = (args: OperativeListComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    QuestionID: 1,
    QuestionText: "Operatives",
    Required: false,
    CascadeOptionsText: "",
    Assets: [],
    Operatives: Array
      .from({ length: 3 })
      .map(() => 
      ({
        AttendeeID: +faker.random.numeric(2),
        Name: faker.name.fullName(),
        DateAttended: new Date()
      })
    ),
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  },
  isMobileApp: false
}