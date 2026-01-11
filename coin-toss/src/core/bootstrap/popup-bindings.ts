type Params = {
  onChange?: () => void;
};

export function attachPopupBindings(params: Params = {}) {
  const state = { isOpen: false };
  let onChange = params.onChange ?? (() => {});

  const onShow = () => {
    state.isOpen = true;
    onChange();
  };

  const onHide = () => {
    state.isOpen = false;
    onChange();
  };

  document.addEventListener('result:show', onShow);
  document.addEventListener('result:hide', onHide);

  return {
    get isOpen() {
      return state.isOpen;
    },
    setOnChange(fn: () => void) {
      onChange = fn;
    },
    destroy() {
      document.removeEventListener('result:show', onShow);
      document.removeEventListener('result:hide', onHide);
    },
  };
}
