import { AmbientGlow } from './AmbientGlow';
import { CodegenDecorator } from './CodegenDecorator';

export default {
  title: 'Codegen/S4 Ambient Glow',
  component: AmbientGlow,
  decorators: [(Story, ctx) => <CodegenDecorator theme={ctx.args.theme}><Story /></CodegenDecorator>],
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['purple', 'mono'] } },
  args: { theme: 'purple' },
};

export const Default = {};
export const Mono = { args: { theme: 'mono' } };
