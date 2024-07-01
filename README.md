# Duck-typing-react

In this repo, you can find the concepts related to the talk **Unleashing the Power of Duck-Typing in React: Crafting a Generic Application**

## Prerequisites

Install [asdf](https://asdf-vm.com/) and use the `.tool-versions` file to use the proper Node version.

## Key concepts

Type guards and type narrowing

```ts
...
export type ComponentModel = any;

export const isCheckboxModel = (component: ComponentModel): component is CheckboxModel => {
  return component.type === 'checkbox';
};

export const isButtonModel = (component: ComponentModel): component is ButtonModel => {
  return component.type === 'button';
};

export const isAccordionModel = (component: ComponentModel): component is AccordionModel => {
  return component.type === 'accordion';
};
```

Switchyard

```ts
const SwitchYard: React.FC<StdComponentArgs<ComponentModel>> = (props) => {
  const { comp, onComponentChange, onCommand } = props;

  if (isUndefined(comp)) {
    return <h2>Developer error, null model in switchyard</h2>;
  }

  if (isButtonModel(comp)) {
    return <Button comp={comp} onCommand={onCommand} />;
  }

  if (isStaticTextModel(comp)) {
    return <StaticText comp={comp} />;
  }

  if (isCheckboxModel(comp)) {
    return <CheckBoxField comp={comp} onCommand={onCommand} onChange={onComponentChange} />;
  }

  if (isTextInputModel(comp) || isTextAreaModel(comp)) {
    return <InputTextField comp={comp} multiline={isTextAreaModel(comp)} />;
  }

  if (isAccordionModel(comp)) {
    return <Accordion {...props} />;
  }

  return <MissingComponent comp={comp} />;
};

export default SwitchYard;
```

Routing

```ts
<Route
    path="apps/:id"
    element={
        <Addlet ... />
    }
/>
```

Where addlet maps every component (this will come from BE messages through a Websocket) to using the SwitchYard

```ts
{appReg.app_skeleton.components.map((comp, idx) => (
    <SwitchYard
        key={idx}
        comp={comp}
        onComponentChange={handleComponentChange}
        onCommand={sendMsgHandler}
        appInfo={app}
    />
    ))
}
```

Note: BE is missing for now.

## Development

You can run this application using npm

```bash
npm install
npm run dev
```
