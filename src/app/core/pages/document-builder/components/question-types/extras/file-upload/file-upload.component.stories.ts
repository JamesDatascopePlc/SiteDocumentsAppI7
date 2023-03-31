import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { FileUploadComponent } from "./file-upload.component";

export default {
  title: "Pages/Document-Builder/Question-Types/Extras/File-Upload",
  component: FileUploadComponent,
  argTypes: {
    filename: { type: "string" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<FileUploadComponent> = (args: FileUploadComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  filename: null
}