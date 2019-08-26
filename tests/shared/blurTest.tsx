import { mount } from 'enzyme';
import React from 'react';
import Option from '../../src/Option';
import Select from '../../src/Select';

export default function blurTest(mode: any) {
  describe(`blur of ${mode}`, () => {
    let wrapper;
    let container;
    const selectRef = React.createRef<any>();

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      wrapper = mount(
        <div>
          <Select ref={selectRef} mode={mode}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        </div>,
        { attachTo: container },
      );
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('clears inputValue', () => {
      wrapper.find('input').simulate('change', { target: { value: '1' } });
      wrapper.find('input').simulate('blur');

      expect(wrapper.find('input').getDOMNode().value).toBe('');
    });

    it('blur()', () => {
      const handleBlur = jest.fn();
      wrapper.setProps({ onBlur: handleBlur });
      selectRef.current.focus();
      selectRef.current.blur();
      expect(handleBlur).toHaveBeenCalled();
    });

    if (mode === 'multiple' || mode === 'tags') {
      it('wont blur when click input box', () => {
        const handleBlur = jest.fn();
        wrapper.setProps({ onBlur: handleBlur });
        selectRef.current.focus();
        wrapper.find('.rc-select').simulate('mousedown');
        wrapper.find('.rc-select-search__field').simulate('blur');
        jest.runAllTimers();
        wrapper.find('.rc-select').simulate('mouseup');
        wrapper.find('.rc-select').simulate('click');
        expect(handleBlur).not.toHaveBeenCalled();
      });
    }
  });
}