import { LayerAnatomy } from './LayerAnatomy';
import { CodegenDecorator } from './CodegenDecorator';

export default {
  title: 'Codegen/S1 Layer Anatomy',
  component: LayerAnatomy,
  decorators: [(Story, ctx) => <CodegenDecorator theme={ctx.args.theme}><Story /></CodegenDecorator>],
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['purple', 'mono'] } },
  args: { theme: 'purple' },
};

export const Default = {};
export const Mono = { args: { theme: 'mono' } };
